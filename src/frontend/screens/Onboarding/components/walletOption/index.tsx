import './index.css'
import React from 'react'

interface WalletOptionProps {
  title: string
  subtext: string
  icon: string
  onClick: () => void
}

const WalletOption: React.FC<WalletOptionProps> = function (props) {
  return (
    <button className="walletOption" onClick={() => props.onClick()}>
      <div className="optionContent">
        <div className="walletOptionIcon">
          <img className="walletOptionIcon" src={props.icon}></img>
        </div>
        <div className="walletOptionContent">
          <h3 className="walletOptionTitleText">{props.title}</h3>
          <p className="walletOptionSubtext">{props.subtext}</p>
        </div>
      </div>
      <img
        className="walletOptionArrow"
        src="/src/frontend/assets/hyperplay/forward_arrow.svg"
      ></img>
    </button>
  )
}

export default WalletOption
