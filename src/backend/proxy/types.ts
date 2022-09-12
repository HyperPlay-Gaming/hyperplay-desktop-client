import Web3Utils from 'web3-utils'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { JsonRpcPayload, JsonRpcResponse } from 'web3-core-helpers'
import { AbstractProvider } from 'web3-core/types'
import Web3Core from 'web3-core'
import WCTypes from '@walletconnect/types'
import { RequestArguments } from 'web3-core'

export enum PROXY_TOPICS {
  WALLET_CONNECTED = 'wallet-connected',
  WALLET_DISCONNECTED = 'wallet-disconnected',
  ACCOUNT_CHANGED = 'account-changed',
  CHAIN_CHANGED = 'chain-changed',
  GET_CONNECTION_URIS = 'get-connection-uris',
  CONNECTION_REQUEST_REJECTED = 'connection-request-rejected'
}

export interface RequestBody<T> extends Express.Request {
  body: T
}

export enum PROVIDERS {
  METAMASK_MOBILE,
  WALLET_CONNECT
}

declare module '@walletconnect/web3-provider' {
  interface WalletConnectProvider {
    isConnected(): boolean
  }
}

WalletConnectProvider.prototype.isConnected = function () {
  return this.connected
}

export declare class WalletConnectWeb3Provider
  extends WalletConnectProvider
  implements AbstractProvider
{
  sendAsync(
    payload: JsonRpcPayload,
    callback: (error: Error | null, result?: JsonRpcResponse) => void
  ): void
}

export type mmSdkProvider = Web3Core.provider & {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  request: (payload: any) => Promise<any>
  isConnected: () => boolean
}

export type AddEthereumChainParameter = {
  chainId: string
} & AddChainMetadata

export interface Chain {
  // chainId is required to ensure players don't send funds on wrong network
  // decimal based to match chainlist.org
  chainId: string
  // if chainId is not supported, this will be required to add the chain
  chainMetadata?: AddChainMetadata
}

// specified by MetaMask, may change with EIP-3085
export interface AddChainMetadata {
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string // 2-6 characters long
    decimals: 18
  }
  rpcUrls: string[]
  blockExplorerUrls?: string[] //not necessary to add chain
  iconUrls?: string[] // Currently ignored.
}

export interface RpcRequest {
  request: RequestArguments
  chain: Chain
}

export interface TxnRequest {
  contractAddress: string
  functionName: string
  abi?: Web3Utils.AbiItem[]
  params?: string[]
  valueInWei?: string
  gasLimit?: string
  chain: Chain
}

type ContractAddress = string
export interface AbiCache {
  [key: ContractAddress]: Web3Utils.AbiItem[]
}

export interface sendEthRequest {
  to: string
  valueInWei: string
}

export interface IMobileRegistryEntryWithQrLink
  extends WCTypes.IMobileRegistryEntry {
  qrCodeLink: string
}

export interface UrisReturn {
  [key: string]: IMobileRegistryEntryWithQrLink
}

export interface ProviderRpcError extends Error {
  message: string
  code: number
  data?: unknown
}

export interface ConnectInfo {
  chainId: string
}

export type AccountsChangedType = (accounts: string[]) => void
export type WalletConnectedType = (accounts: string[]) => void
export type WalletDisconnectedType = (code: number, reason: string) => void
export type ChainChangedType = (chainId: number) => void
export type ConnectionRequestRejectedType = () => void

export interface ProviderMessage {
  readonly type: string
  readonly data: unknown
}

export interface SignRequest {
  data: string
  address: string
  chain: Chain
}
