import React, { useEffect, useState } from 'react'
import MetaMaskHomeStyles from './index.module.css'

const MetaMaskHome = function () {
  const [extId, setExtId] = useState('')

  useEffect(() => {
    window.api.getExtensionId().then((id) => setExtId(id))
  }, [])

  return (
    <>
      <div className={MetaMaskHomeStyles.homeDiv}>
        <webview
          className={MetaMaskHomeStyles.homeWebview}
          src={`chrome-extension://${extId}/home.html`}
        />
      </div>
    </>
  )
}

export default MetaMaskHome
