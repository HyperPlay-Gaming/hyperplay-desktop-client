import React from 'react'

import { ContextType } from 'frontend/types'
import { MetricsOptInStatus } from 'common/types'

const initialContext: ContextType = {
  epic: {
    login: async () => Promise.resolve(''),
    logout: async () => Promise.resolve()
  },
  gog: {
    login: async () => Promise.resolve(''),
    logout: async () => Promise.resolve()
  },
  amazon: {
    getLoginData: async () =>
      Promise.resolve({
        client_id: '',
        code_verifier: '',
        serial: '',
        url: ''
      }),
    login: async () => Promise.resolve(''),
    logout: async () => Promise.resolve()
  },
  error: false,
  handleLayout: () => null,
  layout: 'grid',
  libraryStatus: [],
  platform: 'unknown',
  refreshWineVersionInfo: async () => Promise.resolve(),
  isRTL: false,
  language: 'en',
  setLanguage: () => null,
  theme: 'default',
  setTheme: () => null,
  zoomPercent: 100,
  setZoomPercent: () => null,
  allTilesInColor: false,
  setAllTilesInColor: () => null,
  sidebarCollapsed: false,
  setSideBarCollapsed: () => null,
  activeController: '',
  connectivity: { status: 'online', retryIn: 0 },
  setPrimaryFontFamily: () => null,
  setSecondaryFontFamily: () => null,
  dialogModalOptions: { showDialog: false },
  showDialogModal: () => null,
  showResetDialog: () => null,
  externalLinkDialogOptions: { showDialog: false },
  handleExternalLinkDialog: () => null,
  isSettingsModalOpen: { value: false, type: 'settings' },
  setIsSettingsModalOpen: () => null,
  showMetaMaskBrowserSidebarLinks: false,
  setShowMetaMaskBrowserSidebarLinks: () => null,
  metricsOptInStatus: MetricsOptInStatus.undecided
}

export default React.createContext(initialContext)
