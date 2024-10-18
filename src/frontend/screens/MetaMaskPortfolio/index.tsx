import React, { useRef } from 'react'
import MetaMaskPortfolioStyles from './index.module.scss'
import { useParams } from 'react-router-dom'

const MetaMaskPortfolio = function () {
  const trueAsStr = 'true' as unknown as boolean | undefined
  const { page = '' } = useParams() as { page: string }
  const webviewRef = useRef<HTMLWebViewElement>(null)

  return (
    <>
      <div className={MetaMaskPortfolioStyles.homeDiv}>
        <div className={MetaMaskPortfolioStyles.loader}></div>
        <webview
          className={MetaMaskPortfolioStyles.homeWebview}
          src={`https://portfolio.metamask.io/${page}`}
          allowpopups={trueAsStr}
          partition={'persist:InPageWindowEthereumExternalWallet'}
          ref={webviewRef}
        />
      </div>
    </>
  )
}

export default MetaMaskPortfolio
