import React, { useState } from 'react'
import { BrowsersAndManualImportOptionsProps } from '../../types'
import { BrowserPackageManagerImportOption } from '../BrowserPackageManagerImportOptions'
import { Button } from '@hyperplay/ui'
import styles from './index.module.scss'
import { useTranslation } from 'react-i18next'

export function BrowsersAndManualImportOptions({
  importOptions,
  handleImportMmExtensionClicked,
  browserSelected,
  setBrowserSelected
}: BrowsersAndManualImportOptionsProps) {
  const [showManualImport, setShowManualImport] = useState(false)
  const { t } = useTranslation()
  const profileString = t('hyperplay.browserImport.profile', 'Profile')
  const appIdString = t('hyperplay.browserImport.appId', 'App Id')
  const [manualImportPath, setManualImportPath] = useState(
    `<${profileString}>/Local Extension Settings/<MetaMask ${appIdString}>`
  )

  const importSubtitle = `MetaMask "Local Extension Settings" ${t(
    'hyperplay.folder',
    'Folder'
  )}`

  function getPackageManagersForBrowser() {
    return Object.keys(importOptions[browserSelected]!)
  }

  return (
    <>
      {
        <div className={styles.profileOptionsContainer}>
          {getPackageManagersForBrowser().map((pkgManager) => {
            if (importOptions[browserSelected]![pkgManager].length === 0) {
              return null
            }
            return (
              <BrowserPackageManagerImportOption
                importOptions={importOptions}
                browserSelected={browserSelected}
                handleImportMmExtensionClicked={handleImportMmExtensionClicked}
                pkgManager={pkgManager}
                key={`${pkgManager}-importOption-container`}
              />
            )
          })}
        </div>
      }
      {showManualImport ? (
        <>
          <hr className={styles.manualHr}></hr>
          <div className={styles.manualFolderPickerContainer}>
            <div className={`eyebrow ${styles.importSubtitle}`}>
              {importSubtitle}
            </div>
            <Button
              type="tertiary"
              onClick={async () => {
                const importPath = await window.api.getImportFolderPath()
                if (importPath === '') return
                setManualImportPath(importPath)
              }}
              className={styles.folderPickerButton}
            >
              <div className="body-sm">{manualImportPath}</div>
            </Button>
          </div>
        </>
      ) : (
        <Button
          type="link"
          onClick={() => setShowManualImport(true)}
          className={styles.cantFindSubtext}
        >
          <div className="button-sm">
            {t(
              'hyperplay.onboarding.walletSelection.screens.import.cantFindProfile',
              `Can't find your browser profile?`
            )}
          </div>
        </Button>
      )}
      {
        <div
          className={
            showManualImport
              ? styles.manualImportActionContainer
              : styles.importActionContainer
          }
        >
          <Button
            onClick={() => setBrowserSelected(null)}
            type="tertiary"
            className={styles.goBackProfileButton}
          >
            {t('webview.controls.back')}
          </Button>
          {showManualImport ? (
            <Button
              type="primary"
              onClick={async () =>
                handleImportMmExtensionClicked(
                  'MANUAL_IMPORT',
                  manualImportPath
                )
              }
            >
              {t('button.continue')}
            </Button>
          ) : null}
        </div>
      }
    </>
  )
}
