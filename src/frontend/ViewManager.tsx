import React from 'react'
import App from './App'
import HyperplayOverlay from './HyperplayOverlay'

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
