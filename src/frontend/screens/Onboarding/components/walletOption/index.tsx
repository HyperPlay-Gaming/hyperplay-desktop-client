import './index.css'
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
    <button className="walletOption" onClick={() => props.onClick()}>
      <div className="optionContent">
        <div className="walletOptionIcon">{props.icon}</div>
        <div className="walletOptionContent">
          <div className="hp-subtitle walletOptionTitleText">
            {props.title} {props.isRecommended && <span>(Recommended)</span>}
          </div>
          <div className="content-sm walletOptionSubtext">{props.subtext}</div>
        </div>
      </div>
      <ForwardArrow className="walletOptionArrow" />
    </button>
  )
}

export default WalletOption
