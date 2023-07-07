import React, { useEffect, useState } from 'react'
import { t } from 'i18next'
import ImportScreenStyles from './index.module.scss'
import {
  BrowserProfile,
  ImportableBrowsers,
  MetaMaskImportOptions
} from 'backend/hyperplay-extension-helper/ipcHandlers/types'
import ImportOption from 'frontend/screens/Onboarding/components/importOption'
import { NavLink } from 'react-router-dom'
import { Menu } from '@mantine/core'

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
          Object.keys(importOptions).map((browser) => {
            // if (Object.keys(importOptions[browser]).length === 0) return null
            return (
              <Menu
                key={`menu_${browser}`}
                position="bottom"
                trigger="hover"
                classNames={{
                  dropdown: ImportScreenStyles.importDropdownContainer,
                  item: ImportScreenStyles.importItemContainer
                }}
              >
                <Menu.Target>
                  <div style={{ width: '100%', height: '100%' }}>
                    <ImportOption
                      onClick={async () =>
                        handleImportMmExtensionClicked(importOptions[browser])
                      }
                      title={browser as ImportableBrowsers}
                      key={browser}
                    />
                  </div>
                </Menu.Target>
                <Menu.Dropdown>
                  {Object.keys(importOptions[browser]).map((pkgManager) => {
                    console.log(
                      'mapping ',
                      pkgManager,
                      ' ',
                      importOptions[browser][pkgManager]
                    )
                    if (importOptions[browser][pkgManager].length === 0)
                      return null
                    return (
                      <>
                        <Menu.Label className="title-sm">
                          {pkgManager}
                        </Menu.Label>
                        {importOptions[browser][pkgManager].map(
                          (profile: BrowserProfile) => (
                            <Menu.Item
                              key={`${browser}-${pkgManager}-${profile.name}-menu-item`}
                            >
                              <div
                                className={`${ImportScreenStyles.importBrowserProfileOption} body`}
                              >
                                <div>
                                  <img
                                    src={`file://${profile.imagePath}`}
                                    height={24}
                                    width={24}
                                  />
                                </div>
                                <div>{profile.displayName}</div>
                              </div>
                            </Menu.Item>
                          )
                        )}
                      </>
                    )
                  })}
                </Menu.Dropdown>
              </Menu>
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

      {err !== '' ? (
        <div className={ImportScreenStyles.errorMessage}>{err}</div>
      ) : null}
    </>
  )
}

export default ImportScreen
