import { ipcMain, session } from 'electron'
import { DEV_PORTAL_URL } from '../../common/constants'
import { getAuthSession } from '../auth'
import { Auth, raw, createActionURL } from '@auth/core'
import { SiweMessage } from 'siwe'

ipcMain.handle('getAuthSession', async () => getAuthSession())

ipcMain.handle('logOut', async () => {
  const authSession = session.fromPartition('persist:auth')
  const cookiesToRemove = [
    'next-auth.session-token',
    '__Secure-next-auth.session-token'
  ]
  await Promise.all(
    cookiesToRemove.map(async (cookie) =>
      authSession.cookies.remove(DEV_PORTAL_URL, cookie)
    )
  )
})

const NEXTAUTH_URL = 'https://developers.hyperplay.xyz'
ipcMain.handle('signIn', async (_ev, email: string) => {
  const headers = new Headers()
  const signInURL = createActionURL(
    'signin',
    // @ts-expect-error `x-forwarded-proto` is not nullable, next.js sets it by default
    headers.get('x-forwarded-proto'),
    headers,
    process.env,
    NEXTAUTH_URL
  )

  // const authParams:
  //   | string[][]
  //   | Record<string, string>
  //   | string
  //   | URLSearchParams = {}

  headers.set('Content-Type', 'application/x-www-form-urlencoded')
  // const body = new URLSearchParams({ ...rest })
  const req = new Request(signInURL, { method: 'POST', headers })
  const res = await Auth(req, { ...config, raw, skipCSRFCheck: true })
})

ipcMain.handle('walletSignIn', async () => {
  const userSession = await getAuthSession()
  const connectedProviders = new Map(
    userSession?.linkedAccounts?.map((val) => [val.provider, true])
  )

  const ethereumConnected = connectedProviders.has('ethereum')

  if (ethereumConnected) {
    console.log('Already connected to ethereum, skipping link')
    return
  }

  if (!window.ethereum) {
    console.error('No ethereum provider available')
    return
  }

  const csrfToken = await getCsrfToken()
  const connectedAddress = window.ethereum.selectedAddress

  if (!connectedAddress) {
    console.error('No connected address on window.ethereum.selectedAddress')
    window.authApi?.reportAccountNotConnected()
    return
  }

  const chainId = await getChainId()
  const checksumAddress = ethers.getAddress(connectedAddress)

  const message = new SiweMessage({
    domain: new URL(process.env.NEXT_PUBLIC_NEXTAUTH_URL || '').host,
    address: checksumAddress,
    statement: 'Sign in with Ethereum to HyperPlay',
    uri: window.location.origin,
    version: '1',
    nonce: csrfToken,
    chainId
  })

  const signature = await window.ethereum.request({
    method: 'personal_sign',
    params: [message.prepareMessage(), checksumAddress]
  })

  const response = await signIn('ethereum', {
    message: JSON.stringify(message),
    redirect: false,
    signature
  })

  if (!response || response.error) {
    console.error('error signing in', response?.error)
    return
  }

  window.authApi?.reportAccountConnected()
})
