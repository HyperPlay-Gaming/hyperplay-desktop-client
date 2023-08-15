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
import authStore from 'frontend/store/AuthStore'
import { observer } from 'mobx-react-lite'
import {
  EPIC_LOGIN_URL,
  EPIC_STORE_URL,
  GOG_LOGIN_URL,
  GOG_STORE_URL,
  HYPERPLAY_STORE_URL,
  WIKI_URL
} from '../../constants'

function urlIsHpUrl(url: string) {
  const urlToTest = new URL(url)
  return urlToTest.hostname === 'store.hyperplay.xyz'
}

function WebView() {
  const { i18n } = useTranslation()
  const { pathname, search } = useLocation()
  const { t } = useTranslation()
  const { epic, gog, connectivity } = useContext(ContextProvider)
  const [loading, setLoading] = useState<{
    refresh: boolean
    message: string
  }>(() => ({
    refresh: true,
    message: t('loading.website', 'Loading Website')
  }))
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

  const urls = {
    '/hyperplaystore': hyperplayStore,
    '/epicstore': epicStore,
    '/gogstore': GOG_STORE_URL,
    '/wiki': WIKI_URL,
    '/loginEpic': EPIC_LOGIN_URL,
    '/loginGOG': GOG_LOGIN_URL,
    '/loginweb/legendary': EPIC_LOGIN_URL,
    '/loginweb/gog': GOG_LOGIN_URL
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
  }, [webviewRef.current, preloadPath])

  const [showLoginWarningFor, setShowLoginWarningFor] = useState<
    null | 'epic' | 'gog'
  >(null)

  useEffect(() => {
    if (startUrl.match(/epicgames\.com/) && !epic.username) {
      setShowLoginWarningFor('epic')
    } else if (
      startUrl.match(/gog\.com/) &&
      !startUrl.match(/auth\.gog\.com/) &&
      !gog.username
    ) {
      setShowLoginWarningFor('gog')
    }
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

  const partitionForWebview = urlIsHpUrl(startUrl)
    ? 'persist:hyperplaystore'
    : 'persist:epicstore'

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
