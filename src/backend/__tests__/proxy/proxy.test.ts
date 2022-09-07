import { PROVIDERS } from '../../proxy/types'
import { app, server, serverStarted } from '../../proxy/proxy'
import {
  getConnectionUris,
  passEventCallbacks
} from '../../proxy/providerHelper'
import request from 'supertest'
import {
  accountsChanged,
  walletConnected,
  walletDisonnected,
  chainChanged,
  wait,
  getConnectedPromise
} from '../../__mocks__/providerCallbacks'
import BN from 'bn.js'

passEventCallbacks(
  accountsChanged,
  walletConnected,
  walletDisonnected,
  chainChanged
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
  //   await getConnectionUris(PROVIDERS.METAMASK_MOBILE)
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
  // test('should connect wallet, start server, and get eth balance', async function () {
  //   const res = await request(app).get('/ethBalance')
  //   console.log('eth balance is ', res.body.balance)
  //   // expect(res.body.balance).toEqual('4000000000000000')
  //   expect(res.statusCode).toEqual(200)
  // }, 60000)
  // test('should connect wallet, start server, and fail to send eth over testnet', async function () {
  //   const resBefore = await request(app).get('/ethBalance')
  //   const ethBefore = resBefore.body.balance
  //   console.log('eth before = ', ethBefore)
  //   const valueInWeiToSend = '1000000000000000'
  //   let res = await request(app).post('/sendEth').send({
  //     // to: '0xCb0dF2FA613b5bef71DD453A3496224a5dfc8682',
  //     valueInWei: valueInWeiToSend
  //   })
  //   expect(res.statusCode).toEqual(500)
  //   res = await request(app).post('/sendEth').send({
  //     to: '0xCb0dF2FA613b5bef71DD453A3496224a5dfc8682'
  //     // valueInWei: valueInWeiToSend
  //   })
  //   expect(res.statusCode).toEqual(500)
  //   const resAfter = await request(app).get('/ethBalance')
  //   const ethAfter = resAfter.body.balance
  //   console.log('eth after = ', ethAfter)
  //   const changeInWei = new BN(ethBefore).sub(new BN(ethAfter))
  //   expect(changeInWei.toString()).toEqual(new BN(0).toString())
  // }, 60000)
  // test('should connect wallet, start server, and send eth over testnet', async function () {
  //   const resBefore = await request(app).get('/ethBalance')
  //   const ethBefore = resBefore.body.balance
  //   console.log('eth before = ', ethBefore)
  //   const valueInWeiToSend = '1000000000000000'
  //   const res = await request(app).post('/sendEth').send({
  //     to: '0xCb0dF2FA613b5bef71DD453A3496224a5dfc8682',
  //     valueInWei: valueInWeiToSend
  //   })
  //   const resAfter = await request(app).get('/ethBalance')
  //   const ethAfter = resAfter.body.balance
  //   console.log('eth after = ', ethAfter)
  //   const totalSpentInWei = new BN(res.body.receipt.gasUsed)
  //     .mul(new BN(res.body.receipt.effectiveGasPrice))
  //     .add(new BN(valueInWeiToSend))
  //   const changeInWei = new BN(ethBefore).sub(new BN(ethAfter))
  //   expect(changeInWei.divRound(new BN(100000)).toString()).toEqual(
  //     totalSpentInWei.divRound(new BN(100000)).toString()
  //   )
  //   expect(res.statusCode).toEqual(200)
  // }, 60000)
  // test('should fail to get contract abi from etherscan', async function () {
  //   console.log(
  //     'Error messages for invalid parameters is expected in this test'
  //   )
  //   let resErr = await request(app)
  //     .post('/callContract')
  //     .send({
  //       contractAddress: '0xFab46E002BbF0b4509813474841E0716E6730136',
  //       functionName: 'transfer',
  //       params: [
  //         // '0xCb0dF2FA613b5bef71DD453A3496224a5dfc8682',
  //         '1000000000000000000'
  //       ]
  //     })
  //   // console.log(resErr.body.message) //should be an error message
  //   expect(resErr.statusCode).toEqual(500)
  //   resErr = await request(app)
  //     .post('/callContract')
  //     .send({
  //       contractAddress: '0xFab46E002BbF0b4509813474841E0716E6730136',
  //       // functionName: 'transfer',
  //       params: [
  //         '0xCb0dF2FA613b5bef71DD453A3496224a5dfc8682',
  //         '1000000000000000000'
  //       ]
  //     })
  //   expect(resErr.statusCode).toEqual(500)
  //   resErr = await request(app)
  //     .post('/callContract')
  //     .send({
  //       // contractAddress: '0xFab46E002BbF0b4509813474841E0716E6730136',
  //       functionName: 'transfer',
  //       params: [
  //         '0xCb0dF2FA613b5bef71DD453A3496224a5dfc8682',
  //         '1000000000000000000'
  //       ]
  //     })
  //   expect(resErr.statusCode).toEqual(500)
  // }, 60000)
  // test('should get contract abi from etherscan', async function () {
  //   const res = await request(app)
  //     .post('/callContract')
  //     .send({
  //       contractAddress: '0xFab46E002BbF0b4509813474841E0716E6730136',
  //       functionName: 'transfer',
  //       params: [
  //         '0xCb0dF2FA613b5bef71DD453A3496224a5dfc8682',
  //         '1000000000000000000'
  //       ]
  //     })
  //   console.log(res.body)
  //   expect(res.statusCode).toEqual(200)
  // }, 60000)
})
