import React, { useContext } from 'react'

import './App.css'
import { HashRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Login from './screens/Login'
import WebView from './screens/WebView'
import { GamePage } from './screens/Game'
import Library from './screens/Library'
import Achievements from './screens/Achievements'
import Sidebar from './components/UI/Sidebar'
import Settings from './screens/Settings'
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
import onboardingStore, {
  OnboardingStoreController
} from './store/OnboardingStore'
import { observer } from 'mobx-react-lite'
import TransactionNotification from './screens/TransactionNotification'
import ExternalLinkDialog from './components/UI/ExternalLinkDialog'
import SettingsModal from './screens/Settings/components/SettingsModal'
import DownloadToastManager from './components/UI/DownloadToastManager'
import TopNavBar from './components/UI/TopNavBar'
import StoreNavHandler from './StoreNavHandler'
import QaAuthHandler from './QaAuthHandler'
import AchievementsLayout from './screens/Achievements/AchievementsLayout'
import GameAchievementDetails from './screens/Achievements/GameAchievementDetails'
import AuthModal from './components/UI/AuthModal'
import { WalletOnboardCloseReason } from 'common/types'
import { DeviceStateController } from './state/DeviceState'
import EmailSubscriptionModal from './components/UI/EmailSubscriptionModal'
import { UpdateModalController } from './components/UI/UpdateModalController'
import { QuestsPage } from './screens/Quests'
import { NavigateListener } from './NavigateListener'
import G7Webview from './screens/G7Webview'
import CardPrivacyPolicy from './screens/Onboarding/analytics/CardPrivacyPolicy'

function App() {
  const { sidebarCollapsed, isSettingsModalOpen, connectivity } =
    useContext(ContextProvider)
  const isOffline = connectivity.status !== 'online'
  const firstDestination = isOffline ? '/library' : '/hyperplaystore'

  return (
    <div className={classNames('App', { collapsed: sidebarCollapsed })}>
      <script
        async
        id="ze-snippet"
        src="https://static.zdassets.com/ekr/snippet.js?key=ec50f0e8-03ba-4809-80f1-a9a4ef5848fc"
      ></script>
      <HashRouter>
        <OfflineMessage />
        <TopNavBar />
        <Sidebar />
        <main className="content">
          <CardPrivacyPolicy />
          <QaAuthHandler />
          <NavigateListener />
          <ExtensionHandler />
          <ExtensionManager />
          <DialogHandler />
          <ExternalLinkDialog />
          <AuthModal />
          <EmailSubscriptionModal />
          <StoreNavHandler />
          {isSettingsModalOpen.gameInfo && (
            <SettingsModal
              gameInfo={isSettingsModalOpen.gameInfo}
              type={isSettingsModalOpen.type}
            />
          )}
          <Routes>
            <Route
              path="/"
              element={<Navigate replace to={firstDestination} />}
            />
            <Route path="/library" element={<Library />} />
            <Route
              path="/achievements"
              element={
                <AchievementsLayout>
                  <Outlet />
                </AchievementsLayout>
              }
            >
              <Route index element={<Achievements />} />
              <Route
                path="/achievements/:id"
                element={<GameAchievementDetails />}
              />
            </Route>
            <Route path="login" element={<Login />} />
            <Route
              path="hyperplaystore"
              element={<WebView key="hyperplaystore" />}
            />
            <Route path="epicstore" element={<WebView key="epicstore" />} />
            <Route path="gogstore" element={<WebView key="gogstore" />} />
            <Route path="docs" element={<WebView key="docs" />} />
            <Route path="metamaskHome" element={<MetaMaskHome />} />
            <Route
              path="metamaskSnaps"
              element={<WebView key="metamaskSnaps" />}
            />
            <Route path="game7Portal" element={<G7Webview />} />
            <Route path="metamaskPortfolio" element={<MetaMaskPortfolio />}>
              <Route path=":page" element={<MetaMaskPortfolio />} />
            </Route>
            <Route path="/gamepage">
              <Route path=":runner">
                <Route path=":appName" element={<GamePage />} />
              </Route>
            </Route>
            <Route path="/store-page" element={<WebView key="store-page" />} />
            <Route path="loginweb">
              <Route path=":runner" element={<WebView key="loginweb" />} />
            </Route>
            <Route path="settings">
              <Route path=":runner">
                <Route path=":appName">
                  <Route path=":type" element={<Settings />} />
                </Route>
              </Route>
            </Route>
            <Route path="/download-manager" element={<DownloadManager />} />
            <Route path="/quests" element={<QuestsPage />}>
              <Route path=":questId" element={<QuestsPage />} />
            </Route>
          </Routes>
        </main>
        <div className="controller">
          <ControllerHints />
          <div className="simple-keyboard"></div>
        </div>
        <OnboardingStoreController />
        {onboardingStore.isOnboardingOpen && (
          <Onboarding
            disableOnboarding={(disableReason: WalletOnboardCloseReason) => {
              if (disableReason === 'skipped') {
                window.api.trackEvent({ event: 'Onboarding Skipped' })
              }
              onboardingStore.closeOnboarding()
            }}
          />
        )}
      </HashRouter>
      <TransactionNotification />
      <DownloadToastManager />
      <DeviceStateController />
      <UpdateModalController />
    </div>
  )
}

export default observer(App)
