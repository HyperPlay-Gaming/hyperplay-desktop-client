import { ContextType } from 'frontend/types'
import defaultProviderStore from './storage/providerStore'
import { makeAutoObservable, when } from 'mobx'
import walletStore from './WalletStore'
import React, { useContext, useEffect } from 'react'
import ContextProvider from 'frontend/state/ContextProvider'
import { PROVIDERS } from 'common/types/proxy-types'

class OnboardingStore {
  isOnboardingOpen = true
  context?: ContextType

  constructor() {
    makeAutoObservable(this)

    this.bootstrapOnboarding()
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

  public setContext(context: ContextType) {
    this.context = context
  }

  private async bootstrapOnboarding() {
    await when(() => !!this.context)

    const defaultProvider = defaultProviderStore.get_nodefault(
      'currentWeb3Provider'
    )

    if (defaultProvider === 'extension') {
      this.context!.setShowMetaMaskBrowserSidebarLinks(true)
      await window.api.getConnectionUris(PROVIDERS.METAMASK_EXTENSION)

      this.closeOnboarding()
    }
  }
}

const onboardingStore = new OnboardingStore()

export default onboardingStore

export const OnboardingStoreController = () => {
  const store = useContext(ContextProvider)

  useEffect(() => onboardingStore.setContext(store), [store])

  return <></>
}
