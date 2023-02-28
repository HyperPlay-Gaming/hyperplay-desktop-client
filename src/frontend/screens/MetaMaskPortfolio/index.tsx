import React, { useContext, useEffect } from 'react'
import MetaMaskPortfolioStyles from './index.module.css'
import ContextProvider from 'frontend/state/ContextProvider'

const MetaMaskPortfolio = function () {
  const { setSideBarCollapsed, sidebarCollapsed } = useContext(ContextProvider)

  useEffect(() => {
    if (!sidebarCollapsed) {
      setSideBarCollapsed(true)
    }
    return () => {
      if (sidebarCollapsed) {
        setSideBarCollapsed(false)
      }
    }
  })

  return (
    <>
      <div className={MetaMaskPortfolioStyles.homeDiv}>
        <webview
          className={MetaMaskPortfolioStyles.homeWebview}
          src="https://portfolio.metamask.io/"
        />
      </div>
    </>
  )
}

export default MetaMaskPortfolio
