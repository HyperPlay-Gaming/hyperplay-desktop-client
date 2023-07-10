import React, { lazy } from 'react'
import OverlayManager from './OverlayManager'
import { Runner } from 'common/types'
const App = lazy(async () => import('./App'))

const Views = {
  App: <App />
}

type URLSearchParamsProxy = URLSearchParams & {
  view?: string
  browserUrl?: string
  appName?: string
  runner?: Runner
  showToasts?: string
  showExtension?: string
  showBrowserGame?: string
  showExitButton?: string
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

  if (
    params.view === 'BrowserGame' &&
    params.browserUrl !== undefined &&
    params.appName !== undefined &&
    params.runner !== undefined
  ) {
    const parseShowParam = (showParam: string | undefined) =>
      showParam !== undefined && showParam === 'false' ? false : true

    // default to true if not supplied
    const renderState = {
      showToasts: parseShowParam(params.showToasts),
      showExtension: parseShowParam(params.showExtension),
      showBrowserGame: parseShowParam(params.showBrowserGame),
      showExitButton: parseShowParam(params.showExitButton)
    }
    return (
      <OverlayManager
        url={params.browserUrl}
        appName={params.appName}
        runner={params.runner}
        renderState={renderState}
      />
    )
  }

  // if view doesn't match a key in Views Map, throw
  if (params.view !== undefined && !Object.hasOwn(Views, params.view))
    throw new Error("View '" + params.view + "' is undefined")

  const view = params.view !== undefined ? Views[params.view] : <></>
  return view
}

export default ViewManager
