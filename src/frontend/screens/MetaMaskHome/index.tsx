import React, { useEffect, useState } from 'react'
import MetaMaskHomeStyles from './index.module.css'

interface MetaMaskHomeProps {
  path?: string
}

const MetaMaskHome = function ({ path = 'home.html' }: MetaMaskHomeProps) {
  const [extId, setExtId] = useState('')

  useEffect(() => {
    window.api.getExtensionId().then((id) => setExtId(id))
  }, [])

  return (
    <>
      <div className={MetaMaskHomeStyles.homeDiv}>
        <webview
          className={MetaMaskHomeStyles.homeWebview}
          src={`chrome-extension://${extId}/${path}`}
        />
      </div>
    </>
  )
}

export default MetaMaskHome
