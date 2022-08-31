import MetaMaskSDK from '@metamask/sdk'
import express from 'express'
import { RequestBody } from './types'
import Web3 from 'web3'
import Web3Utils from 'web3-utils'

const port = 8080
export const app = express()
app.use(express.json())

const sdk = new MetaMaskSDK({
  dappMetadata: {
    name: 'HyperPlay',
    url: 'https://hyperplay.gg'
  },
  shouldShimWeb3: false // disable window.web3
})

const provider = sdk.getProvider()
const web3 = new Web3(provider)
let accounts: string[] = []

// initialize wallet
async function initWallet() {
  // call this to generate link
  const accountsPromise = provider.request({ method: 'eth_requestAccounts' })

  // get link for metamask mobile. Use as QR code
  const link = sdk.getUniversalLink()
  console.log({ link })

  // once user scans QR, get accounts
  accounts = await accountsPromise
  console.log({ accounts })
}

export const walletInitialized = initWallet()

//forwards body of request to sdk provider
app.post('/metamaskSdk', async (req, res) => {
  // if provider is not connected, then return
  if (!provider.isConnected()) res.send('MetaMask not connected')
  try {
    // send request body to metamask
    const response = await provider.request(req.body)
    // get response and send back to client/game
    res.send({ response })
  } catch (error) {
    res.send({ error })
  }
})

interface TxnRequest {
  abiItem: Web3Utils.AbiItem
  params: string[]
  contractAddress: string
}

app.post('/callContract', async (req: RequestBody<TxnRequest>, res) => {
  if (req.body.abiItem === undefined) {
    res.send('ERROR: Must provide abi of method to call')
    return
  }
  if (req.body.abiItem.name === undefined) {
    res.send('ERROR: Method name is required')
    return
  }

  const contract = new web3.eth.Contract(
    req.body.abiItem,
    req.body.contractAddress
  )

  await walletInitialized

  const result = await contract.methods[req.body.abiItem.name](
    ...req.body.params
  ).send({
    from: accounts[0]
  })
  res.send(result)
})

// async function switchChain(chainId: string | number) {
//   try {
//     if (web3.currentProvider === null) return
//     const provider: any = web3.currentProvider
//     await provider.request({
//       method: 'wallet_switchEthereumChain',
//       params: [{ chainId: Web3.utils.toHex(chainId) }]
//     })
//   } catch (switchError) {
//     console.log('ERROR: ', switchError)
//     // This error code indicates that the chain has not been added to MetaMask.
//     // if (switchError.code === 4902) {
//     //   alert('add this chain id')
//     // }
//   }
// }

app.listen(port, () => {
  console.log(`🚀 Ready at http://localhost:${port}`)
})

// web3.eth.abi.encodeFunctionCall({
//   name: 'myMethod',
//   type: 'function',
//   inputs: [{
//       type: 'uint256',
//       name: 'myNumber'
//   },{
//       type: 'string',
//       name: 'myString'
//   }]
// }, ['2345675643', 'Hello!%']);

// web3.eth.abi.encodeFunctionCall(abiItem, params)

// proxy server
// http
//   .createServer({}, function (req, res) {
//     // if provider is not connected, then return
//     if (!provider.isConnected()) return res.end('MetaMask not connected')
//     // set response as json
//     res.setHeader('Content-Type', 'application/json')
//     // get request body
//     let body = ''
//     req.on('data', (chunk) => {
//       body += chunk.toString()
//     })
//     req.on('end', async () => {
//       try {
//         // send request body to metamask
//         const response = await provider.request(JSON.parse(body))
//         // get response and send back to client/game
//         res.end(JSON.stringify({ response }))
//       } catch (error) {
//         res.end(JSON.stringify({ error }))
//       }
//     })
//   })
//   .listen(8080)
