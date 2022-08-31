import { walletInitialized } from '../../wallets/proxy'

describe.only('tests the proxy server', function () {
  test.only('should log a qr code', async function () {
    console.log('INITIALIZING')
    await walletInitialized
    console.log('INITIALIZED')
  }, 240000)
})

export {}
