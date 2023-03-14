import React, {
  useContext,
  useReducer,
  Reducer,
  useEffect,
  useState
} from 'react'
import WalletOption from '../components/walletOption'
import { PROVIDERS } from 'common/types/proxy-types'
// import './index.css'
import { MMTransparent, WCBlue, HyperPlayLogo } from 'frontend/assets/hyperplay'
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
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ONBOARDING_SCREEN } from '../types'
import defaultProviderStore from 'frontend/store/storage/providerStore'

enum WALLET_SELECTION_DETAILS_SCREEN {
  INFO = 'INFO',
  SCAN = 'SCAN',
  IMPORT = 'IMPORT',
  REJECTED = 'REJECTED',
  CONNECTED = 'CONNECTED'
}

interface ContentParams {
  detailsScreen: WALLET_SELECTION_DETAILS_SCREEN
  qrCodeSvg: string
  mmImportPaths?: MetaMaskImportOptions
  scanTitle: string
}

interface WalletSelectionProps {
  disableOnboarding: () => void
}

const WalletSelection: React.FC<WalletSelectionProps> = function (props) {
  const [metamaskIsInitialized, setMetamaskIsInitialized] = useState(false)
  const contentParamsInit: ContentParams = {
    detailsScreen: WALLET_SELECTION_DETAILS_SCREEN.INFO,
    qrCodeSvg: '',
    scanTitle: ''
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
      qrCodeSvg: qrCodeSvgUpdated,
      scanTitle:
        provider === PROVIDERS.METAMASK_MOBILE
          ? 'MetaMask Mobile'
          : 'Wallet Connect'
    })
  }

  async function connectMetaMaskExtension() {
    setShowMetaMaskBrowserSidebarLinks(true)
    await window.api.getConnectionUris(PROVIDERS.METAMASK_EXTENSION)
    props.disableOnboarding()
  }

  async function handleMmExtensionProviderClicked() {
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

    window.api
      .isExtensionInitialized()
      .then((val) => setMetamaskIsInitialized(val))

    window.api.trackEvent({ event: 'Onboarding Started' })
    return () => {
      removeConnectedListener()
      removeRejectedListener()
    }
  })

  // Track the details screen view once each time the view changes
  useEffect(() => {
    window.api.trackScreen('Onboarding', {
      view: ONBOARDING_SCREEN.WALLET_SELECTION,
      detailsScreen: contentParams.detailsScreen
    })
  }, [contentParams])

  async function handleImportMmExtensionClicked(dbPath?: string | null) {
    if (dbPath !== undefined) {
      defaultProviderStore.set('currentWeb3Provider', 'extension')
    }

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
    window.api.trackEvent({ event: 'Onboarding Completed' })
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
            mmInitialized={metamaskIsInitialized}
          />
        )
      case WALLET_SELECTION_DETAILS_SCREEN.SCAN:
        return (
          <WalletScanScreen
            qrCodeSvg={contentParams.qrCodeSvg}
            providerName={contentParams.scanTitle}
          />
        )
      case WALLET_SELECTION_DETAILS_SCREEN.IMPORT:
        return (
          <WalletImportScreen
            handleImportMmExtensionClicked={handleImportMmExtensionClicked}
            importOptions={contentParams.mmImportPaths!}
          />
        )
      case WALLET_SELECTION_DETAILS_SCREEN.REJECTED:
        return (
          <StatusScreen
            status={CONNECTION_STATUS.REJECTED}
            title={t(
              'hyperplay.onboarding.connectionCanceled.title',
              `Connection canceled!`
            )}
            description={t(
              'hyperplay.onboarding.connectionCanceled.description',
              `Please confirm the connection request on your mobile wallet to proceed.`
            )}
            actionButtonText={t(
              'hyperplay.onboarding.connectAgain',
              `Connect again`
            )}
            onActionButtonClick={async () =>
              providerClicked(PROVIDERS.METAMASK_MOBILE)
            }
          />
        )
      case WALLET_SELECTION_DETAILS_SCREEN.CONNECTED:
        return (
          <StatusScreen
            status={CONNECTION_STATUS.CONNECTED}
            title={t(
              'hyperplay.onboarding.connectionConnected.title',
              `Wallet connected!`
            )}
            description={t(
              'hyperplay.onboarding.connectionConnected.description',
              `Your wallet is connected. You are ready to game.`
            )}
          />
        )
      default:
        return (
          <WalletInfoScreen
            skipClicked={props.disableOnboarding}
            createWalletClicked={async () =>
              handleImportMmExtensionClicked(null)
            }
            mmInitialized={metamaskIsInitialized}
          />
        )
    }
  }

  return (
    <div className={WalletSelectionStyles.welcomeContainer}>
      <div className={WalletSelectionStyles.walletOptionsSection}>
        <HyperPlayLogo />
        <div
          className={`title ${WalletSelectionStyles.walletConnectionsTitle}`}
        >
          {t(
            'hyperplay.onboarding.walletSelection.title',
            `Wallet Connections`
          )}
        </div>
        <div className={`body ${WalletSelectionStyles.connectWalletText}`}>
          {t(
            'hyperplay.onboarding.walletSelection.pleaseConnect',
            `Please connect your wallet, or download the Metamask mobile-app to get
        started:`
          )}
        </div>
        <div className={WalletSelectionStyles.walletOptionsContainer}>
          <WalletOption
            title="MetaMask Mobile"
            subtext="Transactions on mobile. Most secure."
            icon={<MMTransparent height={34} width={34} />}
            onClick={async () => providerClicked(PROVIDERS.METAMASK_MOBILE)}
            isRecommended={false}
          />
          <WalletOption
            title="MetaMask Extension"
            subtext="Approve transactions in-game."
            icon={<MMTransparent height={34} width={34} />}
            onClick={handleMmExtensionProviderClicked}
            isRecommended={false}
          />
          <WalletOption
            title="WalletConnect"
            subtext="Use 40+ other wallets."
            icon={<WCBlue height={34} width={34} />}
            onClick={async () => providerClicked(PROVIDERS.WALLET_CONNECT)}
            isRecommended={false}
          />
        </div>
      </div>
      <div className={WalletSelectionStyles.detailsScreen}>
        {getDetailsScreen(contentParams.detailsScreen)}
      </div>
      <div className={WalletSelectionStyles.closeButton}>
        <button onClick={props.disableOnboarding}>
          <FontAwesomeIcon icon={faXmark} color="var(--color-neutral-300)" />
        </button>
      </div>
    </div>
  )
}

export default WalletSelection
