import React, { lazy } from 'react'
import BrowserGame from './browserGame'
import ExtensionOverlay from './overlay/ExtensionOverlay'
import ToastOverlay from './overlay/ToastOverlay'
const App = lazy(async () => import('./App'))

const Views = {
  App: <App />,
  HyperplayOverlay: <ExtensionOverlay />,
  ToastOverlay: <ToastOverlay />
}

type URLSearchParamsProxy = URLSearchParams & {
  view?: string
  browserUrl?: string
}

const ViewManager = function () {
  const params: URLSearchParamsProxy = new Proxy(
    new URLSearchParams(window.location.search),
    {
      get: (searchParams, prop) => {
        if (typeof prop === 'string') return searchParams.get(prop)
        return 'error prop type was symbol'
      }
    }
  )

  if (params.view === 'BrowserGame' && params.browserUrl !== undefined) {
    return <BrowserGame url={params.browserUrl} />
  }

  // if view doesn't match a key in Views Map, throw
  if (params.view !== undefined && !Object.hasOwn(Views, params.view))
    throw new Error("View '" + params.view + "' is undefined")

  const view = params.view !== undefined ? Views[params.view] : <></>
  return view
}

export default ViewManager
