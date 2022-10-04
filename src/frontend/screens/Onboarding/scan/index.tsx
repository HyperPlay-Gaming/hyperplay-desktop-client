import React, { useEffect } from 'react'
import QrCodeGradientBorder from '../components/qrCodeGradientBorder'
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
      <div className="content-sm text-secondary">
        Scan QR code with your mobile wallet, and approve the connection request
        to sign in.
      </div>
      <div className="connectingDisplay">
        <img
          src={props.providerImg}
          className="providerImg connectingFrom"
        ></img>
        <img
          src="/src/frontend/assets/hyperplay/hyperplay_logo.svg"
          className="providerImg connectingTo"
        ></img>
      </div>
      <QrCodeGradientBorder qrUrl={url} imageMargin="-14px" />
      <button
        onClick={() => window.api.openHyperplaySite()}
        className="scanLearnMoreButton button-sm"
      >
        Learn more
      </button>
    </div>
  )
}

export default Scan
