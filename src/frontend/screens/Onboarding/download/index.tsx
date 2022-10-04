import React, { useEffect, useState } from 'react'
import { OnboardingModalConfig } from '../types'
import './index.scss'
import { toString, QRCodeToStringOptions } from 'qrcode'
import QrCodeGradientBorder from '../components/qrCodeGradientBorder'
import YesNoActionButtons from '../components/yesNoActionButtons'

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
      <div className="content-sm text-secondary downloadDescription">
        Web3 games use a crypto wallet to approve in-game transactions. Download
        MetaMask to get started.
      </div>
      <QrCodeGradientBorder qrUrl={qrUrl} imageMargin="-28px" />
      <div className="content-sm text-secondary downloadScanMessage">
        Scan QR code or visit metamask.io to create a wallet
      </div>
      <YesNoActionButtons
        yesText="CONNECT"
        noText="CANCEL"
        onYes={props.onRetryClick}
        onNo={props.disableOnboarding}
      />
    </div>
  )
}

export default Download
