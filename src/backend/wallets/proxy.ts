import express from 'express'
import { RequestBody, TxnRequest } from './types'
import { web3, provider } from './providerHelper'
import { isUserAuthenticated } from './auth'

const port = 8080
export const app = express()
app.use(express.json())
app.use(isUserAuthenticated)

app.get('/', (req, res) => {
  res.send({
    message: 'Greetings traveler! The Hyperplay proxy server is ready!'
  })
})

//forwards body of request to provider
app.post('/providerRequest', async (req, res) => {
  // if provider is not connected, then return
  if (!provider.isConnected()) res.send('Wallet not connected')
  try {
    // send request body to provider
    const response = await provider.request(req.body)
    // get response and send back to client/game
    res.send({ response })
  } catch (error) {
    res.send({ error })
  }
})

app.post('/callContract', async (req: RequestBody<TxnRequest>, res) => {
  // if provider is not connected, then return
  if (!provider.isConnected()) res.send('Wallet not connected')

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
  const accounts: string[] = await web3.eth.getAccounts()

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

export const connected = new Promise((resolve) => {
  app.listen(port, () => {
    console.log(`🚀 Ready at http://localhost:${port}`)
    resolve(1)
  })
})
