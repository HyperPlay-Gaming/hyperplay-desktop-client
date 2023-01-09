import './index.css'
import {
  ImportableBrowsers,
  MetaMaskImportOptions
} from 'backend/hyperplay-extension-helper/ipcHandlers/types'
import React, { useEffect } from 'react'
import ImportOption from '../components/importOption'
import { OnboardingModalConfig } from '../types'
import ActionButton from '../components/actionButton'

interface ImportProps {
  importOptions: MetaMaskImportOptions
  setOnboardingModalParams: React.Dispatch<Partial<OnboardingModalConfig>>
  handleMmExtensionProviderClicked: (dbPath?: null | string) => Promise<void>
}

const ImportMetaMask = ({
  setOnboardingModalParams,
  importOptions,
  handleMmExtensionProviderClicked
}: ImportProps) => {
  useEffect(() => {
    setOnboardingModalParams({
      title: 'IMPORT WALLET',
      enableBackButton: true,
      enableCloseButton: true
    })
  }, [])

  return (
    <>
      <div className="importContainer">
        <div className="content-sm text-secondary">
          Your MetaMask installation and settings will be imported into
          HyperPlay.
        </div>
        <div className="importOptionsContainer">
          {Object.keys(importOptions).map((key) => (
            <ImportOption
              onClick={async () =>
                handleMmExtensionProviderClicked(importOptions[key])
              }
              title={key as ImportableBrowsers}
              key={key}
            />
          ))}
        </div>
        <ActionButton
          onClick={async () => handleMmExtensionProviderClicked(null)}
        >
          Skip for Now
        </ActionButton>
      </div>
    </>
  )
}

export default ImportMetaMask
