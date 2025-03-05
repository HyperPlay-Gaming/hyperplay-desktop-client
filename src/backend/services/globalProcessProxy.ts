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

export function init() {
  // Create a proxy to intercept global property access
  // @ts-expect-error fix later
  global.process_old = global.process
  // @ts-expect-error fix later
  global.process = new Proxy(global.process_old, {
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
}
