import React from 'react'
import MetaMaskPortfolioStyles from './index.module.css'
import { useParams } from 'react-router-dom'

const MetaMaskPortfolio = function () {
  const trueAsStr = 'true' as unknown as boolean | undefined
  const { page = '' } = useParams() as { page: string }

  return (
    <>
      <div className={MetaMaskPortfolioStyles.homeDiv}>
        <webview
          className={MetaMaskPortfolioStyles.homeWebview}
          src={`https://portfolio.metamask.io/${page}`}
          allowpopups={trueAsStr}
        />
      </div>
    </>
  )
}

export default MetaMaskPortfolio
