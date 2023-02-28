import WalletOptionStyles from './index.module.scss'
import React from 'react'
import { ForwardArrow } from 'frontend/assets/hyperplay'

interface WalletOptionProps {
  title: string
  subtext: string
  icon: React.ReactNode
  onClick: () => void
  isRecommended: boolean
}

const WalletOption: React.FC<WalletOptionProps> = function (props) {
  return (
    <button
      className={WalletOptionStyles.walletOption}
      onClick={() => props.onClick()}
    >
      <div className={WalletOptionStyles.optionContent}>
        <div className={WalletOptionStyles.walletOptionIcon}>{props.icon}</div>
        <div className={WalletOptionStyles.walletOptionContent}>
          <div className={`menu ${WalletOptionStyles.walletOptionTitleText}`}>
            {props.title} {props.isRecommended && <span>(Recommended)</span>}
          </div>
          <div className={`caption ${WalletOptionStyles.walletOptionSubtext}`}>
            {props.subtext}
          </div>
        </div>
      </div>
      <div className={WalletOptionStyles.arrowContainer}>
        <ForwardArrow className={WalletOptionStyles.walletOptionArrow} />
      </div>
    </button>
  )
}

export default WalletOption
