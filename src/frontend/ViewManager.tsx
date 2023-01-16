import React, { lazy } from 'react'
import HyperplayOverlay from './HyperplayOverlay'
const App = lazy(async () => import('./App'))

const Views = {
  App: <App />,
  HyperplayOverlay: <HyperplayOverlay />
}

const ViewManager = function () {
  const name = window.location.search.substring(1)
  const view = Views[name]
  if (view === null) throw new Error("View '" + name + "' is undefined")

  return view
}

export default ViewManager
