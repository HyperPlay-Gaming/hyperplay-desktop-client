import React, { useEffect, useState } from 'react'
import MetaMaskHomeStyles from './index.module.css'

interface MetaMaskHomeProps {
  path?: string
}

const MetaMaskHome = function ({ path = 'home.html' }: MetaMaskHomeProps) {
  const [extId, setExtId] = useState('')
  const hash = new URL(window.location.href).hash

  useEffect(() => {
    window.api.getExtensionId().then((id) => setExtId(id))
  }, [])
  const trueAsStr = 'true' as unknown as boolean | undefined

  return (
    <>
      <div className={MetaMaskHomeStyles.homeDiv}>
        <webview
          className={MetaMaskHomeStyles.homeWebview}
          src={`chrome-extension://${extId}/${path}${hash.replace(
            '#/metamaskHome',
            ''
          )}`}
          allowpopups={trueAsStr}
        />
      </div>
    </>
  )
}

export default MetaMaskHome
