import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation, useParams } from 'react-router'
import { DidNavigateEvent, WebviewTag } from 'electron'

import { UpdateComponent } from 'frontend/components/UI'
import WebviewControls from 'frontend/components/UI/WebviewControls'
import ContextProvider from 'frontend/state/ContextProvider'
import webviewNavigationStore from 'frontend/store/WebviewNavigationStore'
import { Runner } from 'common/types'
import './index.css'
import LoginWarning from '../Login/components/LoginWarning'
import { NileLoginData } from 'common/types/nile'
import authStore from 'frontend/store/AuthStore'
import { observer } from 'mobx-react-lite'
import {
  EPIC_LOGIN_URL,
  EPIC_STORE_URL,
  GOG_LOGIN_URL,
  GOG_STORE_URL,
  HYPERPLAY_STORE_URL,
  WIKI_URL,
  AMAZON_STORE
} from '../../constants'
import { METAMASK_SNAPS_URL } from 'common/constants'
import storeAuthState from 'frontend/state/storeAuthState'

function urlIsHpUrl(url: string) {
  const urlToTest = new URL(url)
  return urlToTest.hostname === 'store.hyperplay.xyz'
}

function shouldInjectProvider(url: string) {
  return url === METAMASK_SNAPS_URL
}

function WebView() {
  const { i18n } = useTranslation()
  const { pathname, search } = useLocation()
  const { t } = useTranslation()
  const { epic, gog, amazon, connectivity } = useContext(ContextProvider)
  const [loading, setLoading] = useState<{
    refresh: boolean
    message: string
  }>(() => ({
    refresh: true,
    message: t('loading.website', 'Loading Website')
  }))
  const [amazonLoginData, setAmazonLoginData] = useState<NileLoginData | null>(
    null
  )
  const navigate = useNavigate()
  const webviewRef = useRef<WebviewTag>(null)

  let lang = i18n.language
  if (i18n.language === 'pt') {
    lang = 'pt-BR'
  }

  const hyperplayStore =
    HYPERPLAY_STORE_URL +
    (authStore.authToken !== '' ? '&qamode=' + authStore.authToken : '')

  const epicStore = `${EPIC_STORE_URL}/${lang}/`
  const gogEmbedRegExp = new RegExp('https://embed.gog.com/on_login_success?')

  const trueAsStr = 'true' as unknown as boolean | undefined
  const { runner } = useParams() as { runner: Runner }

  const urls: { [pathname: string]: string } = {
    '/hyperplaystore': hyperplayStore,
    '/epicstore': epicStore,
    '/gogstore': GOG_STORE_URL,
    '/amazonstore': AMAZON_STORE,
    '/wiki': WIKI_URL,
    '/loginEpic': EPIC_LOGIN_URL,
    '/loginGOG': GOG_LOGIN_URL,
    '/loginweb/legendary': EPIC_LOGIN_URL,
    '/loginweb/gog': GOG_LOGIN_URL,
    '/loginweb/nile': amazonLoginData ? amazonLoginData.url : AMAZON_STORE,
    '/metamaskSnaps': METAMASK_SNAPS_URL
  }

  let startUrl = Object.prototype.hasOwnProperty.call(urls, pathname)
    ? urls[pathname]
    : ''

  if (pathname.match(/store-page/)) {
    const searchParams = new URLSearchParams(search)
    const queryParam = searchParams.get('store-url')
    if (queryParam) {
      const queryParamAppends = urlIsHpUrl(queryParam) ? '?isLauncher=true' : ''

      startUrl = queryParam + queryParamAppends
    }
  }

  const isEpicLogin = runner === 'legendary' && startUrl === EPIC_LOGIN_URL
  const [preloadPath, setPreloadPath] = useState('')

  useEffect(() => {
    let mounted = true
    const fetchLocalPreloadPath = async () => {
      const path = (await window.api.getLocalPeloadPath()) as unknown
      if (mounted) {
        setPreloadPath(path as string)
      }
    }

    if (isEpicLogin) {
      fetchLocalPreloadPath()
    }

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    if (pathname !== '/loginweb/nile') return
    console.log('Loading amazon login data')

    setLoading({
      refresh: true,
      message: t('status.preparing_login', 'Preparing Login...')
    })
    const getAmazonLoginData = async () => {
      await amazon
        .getLoginData()
        .then((data) => {
          setAmazonLoginData(data)
          setLoading({
            ...loading,
            refresh: false
          })
        })
        .catch((error) => {
          console.error('Failed to load Amazon login data', { error })
          setLoading({
            ...loading,
            refresh: false
          })
        })
    }
    getAmazonLoginData()
  }, [pathname])

  const handleAmazonLogin = (code: string) => {
    if (!amazonLoginData) {
      console.error('Could not login to Amazon because login data is missing')
      return
    }

    setLoading({
      refresh: true,
      message: t('status.logging', 'Logging In...')
    })
    amazon
      .login({
        client_id: amazonLoginData.client_id,
        code: code,
        code_verifier: amazonLoginData.code_verifier,
        serial: amazonLoginData.serial
      })
      .then(() => {
        handleSuccessfulLogin()
      })
  }

  const handleSuccessfulLogin = () => {
    navigate('/login')
  }

  // Track the screen view once each time the url updates
  useEffect(() => {
    window.api.trackScreen('WebView', { url: startUrl, runner })
  }, [startUrl, runner])

  useLayoutEffect(() => {
    const webview = webviewRef.current
    if (webview && ((preloadPath && isEpicLogin) || !isEpicLogin)) {
      const onIpcMessage = async (event: unknown) => {
        const e = event as { channel: string; args: string[] }
        if (e.channel === 'processEpicLoginCode') {
          try {
            setLoading({
              refresh: true,
              message: t('status.logging', 'Logging In...')
            })
            await epic.login(e.args[0])
            handleSuccessfulLogin()
          } catch (error) {
            console.error(error)
            window.api.logError(String(error))
          }
        }
      }

      webview.addEventListener('ipc-message', onIpcMessage)

      const loadstop = async () => {
        setLoading({ ...loading, refresh: false })
        // Ignore the login handling if not on login page
        if (!runner) {
          return
        } else if (runner === 'gog') {
          const pageUrl = webview.getURL()
          if (pageUrl.match(gogEmbedRegExp)) {
            const parsedURL = new URL(pageUrl)
            const code = parsedURL.searchParams.get('code')
            setLoading({
              refresh: true,
              message: t('status.logging', 'Logging In...')
            })
            if (code) {
              gog.login(code).then(() => {
                handleSuccessfulLogin()
              })
            }
          }
        } else if (runner === 'nile') {
          const pageURL = webview.getURL()
          const parsedURL = new URL(pageURL)
          const code = parsedURL.searchParams.get(
            'openid.oa2.authorization_code'
          )
          if (code) {
            handleAmazonLogin(code)
          }
        }
      }

      webview.addEventListener('dom-ready', loadstop)

      // if the page title changed it's because the store loaded so there's
      // connectivity, we can update the status without waiting for the checks
      const updateConnectivity = () => {
        if (connectivity.status !== 'online') {
          window.api.setConnectivityOnline()
        }
      }
      webview.addEventListener('page-title-updated', updateConnectivity)

      return () => {
        webview.removeEventListener('ipc-message', onIpcMessage)
        webview.removeEventListener('dom-ready', loadstop)
        webview.removeEventListener('page-title-updated', updateConnectivity)
      }
    }
    return
  }, [webviewRef.current, preloadPath, amazonLoginData])

  const [showLoginWarningFor, setShowLoginWarningFor] = useState<
    null | 'epic' | 'gog' | 'amazon'
  >(null)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (startUrl.match(/epicgames\.com/) && !storeAuthState.epic.username) {
        setShowLoginWarningFor('epic')
      } else if (
        startUrl.match(/gog\.com/) &&
        !startUrl.match(/auth\.gog\.com/) &&
        !storeAuthState.gog.username
      ) {
        setShowLoginWarningFor('gog')
      } else if (startUrl === AMAZON_STORE && !storeAuthState.amazon.user_id) {
        setShowLoginWarningFor('amazon')
      } else {
        setShowLoginWarningFor(null)
      }
    }, 3000)

    return () => clearTimeout(timeoutId)
  }, [startUrl])

  useEffect(() => {
    const handleNavigation = (event: DidNavigateEvent) => {
      webviewNavigationStore.setCurrentUrl(event.url)
    }

    webviewRef.current?.addEventListener('did-navigate', handleNavigation)

    return () => {
      webviewRef.current?.removeEventListener('did-navigate', handleNavigation)
    }
  }, [webviewRef])

  const onLoginWarningClosed = () => {
    setShowLoginWarningFor(null)
  }

  if (!preloadPath && isEpicLogin) {
    return <></>
  }

  let partitionForWebview = 'persist:epicstore'

  if (urlIsHpUrl(startUrl)) partitionForWebview = 'persist:hyperplaystore'
  else if (shouldInjectProvider(startUrl))
    partitionForWebview = 'persist:InPageWindowEthereumExternalWallet'

  return (
    <div className="WebView">
      {webviewRef.current && (
        <WebviewControls
          webview={webviewRef.current}
          initURL={startUrl}
          openInBrowser={!startUrl.startsWith('login')}
        />
      )}
      {loading.refresh && <UpdateComponent message={loading.message} />}
      <webview
        ref={webviewRef}
        className="WebView__webview"
        partition={partitionForWebview}
        src={startUrl}
        allowpopups={trueAsStr}
        useragent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/200.0"
        {...(preloadPath ? { preload: `file://${preloadPath}` } : {})}
      />
      {showLoginWarningFor && (
        <LoginWarning
          warnLoginForStore={showLoginWarningFor}
          onClose={onLoginWarningClosed}
        />
      )}
    </div>
  )
}

export default observer(WebView)
