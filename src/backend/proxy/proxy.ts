import express from 'express'
import { RequestBody, TxnRequest, RpcRequest } from './types'
import { web3, provider } from './providerHelper'
import {
  isProviderConnected,
  isUserAuthenticated,
  unless
} from './proxyHelpers/middleware'
import { Server } from 'http'
import { RequestArguments } from 'web3-core'
import { checkChainId } from './proxyHelpers/checkChain'
import { cacheAbiFromBlockExplorer, abiCache } from './proxyHelpers/cacheAbi'

// could dynamically select by setting = 0
// then set local env var that games could use
// if hyperplay relaunches, game might have to relaunch though
const port = process.env.HYPERPLAY_PORT || 9680

export const app = express()
app.use(express.json())
app.use(isUserAuthenticated)

// by excluding '/', we can check if wallet is connected and
// if server is running independently for troubleshooting
app.use(unless('/', isProviderConnected))

app.get('/', (req, res) => {
  res.send({
    message: 'The HyperPlay proxy server is running!'
  })
})

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
    const errStr = JSON.stringify(e)
    res.status(500).send({ message: errStr })
  }
})

app.post('/sendContract', async (req: RequestBody<TxnRequest>, res) => {
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

  // send function
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
    const errStr = JSON.stringify(e)
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
