import React from 'react'
import BrowserGameStyles from './index.module.scss'
import BrowserExtensionManager from './BrowserExtensionManager'
import BrowserToastManager from './BrowserToastManager'
import { PROVIDERS } from 'common/types/proxy-types'
import BrowserExtensionToastManager from './BrowserExtensionToastManager'

interface BrowserGameProps {
  url: string
  provider: PROVIDERS
}

const BrowserGame = function ({ url, provider }: BrowserGameProps) {
  /* eslint-disable react/no-unknown-property */
  return (
    <div>
      <BrowserExtensionManager />
      <BrowserToastManager />
      <BrowserExtensionToastManager />
      <webview
        src={url}
        className={BrowserGameStyles.browserGame}
        partition={
          provider !== PROVIDERS.METAMASK_EXTENSION
            ? 'persist:InPageWindowEthereumExternalWallet'
            : undefined
        }
        webpreferences="contextIsolation=true"
      />
    </div>
  )
}

export default BrowserGame
