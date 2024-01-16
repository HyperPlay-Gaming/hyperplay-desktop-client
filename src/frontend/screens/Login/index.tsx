import React, { useContext, useEffect, useState } from 'react'
import './index.css'
import Runner from './components/Runner'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { ReactComponent as EpicLogo } from 'frontend/assets/epic-logo.svg'
import { ReactComponent as GOGLogo } from 'frontend/assets/gog-logo.svg'
import { ReactComponent as AmazonLogo } from 'frontend/assets/amazon-logo.svg'

import { LanguageSelector, UpdateComponent } from '../../components/UI'
import { FlagPosition } from '../../components/UI/LanguageSelector'
import SIDLogin from './components/SIDLogin'
import ContextProvider from '../../state/ContextProvider'
import { Background, Images } from '@hyperplay/ui'
import libraryState from 'frontend/state/libraryState'
import storeAuthState from 'frontend/state/storeAuthState'
import { useFlags } from 'launchdarkly-react-client-sdk'

export const epicLoginPath = '/loginweb/legendary'
export const gogLoginPath = '/loginweb/gog'
export const amazonLoginPath = '/loginweb/nile'

export default React.memo(function NewLogin() {
  const { epic, gog, amazon } = useContext(ContextProvider)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [showSidLogin, setShowSidLogin] = useState(false)
  const [isEpicLoggedIn, setIsEpicLoggedIn] = useState(
    Boolean(storeAuthState.epic.username)
  )
  const [isGogLoggedIn, setIsGogLoggedIn] = useState(
    Boolean(storeAuthState.gog.username)
  )
  const [isAmazonLoggedIn, setIsAmazonLoggedIn] = useState(
    Boolean(storeAuthState.amazon.user_id)
  )
  const flags = useFlags()
  const ENABLE_AMAZON_STORE = flags.amazonStore

  const loginMessage = t(
    'login.message',
    'Login with your platform. You can login to more than one platform at the same time.'
  )

  // Track the screen view once
  useEffect(() => {
    window.api.trackScreen('Login')
  }, [])

  useEffect(() => {
    setLoading(false)
  }, [epic, gog])

  useEffect(() => {
    setIsEpicLoggedIn(Boolean(storeAuthState.epic.username))
    setIsGogLoggedIn(Boolean(storeAuthState.gog.username))
    setIsAmazonLoggedIn(Boolean(storeAuthState.amazon.user_id))
  }, [storeAuthState.epic.username, storeAuthState.gog.username, storeAuthState.amazon.user_id, t])

  async function handleLibraryClick() {
    await libraryState.refreshLibrary({
      runInBackground: false,
      checkForUpdates: false
    })
    navigate('/library')
  }

  return (
    <div className="loginPage">
      {loading && (
        <div>
          <UpdateComponent />
        </div>
      )}
      {showSidLogin && (
        <SIDLogin
          backdropClick={() => {
            setShowSidLogin(false)
          }}
        />
      )}
      <Background style={{ position: 'absolute' }}></Background>

      <div className="loginContentWrapper">
        <div className="runnerList">
          <div className="runnerHeader">
            <Images.HyperPlayLogoColored className="runnerHeaderIcon" />
            <div className="runnerHeaderText">
              <h1 className="title">HyperPlay</h1>
              <h2 className="subtitle">Games Launcher</h2>
            </div>

            {!loading && (
              <LanguageSelector
                flagPossition={FlagPosition.PREPEND}
                showWeblateLink={true}
              />
            )}
          </div>

          <p className="runnerMessage">{loginMessage}</p>

          <div className="runnerGroup">
            <Runner
              class="epic"
              loginUrl={epicLoginPath}
              icon={() => <EpicLogo />}
              isLoggedIn={isEpicLoggedIn}
              user={storeAuthState.epic.username}
              logoutAction={epic.logout}
              alternativeLoginAction={() => {
                setShowSidLogin(true)
              }}
            />
            <Runner
              class="gog"
              icon={() => <GOGLogo />}
              loginUrl={gogLoginPath}
              isLoggedIn={isGogLoggedIn}
              user={storeAuthState.gog.username}
              logoutAction={gog.logout}
            />
            {ENABLE_AMAZON_STORE ? (
              <Runner
                class="nile"
                icon={() => <AmazonLogo />}
                loginUrl={amazonLoginPath}
                isLoggedIn={isAmazonLoggedIn}
                user={storeAuthState.amazon.username || 'Unknown'}
                logoutAction={amazon.logout}
              />
            ) : null}
          </div>
          <button
            onClick={async () => handleLibraryClick()}
            className="goToLibrary"
          >
            {t('button.go_to_library', 'Go to Library')}
          </button>
        </div>
      </div>
    </div>
  )
})
