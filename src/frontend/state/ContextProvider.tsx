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
  error: false,
  gameUpdates: [],
  handleLayout: () => null,
  handleSearch: () => null,
  layout: 'grid',
  libraryStatus: [],
  libraryTopSection: 'disabled',
  handleLibraryTopSection: () => null,
  platform: 'unknown',
  refresh: async () => Promise.resolve(),
  refreshLibrary: async () => Promise.resolve(),
  refreshWineVersionInfo: async () => Promise.resolve(),
  refreshing: false,
  refreshingInTheBackground: true,
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
