import React, { useEffect, useRef, useState } from 'react'
import MetaMaskPortfolioStyles from './index.module.scss'
import { useParams } from 'react-router-dom'
import classNames from 'classnames'

const MetaMaskPortfolio = function () {
  const trueAsStr = 'true' as unknown as boolean | undefined
  const { page = '' } = useParams() as { page: string }
  const [loaded, setLoaded] = useState(false)
  const webviewRef = useRef<HTMLWebViewElement>(null)

  let content = null
  if (!loaded) {
    content = <div className={MetaMaskPortfolioStyles.loader}></div>
  }

  const webviewClassnames: Record<string, boolean> = {}
  webviewClassnames[MetaMaskPortfolioStyles.hide] = !loaded

  useEffect(() => {
    webviewRef.current?.addEventListener('did-finish-load', () => {
      setLoaded(true)
    })
  }, [])

  return (
    <>
      <div className={MetaMaskPortfolioStyles.homeDiv}>
        {content}
        <webview
          className={classNames(
            MetaMaskPortfolioStyles.homeWebview,
            webviewClassnames
          )}
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
