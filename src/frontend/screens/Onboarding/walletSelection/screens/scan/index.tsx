import React from 'react'
import { t } from 'i18next'
import QrCodeGradientBorder from '../../../components/qrCodeGradientBorder'
import ScanScreenStyles from './index.module.scss'
import { WarningIcon } from 'frontend/assets/hyperplay'
import { Button } from '@hyperplay/ui'
import walletStore from 'frontend/store/WalletStore'
import { observer } from 'mobx-react-lite'

interface ScanScreenProps {
  qrCodeSvg: string
  providerName: string
}

const ScanScreen = (props: ScanScreenProps) => {
  const blob = new Blob([props.qrCodeSvg], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const oneTimePasscode = walletStore.otp

  return (
    <>
      <div className={`title ${ScanScreenStyles.title}`}>
        {t(
          'hyperplay.onboarding.walletSelection.screens.scan.title',
          `Scan QR with `
        )}
        {props.providerName}
      </div>
      <div className={`body ${ScanScreenStyles.caption}`}>
        {t(
          'hyperplay.onboarding.walletSelection.screens.scan.details',
          `Create an encrypted communication channel. Your keys will never be shared with HyperPlay.`
        )}
      </div>
      <QrCodeGradientBorder qrUrl={url} imageMargin="-14px" />
      <div className={`body-sm ${ScanScreenStyles.getWalletText}`}>
        {t(
          'hyperplay.onboarding.walletSelection.screens.scan.dontHaveWallet',
          `Don’t have a wallet?`
        )}{' '}
        <a
          onClick={() =>
            window.api.openExternalUrl('https://metamask.io/download/')
          }
          className="button-sm"
        >
          {t(
            'hyperplay.onboarding.walletSelection.screens.scan.getMetamask',
            `Get MetaMask`
          )}
        </a>
      </div>
      {!props.providerName.toLowerCase().includes('metamask') ? (
        <Button
          size="small"
          type="secondary"
          style={{ width: '200px', margin: '0px auto var(--space-xs) auto' }}
          onClick={() => window.api.copyWalletConnectBaseURIToClipboard()}
        >
          {t('hyperplay.copyUrl', 'Copy URL')}
        </Button>
      ) : null}

      {props.providerName.toLowerCase().includes('metamask') && oneTimePasscode !== '' ? (
        <div className={`body-sm  ${ScanScreenStyles.otp}`}>
          {t('hyperplay.otp', 'One Time Passcode')}: {oneTimePasscode}
        </div>)
      :null}
      <div className={`body-sm ${ScanScreenStyles.walletWarning}`}>
        <WarningIcon height={15} fill={'var(--color-status-alert)'} />
        <div>
          {t(
            'hyperplay.onboarding.walletSelection.screens.scan.updateWarning',
            'Having issues? Make sure MetaMask is up to date.'
          )}
        </div>
      </div>
    </>
  )
}

export default observer(ScanScreen)
