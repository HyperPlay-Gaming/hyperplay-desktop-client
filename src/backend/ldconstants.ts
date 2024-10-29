import { uuid } from 'short-uuid'
import * as LDElectron from 'launchdarkly-electron-client-sdk'
import { configStore } from './constants'
import { LogPrefix, logInfo } from './logger/logger'
import { app } from 'electron'

export const ldOptions = {
  streaming: true
}

export const LDEnvironmentId = import.meta.env.VITE_LD_ENVIRONMENT_ID
export let ldMainClient: LDElectron.LDElectronMainClient

app.on('ready', () => {
  let ldUser = configStore.get('settings.ldUser', {
    kind: 'user',
    key: uuid()
  })

  if (!ldUser) {
    logInfo('No LaunchDarkly user found, creating new one.')
    ldUser = {
      kind: 'user',
      key: uuid()
    }
    configStore.set('settings.ldUser', ldUser)
  }

  ldMainClient = LDElectron.initializeInMain(LDEnvironmentId, ldUser, ldOptions)

  ldMainClient.on('ready', () => {
    logInfo('LaunchDarkly client initialized', LogPrefix.Backend)
  })
})
