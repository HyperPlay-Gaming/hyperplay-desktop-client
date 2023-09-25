import React, { useRef } from 'react'
import { WebviewTag } from 'electron'
import styles from './index.module.scss'
import { ModalAnimation } from '@hyperplay/ui'

const url =
  'https://hyperplay-dev-git-feature-unified-auth-ui-valist.vercel.app/signin'

const Auth = () => {
  const webviewRef = useRef<WebviewTag>(null)
  return (
    <ModalAnimation isOpen={true} onClose={() => console.log('close')}>
      <webview
        ref={webviewRef}
        src={url}
        className={styles.webview}
        partition="persist:InPageWindowEthereumExternalWallet"
        allowpopups={'true' as unknown as boolean | undefined}
        useragent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Safari/605.1.15"
      />
    </ModalAnimation>
  )
}

export default Auth
