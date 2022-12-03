import React, { useContext, useState } from 'react'

import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
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

function App() {
  const { sidebarCollapsed } = useContext(ContextProvider)

  const [onboardingEnabled, setOnboardingEnabled] = useState(true)

  return (
    <div className={classNames('App', { collapsed: sidebarCollapsed })}>
      <HashRouter>
        <OfflineMessage />
        <Sidebar openOnboarding={() => setOnboardingEnabled(true)} />
        <main className="content">
          <ExtensionHandler />
          <DialogHandler />
          <Routes>
            <Route path="/" element={<Library />} />
            <Route path="login" element={<Login />} />
            <Route path="epicstore" element={<WebView />} />
            <Route path="gogstore" element={<WebView />} />
            <Route path="wiki" element={<WebView />} />
            <Route path="gamepage">
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
      {onboardingEnabled && (
        <Onboarding disableOnboarding={() => setOnboardingEnabled(false)} />
      )}
    </div>
  )
}

export default App
