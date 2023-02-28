import React, { useEffect, useState } from 'react'
import BrowserGameStyles from './index.module.scss'
import BrowserExtensionManager from './BrowserExtensionManager'
import BrowserToastManager from './BrowserToastManager'
import { PROVIDERS } from 'common/types/proxy-types'
import BrowserExtensionToastManager from './BrowserExtensionToastManager'

interface BrowserGameProps {
  url: string
}

const BrowserGame = function ({ url }: BrowserGameProps) {
  const [provider, setProvider] = useState('')

  useEffect(() => {
    window.api.getConnectedProvider().then((val) => setProvider(val))
  }, [])

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const trueAsStr = 'true' as any
  /* eslint-disable react/no-unknown-property */
  return (
    <div>
      <BrowserExtensionManager />
      <BrowserToastManager showCloseButton={true} />
      <BrowserExtensionToastManager showCloseButton={true} />
      {provider !== '' ? (
        <webview
          src={url}
          className={BrowserGameStyles.browserGame}
          partition={
            provider !== PROVIDERS.METAMASK_EXTENSION
              ? 'persist:InPageWindowEthereumExternalWallet'
              : undefined
          }
          webpreferences="contextIsolation=true"
          // setting = to {true} does not work :(
          allowpopups={trueAsStr}
        />
      ) : null}
    </div>
  )
}

export default BrowserGame
