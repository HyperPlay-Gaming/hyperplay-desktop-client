import React, { useEffect, useState } from 'react'
import { t } from 'i18next'
import ImportScreenStyles from './index.module.scss'
import { ImportableBrowser } from 'backend/hyperplay-extension-helper/ipcHandlers/types'
import { ImportProps } from './types'
import ImportAndCreateOptions from './components/ImportAndCreateOptions'
import { BrowsersAndManualImportOptions } from './components/BrowsersAndManualImportOptions'

const WalletImportScreen = ({
  importOptions = {},
  handleImportMmExtensionClicked
}: ImportProps) => {
  const [err, setError] = useState('')
  const [browserSelected, setBrowserSelected] =
    useState<ImportableBrowser | null>(null)
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

  function browserToImportFromIsNotSelected() {
    return (
      browserSelected === null || importOptions[browserSelected] === undefined
    )
  }

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
      {browserToImportFromIsNotSelected() ? (
        <ImportAndCreateOptions
          importOptions={importOptions}
          handleImportMmExtensionClicked={handleImportMmExtensionClicked}
          setBrowserSelected={setBrowserSelected}
        />
      ) : (
        <BrowsersAndManualImportOptions
          importOptions={importOptions}
          handleImportMmExtensionClicked={handleImportMmExtensionClicked}
          // browserSelected cannot be null because browserToImportFromIsNotSelected checks this but TypeScript cannot deduce this
          browserSelected={browserSelected!}
          setBrowserSelected={setBrowserSelected}
        />
      )}

      {err !== '' ? (
        <div className={ImportScreenStyles.errorMessage}>{err}</div>
      ) : null}
    </>
  )
}

export default WalletImportScreen
