// import { contextBridge } from 'electron'
import chromeExtendedApi from '../api/chromeExtendedApi'

// Only load within extension page context
// contextBridge.exposeInMainWorld('chrome', chromeExtendedApi)

Object.keys(chromeExtendedApi).forEach((key) => {
  console.log('binding for ', key)
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
