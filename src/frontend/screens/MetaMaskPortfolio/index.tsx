import React from 'react'
import MetaMaskPortfolioStyles from './index.module.css'

const MetaMaskPortfolio = function () {
  const trueAsStr = 'true' as unknown as boolean | undefined

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
