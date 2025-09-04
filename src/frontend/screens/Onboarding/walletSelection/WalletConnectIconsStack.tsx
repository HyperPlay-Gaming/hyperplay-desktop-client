import React from 'react'
import { Images, IconsStack } from '@hyperplay/ui'
import styles from './index.module.scss'

const SequenceIcon = () => (
  <span className={styles.sequenceIcon}>
    <Images.SequenceWallet key="sequencewallet" />
  </span>
)

const walletIcons = [
  {
    title: 'MetaMask Wallet',
    icon: <Images.MetaMaskWallet key={'metamaskwallet'} />
  },
  { title: 'Ronin Wallet', icon: <Images.RoninWallet key={'roninwallet'} /> },
  { title: 'Trust Wallet', icon: <Images.TrustWallet key={'trustwallet'} /> },
  // {
  //   title: 'Phantom Wallet',
  //   icon: <Images.PhantomWallet key={'phantomwallet'} />
  // },
  { title: 'OKX Wallet', icon: <Images.OKXWallet key={'okxwallet'} /> },
  { title: 'Sequence Wallet', icon: <SequenceIcon /> },
  {
    title: 'Coinbase Wallet',
    icon: <Images.CoinBaseWallet key={'coinbasewallet'} />
  }
]

export default function WalletConnectIconsStack() {
  return <IconsStack icons={walletIcons} forceShowMore />
}
