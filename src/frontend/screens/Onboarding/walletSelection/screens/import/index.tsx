import React, { useEffect, useState } from 'react'
import { t } from 'i18next'
import ImportScreenStyles from './index.module.scss'
import {
  BrowserProfile,
  ImportableBrowser,
  MetaMaskImportOptions
} from 'backend/hyperplay-extension-helper/ipcHandlers/types'
import ImportOption from 'frontend/screens/Onboarding/components/importOption'
import { NavLink } from 'react-router-dom'
import { Button, Images } from '@hyperplay/ui'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface ImportProps {
  importOptions: MetaMaskImportOptions
  handleImportMmExtensionClicked: (dbPath?: null | string) => Promise<void>
}

const ImportScreen = ({
  importOptions = {},
  handleImportMmExtensionClicked
}: ImportProps) => {
  const [err, setError] = useState('')
  const [browserSelected, setBrowserSelected] = useState('')
  const [showManualImport, setShowManualImport] = useState(false)
  const [manualImportPath, setManualImportPath] = useState(
    '<profile>/Local Extension Settings/<metamask app id>'
  )
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

  console.log('importOptions = ', importOptions)

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
      {browserSelected === '' ? (
        <div className={ImportScreenStyles.importOptionsContainer}>
          {importOptions &&
            Object.keys(importOptions).map((browser) => {
              return (
                <ImportOption
                  onClick={async () => setBrowserSelected(browser)}
                  title={browser as ImportableBrowser}
                  key={browser}
                />
              )
            })}
          <ImportOption
            override="create"
            title={t(
              'hyperplay.onboarding.walletSelection.screens.import.createNewWallet',
              `Create new MM extension wallet`
            )}
            onClick={async () => {
              handleImportMmExtensionClicked(null)
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
                handleImportMmExtensionClicked(null)
              }}
            />
          </NavLink>
        </div>
      ) : (
        <>
          <div className={ImportScreenStyles.profileOptionsContainer}>
            {Object.keys(importOptions[browserSelected]).map((pkgManager) => {
              if (importOptions[browserSelected][pkgManager].length === 0)
                return null
              return (
                <div
                  className={ImportScreenStyles.packageOptionsContainer}
                  key={`${pkgManager}-importOption-container`}
                >
                  <div
                    className={`caption ${ImportScreenStyles.packageManagerSubTitle}`}
                  >
                    {pkgManager}
                  </div>
                  {importOptions[browserSelected][pkgManager].map(
                    (profile: BrowserProfile, index: number) => (
                      <button
                        className={`${ImportScreenStyles.importBrowserProfileOption} body`}
                        key={`${browserSelected}-${pkgManager}-${profile.name}-menu-item`}
                        onClick={async () =>
                          handleImportMmExtensionClicked(
                            importOptions[browserSelected][pkgManager][index]
                              .path
                          )
                        }
                      >
                        <div className={ImportScreenStyles.profileImage}>
                          {profile.imagePath !== '' ? (
                            <img src={`file://${profile.imagePath}`} />
                          ) : (
                            <div
                              className={ImportScreenStyles.defaultProfileImage}
                              style={{
                                backgroundColor:
                                  '#' +
                                  (profile.imageBackgroundColor
                                    ? profile.imageBackgroundColor
                                    : '202124')
                              }}
                            >
                              <FontAwesomeIcon icon={faUser} />
                            </div>
                          )}
                        </div>
                        <div>
                          <div
                            className={`menu ${ImportScreenStyles.profileName}`}
                          >
                            {profile.name}
                          </div>
                          <div
                            className={`caption ${ImportScreenStyles.displayName}`}
                          >
                            {profile.displayName}
                          </div>
                        </div>
                        <div className={ImportScreenStyles.profileRightArrow}>
                          <Images.ChevronRight width="12px" height="12px" />
                        </div>
                      </button>
                    )
                  )}
                </div>
              )
            })}
          </div>
          {showManualImport ? (
            <>
              <hr className={ImportScreenStyles.manualHr}></hr>
              <div className={ImportScreenStyles.manualFolderPickerContainer}>
                <div className={`eyebrow ${ImportScreenStyles.importSubtitle}`}>
                  MetaMask &quot;Local Extension Settings&quot; Folder
                </div>
                <Button
                  type="tertiary"
                  onClick={async () => {
                    const importPath = await window.api.getImportFolderPath()
                    if (importPath === '') return
                    setManualImportPath(importPath)
                  }}
                  className={ImportScreenStyles.folderPickerButton}
                >
                  <div className="body-sm">{manualImportPath}</div>
                </Button>
              </div>
            </>
          ) : (
            <Button
              type="link"
              onClick={() => setShowManualImport(true)}
              className={ImportScreenStyles.cantFindSubtext}
            >
              <div className="button-sm">
                {t(
                  'hyperplay.onboarding.walletSelection.screens.import.cantFindProfile',
                  `Can't find your browser profile?`
                )}
              </div>
            </Button>
          )}
          <div
            className={
              showManualImport
                ? ImportScreenStyles.manualImportActionContainer
                : ImportScreenStyles.importActionContainer
            }
          >
            <Button
              onClick={() => setBrowserSelected('')}
              type="tertiary"
              className={ImportScreenStyles.goBackProfileButton}
            >
              {t('webview.controls.back')}
            </Button>
            {showManualImport ? (
              <Button
                type="primary"
                onClick={async () =>
                  handleImportMmExtensionClicked(manualImportPath)
                }
              >
                {t('button.continue')}
              </Button>
            ) : null}
          </div>
        </>
      )}

      {err !== '' ? (
        <div className={ImportScreenStyles.errorMessage}>{err}</div>
      ) : null}
    </>
  )
}

export default ImportScreen
