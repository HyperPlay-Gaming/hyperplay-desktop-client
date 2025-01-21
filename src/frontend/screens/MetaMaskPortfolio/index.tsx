import React, { useEffect, useRef } from 'react'
import MetaMaskPortfolioStyles from './index.module.scss'
import { useParams } from 'react-router-dom'
import { getMetaMaskPortfolioPageUrl } from 'common/constants'
import { DidNavigateInPageEvent, WebviewTag } from 'electron'

const MetaMaskPortfolio = function () {
  const trueAsStr = 'true' as unknown as boolean | undefined
  const { page = '' } = useParams() as { page: string }
  const webviewRef = useRef<WebviewTag>(null)

  useEffect(() => {
    const handleNavigation = (e: DidNavigateInPageEvent) => {
      const url = new URL(e.url)
      window.api.trackScreen('MetaMask Portfolio', {
        pathname: url.pathname
      })
    }
    webviewRef.current?.addEventListener(
      'did-navigate-in-page',
      handleNavigation
    )
    return () => {
      webviewRef.current?.removeEventListener(
        'did-navigate-in-page',
        handleNavigation
      )
    }
  }, [webviewRef])

  return (
    <>
      <div className={MetaMaskPortfolioStyles.homeDiv}>
        <div className={MetaMaskPortfolioStyles.loader}></div>
        <webview
          className={MetaMaskPortfolioStyles.homeWebview}
          src={getMetaMaskPortfolioPageUrl(page)}
          allowpopups={trueAsStr}
          partition={'persist:InPageWindowEthereumExternalWallet'}
          ref={webviewRef}
          key={'metamask_portfolio' + page}
        />
      </div>
    </>
  )
}

export default MetaMaskPortfolio
