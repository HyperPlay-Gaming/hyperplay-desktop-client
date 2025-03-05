import { logInfo } from 'backend/logger/logger'

function isCallFromExtractZipService() {
  const stack = Object.values(require.cache)
  return stack.some((val) => {
    if (val?.filename?.includes('ExtractZipService')) {
      logInfo(
        `XXXXXXXXXX \n \n calling module filename \n \n XXXXXXXXXXXXXXXXXXX ', ${val?.filename}`
      )
      return true
    }
    return false
  })
}

// Create a proxy to intercept global property access
globalThis.process = new Proxy(global.process, {
  get(target, prop, receiver) {
    logInfo(
      `XXXXXXXXXX \n \n calling global process \n \n XXXXXXXXXXXXXXXXXXXXXXXXX ', ${prop.toString()}`
    )
    if (isCallFromExtractZipService() && prop === 'noAsar') {
      return true
    }
    return Reflect.get(target, prop, receiver)
  }
})
