import React, { useEffect } from 'react'
import { OnboardingModalConfig } from '../types'
import './index.css'

interface ScanProps {
  providerImg: string
  qrCodeSvg: string
  setOnboardingModalParams: React.Dispatch<Partial<OnboardingModalConfig>>
}

const Scan: React.FC<ScanProps> = function (props) {
  console.log('in scan props with ', props)
  const blob = new Blob([props.qrCodeSvg], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)

  useEffect(() => {
    props.setOnboardingModalParams({
      title: 'SCAN QR WITH METAMASK MOBILE',
      enableBackButton: true,
      enableCloseButton: true
    })
  }, [])

  return (
    <div>
      <div className="connectingDisplay">
        <img src={props.providerImg} className="providerImg"></img>
        <img
          src="/src/frontend/assets/hyperplay/hyperplay_logo.svg"
          className="providerImg"
        ></img>
      </div>
      <div className="qrCodeContainer">
        <img src={url}></img>
      </div>
      <p>
        Scan QR code with your mobile wallet. Approve connection request to sign
        in.
      </p>
      <button
        onClick={() => window.api.openHyperplaySite()}
        className="scanLearnMoreButton"
      >
        Learn more
      </button>
    </div>
  )
}

export default Scan
