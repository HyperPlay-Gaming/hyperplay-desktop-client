import { backendEvents } from 'backend/backend_events'
import { trackEvent } from 'backend/metrics/metrics'
import defaultProviderStore from 'backend/proxy/provider_store'
import { PROVIDERS } from 'common/types/proxy-types'
import { app } from 'electron'
import store from './store'
import { initExtension } from '.'
import { hpApi } from 'backend/utils/hyperplay_api'

backendEvents.on('currentWeb3Provider', (provider: PROVIDERS) => {
  defaultProviderStore.set('currentWeb3Provider', provider)
})

backendEvents.on(
  'MetaMask Initialized',
  (mmInitMethod: string, browser: string) => {
    trackEvent({
      event: 'MetaMask Initialized',
      properties: { initMethod: mmInitMethod, browser }
    })
  }
)

backendEvents.on('initExtension', async () => {
  store.set('isInitialized', true)
  await initExtension(hpApi)
})

const openNewWindowListener = (
  ev: Electron.Event,
  contents: Electron.WebContents
) => {
  backendEvents.emit('web-contents-created', ev, contents)
}

app.on('web-contents-created', openNewWindowListener)
