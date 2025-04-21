import React from 'react'
import { Images, IconsStack } from '@hyperplay/ui'
import styles from './index.module.scss'

const walletIcons = [
  <Images.MetaMaskWallet key={'metamaskwallet'} />,
  <Images.RoninWallet key="roninwallet" />,
  <Images.TrustWallet key="trustwallet" />,
  <Images.PhantomWallet key="phantomwallet" />,
  <Images.OKXWallet key="okxwallet" />,
  <Images.SequenceWallet key="sequencewallet" />,
  <Images.CoinbaseWallet key="coinbasewallet" />
]

export default function WalletConnectIconsStack() {
  return (
    <IconsStack
      icons={walletIcons}
      forceShowMore
      className={styles.walletConnectIconsStack}
    />
  )
}
