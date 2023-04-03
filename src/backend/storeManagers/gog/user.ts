import axios from 'axios'
import { logError, logInfo, LogPrefix, logWarning } from '../../logger/logger'
import { GOGLoginData } from 'common/types'
import { configStore, libraryStore } from './electronStores'
import { errorHandler } from '../../utils'
import { isOnline } from '../../online_monitor'
import { UserData } from 'common/types/gog'

const gogAuthenticateUrl =
  'https://auth.gog.com/token?client_id=46899977096215655&client_secret=9d85c43b1482497dbbce61f6e4aa173a433796eeae2ca8c5f6129f2dc4de46d9&grant_type=authorization_code&redirect_uri=https%3A%2F%2Fembed.gog.com%2Fon_login_success%3Forigin%3Dclient&code='
const gogRefreshTokenUrl =
  'https://auth.gog.com/token?client_id=46899977096215655&client_secret=9d85c43b1482497dbbce61f6e4aa173a433796eeae2ca8c5f6129f2dc4de46d9&grant_type=refresh_token'

export class GOGUser {
  static async login(
    code: string
    // TODO: Write types for this
  ): Promise<{
    status: 'done' | 'error'
    data?: UserData | null
  }> {
    logInfo('Logging using GOG credentials', LogPrefix.Gog)

    // Gets token from GOG basaed on authorization code
    const response = await axios
      .get(gogAuthenticateUrl + code)
      .catch((error) => {
        // Handle fetching error
        logError(['Failed to get access_token', error], LogPrefix.Gog)
        return null
      })
    if (!response?.data) {
      logError('Failed to get access_token', LogPrefix.Gog)
      return { status: 'error' }
    }

    const data: GOGLoginData = response.data
    data.loginTime = Date.now()
    configStore.set('credentials', data)
    logInfo('Login Successful', LogPrefix.Gog)
    const userDetails = await this.getUserDetails()
    return { status: 'done', data: userDetails }
  }

  public static async getUserDetails() {
    if (!isOnline()) {
      logError('Unable to get user data, HyperPlay offline', LogPrefix.Gog)
      return null
    }
    logInfo('Getting data about the user', LogPrefix.Gog)
    if (!this.isLoggedIn()) {
      logWarning('User is not logged in', LogPrefix.Gog)
      return
    }
    const user = await this.getCredentials()
    if (!user) {
      logError("No credentials, can't get user data", LogPrefix.Gog)
      return
    }
    const response = await axios
      .get(`https://embed.gog.com/userData.json`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          'User-Agent': 'GOGGalaxyClient/2.0.45.61 (GOG Galaxy)'
        }
      })
      .catch((error) => {
        logError(['Error getting user Data', error], LogPrefix.Gog)
      })

    if (!response) {
      return
    }

    const data: UserData = response.data

    //Exclude email, it won't be needed
    delete data.email

    configStore.set('userData', data)
    logInfo('Saved user data to config', LogPrefix.Gog)

    return data
  }
  /**
   * Loads user credentials from config
   * if needed refreshes token and returns new credentials
   * @returns user credentials
   */
  public static async getCredentials() {
    if (this.isTokenExpired()) {
      return this.refreshToken()
    }

    return configStore.get_nodefault('credentials')
  }

  /**
   * Refreshes token and returns new credentials
   */
  public static async refreshToken(): Promise<GOGLoginData | undefined> {
    const user = configStore.get_nodefault('credentials')
    logInfo('Refreshing access_token', LogPrefix.Gog)
    if (user) {
      const response = await axios
        .get(`${gogRefreshTokenUrl}&refresh_token=${user.refresh_token}`)
        .catch(() => {
          logError(
            'Error with refreshing token, reauth required',
            LogPrefix.Gog
          )
        })

      if (!response) {
        return
      }

      const data: GOGLoginData = response.data
      data.loginTime = Date.now()
      configStore.set('credentials', data)
      logInfo('Token refreshed successfully', LogPrefix.Gog)
      return data
    } else {
      logError('No credentials, auth required', LogPrefix.Gog)
      errorHandler({
        error: 'No credentials',
        runner: 'GOG'
      })
      return
    }
  }

  public static isTokenExpired() {
    const user = configStore.get_nodefault('credentials')
    if (!user) {
      return true
    }
    const isExpired = Date.now() >= user.loginTime + user.expires_in * 1000
    return isExpired
  }
  public static logout() {
    configStore.clear()
    libraryStore.clear()
    logInfo('Logging user out', LogPrefix.Gog)
  }

  public static isLoggedIn() {
    return configStore.has('credentials')
  }
}
