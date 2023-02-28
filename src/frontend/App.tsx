import React, { useContext } from 'react'

import './App.css'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './screens/Login'
import WebView from './screens/WebView'
import { GamePage } from './screens/Game'
import Library from './screens/Library'
import WineManager from './screens/WineManager'
import Sidebar from './components/UI/Sidebar'
import Settings from './screens/Settings'
import Accessibility from './screens/Accessibility'
import ContextProvider from './state/ContextProvider'
import classNames from 'classnames'
import Onboarding from './screens/Onboarding'
import { ControllerHints, OfflineMessage } from './components/UI'
import DownloadManager from './screens/DownloadManager'
import DialogHandler from './components/UI/DialogHandler'
import ExtensionHandler from './ExtensionHandler'
import MetaMaskHome from './screens/MetaMaskHome'
import MetaMaskPortfolio from './screens/MetaMaskPortfolio'
import ExtensionManager from './ExtensionManager'
import onboardingStore from './store/OnboardingStore'
import { observer } from 'mobx-react-lite'
import TransactionNotification from './screens/TransactionNotification'
import ExternalLinkDialog from './components/UI/ExternalLinkDialog'
import SettingsModal from './screens/Settings/components/SettingsModal'

function App() {
  const { sidebarCollapsed, isSettingsModalOpen } = useContext(ContextProvider)
  console.log('sidebar collapsed in app = ', sidebarCollapsed)

  return (
    <div className={classNames('App', { collapsed: sidebarCollapsed })}>
      <HashRouter>
        <OfflineMessage />
        <Sidebar />
        <main className="content">
          <ExtensionHandler />
          <ExtensionManager />
          <DialogHandler />
          <ExternalLinkDialog />
          {isSettingsModalOpen.gameInfo && (
            <SettingsModal
              gameInfo={isSettingsModalOpen.gameInfo}
              type={isSettingsModalOpen.type}
            />
          )}
          <Routes>
            <Route path="/" element={<Navigate replace to="/library" />} />
            <Route path="/library" element={<Library />} />
            <Route path="login" element={<Login />} />
            <Route path="epicstore" element={<WebView />} />
            <Route path="gogstore" element={<WebView />} />
            <Route path="wiki" element={<WebView />} />
            <Route path="metamaskHome" element={<MetaMaskHome />} />
            <Route path="metamaskPortfolio" element={<MetaMaskPortfolio />} />
            <Route path="/gamepage">
              <Route path=":runner">
                <Route path=":appName" element={<GamePage />} />
              </Route>
            </Route>
            <Route path="/store-page" element={<WebView />} />
            <Route path="loginweb">
              <Route path=":runner" element={<WebView />} />
            </Route>
            <Route path="settings">
              <Route path=":runner">
                <Route path=":appName">
                  <Route path=":type" element={<Settings />} />
                </Route>
              </Route>
            </Route>
            <Route path="/wine-manager" element={<WineManager />} />
            <Route path="/download-manager" element={<DownloadManager />} />
            <Route path="/accessibility" element={<Accessibility />} />
          </Routes>
        </main>
        <div className="controller">
          <ControllerHints />
          <div className="simple-keyboard"></div>
        </div>
      </HashRouter>
      <TransactionNotification />
      {onboardingStore.isOnboardingOpen && (
        <Onboarding
          disableOnboarding={() => {
            window.api.trackEvent({ event: 'Onboarding Skipped' })
            onboardingStore.closeOnboarding()
          }}
        />
      )}
    </div>
  )
}

export default observer(App)
