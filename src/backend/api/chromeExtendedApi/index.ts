// this will export chrome api functions that electron does not already define
// this will only be injected into BrowserViews loading chrome extension paths
// the chrome api methods defined by electron are documented here:
// https://www.electronjs.org/docs/latest/api/extensions

import * as Actions from './action'

export default {
  action: Actions
}
