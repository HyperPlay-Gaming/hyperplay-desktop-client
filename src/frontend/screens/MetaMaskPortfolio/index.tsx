import React, { useContext, useEffect } from 'react'
import MetaMaskPortfolioStyles from './index.module.css'
import ContextProvider from 'frontend/state/ContextProvider'

const MetaMaskPortfolio = function () {
  const { setSideBarCollapsed, sidebarCollapsed } = useContext(ContextProvider)
  const trueAsStr = 'true' as unknown as boolean | undefined

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
          allowpopups={trueAsStr}
        />
      </div>
    </>
  )
}

export default MetaMaskPortfolio
