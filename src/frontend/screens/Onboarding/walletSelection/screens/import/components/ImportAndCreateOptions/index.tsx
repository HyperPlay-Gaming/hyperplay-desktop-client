import React from 'react'
import { ImportAndCreateOptionsProps } from '../../types'
import { ImportableBrowser } from 'backend/hyperplay-extension-helper/ipcHandlers/types'
import ImportOption from 'frontend/screens/Onboarding/components/importOption'
import { NavLink } from 'react-router-dom'
import { t } from 'i18next'
import styles from './index.module.scss'
import { Collapse, Images } from '@hyperplay/ui'

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
      <div className={styles.actionsContainer}>
        <Collapse title="Advanced Options">
          <div className={styles.actionsCollapseContainer}>
            <div className={styles.infoBox}>
              <Images.Info fill="var(--color-neutral-400)" className={styles.infoIcon} />
              <div className={styles.infoText}>
                This feature is recommended for advanced users and developers. 
                <span onClick={() => window.api.openHyperplaySite()} className={styles.infoLink} >
                   Learn more
                </span>
              </div>
            </div>
            <NavLink to="/metamaskSecretPhrase">
              <ImportOption
                override="recovery"
                classNames={styles.importSecretRecoveryButton}
                title={t(
                  'hyperplay.onboarding.walletSelection.screens.import.useRecoveryPhrase',
                  `Import Using Secret Recovery Phrase`
                )}
                onClick={async () => {
                  handleImportMmExtensionClicked('SECRET_PHRASE')
                }}
              />
            </NavLink>
          </div>
        </Collapse>
      </div>
      <div className={styles.otherOptionsStatement}>
        <span className={styles.line}></span>
        <span className={styles.otherOptionsText}>
          OR
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
