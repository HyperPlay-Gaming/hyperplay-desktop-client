import React from 'react'
import MetaMaskHomeStyles from './index.module.css'

const MetaMaskHome = function () {
  return (
    <>
      <div className={MetaMaskHomeStyles.homeDiv}>
        <webview
          className={MetaMaskHomeStyles.homeWebview}
          src="chrome-extension://cknhebdapckpgogkjbicdbknhalpcekh/home.html"
        />
      </div>
    </>
  )
}

export default MetaMaskHome
