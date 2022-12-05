export const query = function (
  queryInfo: any,
  callback?: (tabs: chrome.tabs.Tab[]) => void
) {
  console.log(
    'called tabs query with queryInfo = ',
    JSON.stringify(queryInfo, null, 4)
  )
  const tab: chrome.tabs.Tab = {
    index: 0,
    pinned: false,
    highlighted: false,
    windowId: 0,
    active: true,
    incognito: false,
    discarded: false,
    autoDiscardable: false,
    groupId: 0,
    selected: true,
    id: 2,
    title: 'TestTab',
    url: 'http://localhost:5173'
  }
  const tabs = [tab]
  if (callback) callback(tabs)
}

export const remove = function (tabIds: number | number[], callback?: any) {
  console.log('called tabs remove')
}

// tab id is optional in chrome docs but is included in all metamask calls
// so we make it required
export const update = function (
  tabId: number,
  updateProperties: any,
  callback?: any
) {
  console.log('called tabs update')
}

export const create = async function (options: chrome.tabs.CreateProperties) {
  console.log(
    'chrome tabs create called with options = ',
    JSON.stringify(options, null, 4)
  )
  const tab: chrome.tabs.Tab = {
    index: 0,
    pinned: false,
    highlighted: false,
    windowId: 0,
    active: true,
    incognito: false,
    discarded: false,
    autoDiscardable: false,
    groupId: 0,
    selected: true
  }
  return tab
}
