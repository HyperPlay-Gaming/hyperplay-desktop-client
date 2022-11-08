import { contextBridge } from 'electron'
import api from './api'
import chromeExtendedApi from './api/chromeExtendedApi'

contextBridge.exposeInMainWorld('api', api)

// Only load within extension page context
if (location.href.startsWith('chrome-extension://')) {
  contextBridge.exposeInMainWorld('chrome', chromeExtendedApi)

  Object.keys(chromeExtendedApi).forEach((key) => {
    const baseApi = window.chrome[key]
    Object.defineProperty(window.chrome, key, {
      value: {
        ...baseApi,
        ...chromeExtendedApi[key]
      },
      enumerable: true,
      configurable: true
    })
  })
}
