import MetaMaskSDK from '@metamask/sdk'
import {
  mmSdkProvider,
  PROVIDERS,
  UrisReturn,
  WalletConnectWeb3Provider,
  IMobileRegistryEntryWithQrLink,
  ProviderRpcError,
  ConnectInfo
} from './types'
import Web3 from 'web3'
import WalletConnectProvider from '@walletconnect/web3-provider'
import QRCodeModal from '@walletconnect/qrcode-modal'
import * as WCBrowserUtils from '@walletconnect/browser-utils'
import { ipcMain } from 'electron'
import { PROXY_TOPICS } from '../../common/types/preload'

const sdk = new MetaMaskSDK({
  dappMetadata: {
    name: 'HyperPlay',
    url: 'https://hyperplay.gg'
  },
  shouldShimWeb3: false // disable window.web3
})

export let provider: WalletConnectWeb3Provider | mmSdkProvider
export let web3: Web3

// initializes provider and returns uris
export async function getConnectionUris(
  providerSelection: PROVIDERS
): Promise<UrisReturn> {
  let uris: UrisReturn = {}
  // if (provider.isConnected()) return uris

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
    default:
      break
  }
  web3 = new Web3(provider)
  // accounts = await web3.eth.getAccounts()
  return uris
}

async function handleGetConnectionUris(
  event: Electron.IpcMainInvokeEvent,
  providerSelection: PROVIDERS
): Promise<UrisReturn> {
  return getConnectionUris(providerSelection)
}

ipcMain?.handle(PROXY_TOPICS.GET_CONNECTION_URIS, handleGetConnectionUris)

type accountsChangedType = (accounts: string[]) => void
let accountsChanged: accountsChangedType

type walletConnectedType = () => void
let walletConnected: walletConnectedType

type walletConnectedBroadcastType = (accounts: string[]) => void

type walletDisconnectedType = (code: number, reason: string) => void
let walletDisconnected: walletDisconnectedType

type chainChangedType = (chainId: number) => void
let chainChanged: chainChangedType

export function passEventCallbacks(
  _accountsChanged: accountsChangedType,
  _walletConnected: walletConnectedBroadcastType,
  _walletDisconnected: walletDisconnectedType,
  _chainChanged: chainChangedType
) {
  accountsChanged = _accountsChanged
  walletConnected = async () => {
    const accounts: string[] = await web3.eth.getAccounts()
    _walletConnected(accounts)
  }
  walletDisconnected = _walletDisconnected
  chainChanged = _chainChanged
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
function handleMetamaskSdkProviderEvents(mmSdkProvider: any) {
  mmSdkProvider.on('accountsChanged', (accounts: string[]) => {
    console.log('accounts changed to ', accounts)
    accountsChanged(accounts)
    // MainProcess.accountsChanged(accounts)
  })

  // update type to reference metamask sdk when type is added
  mmSdkProvider.on('disconnect', (error: ProviderRpcError) => {
    console.log('disconnected: ', error.code, error.message)
    walletDisconnected(error.code, error.message)
    // MainProcess.walletDisonnected(error.code, error.message)
  })

  // update type to reference metamask sdk when type is added
  mmSdkProvider.on('connect', (connectInfo: ConnectInfo) => {
    console.log('connected id = ', connectInfo.chainId)
    walletConnected()
    // MainProcess.walletConnected()
  })

  mmSdkProvider.on('chainChanged', (chainId: number) => {
    console.log('chain changed to ', chainId)
    chainChanged(chainId)
    // MainProcess.chainChanged(chainId)
  })
}

async function getMetamaskSdkConnectionUris(): Promise<UrisReturn> {
  const uris: UrisReturn = {}
  const mmSdkProvider = sdk.getProvider()
  if (mmSdkProvider === null) return {}
  // call this to generate link
  // const accountsPromise =
  mmSdkProvider
    .request({
      method: 'eth_requestAccounts'
    })
    .then((accounts: string[]) => {
      console.log(
        'mm request accounts returned should be connected: ',
        accounts
      )
      // MainProcess.walletConnected()
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
    console.log('connected ', accounts)
    walletConnected()
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
        url: 'https://game7.io/',
        icons: [
          'https://pbs.twimg.com/profile_images/1532001777943465984/m6jPRFdB_400x400.jpg'
        ],
        name: 'HyperPlay'
      }
    }) as WalletConnectWeb3Provider

    wcProvider.connector.on('display_uri', async (err, payload) => {
      const baseUri = payload.params[0]
      console.log('base uri is ', baseUri)

      const registryUrl = WCBrowserUtils.getWalletRegistryUrl()
      //might want to have local json fallback
      const registryResponse = await fetch(registryUrl)
      const _registryResponse$jso = await registryResponse.json()
      const registry = _registryResponse$jso.listings
      // mobile works for desktop too
      const platform = 'mobile'
      const whitelist = ['metamask', 'ledger live'] // not case sensitive //212 wallets supported
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
