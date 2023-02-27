import React from 'react'
import { t } from 'i18next'
import QrCodeGradientBorder from '../../../components/qrCodeGradientBorder'

interface ScanScreenProps {
  qrCodeSvg: string
}

const ScanScreen = (props: ScanScreenProps) => {
  const blob = new Blob([props.qrCodeSvg], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)

  return (
    <>
      <div className="title">
        {t(
          'hyperplay.onboarding.walletSelection.screens.scan.title',
          `Scan QR with Metamask Mobile`
        )}
      </div>
      <div className="body">
        {t(
          'hyperplay.onboarding.walletSelection.screens.scan.details',
          `Create an encrypted communication channel. Your keys will never be shared with HyperPlay.`
        )}
      </div>
      <QrCodeGradientBorder qrUrl={url} imageMargin="-14px" />
      <div className="body-sm">
        {t(
          'hyperplay.onboarding.walletSelection.screens.scan.dontHaveWallet',
          `Don’t have a wallet?`
        )}{' '}
        <span>
          {t(
            'hyperplay.onboarding.walletSelection.screens.scan.getMetamask',
            `Get MetaMask`
          )}
        </span>
      </div>
    </>
  )
}

export default ScanScreen
