import { ContextType } from 'frontend/types'
import { makeAutoObservable, when } from 'mobx'
import walletStore from './WalletStore'
import React, { useContext, useEffect } from 'react'
import ContextProvider from 'frontend/state/ContextProvider'
import { PROVIDERS } from 'common/types/proxy-types'

class OnboardingStore {
  isOnboardingOpen = true

  constructor() {
    makeAutoObservable(this)
  }

  public openOnboarding() {
    this.isOnboardingOpen = true
  }

  public closeOnboarding() {
    this.isOnboardingOpen = false
  }

  public startOnboarding = async (): Promise<void> =>
    new Promise((resolve, reject) => {
      this.openOnboarding()

      when(
        () => !this.isOnboardingOpen,
        () => reject(new Error('Onboarding closed'))
      )

      when(
        () => walletStore.isConnected,
        () => resolve()
      )
    })

  public async bootstrapOnboarding(
    context: ContextType,
    defaultProvider?: PROVIDERS
  ) {
    if (defaultProvider === PROVIDERS.METAMASK_EXTENSION) {
      context!.setShowMetaMaskBrowserSidebarLinks(true)
      await window.api.getConnectionUris(PROVIDERS.METAMASK_EXTENSION)

      this.closeOnboarding()
    }
  }
}

const onboardingStore = new OnboardingStore()

export default onboardingStore

export const OnboardingStoreController = () => {
  const context = useContext(ContextProvider)

  async function init() {
    const currentWeb3Provider = await window.api.getCurrentWeb3Provider()
    onboardingStore.bootstrapOnboarding(context, currentWeb3Provider)
  }

  useEffect(() => {
    init()
  }, [context])

  return <></>
}
