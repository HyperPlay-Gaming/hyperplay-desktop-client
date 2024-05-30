import React from 'react'
import { ImportAndCreateOptionsProps } from '../../types'
import ImportOption from 'frontend/screens/Onboarding/components/importOption'
import { t } from 'i18next'
import styles from './index.module.scss'
import { ImportableBrowser } from '@hyperplay/utils'

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
    <div className={styles.importAndCreateOptionsContainer}>
      <div className={styles.importOptionsContainer}>
        {importableBrowserOptions}
      </div>
      <div className={styles.otherOptionsStatement}>
        <span className={styles.line}></span>
        <span className={styles.otherOptionsText}>
          {t(
            'hyperplay.onboarding.walletSelection.screens.import.orWord',
            `OR`
          )}
        </span>
        <span className={styles.line}></span>
      </div>
      <ImportOption
        override="create"
        title={t(
          'hyperplay.onboarding.walletSelection.screens.import.createNewWallet',
          `Create New Extension Wallet`
        )}
        classNames={styles.importCreateMMButton}
        onClick={async () => {
          handleImportMmExtensionClicked('CREATE')
        }}
      />
    </div>
  )
}
