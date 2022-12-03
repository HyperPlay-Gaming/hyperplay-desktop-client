export const create = function () {
  console.log('windows create called')
}

export const update = function () {
  console.log('windows update called')
}

export const getLastFocused = function () {
  console.log('windows getLastFocused called')
}

export const getCurrent = function () {
  console.log('windows getCurrent called')
}

export const remove = function () {
  console.log('windows remove called')
}

export const onRemoved = {
  addListener: (listener: (windowId: number) => void) => {
    console.log('windows onRemoved addListener')
  },
  removeListener: (listener: (windowId: number) => void) => {
    console.log('windows onRemoved removeListener')
  }
}

export const getAll = function (
  queryOptions: chrome.windows.QueryOptions,
  callback: (windows: chrome.windows.Window[]) => void
) {
  const window: chrome.windows.Window = {
    focused: true,
    alwaysOnTop: true,
    incognito: false
  }
  if (callback) {
    const windowsReturn = [window]
    callback(windowsReturn)
  }
}
