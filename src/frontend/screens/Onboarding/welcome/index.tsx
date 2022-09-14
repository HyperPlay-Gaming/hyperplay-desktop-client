import React from 'react'
import WalletOption from '../components/walletOption'
import { PROVIDERS } from 'common/types/proxy-types'
import './index.css'

interface WelcomeProps {
  handleProviderClicked: (provider: PROVIDERS) => void
  disableOnboarding: () => void
}

const Welcome: React.FC<WelcomeProps> = function (props) {
  return (
    <div>
      <h5>
        Please connect your wallet, or download the Metamask mobile-app to get
        started.
      </h5>
      <WalletOption
        title="MetaMask Mobile"
        subtext="Connect with MetaMask Mobile"
        icon="/src/frontend/assets/hyperplay/metamask_icon_md.avif"
        onClick={() => props.handleProviderClicked(PROVIDERS.METAMASK_MOBILE)}
      />
      <WalletOption
        title="WalletConnect"
        subtext="Connect with WalletConnect"
        icon="/src/frontend/assets/hyperplay/walletconnect_icon_blue.svg"
        onClick={() => props.handleProviderClicked(PROVIDERS.WALLET_CONNECT)}
      />
      <button
        className="actionButton"
        onClick={() => props.disableOnboarding()}
      >
        Skip for Now
      </button>
    </div>
  )
}

export default Welcome
