import React, { useEffect } from 'react'
import WalletOption from '../components/walletOption'
import { PROVIDERS } from 'common/types/proxy-types'
import './index.css'
import { OnboardingModalConfig } from '../types'

interface WelcomeProps {
  handleProviderClicked: (provider: PROVIDERS) => void
  disableOnboarding: () => void
  setOnboardingModalParams: React.Dispatch<Partial<OnboardingModalConfig>>
  downloadMetaMaskClicked: () => void
}

const Welcome: React.FC<WelcomeProps> = function (props) {
  useEffect(() => {
    props.setOnboardingModalParams({
      title: 'WELCOME TO HYPERPLAY',
      enableBackButton: false,
      enableCloseButton: true
    })
  }, [])
  return (
    <div>
      <h5>
        Please connect your wallet, or download the Metamask mobile-app to get
        started.
      </h5>
      <WalletOption
        title="MetaMask Mobile"
        subtext="Connect with MetaMask Mobile"
        icon="/src/frontend/assets/hyperplay/mm_icon_md_transparent.svg"
        onClick={() => props.handleProviderClicked(PROVIDERS.METAMASK_MOBILE)}
      />
      <WalletOption
        title="WalletConnect"
        subtext="Connect with WalletConnect"
        icon="/src/frontend/assets/hyperplay/walletconnect_icon_blue.svg"
        onClick={() => props.handleProviderClicked(PROVIDERS.WALLET_CONNECT)}
      />
      <WalletOption
        title="Create new wallet"
        subtext="Download MetaMask Mobile"
        icon="/src/frontend/assets/hyperplay/plus.svg"
        onClick={() => props.downloadMetaMaskClicked()}
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
