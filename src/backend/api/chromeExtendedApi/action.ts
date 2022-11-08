// this file exports chrome api action methods
// documented here: https://developer.chrome.com/docs/extensions/reference/action/

import { ipcRenderer } from 'electron'

export const getPopup = function () {
  console.log('get popup called in api')
}

export const setPopup = function () {
  console.log('get popup called in api')
}

export const enable = function () {
  console.log('enable action called')
}

export const disable = function () {
  console.log('enable action called')
}
