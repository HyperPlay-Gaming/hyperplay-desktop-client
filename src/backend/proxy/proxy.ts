import express from 'express'
import {
  AbiCache,
  RequestBody,
  TxnRequest,
  RpcRequest,
  AddEthereumChainParameter,
  Chain,
  SignRequest
} from './types'
import { web3, provider } from './providerHelper'
import { isProviderConnected, isUserAuthenticated, unless } from './middleware'
// import { TransactionReceipt } from 'web3-core'
import jsdom from 'jsdom'
const { JSDOM } = jsdom
import Web3Utils from 'web3-utils'
import { Server } from 'http'
import { RequestArguments } from 'web3-core'

// could dynamically select by setting = 0
// then set local env var that games could use
// if hyperplay relaunches, game might have to relaunch though
const port = process.env.HYPERPLAY_PORT || 9680

const chainIdExplorerMap = {
  1: 'https://etherscan.io/address/',
  4: 'https://rinkeby.etherscan.io/address/',
  5: 'https://goerli.etherscan.io/address/'
}

export const app = express()
app.use(express.json())
app.use(isUserAuthenticated)

// by excluding '/', we can check if wallet is connected and
// if server is running independently for troubleshooting
app.use(unless('/', isProviderConnected))

const abiCache: AbiCache = {}

app.get('/', (req, res) => {
  res.send({
    message: 'The HyperPlay proxy server is running!'
  })
})

// NOTE: This only works with MetaMask currently but could expand to other providers with EIP-3326
// Attempts to switch to the provided Ethereum chain with chainId
// If chainId is not added and addEthChainParams is passed, it will request to add the chain
// Returns empty string on success and human readable error message on failure
async function switchOrAddEthereumChain(chain: Chain) {
  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: web3.utils.toHex(chain.chainId) }]
    })
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } catch (switchError: any) {
    // Not working with MM SDK: This error code indicates that the chain has not been added to MetaMask.
    // if (switchError.code === 4902) {
    // type guards to ensure the ethereum chain can be added
    const requiredFieldsAreSupplied =
      chain.chainMetadata !== undefined &&
      chain.chainMetadata.chainName !== undefined &&
      chain.chainMetadata.nativeCurrency !== undefined &&
      chain.chainMetadata.nativeCurrency.name !== undefined &&
      chain.chainMetadata.nativeCurrency.symbol !== undefined &&
      chain.chainMetadata.nativeCurrency.decimals === 18 &&
      chain.chainMetadata.rpcUrls !== undefined &&
      chain.chainMetadata.rpcUrls.length > 0
    if (chain.chainMetadata === undefined || !requiredFieldsAreSupplied) {
      console.log(JSON.stringify(chain.chainMetadata, null, 4))
      throw 'Chain is not added and the chain data was not provided or malformed. Please pass chain data on the next call.'
    }
    const chainParameter: AddEthereumChainParameter = {
      chainId: web3.utils.toHex(chain.chainId),
      ...chain.chainMetadata
    }
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [chainParameter]
      })
      return
    } catch (addError) {
      // handle "add" error
      throw `There was an error adding the chain. ${addError}`
    }
    // }
    // handle other "switch" errors
    // console.log(switchError.code)
    // throw `There was an error switching to the chain. ${switchError}`
  }
}

async function checkChainId(chain: Chain) {
  //type guard
  if (chain === undefined || chain.chainId === undefined) {
    throw 'ChainId must be specified'
  }
  // need to check because only MetaMask supports `wallet_switchEthereumChain`
  const currentChainId: number = await web3.eth.getChainId()

  if (chain.chainId !== currentChainId.toString()) {
    // what does this return for non metamask? expected that it throws
    // shouldn't send txn in that instance
    await switchOrAddEthereumChain(chain)
    // not necessary for metamask. might be needed for other wallets
    // double check that user did not reject request to switch networks
    // const currentChainIdAfterSwitch: number = await web3.eth.getChainId()
    // if (chain.chainId !== currentChainIdAfterSwitch.toString()) {
    //   throw 'User rejected the chain swap request'
    // }
  }
}

app.post('/rpc', async (req: RequestBody<RpcRequest>, res) => {
  const requestArgs: RequestArguments = req.body.request
  // type guards
  if (requestArgs === undefined || requestArgs.method === undefined) {
    res.status(500).send({
      message: 'ChainId and provider request method must be specified'
    })
    return
  }

  try {
    await checkChainId(req.body.chain)
    // if params passed to provider are malformed, request will throw
    const result = await provider.request(requestArgs)
    res.send(result)
  } catch (e) {
    const errStr = String(e)
    console.log(errStr)
    res.status(500).send({ message: errStr })
  }
})

app.post('/sign', async (req: RequestBody<SignRequest>, res) => {
  console.log(JSON.stringify(req.body, null, 4))
  // type guards
  if (req.body.data === undefined || req.body.address === undefined) {
    res.status(500).send({
      message: 'Data and address must be specified'
    })
    return
  }

  try {
    await checkChainId(req.body.chain)
    const response = await web3.eth.personal.sign(
      req.body.data,
      req.body.address,
      ''
    )
    res.send(response)
  } catch (e) {
    const errStr = String(e)
    console.log(errStr)
    res.status(500).send({ message: errStr })
  }
})

async function cacheAbiFromBlockExplorer(
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

// receipt exposes `from` address to game dev which may not be desirable
app.post('/callContract', async (req: RequestBody<TxnRequest>, res) => {
  // type guards
  if (
    req.body.contractAddress === undefined ||
    req.body.functionName === undefined
  ) {
    res
      .status(500)
      .send({ message: 'Contract address and function name must be passed' })
    return
  }

  // ensure abi is available and cached locally
  if (req.body.abi !== undefined) {
    // abi is defined so cache it
    abiCache[req.body.contractAddress] = req.body.abi
  } else if (!Object.hasOwn(abiCache, req.body.contractAddress)) {
    // not cached or provided so fetching from etherscan
    const isOk = await cacheAbiFromBlockExplorer(req.body.contractAddress)

    if (!isOk) {
      res.status(502).send({
        message:
          'Error: No ABI was provided or cached nor could it be fetched from block explorer'
      })
      return
    }
  }

  // call function
  try {
    await checkChainId(req.body.chain)
    const contract = new web3.eth.Contract(
      abiCache[req.body.contractAddress],
      req.body.contractAddress
    )

    const accounts: string[] = await web3.eth.getAccounts()
    const gasPrice = await web3.eth.getGasPrice()

    const result = await contract.methods[req.body.functionName](
      ...(req.body.params ? req.body.params : [])
    ).send({
      from: accounts[0],
      value: req.body.valueInWei,
      gas: req.body.gasLimit,
      gasPrice: gasPrice
    })
    res.send(result)
  } catch (e) {
    const errStr = String(e)
    console.log(errStr)
    res.status(500).send({ message: errStr })
  }
})

export let server: Server

export const serverStarted = new Promise((resolve) => {
  server = app.listen(port, () => {
    console.log(`🚀 Ready at http://localhost:${port}`)
    resolve(1)
  })
})

// waits for txn hash to be confirmed
// async function txnConfirmation(
//   txnHash: string,
//   timeoutInMs: number
// ): Promise<TransactionReceipt> {
//   const timer = setTimeout(() => {
//     return null
//   }, timeoutInMs)
//   let receipt = await web3.eth.getTransactionReceipt(txnHash)
//   while (receipt === null) {
//     receipt = await web3.eth.getTransactionReceipt(txnHash)
//   }
//   clearTimeout(timer)
//   return receipt
// }
