import MetaMaskSDK from '@metamask/sdk'
import {
  mmSdkProvider,
  WalletConnectWeb3Provider,
  ProviderRpcError,
  ConnectInfo,
  ProviderMessage,
  PROXY_TOPICS
} from './types'
import Web3 from 'web3'
import WalletConnectProvider from '@walletconnect/web3-provider'
import QRCodeModal from '@walletconnect/qrcode-modal'
import * as WCBrowserUtils from '@walletconnect/browser-utils'
import { ipcMain } from 'electron'
import { registryCache } from './data/registryBackup'
import { IAppRegistry } from '@walletconnect/types'
import {
  PROVIDERS,
  UrisReturn,
  IMobileRegistryEntryWithQrLink,
  ConnectionRequestRejectedType,
  AccountsChangedType,
  WalletConnectedType,
  WalletDisconnectedType,
  ChainChangedType
} from './commonProxyTypes'
import {
  extensionProvider,
  ExtensionProvider
} from '../extension/extensionProvider'

let sdk: MetaMaskSDK

export let provider:
  | WalletConnectWeb3Provider
  | mmSdkProvider
  | ExtensionProvider
export let web3: Web3

// initializes provider and returns uris
export async function getConnectionUris(
  providerSelection: PROVIDERS
): Promise<UrisReturn> {
  let uris: UrisReturn = {}

  switch (providerSelection) {
    case PROVIDERS.METAMASK_MOBILE: {
      uris = await getMetamaskSdkConnectionUris()
      break
    }
    case PROVIDERS.WALLET_CONNECT: {
      uris = await getWalletConnectConnectionUris()
      QRCodeModal.open(uris['metamask'].qrCodeLink, null)
      break
    }
    case PROVIDERS.METAMASK_EXTENSION: {
      //we set up the wrapped mm browser extension here
      provider = extensionProvider
      connectMmExtension(extensionProvider)
      // uri concept is not applicable to mm extension
      web3 = new Web3(provider)
      return {}
      break
    }
    default:
      break
  }
  web3 = new Web3(provider)
  return uris
}

async function handleGetConnectionUris(
  event: Electron.IpcMainInvokeEvent,
  providerSelection: PROVIDERS
): Promise<UrisReturn> {
  return getConnectionUris(providerSelection)
}

ipcMain?.handle(PROXY_TOPICS.GET_CONNECTION_URIS, handleGetConnectionUris)

let accountsChanged: AccountsChangedType
let walletConnected: WalletConnectedType
let walletDisconnected: WalletDisconnectedType
let chainChanged: ChainChangedType
let connectionRequestRejected: ConnectionRequestRejectedType

// main uses this to pass in callbacks
export function passEventCallbacks(
  _accountsChanged: AccountsChangedType,
  _walletConnected: WalletConnectedType,
  _walletDisconnected: WalletDisconnectedType,
  _chainChanged: ChainChangedType,
  _connectionRequestRejected: ConnectionRequestRejectedType
) {
  accountsChanged = _accountsChanged
  walletConnected = _walletConnected
  walletDisconnected = _walletDisconnected
  chainChanged = _chainChanged
  connectionRequestRejected = _connectionRequestRejected
}

function connectMmExtension(extProvider: ExtensionProvider) {
  handleMetamaskExtensionProviderEvents(extProvider)
}

function handleMetamaskExtensionProviderEvents(extProvider: ExtensionProvider) {
  extProvider.on('accountsChanged', (accounts: string[]) => {
    console.log('accounts changed in mm extension to ', accounts)
    accountsChanged(accounts)
  })

  extProvider.on('disconnect', (error: ProviderRpcError) => {
    console.log('disconnected in mm extension: ', error.code, error.message)
    walletDisconnected(error.code, error.message)
  })

  extProvider.on('connect', (connectInfo: ConnectInfo) => {
    console.log('connected mm extension id = ', connectInfo.chainId)
  })

  extProvider.on('chainChanged', (chainId: number) => {
    console.log('chain changed in mm extension to ', chainId)
    chainChanged(chainId)
  })
  console.log('bound on events to extension mock provider')
}

/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
function handleMetamaskSdkProviderEvents(mmSdkProvider: any) {
  mmSdkProvider.on('accountsChanged', (accounts: string[]) => {
    console.log('accounts changed to ', accounts)
    accountsChanged(accounts)
  })

  mmSdkProvider.on('disconnect', (error: ProviderRpcError) => {
    console.log('disconnected: ', error.code, error.message)
    walletDisconnected(error.code, error.message)
  })

  mmSdkProvider.on('connect', (connectInfo: ConnectInfo) => {
    console.log('connected mm sdk id = ', connectInfo.chainId)
  })

  mmSdkProvider.on('chainChanged', (chainId: number) => {
    console.log('chain changed to ', chainId)
    chainChanged(chainId)
  })
}

async function getMetamaskSdkConnectionUris(): Promise<UrisReturn> {
  const uris: UrisReturn = {}
  if (sdk === undefined) {
    // icon on connection request is from <link rel="icon" href="/.../> tag in website head tag
    sdk = new MetaMaskSDK({
      dappMetadata: {
        name: 'HyperPlay',
        url: 'https://www.hyperplay.xyz/'
      },
      shouldShimWeb3: false // disable window.web3
    })
  }
  const mmSdkProvider = sdk.getProvider()
  if (mmSdkProvider === null) return {}

  // call this to generate link
  mmSdkProvider
    .request({
      method: 'eth_requestAccounts'
    })
    .then((accounts: string[]) => {
      console.log(
        'mm request accounts returned should be connected: ',
        accounts
      )
      walletConnected(accounts)
    })
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    .catch(() => {
      connectionRequestRejected()
    })

  // get link for metamask mobile. Use as QR code
  const link = sdk.getUniversalLink()
  const entry: IMobileRegistryEntryWithQrLink = {
    name: 'MetaMask',
    shortName: 'MetaMask',
    color: '#ffffff',
    logo: 'https://registry.walletconnect.com/api/v2/logo/sm/5195e9db-94d8-4579-6f11-ef553be95100',
    universalLink: 'https://metamask.app.link',
    deepLink: 'metamask',
    qrCodeLink: link
  }
  uris.metamask = entry

  handleMetamaskSdkProviderEvents(mmSdkProvider)

  provider = mmSdkProvider
  return uris
}

function handleEventsWalletConectProvider(
  wcProvider: WalletConnectWeb3Provider
) {
  // Subscribe to accounts change
  wcProvider.on('accountsChanged', (accounts: string[]) => {
    accountsChanged(accounts)
  })

  // Subscribe to chainId change
  wcProvider.on('chainChanged', (chainId: number) => {
    chainChanged(chainId)
  })

  // Subscribe to session disconnection
  wcProvider.on('disconnect', (code: number, reason: string) => {
    walletDisconnected(code, reason)
  })

  //  Enable session (optionally triggers QR Code modal)
  wcProvider.enable().then((accounts: string[]) => {
    walletConnected(accounts)
  })

  wcProvider.on('message', (msg: ProviderMessage) => {
    console.log(
      'message received by wc Provider: ',
      JSON.stringify(msg, null, 4)
    )
  })
}

async function getWalletConnectConnectionUris(): Promise<UrisReturn> {
  return new Promise((resolve) => {
    const uris: UrisReturn = {}

    //  Create WalletConnect Provider
    const wcProvider = new WalletConnectProvider({
      infuraId: 'bde1e349aa3c4803a5c3a71f5623ecce',
      qrcode: false,
      clientMeta: {
        description: 'Approve game transactions with HyperPlay',
        url: 'https://www.hyperplay.xyz/',
        icons: ['https://www.hyperplay.xyz/Hyperplay32x32Round.png'],
        name: 'HyperPlay'
      }
    }) as WalletConnectWeb3Provider
    wcProvider.connector.on('disconnect', (err, payload) => {
      if (payload.params[0].message === 'Session Rejected') {
        // connection request was rejected by user
        connectionRequestRejected()
      }
    })

    wcProvider.connector.on('display_uri', async (err, payload) => {
      const baseUri = payload.params[0]
      console.log(
        'base uri is ',
        baseUri,
        ' copy paste this in ledger live or wherever your wallet connect wallet is if you cannot scan the qr code'
      )

      const registryUrl = WCBrowserUtils.getWalletRegistryUrl()
      //might want to have local json fallback
      let _registryResponseJSON = registryCache
      try {
        const registryResponse = await fetch(registryUrl)
        _registryResponseJSON = await registryResponse.json()
      } catch (e) {
        console.log(String(e))
      }
      const registry: IAppRegistry = _registryResponseJSON.listings
      // mobile works for desktop too
      const platform = 'mobile'
      // not case sensitive
      const whitelist = ['metamask', 'ledger live']
      // returns a formatted object of the link registries whose name matches whitelist entries
      const _links = WCBrowserUtils.getMobileLinkRegistry(
        WCBrowserUtils.formatMobileRegistry(registry, platform),
        whitelist
      )

      const links: IMobileRegistryEntryWithQrLink[] = _links.map((entry) => {
        return {
          ...entry,
          qrCodeLink: WCBrowserUtils.formatIOSMobile(baseUri, entry)
        }
      })
      //create object that maps name to formatted link metadata
      links.forEach((entry) => (uris[entry.name.toLowerCase()] = entry))
      resolve(uris)
    })

    handleEventsWalletConectProvider(wcProvider)

    provider = wcProvider
  })
}
