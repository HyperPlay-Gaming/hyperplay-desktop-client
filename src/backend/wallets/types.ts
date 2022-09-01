import Web3Utils from 'web3-utils'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { JsonRpcPayload, JsonRpcResponse } from 'web3-core-helpers'
import { AbstractProvider } from 'web3-core/types'
import Web3Core from 'web3-core'
import WCTypes from '@walletconnect/types'

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

// export class test extends WalletConnectWeb3Provider {
//   isConnected(): boolean {
//     return this.connected
//   }
// }

export type mmSdkProvider = Web3Core.provider & {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  request: (payload: any) => Promise<any>
  isConnected: () => boolean
}

export interface TxnRequest {
  abiItem: Web3Utils.AbiItem
  params: string[]
  contractAddress: string
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
