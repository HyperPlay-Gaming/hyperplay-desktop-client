import './index.css'
import {
  ImportableBrowsers,
  MetaMaskImportOptions
} from 'backend/hyperplay-extension-helper/ipcHandlers/types'
import React, { useEffect, useState } from 'react'
import ImportOption from '../components/importOption'
import { OnboardingModalConfig } from '../types'
import ActionButton from '../components/actionButton'

interface ImportProps {
  importOptions: MetaMaskImportOptions
  setOnboardingModalParams: React.Dispatch<Partial<OnboardingModalConfig>>
  handleImportMmExtensionClicked: (dbPath?: null | string) => Promise<void>
  disableOnboarding: () => void
}

const ImportMetaMask = ({
  setOnboardingModalParams,
  importOptions,
  handleImportMmExtensionClicked
}: ImportProps) => {
  const [err, setError] = useState('')

  const handleError = (e: Electron.IpcRendererEvent, code: string) => {
    setError(getErrorMessage(code))
  }

  const getErrorMessage = (code: string) => {
    if (code === 'LEVEL_DATABASE_NOT_OPEN') {
      return 'Please close your browser and then try again'
    }
    return 'There was an error during wallet import'
  }

  useEffect(() => {
    setOnboardingModalParams({
      title: 'IMPORT WALLET',
      enableBackButton: true,
      enableCloseButton: true
    })
    const rmHandleError = window.api.handleMetaMaskImportError(handleError)
    return () => {
      rmHandleError()
    }
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
                handleImportMmExtensionClicked(importOptions[key])
              }
              title={key as ImportableBrowsers}
              key={key}
            />
          ))}
        </div>
        {err !== '' ? <div>{err}</div> : null}
        <ActionButton
          onClick={async () => handleImportMmExtensionClicked(null)}
        >
          Create New Wallet
        </ActionButton>
      </div>
    </>
  )
}

export default ImportMetaMask
