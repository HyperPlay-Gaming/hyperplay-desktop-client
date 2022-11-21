// this will export chrome api functions that electron does not already define
// this will only be injected into BrowserViews loading chrome extension paths
// the chrome api features defined by electron are documented here:
// https://www.electronjs.org/docs/latest/api/extensions

import * as Actions from './action'
import * as Alarms from './alarms'
import * as Scripting from './scripting'
import * as Tabs from './tabs'
// import * as I18n from './i18n'
import * as BrowserAction from './browserAction'
import * as Storage from './storage'
import * as Windows from './windows'
import * as Notifications from './notifications'

// chrome.runtime already supports all features neccessary for metamask
// chrome.webRequest already supports all features
export default {
  action: Actions
  // alarms: Alarms,
  // scripting: Scripting,
  // tabs: Tabs,
  // browserAction: BrowserAction,
  // storage: Storage,
  // windows: Windows,
  // notifications: Notifications
}
