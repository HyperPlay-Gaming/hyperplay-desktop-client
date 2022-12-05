import chromeExtendedApi from './chromeExtendedApi'

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

Object.freeze(chrome)
