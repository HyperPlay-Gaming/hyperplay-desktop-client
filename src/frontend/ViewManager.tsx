import React, { lazy } from 'react'
import OverlayManager from './OverlayManager'
import { Runner } from 'common/types'
const App = lazy(async () => import('./App'))

const Views = {
  App: <App />
}

type URLSearchParamsProxy = URLSearchParams & {
  view?: string
  appName?: string
  runner?: Runner
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

  if (params.view === 'BrowserGame' && params.appName && params.runner) {
    return (
      <OverlayManager appName={params.appName ?? ''} runner={params.runner} />
    )
  }

  // if view doesn't match a key in Views Map, throw
  if (params.view !== undefined && !Object.hasOwn(Views, params.view))
    throw new Error("View '" + params.view + "' is undefined")

  const view = params.view !== undefined ? Views[params.view] : <></>
  return view
}

export default ViewManager
