import React from 'react'

import WalletInfoStyles from './index.module.scss'
import WalletOptionIcon from 'frontend/assets/hyperplay/WalletOptionsIcon.png'
import WalletIcon from 'frontend/assets/hyperplay/WalletIcon.png'
import { Button } from '@hyperplay/ui'
import { t } from 'i18next'

interface InfoTextProps {
  icon: string
  title: string
  details: string
}

const InfoText = function ({ icon, title, details }: InfoTextProps) {
  return (
    <div className={WalletInfoStyles.walletInfoContainer}>
      <div>
        <img src={icon} />
      </div>
      <div className={WalletInfoStyles.walletTextContainer}>
        <div className="menu">{title}</div>
        <div className={`caption-sm ${WalletInfoStyles.infoTextCaption}`}>
          {details}
        </div>
      </div>
    </div>
  )
}

interface WalletInfoScreenProps {
  skipClicked: () => void
  createWalletClicked: () => void
  mmInitialized: boolean
}

const WalletInfoScreen = (props: WalletInfoScreenProps) => {
  return (
    <div className={WalletInfoStyles.walletInfoScreen}>
      <div className={`title ${WalletInfoStyles.title}`}>
        {t(
          'hyperplay.onboarding.walletSelection.screens.info.title',
          `What is a wallet?`
        )}
      </div>
      <InfoText
        icon={WalletOptionIcon}
        title={t(
          'hyperplay.onboarding.walletSelection.screens.info.digitalAssets.title',
          `A Home for your Digital Assets`
        )}
        details={t(
          'hyperplay.onboarding.walletSelection.screens.info.digitalAssets.details',
          `Wallets are used to send, receive, store, and display digital assets like tokens and NFTs.`
        )}
      />
      <InfoText
        icon={WalletIcon}
        title={t(
          'hyperplay.onboarding.walletSelection.screens.info.login.title',
          `A New Way to Log In`
        )}
        details={t(
          'hyperplay.onboarding.walletSelection.screens.info.login.details',
          `An alternative to creating new accounts and passwords on every website, just connect your wallet instead.`
        )}
      />
      <div className={`caption-sm ${WalletInfoStyles.caption}`}>
        {t(
          'hyperplay.onboarding.walletSelection.screens.info.createWalletDescription',
          `Click in “Create a wallet” below if you do not have a wallet or want to create a new one:`
        )}
      </div>
      <div className={WalletInfoStyles.actionButtonContainer}>
        <Button type="tertiary" onClick={props.skipClicked}>
          {t(
            'hyperplay.onboarding.walletSelection.screens.info.skip',
            `Skip for now`
          )}
        </Button>
        {!props.mmInitialized ? (
          <Button onClick={props.createWalletClicked}>
            {t(
              'hyperplay.onboarding.walletSelection.screens.info.createWalletCTA',
              `Create a wallet`
            )}
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export default WalletInfoScreen
