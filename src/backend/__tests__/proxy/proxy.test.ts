import { PROVIDERS, wait } from '../../../common/types/proxy-types'
import { app, server, serverStarted } from '../../proxy/proxy'
import {
  getConnectionUris,
  passEventCallbacks
} from '../../proxy/providerHelper'
import request from 'supertest'
import {
  accountsChanged,
  walletConnected,
  walletDisconnected,
  chainChanged,
  getConnectedPromise,
  connectionRequestRejected
} from '../../__mocks__/providerCallbacks'
import BN from 'bn.js'

passEventCallbacks(
  accountsChanged,
  walletConnected,
  walletDisconnected,
  chainChanged,
  connectionRequestRejected
)

describe('MANUAL tests for the proxy server', function () {
  beforeAll(async function () {
    await serverStarted
  }, 10000)

  afterAll(function (done) {
    server.close((err) => {
      done()
    })
  }, 10000)

  test('should do nothing', function () {})

  // beforeAll(async function () {
  //   let connectedPromise = getConnectedPromise()
  //   await getConnectionUris(PROVIDERS.WALLET_CONNECT)
  //   await serverStarted
  //   console.log('Please scan the QR code with your metamask mobile app')
  //   await connectedPromise
  // }, 60000)

  // test('should start server and get / endpoint', async function () {
  //   // await serverStarted
  //   const res = await request(app).get('/')
  //   console.log(res.body.message)
  //   expect(res.body.message).toEqual('The HyperPlay proxy server is running!')
  //   expect(res.statusCode).toEqual(200)
  // }, 10000)

  // test('should fail to get accounts', async function () {
  //   let acctsRes = await request(app)
  //     .post('/rpc')
  //     .send({
  //       // request: {
  //       //   method: 'eth_accounts'
  //       // },
  //       chain: {
  //         chainId: '0x4'
  //       }
  //     })
  //   expect(acctsRes.statusCode).toEqual(500)
  //   console.log(acctsRes.body)
  //   acctsRes = await request(app)
  //     .post('/rpc')
  //     .send({
  //       request: {
  //         // method: 'eth_accounts'
  //       },
  //       chain: {
  //         chainId: '0x4'
  //       }
  //     })
  //   expect(acctsRes.statusCode).toEqual(500)
  //   console.log(acctsRes.body)
  //   acctsRes = await request(app)
  //     .post('/rpc')
  //     .send({
  //       request: {
  //         method: 'eth_accounts'
  //       },
  //       chain: {
  //         // chainId: '0x4'
  //       }
  //     })
  //   expect(acctsRes.statusCode).toEqual(500)
  //   console.log(acctsRes.body)
  //   acctsRes = await request(app)
  //     .post('/rpc')
  //     .send({
  //       request: {
  //         method: 'eth_accounts'
  //       }
  //       // chain: {
  //       //   chainId: '0x4'
  //       // }
  //     })
  //   expect(acctsRes.statusCode).toEqual(500)
  //   console.log(acctsRes.body)
  // }, 20000)

  // test('should switch to Polygon and get accounts and then back to rinkeby', async function () {
  //   let acctsRes = await request(app)
  //     .post('/rpc')
  //     .send({
  //       request: {
  //         method: 'eth_accounts'
  //       },
  //       chain: {
  //         //polygon but no add chain parameters supplied
  //         chainId: '137',
  //         chainMetadata: {
  //           chainName: 'Polygon',
  //           nativeCurrency: {
  //             name: 'MATIC',
  //             symbol: 'MATIC',
  //             decimals: 18
  //           },
  //           rpcUrls: ['https://polygon-rpc.com']
  //         }
  //       }
  //     })
  //   console.log('should have added and switched to polygon ', acctsRes.body)
  //   expect(acctsRes.statusCode).toEqual(200)
  //   acctsRes = await request(app)
  //     .post('/rpc')
  //     .send({
  //       request: {
  //         method: 'eth_accounts'
  //       },
  //       chain: {
  //         chainId: '4'
  //       }
  //     })
  //   console.log('should have switched back to Rinkeby ', acctsRes.body)
  //   expect(acctsRes.statusCode).toEqual(200)
  // }, 20000)

  // async function getEthBalance(chainId: string) {
  //   const acctsRes = await request(app)
  //     .post('/rpc')
  //     .send({
  //       request: {
  //         method: 'eth_accounts'
  //       },
  //       chain: {
  //         chainId: chainId
  //       }
  //     })
  //   console.log('accounts = ', acctsRes.body, ' on chainId = ', chainId)
  //   expect(acctsRes.statusCode).toEqual(200)
  //   const balRes = await request(app)
  //     .post('/rpc')
  //     .send({
  //       request: {
  //         method: 'eth_getBalance',
  //         params: [acctsRes.body[0], 'latest']
  //       },
  //       chain: {
  //         chainId: chainId
  //       }
  //     })
  //   console.log('eth balance response ', balRes.text)
  //   expect(balRes.statusCode).toEqual(200)
  //   return balRes.text
  // }

  // test('should get eth balance on Rinkeby', async function () {
  //   const bal = await getEthBalance('4')
  //   console.log('balance = ', bal)
  // }, 20000)

  // test('should sign a message', async function () {
  //   const acctsRes = await request(app)
  //     .post('/rpc')
  //     .send({
  //       request: {
  //         method: 'eth_accounts'
  //       },
  //       chain: {
  //         chainId: '4'
  //       }
  //     })
  //   console.log('should be on Rinkeby ', acctsRes.body)
  //   expect(acctsRes.statusCode).toEqual(200)
  //   const signRes = await request(app)
  //     .post('/rpc')
  //     .send({
  //       request: {
  //         method: 'eth_signTypedData_v3',
  //         params: [
  //           acctsRes.body[0],
  //           JSON.stringify({
  //             types: {
  //               EIP712Domain: [
  //                 { name: 'name', type: 'string' },
  //                 { name: 'version', type: 'string' },
  //                 { name: 'chainId', type: 'uint256' },
  //                 { name: 'verifyingContract', type: 'address' }
  //               ],
  //               Person: [
  //                 { name: 'name', type: 'string' },
  //                 { name: 'wallet', type: 'address' }
  //               ],
  //               Mail: [
  //                 { name: 'from', type: 'Person' },
  //                 { name: 'to', type: 'Person' },
  //                 { name: 'contents', type: 'string' }
  //               ]
  //             },
  //             primaryType: 'Mail',
  //             domain: {
  //               name: 'Ether Mail',
  //               version: '1',
  //               chainId: '4',
  //               verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC'
  //             },
  //             message: {
  //               from: {
  //                 name: 'Cow',
  //                 wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826'
  //               },
  //               to: {
  //                 name: 'Bob',
  //                 wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB'
  //               },
  //               contents: 'Hello, Bob!'
  //             }
  //           })
  //         ]
  //       },
  //       chain: {
  //         chainId: '4'
  //       }
  //     })
  //   console.log('sign message response = ', signRes.text)
  //   const signature = signRes.text.substring(2)
  //   const r = '0x' + signature.substring(0, 64)
  //   const s = '0x' + signature.substring(64, 128)
  //   const v = parseInt(signature.substring(128, 130), 16)
  //   console.log('sign result r = ', r, ' s = ', s, ' v = ', v)
  //   expect(signRes.statusCode).toEqual(200)
  // }, 20000)

  // test('should get accounts', async function () {
  //   const acctsRes = await request(app)
  //     .post('/rpc')
  //     .send({
  //       request: {
  //         method: 'eth_accounts'
  //       },
  //       chain: {
  //         chainId: '0x4'
  //       }
  //     })
  //   console.log('accounts response body = ', acctsRes.body)
  //   // expect(acctsRes.statusCode).toEqual(200)
  //   // //need a test for when game dev sends account different from what's connected to hyperplay
  //   // const res = await request(app).post('/rpc').send({
  //   //   method: 'eth_getBalance',
  //   //   params: []
  //   // })
  //   // console.log('eth balance is ', res.body.balance)
  //   // // expect(res.body.balance).toEqual('4000000000000000')
  //   // expect(res.statusCode).toEqual(200)
  // }, 60000)

  // async function sendEth(chainId: string, value: string, to: string) {
  //   const acctsRes = await request(app)
  //     .post('/rpc')
  //     .send({
  //       request: {
  //         method: 'eth_accounts'
  //       },
  //       chain: {
  //         chainId: chainId
  //       }
  //     })
  //   console.log('accounts = ', acctsRes.body, ' on chainId = ', chainId)
  //   expect(acctsRes.statusCode).toEqual(200)
  //   const sendRes = await request(app)
  //     .post('/rpc')
  //     .send({
  //       request: {
  //         method: 'eth_sendTransaction',
  //         params: [
  //           {
  //             from: acctsRes.body[0],
  //             to: to,
  //             // gas: "0x76c0", // 30400
  //             // gasPrice: "0x9184e72a000", // 10000000000000
  //             value: value // 2441406250
  //             // data: "0x",
  //           }
  //         ]
  //       },
  //       chain: {
  //         chainId: chainId
  //       }
  //     })
  //   // console.log('send eth response ', sendRes)
  //   expect(sendRes.statusCode).toEqual(200)
  //   return sendRes.body
  // }

  // test('should connect wallet, start server, and send eth over testnet', async function () {
  //   const ethBefore = await getEthBalance('4')
  //   console.log('eth before = ', ethBefore)
  //   const valueInWeiToSend = '1000000000000000'
  //   const res = await sendEth(
  //     '4',
  //     '1000000000000000',
  //     '0xCb0dF2FA613b5bef71DD453A3496224a5dfc8682'
  //   )

  //   // GAS USED DATA IS PROVIDED WITH web3.eth.sendTransaction method
  //   // wait for txn to confirm before checking balance again
  //   // await wait(12000)
  //   // const ethAfter = await getEthBalance('4')
  //   // console.log('eth after = ', ethAfter)
  //   // const totalSpentInWei = new BN(res.body.gasUsed)
  //   //   .mul(new BN(res.body.effectiveGasPrice))
  //   //   .add(new BN(valueInWeiToSend))
  //   // const changeInWei = new BN(ethBefore).sub(new BN(ethAfter))
  //   // expect(changeInWei.divRound(new BN(100000)).toString()).toEqual(
  //   //   totalSpentInWei.divRound(new BN(100000)).toString()
  //   // )
  //   // expect(res.statusCode).toEqual(200)
  // }, 60000)

  // test('should fail to get contract abi from etherscan', async function () {
  //   let resErr = await request(app)
  //     .post('/sendContract')
  //     .send({
  //       contractAddress: '0xFab46E002BbF0b4509813474841E0716E6730136',
  //       functionName: 'transfer',
  //       params: [
  //         // '0xCb0dF2FA613b5bef71DD453A3496224a5dfc8682',
  //         '1000000000000000000'
  //       ],
  //       chain: {
  //         chainId: '4'
  //       }
  //     })
  //   // console.log(resErr.body.message) //should be an error message
  //   expect(resErr.statusCode).toEqual(500)
  //   resErr = await request(app)
  //     .post('/sendContract')
  //     .send({
  //       contractAddress: '0xFab46E002BbF0b4509813474841E0716E6730136',
  //       // functionName: 'transfer',
  //       params: [
  //         '0xCb0dF2FA613b5bef71DD453A3496224a5dfc8682',
  //         '1000000000000000000'
  //       ],
  //       chain: {
  //         chainId: '4'
  //       }
  //     })
  //   expect(resErr.statusCode).toEqual(500)
  //   resErr = await request(app)
  //     .post('/sendContract')
  //     .send({
  //       // contractAddress: '0xFab46E002BbF0b4509813474841E0716E6730136',
  //       functionName: 'transfer',
  //       params: [
  //         '0xCb0dF2FA613b5bef71DD453A3496224a5dfc8682',
  //         '1000000000000000000'
  //       ],
  //       chain: {
  //         chainId: '4'
  //       }
  //     })
  //   expect(resErr.statusCode).toEqual(500)
  // }, 60000)

  // test('should get contract abi from etherscan', async function () {
  //   const res = await request(app)
  //     .post('/sendContract')
  //     .send({
  //       contractAddress: '0xFab46E002BbF0b4509813474841E0716E6730136',
  //       functionName: 'transfer',
  //       params: [
  //         '0xCb0dF2FA613b5bef71DD453A3496224a5dfc8682',
  //         '1000000000000000000'
  //       ],
  //       gasLimit: '60000',
  //       chain: {
  //         chainId: '4'
  //       }
  //     })
  //   console.log(res.body)
  //   expect(res.statusCode).toEqual(200)
  // }, 60000)
})
