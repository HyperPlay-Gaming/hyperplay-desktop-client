import React, { useEffect, useState } from 'react'
import { t } from 'i18next'
import ImportScreenStyles from './index.module.scss'
import {
  ImportableBrowsers,
  MetaMaskImportOptions
} from 'backend/hyperplay-extension-helper/ipcHandlers/types'
import ImportOption from 'frontend/screens/Onboarding/components/importOption'

interface ImportProps {
  importOptions: MetaMaskImportOptions
  handleImportMmExtensionClicked: (dbPath?: null | string) => Promise<void>
}

const ImportScreen = ({
  importOptions = {},
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
    const rmHandleError = window.api.handleMetaMaskImportError(handleError)
    return () => {
      rmHandleError()
    }
  }, [])

  return (
    <>
      <div className={`title ${ImportScreenStyles.title}`}>
        {t(
          'hyperplay.onboarding.walletSelection.screens.import.title',
          `Select the browser to import from`
        )}
      </div>
      <div className={`body ${ImportScreenStyles.description}`}>
        {t(
          'hyperplay.onboarding.walletSelection.screens.import.details',
          `By importing, your MetaMask installation and  settings will be imported into HyperPlay.`
        )}
      </div>
      <div className={ImportScreenStyles.importOptionsContainer}>
        {importOptions &&
          Object.keys(importOptions).map((key) => (
            <ImportOption
              onClick={async () =>
                handleImportMmExtensionClicked(importOptions[key])
              }
              title={key as ImportableBrowsers}
              key={key}
            />
          ))}
        <ImportOption
          isCreate={true}
          title={t(
            'hyperplay.onboarding.walletSelection.screens.import.createNewWallet',
            `Create new MM extension wallet`
          )}
          onClick={async () => {
            handleImportMmExtensionClicked(null)
          }}
        />
      </div>

      {err !== '' ? (
        <div className={ImportScreenStyles.errorMessage}>{err}</div>
      ) : null}
    </>
  )
}

export default ImportScreen
