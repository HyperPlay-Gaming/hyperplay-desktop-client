import { logInfo, LogPrefix } from 'backend/logger/logger'
import { LDUser } from 'common/types'
import * as LDElectron from 'launchdarkly-electron-client-sdk'

export let ldMainClient: LDElectron.LDElectronMainClient
export const LDEnvironmentId = import.meta.env.VITE_LD_ENVIRONMENT_ID

export function initLDClient(ldUser: LDUser) {
  ldMainClient = LDElectron.initializeInMain(LDEnvironmentId!, ldUser, {
    streaming: true
  })

  ldMainClient.on('ready', () => {
    logInfo('LaunchDarkly client initialized', LogPrefix.Backend)
  })
}

export function getFlag(flagName: string, defaultValue: unknown): unknown {
  return ldMainClient.variation(flagName, defaultValue)
}