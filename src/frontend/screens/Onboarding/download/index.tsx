import React, { useEffect, useState } from 'react'
import { OnboardingModalConfig } from '../types'
import './index.css'
import { toString, QRCodeToStringOptions } from 'qrcode'

interface DownloadProps {
  setOnboardingModalParams: React.Dispatch<Partial<OnboardingModalConfig>>
  disableOnboarding: () => void
  onRetryClick: () => void
}

const Download: React.FC<DownloadProps> = function (props) {
  useEffect(() => {
    props.setOnboardingModalParams({
      title: 'DOWNLOAD METAMASK MOBILE',
      enableBackButton: true,
      enableCloseButton: true
    })
    generateQrCode()
  }, [])

  const options: QRCodeToStringOptions = {
    type: 'svg',
    color: { light: '#121212', dark: '#ffffffff' }
  }
  const [qrUrl, setQrUrl] = useState('')
  async function generateQrCode() {
    const qrCodeSvg = await toString(
      'https://metamask.app.link/skAH3BaF99',
      options
    )
    const blob = new Blob([qrCodeSvg], { type: 'image/svg+xml' })
    setQrUrl(URL.createObjectURL(blob))
  }

  return (
    <div>
      <p>
        Web3 games use a crypto wallet to approve in-game transactions. Download
        MetaMask to get started.
      </p>
      <div className="borderWrap">
        <div className="qrCodeContainer">
          <img src={qrUrl} className="qrCodeImage"></img>
        </div>
      </div>
      <p>Scan QR code or visit metamask.io to create a wallet</p>
      <div className="actionButtonsContainer">
        <button
          onClick={() => props.disableOnboarding()}
          className="downloadCancelButton"
        >
          CANCEL
        </button>
        <button
          onClick={() => props.onRetryClick()}
          className="downloadConnectButton"
        >
          CONNECT
        </button>
      </div>
    </div>
  )
}

export default Download
