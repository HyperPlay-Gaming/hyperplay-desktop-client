import React, { lazy } from 'react'
import ExtensionOverlay from './overlay/ExtensionOverlay'
const App = lazy(async () => import('./App'))

const Views = {
  App: <App />,
  HyperplayOverlay: <ExtensionOverlay />
}

const ViewManager = function () {
  const name = window.location.search.substring(1)
  const view = Views[name]
  if (view === null) throw new Error("View '" + name + "' is undefined")

  return view
}

export default ViewManager
