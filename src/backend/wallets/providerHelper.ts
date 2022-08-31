import MetaMaskSDK from '@metamask/sdk'
import { mmSdkProvider, PROVIDERS, WalletConnectWeb3Provider } from './types'
import Web3 from 'web3'
import WalletConnectProvider from '@walletconnect/web3-provider'
import QRCodeModal from '@walletconnect/qrcode-modal'

const sdk = new MetaMaskSDK({
  dappMetadata: {
    name: 'HyperPlay',
    url: 'https://hyperplay.gg'
  },
  shouldShimWeb3: false // disable window.web3
})

export let provider: WalletConnectWeb3Provider | mmSdkProvider
export let web3: Web3
export let accounts: string[] = []

interface UrisReturn {
  [key: string]: string
}

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
      console.log('URIS: ', JSON.stringify(uris, null, 4))
      QRCodeModal.open(uris.metamask, null)
      break
    }
    default:
      break
  }
  web3 = new Web3(provider)
  accounts = await web3.eth.getAccounts()
  return uris
}

async function getMetamaskSdkConnectionUris(): Promise<UrisReturn> {
  const uris: UrisReturn = {}
  const mmSdkProvider = sdk.getProvider()
  if (mmSdkProvider === null) return {}
  // call this to generate link
  // const accountsPromise =
  mmSdkProvider.request({
    method: 'eth_requestAccounts'
  })

  // get link for metamask mobile. Use as QR code
  const link = sdk.getUniversalLink()
  uris.metamask = link

  // once user scans QR, get accounts
  // accounts = await accountsPromise
  // console.log({ accounts })
  provider = mmSdkProvider
  return uris
}

async function getWalletConnectConnectionUris(): Promise<UrisReturn> {
  return new Promise((resolve) => {
    const uris: UrisReturn = {}
    //  Create WalletConnect Provider
    const wcProvider = new WalletConnectProvider({
      infuraId: 'bde1e349aa3c4803a5c3a71f5623ecce',
      qrcode: false,
      qrcodeModalOptions: {
        desktopLinks: ['ledger'],
        mobileLinks: ['metamask']
      }
    }) as WalletConnectWeb3Provider

    wcProvider.connector.on('display_uri', (err, payload) => {
      const baseUri = payload.params[0]
      uris.metamask = baseUri
      const ledgerUri = 'ledgerlive://wc?uri=' + encodeURIComponent(baseUri)
      uris.ledger = ledgerUri
      resolve(uris)
    })

    //  Enable session (optionally triggers QR Code modal)
    wcProvider.enable()
    provider = wcProvider
  })
}
