import React, { useContext, useEffect, useState } from 'react'
import './index.css'
import Runner from './components/Runner'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { ReactComponent as EpicLogo } from 'frontend/assets/epic-logo.svg'
import { ReactComponent as GOGLogo } from 'frontend/assets/gog-logo.svg'
import { ReactComponent as HyperPlayLogo } from 'frontend/assets/hyperplay/hyperplay_logo.svg'

import { LanguageSelector, UpdateComponent } from '../../components/UI'
import { FlagPosition } from '../../components/UI/LanguageSelector'
import SIDLogin from './components/SIDLogin'
import ContextProvider from '../../state/ContextProvider'

export const epicLoginPath = '/loginweb/legendary'
export const gogLoginPath = '/loginweb/gog'

export default React.memo(function NewLogin() {
  const { epic, gog, refreshLibrary } = useContext(ContextProvider)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [showSidLogin, setShowSidLogin] = useState(false)
  const [isEpicLoggedIn, setIsEpicLoggedIn] = useState(Boolean(epic.username))
  const [isGogLoggedIn, setIsGogLoggedIn] = useState(Boolean(gog.username))

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
    setIsEpicLoggedIn(Boolean(epic.username))
    setIsGogLoggedIn(Boolean(gog.username))
  }, [epic.username, gog.username, t])

  async function handleLibraryClick() {
    await refreshLibrary({ fullRefresh: true, runInBackground: false })
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
      <div className="loginBackground"></div>

      <div className="loginContentWrapper">
        <div className="runnerList">
          <div className="runnerHeader">
            <HyperPlayLogo className="runnerHeaderIcon" />
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
              user={epic.username}
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
              user={gog.username}
              logoutAction={gog.logout}
            />
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
