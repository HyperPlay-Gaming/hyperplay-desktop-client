import React, { lazy } from 'react'
import ExtensionOverlay from './overlay/ExtensionOverlay'
import BrowserGame from './browserGame'
const App = lazy(async () => import('./App'))

const Views = {
  App: <App />,
  HyperplayOverlay: <ExtensionOverlay />
}

const ViewManager = function () {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => {
      if (typeof prop === 'string') return searchParams.get(prop)
      return 'error prop type was symbol'
    }
  })

  if (params.view === 'BrowserGame') {
    return (
      <BrowserGame
        url={params.browserUrl}
        provider={params.connectedProvider}
      />
    )
  }
  const view = Views[params.view]
  if (view === null) throw new Error("View '" + params.view + "' is undefined")

  return view
}

export default ViewManager
