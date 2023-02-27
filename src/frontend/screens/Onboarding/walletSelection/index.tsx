import React, { useContext, useReducer, Reducer, useEffect } from 'react'
import WalletOption from '../components/walletOption'
import { PROVIDERS } from 'common/types/proxy-types'
// import './index.css'
import {
  MMTransparent,
  WCBlue,
  HyperPlayLogo,
  CloseX
} from 'frontend/assets/hyperplay'
import { t } from 'i18next'
import WalletSelectionStyles from './index.module.scss'
import WalletInfoScreen from './screens/info'
import WalletScanScreen from './screens/scan'
import WalletImportScreen from './screens/import'
import ContextProvider from 'frontend/state/ContextProvider'
import { MetaMaskImportOptions } from 'backend/hyperplay-extension-helper/ipcHandlers/types'
import {
  UrisReturn,
  IMobileRegistryEntryWithQrLink,
  WalletConnectedType,
  ConnectionRequestRejectedType,
  wait
} from 'backend/hyperplay-proxy-server/commonProxyTypes'
import { toString, QRCodeToStringOptions } from 'qrcode'
import { WrapRendererCallback } from 'common/types'
import StatusScreen, { CONNECTION_STATUS } from './screens/status'

enum WALLET_SELECTION_DETAILS_SCREEN {
  INFO = 'INFO',
  SCAN = 'SCAN',
  IMPORT = 'IMPORT',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  CONNECTED = 'CONNECTED'
}

interface ContentParams {
  detailsScreen: WALLET_SELECTION_DETAILS_SCREEN
  qrCodeSvg: string
  mmImportPaths?: MetaMaskImportOptions
}

interface WalletSelectionProps {
  disableOnboarding: () => void
}

const WalletSelection: React.FC<WalletSelectionProps> = function (props) {
  const contentParamsInit: ContentParams = {
    detailsScreen: WALLET_SELECTION_DETAILS_SCREEN.INFO,
    qrCodeSvg: ''
  }
  const [contentParams, setContentParams] = useReducer<
    Reducer<ContentParams, Partial<ContentParams>>
  >((state, newState) => ({ ...state, ...newState }), contentParamsInit)

  const { setShowMetaMaskBrowserSidebarLinks } = useContext(ContextProvider)

  async function providerClicked(provider: PROVIDERS) {
    setShowMetaMaskBrowserSidebarLinks(false)
    const uris: UrisReturn = await window.api.getConnectionUris(provider)
    const qrCodeLink: IMobileRegistryEntryWithQrLink = uris.metamask
    const qrCode = qrCodeLink.qrCodeLink
    const options: QRCodeToStringOptions = {
      type: 'svg',
      color: { light: '#121212', dark: '#ffffffff' }
    }
    const qrCodeSvgUpdated = await toString(qrCode, options)
    console.log('qrcode svg updated = ', qrCodeSvgUpdated)
    setContentParams({
      detailsScreen: WALLET_SELECTION_DETAILS_SCREEN.SCAN,
      qrCodeSvg: qrCodeSvgUpdated
    })
  }

  async function connectMetaMaskExtension() {
    setShowMetaMaskBrowserSidebarLinks(true)
    await window.api.getConnectionUris(PROVIDERS.METAMASK_EXTENSION)
    props.disableOnboarding()
  }

  async function handleMmExtensionProviderClicked() {
    const metamaskIsInitialized = await window.api.isExtensionInitialized()
    const importOptions = await window.api.getMetaMaskImportOptions()

    if (metamaskIsInitialized) {
      connectMetaMaskExtension()
    } else {
      setContentParams({
        detailsScreen: WALLET_SELECTION_DETAILS_SCREEN.IMPORT,
        mmImportPaths: importOptions
      })
    }
  }

  useEffect(() => {
    const removeConnectedListener = window.api.handleConnected(handleConnected)
    const removeRejectedListener =
      window.api.handleConnectionRequestRejected(handleRejected)
    return () => {
      removeConnectedListener()
      removeRejectedListener()
    }
  })

  async function handleImportMmExtensionClicked(dbPath?: string | null) {
    if (dbPath === null) {
      window.api.createNewMetaMaskWallet()
    } else {
      const success = await window.api.importMetaMask(dbPath)
      if (!success) {
        console.error('There was a problem importing MetaMask!')
        return
      }
      connectMetaMaskExtension()
    }
  }

  const handleConnected: WrapRendererCallback<WalletConnectedType> = (
    e,
    accounts
  ) => {
    console.log('connected with accounts = ', accounts)
    setContentParams({
      detailsScreen: WALLET_SELECTION_DETAILS_SCREEN.CONNECTED
    })
    wait(4000).then(() => {
      props.disableOnboarding()
    })
  }

  const handleRejected: WrapRendererCallback<ConnectionRequestRejectedType> = (
    e
  ) => {
    console.error('Rejected with ', e)
    setContentParams({
      detailsScreen: WALLET_SELECTION_DETAILS_SCREEN.REJECTED
    })
  }

  function getDetailsScreen(screen: WALLET_SELECTION_DETAILS_SCREEN) {
    switch (screen) {
      case WALLET_SELECTION_DETAILS_SCREEN.INFO:
        return (
          <WalletInfoScreen
            skipClicked={props.disableOnboarding}
            createWalletClicked={async () =>
              handleImportMmExtensionClicked(null)
            }
          />
        )
      case WALLET_SELECTION_DETAILS_SCREEN.SCAN:
        return <WalletScanScreen qrCodeSvg={contentParams.qrCodeSvg} />
      case WALLET_SELECTION_DETAILS_SCREEN.IMPORT:
        return (
          <WalletImportScreen
            handleImportMmExtensionClicked={handleImportMmExtensionClicked}
            importOptions={contentParams.mmImportPaths!}
          />
        )
      case WALLET_SELECTION_DETAILS_SCREEN.PENDING:
        return <StatusScreen status={CONNECTION_STATUS.PENDING} />
      case WALLET_SELECTION_DETAILS_SCREEN.REJECTED:
        return <StatusScreen status={CONNECTION_STATUS.REJECTED} />
      case WALLET_SELECTION_DETAILS_SCREEN.CONNECTED:
        return <StatusScreen status={CONNECTION_STATUS.CONNECTED} />
      default:
        return (
          <WalletInfoScreen
            skipClicked={props.disableOnboarding}
            createWalletClicked={async () =>
              handleImportMmExtensionClicked(null)
            }
          />
        )
    }
  }

  return (
    <div className={WalletSelectionStyles.welcomeContainer}>
      <div>
        <HyperPlayLogo />
        <div className="title">
          {t(
            'hyperplay.onboarding.walletSelection.title',
            `Wallet Connections`
          )}
        </div>
        <div className="content-sm text-secondary">
          {t(
            'hyperplay.onboarding.walletSelection.pleaseConnect',
            `Please connect your wallet, or download the Metamask mobile-app to get
        started.`
          )}
        </div>
        <WalletOption
          title="MetaMask Mobile"
          subtext="Connect with MetaMask Mobile"
          icon={<MMTransparent height={34} width={34} />}
          onClick={async () => providerClicked(PROVIDERS.METAMASK_MOBILE)}
          isRecommended={true}
        />
        <WalletOption
          title="MetaMask Extension"
          subtext="Connect with MetaMask Extension"
          icon={<MMTransparent height={34} width={34} />}
          onClick={handleMmExtensionProviderClicked}
          isRecommended={false}
        />
        <WalletOption
          title="WalletConnect"
          subtext="Connect with WalletConnect"
          icon={<WCBlue height={34} width={34} />}
          onClick={async () => providerClicked(PROVIDERS.WALLET_CONNECT)}
          isRecommended={false}
        />
      </div>
      <div>{getDetailsScreen(contentParams.detailsScreen)}</div>
      <div className={WalletSelectionStyles.closeButton}>
        <button onClick={props.disableOnboarding}>
          <CloseX />
        </button>
      </div>
    </div>
  )
}

export default WalletSelection
