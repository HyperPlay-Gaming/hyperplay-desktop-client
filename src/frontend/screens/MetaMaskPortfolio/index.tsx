import React from 'react'
import MetaMaskPortfolioStyles from './index.module.css'

const MetaMaskPortfolio = function () {
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
