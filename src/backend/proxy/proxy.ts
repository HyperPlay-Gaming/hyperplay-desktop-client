import express from 'express'
import { AbiCache, RequestBody, sendEthRequest, TxnRequest } from './types'
import { web3 } from './providerHelper'
import { isProviderConnected, isUserAuthenticated, unless } from './middleware'
// import { TransactionReceipt } from 'web3-core'
import jsdom from 'jsdom'
const { JSDOM } = jsdom
import Web3Utils from 'web3-utils'
import { Server } from 'http'

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

app.get('/ethBalance', async (req, res) => {
  const accounts: string[] = await web3.eth.getAccounts()
  const bal = await web3.eth.getBalance(accounts[0])
  res.send({
    balance: bal
  })
})

// receipt exposes `from` address to game dev which may not be desirable
app.post('/sendEth', async (req: RequestBody<sendEthRequest>, res) => {
  // type guards
  if (req.body.to === undefined || req.body.valueInWei === undefined) {
    res
      .status(500)
      .send({ message: 'Recipient address and value must be passed' })
    return
  }

  try {
    const accounts: string[] = await web3.eth.getAccounts()
    const valueInWei = req.body.valueInWei

    const receipt = await web3.eth.sendTransaction({
      from: accounts[0],
      to: req.body.to,
      value: valueInWei
    })
    // console.log('receipt first returned = ', receipt)
    // receipt = await txnConfirmation(receipt.transactionHash, 120000)
    res.send({ receipt: receipt })
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
