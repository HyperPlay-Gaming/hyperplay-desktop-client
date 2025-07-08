import React from 'react'

import WalletInfoStyles from './index.module.scss'
import { ConnectWallet, WarningIcon } from 'frontend/assets/hyperplay'

import { t } from 'i18next'

interface WalletInfoScreenProps {
  createWalletClicked: () => void
  mmInitialized: boolean
}

interface InfoTextProps {
  icon: React.ReactNode
  title: string
  details?: string
}

const InfoText = function ({ icon, title, details }: InfoTextProps) {
  return (
    <div className={WalletInfoStyles.walletInfoContainer}>
      <div>{icon}</div>
      <div className={WalletInfoStyles.walletTextContainer}>
        <div className="menu">{title}</div>
        <div className={`caption-sm ${WalletInfoStyles.infoTextCaption}`}>
          {details}
        </div>
      </div>
    </div>
  )
}

const WalletInfoScreen = (props: WalletInfoScreenProps) => {
  return (
    <>
      <div className={WalletInfoStyles.walletInfoScreen}>
        <div className={WalletInfoStyles.connectWalletSvgContainer}>
          <span className={WalletInfoStyles.blurBackground}></span>
          <ConnectWallet className={WalletInfoStyles.walletSvg} />
        </div>
        <div className={`title ${WalletInfoStyles.title}`}>
          {t(
            'hyperplay.onboarding.walletSelection.screens.newInfo.title',
            `Don't Just Play-Get Rewarded`
          )}
        </div>
        <div className={`body-sm ${WalletInfoStyles.smallTitle}`}>
          {t(
            'hyperplay.onboarding.walletSelection.screens.info.digitalAssets.smallTitle',
            `Connect your wallet to activate powerful features:`
          )}
        </div>
        <div className={`body-sm ${WalletInfoStyles.description}`}>
          <li>
            {' '}
            {t(
              'hyperplay.onboarding.walletSelection.screens.info.list.bullet1',
              `Earn and claim quest rewards`
            )}
            <li>
              {t(
                'hyperplay.onboarding.walletSelection.screens.info.list.bullet2',
                `Track your in-game progress`
              )}
            </li>
            <li>
              {t(
                'hyperplay.onboarding.walletSelection.screens.info.list.bullet3',
                `Access in-game transactions and marketplaces`
              )}
            </li>
            <li>
              {t(
                'hyperplay.onboarding.walletSelection.screens.info.list.bullet4',
                `Buy, swap, and send tokens`
              )}
            </li>
          </li>
        </div>
        <div>
          <span className={WalletInfoStyles.noWalletText}>
            {t(
              'hyperplay.onboarding.walletSelection.screens.info.noWallet',
              `Don't have a wallet?`
            )}
          </span>
          <a
            rel="noreferrer"
            href="https://metamask.io/"
            target="_blank"
            className={WalletInfoStyles.createWalletLink}
            onClick={props.createWalletClicked}
          >
            {t(
              'hyperplay.onboarding.walletSelection.screens.info.createWalletLink',
              `Get MetaMask`
            )}
          </a>
        </div>
        <div className={`eyebrow-sm ${WalletInfoStyles.walletIssues}`}>
          <InfoText
            icon={<WarningIcon className={WalletInfoStyles.warningIcon} />}
            title={t(
              'hyperplay.onboarding.walletSelection.screens.metamask.issues',
              `Having issues? Make sure MetaMask is up to date.`
            )}
          />
        </div>
      </div>
    </>
  )
}

export default WalletInfoScreen
