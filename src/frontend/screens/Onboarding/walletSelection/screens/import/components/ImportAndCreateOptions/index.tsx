import React from 'react'
import { ImportAndCreateOptionsProps } from '../../types'
import { ImportableBrowser } from 'backend/hyperplay-extension-helper/ipcHandlers/types'
import ImportOption from 'frontend/screens/Onboarding/components/importOption'
import { NavLink } from 'react-router-dom'
import { t } from 'i18next'
import styles from './index.module.scss'

export default function ImportAndCreateOptions({
  importOptions,
  handleImportMmExtensionClicked,
  setBrowserSelected
}: ImportAndCreateOptionsProps) {
  let importableBrowserOptions = null

  if (importOptions !== undefined) {
    importableBrowserOptions = Object.keys(importOptions).map((browser) => {
      const importableBrowser = browser as unknown as ImportableBrowser
      return (
        <ImportOption
          onClick={async () => setBrowserSelected(importableBrowser)}
          title={importableBrowser}
          key={importableBrowser}
        />
      )
    })
  }

  return (
    <div className={styles.importOptionsContainer}>
      {importableBrowserOptions}
      <ImportOption
        override="create"
        title={t(
          'hyperplay.onboarding.walletSelection.screens.import.createNewWallet',
          `Create new MM extension wallet`
        )}
        onClick={async () => {
          handleImportMmExtensionClicked('CREATE')
        }}
      />
      <NavLink to="/metamaskSecretPhrase">
        <ImportOption
          override="recovery"
          title={t(
            'hyperplay.onboarding.walletSelection.screens.import.useRecoveryPhrase',
            `Access with secret recovery phrase`
          )}
          onClick={async () => {
            handleImportMmExtensionClicked('SECRET_PHRASE')
          }}
        />
      </NavLink>
    </div>
  )
}
