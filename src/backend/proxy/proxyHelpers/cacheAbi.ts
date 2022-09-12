import jsdom from 'jsdom'
const { JSDOM } = jsdom
import Web3Utils from 'web3-utils'
import { AbiCache } from '../types'
import { web3 } from '../providerHelper'

const chainIdExplorerMap = {
  1: 'https://etherscan.io/address/',
  4: 'https://rinkeby.etherscan.io/address/',
  5: 'https://goerli.etherscan.io/address/'
}

export const abiCache: AbiCache = {}

export async function cacheAbiFromBlockExplorer(
  contractAddress: string
): Promise<boolean> {
  const chainId = await web3.eth.getChainId()
  if (!Object.hasOwn(chainIdExplorerMap, chainId)) return false

  const response = await fetch(
    chainIdExplorerMap[chainId] + contractAddress + '#code'
  )
  let isOk = response.ok
  if (isOk) {
    const text = await response.text()
    const dom = new JSDOM(text)
    const abiContent =
      dom.window.document.getElementById('js-copytextarea2')?.innerHTML
    if (abiContent !== undefined) {
      abiCache[contractAddress] = JSON.parse(abiContent) as Web3Utils.AbiItem[]
    } else {
      isOk = false
    }
  }
  return isOk
}
