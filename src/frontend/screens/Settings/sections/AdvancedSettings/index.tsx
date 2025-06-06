import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import SettingsContext from '../../SettingsContext'
import ContextProvider from 'frontend/state/ContextProvider'
import { GameStatus } from 'common/types'
import { DisableLogs, DownloadNoHTTPS } from '../../components'
import libraryState from 'frontend/state/libraryState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@hyperplay/ui'
import {
  faBoxOpen,
  faCancel,
  faCopy,
  faDownload,
  faPaintBrush,
  faRefresh,
  faTrash,
  faUpload,
  faX
} from '@fortawesome/free-solid-svg-icons'
import { ImportGameFolder } from 'frontend/components/UI/ImportGameFolder'

export default function AdvancedSettings() {
  const { config } = useContext(SettingsContext)

  const [isCopiedToClipboard, setCopiedToClipboard] = useState(false)

  const [eosOverlayInstalled, setEosOverlayInstalled] = useState(false)
  const [eosOverlayVersion, setEosOverlayVersion] = useState('')
  const [eosOverlayLatestVersion, setEosOverlayLatestVersion] = useState('')
  const [eosOverlayCheckingForUpdates, setEosOverlayCheckingForUpdates] =
    useState(false)
  const [eosOverlayInstallingOrUpdating, setEosOverlayInstallingOrUpdating] =
    useState(false)
  const [eosOverlayEnabledGlobally, setEosOverlayEnabledGlobally] =
    useState(false)
  const eosOverlayAppName = '98bc04bc842e4906993fd6d6644ffb8d'

  const { libraryStatus, platform, showResetDialog, showResetExtensionDialog } =
    useContext(ContextProvider)
  const { t } = useTranslation()
  const isWindows = platform === 'win32'
  const isMac = platform === 'darwin'

  useEffect(() => {
    // set copied to clipboard status to true if it's not already set to true
    // used for changing text and color
    if (!isCopiedToClipboard) return

    const timer = setTimeout(() => {
      setCopiedToClipboard(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [isCopiedToClipboard])

  useEffect(() => {
    const getEosStatus = async () => {
      const { isInstalled, version } = await window.api.getEosOverlayStatus()
      setEosOverlayInstalled(isInstalled)
      setEosOverlayVersion(version ?? '')
    }
    getEosStatus()
  }, [eosOverlayInstalled, eosOverlayVersion])

  useEffect(() => {
    const getLatestEosOverlayVersion = async () => {
      const version = await window.api.getLatestEosOverlayVersion()
      setEosOverlayLatestVersion(version)
    }
    getLatestEosOverlayVersion()
  }, [eosOverlayLatestVersion])

  useEffect(() => {
    const { status } =
      libraryStatus.filter(
        (game: GameStatus) => game.appName === eosOverlayAppName
      )[0] || {}
    setEosOverlayInstallingOrUpdating(
      status === 'installing' || status === 'updating'
    )
  }, [eosOverlayInstallingOrUpdating])

  useEffect(() => {
    const enabledGlobally = async () => {
      if (isWindows) {
        setEosOverlayEnabledGlobally(await window.api.isEosOverlayEnabled())
      }
    }
    enabledGlobally()
  }, [eosOverlayEnabledGlobally])

  function getMainEosText() {
    if (eosOverlayInstalled && eosOverlayInstallingOrUpdating)
      return t(
        'setting.eosOverlay.updating',
        'The Epic Overlay is being updated...'
      )
    if (eosOverlayInstalled && !eosOverlayInstallingOrUpdating)
      return t('setting.eosOverlay.installed', 'The Epic Overlay is installed')
    if (!eosOverlayInstalled && eosOverlayInstallingOrUpdating)
      return t(
        'setting.eosOverlay.installing',
        'The Epic Overlay is being installed...'
      )
    if (!eosOverlayInstalled && !eosOverlayInstallingOrUpdating)
      return t(
        'setting.eosOverlay.notInstalled',
        'The Epic Overlay is not installed'
      )
    return ''
  }

  async function installEosOverlay() {
    setEosOverlayInstallingOrUpdating(true)
    const installError = await window.api.installEosOverlay()
    setEosOverlayInstallingOrUpdating(false)
    setEosOverlayInstalled(!installError)
    // `Epic-overlay install` enables the overlay by default on Windows
    setEosOverlayEnabledGlobally(isWindows)
    // Update latest version info
    await checkForEosOverlayUpdates()
  }

  async function removeEosOverlay() {
    const wasRemoved = await window.api.removeEosOverlay()
    setEosOverlayInstalled(!wasRemoved)
  }

  async function updateEosOverlay() {
    setEosOverlayInstallingOrUpdating(true)
    await window.api.installEosOverlay()
    setEosOverlayInstallingOrUpdating(false)
    const { version: newVersion } = await window.api.getEosOverlayStatus()
    setEosOverlayVersion(newVersion ?? '')
  }

  async function cancelEosOverlayInstallOrUpdate() {
    await window.api.abort(eosOverlayAppName)
    setEosOverlayInstallingOrUpdating(false)
  }

  async function toggleEosOverlay() {
    if (eosOverlayEnabledGlobally) {
      await window.api.disableEosOverlay('')
      setEosOverlayEnabledGlobally(false)
    } else {
      const { wasEnabled } = await window.api.enableEosOverlay('')
      setEosOverlayEnabledGlobally(wasEnabled)
    }
  }

  async function checkForEosOverlayUpdates() {
    setEosOverlayCheckingForUpdates(true)
    await window.api.updateEosOverlayInfo()
    const newVersion = await window.api.getLatestEosOverlayVersion()
    setEosOverlayLatestVersion(newVersion)
    setEosOverlayCheckingForUpdates(false)
  }

  async function clearAppCache() {
    const storage: Storage = window.localStorage
    storage.removeItem('updates')
    window.api.clearCache(true, false)
    return libraryState.refreshLibrary({ runInBackground: true })
  }

  return (
    <div>
      <div className="settingSubheader settingsSectionHeader title">
        {t('settings.navbar.advanced')}
      </div>

      <DownloadNoHTTPS />

      <DisableLogs />

      <ImportGameFolder />

      <hr />

      {isMac ? null : (
        <div className="eosSettings">
          <div className="settingsSectionHeader title">Epic Overlay</div>
          <div>{getMainEosText()}</div>
          <br />
          {eosOverlayInstalled && !eosOverlayInstallingOrUpdating && (
            <>
              <div>
                {t(
                  'setting.eosOverlay.currentVersion',
                  'Current Version: {{version}}',
                  { version: eosOverlayVersion }
                )}
              </div>
              <div>
                {t(
                  'setting.eosOverlay.latestVersion',
                  'Latest Version: {{version}}',
                  { version: eosOverlayLatestVersion }
                )}
              </div>
              <br />
            </>
          )}
          <div className="footerFlex">
            {eosOverlayInstalled && (
              <>
                {/* Check for updates */}
                {(eosOverlayVersion === eosOverlayLatestVersion ||
                  eosOverlayCheckingForUpdates) && (
                  <Button
                    type="primary"
                    onClick={checkForEosOverlayUpdates}
                    size="small"
                  >
                    <FontAwesomeIcon icon={faRefresh} />
                    <span>
                      {eosOverlayCheckingForUpdates
                        ? t(
                            'setting.eosOverlay.checkingForUpdates',
                            'Checking for updates...'
                          )
                        : t(
                            'setting.eosOverlay.checkForUpdates',
                            'Check for updates'
                          )}
                    </span>
                  </Button>
                )}
                {/* Update */}
                {eosOverlayVersion !== eosOverlayLatestVersion &&
                  !eosOverlayCheckingForUpdates && (
                    <Button
                      type="primary"
                      onClick={updateEosOverlay}
                      size="small"
                    >
                      <FontAwesomeIcon icon={faUpload} />
                      <span>
                        {eosOverlayInstallingOrUpdating
                          ? t('setting.eosOverlay.updating', 'Updating...')
                          : t('setting.eosOverlay.updateNow', 'Update')}
                      </span>
                    </Button>
                  )}
                {/* Enable/Disable */}
                {isWindows && (
                  <Button
                    type={
                      eosOverlayEnabledGlobally ? 'danger-secondary' : 'primary'
                    }
                    onClick={toggleEosOverlay}
                  >
                    {eosOverlayEnabledGlobally ? (
                      <FontAwesomeIcon icon={faX} />
                    ) : (
                      <FontAwesomeIcon icon={faBoxOpen} />
                    )}
                    <span>
                      {eosOverlayEnabledGlobally
                        ? t('setting.eosOverlay.disable', 'Disable')
                        : t('setting.eosOverlay.enable', 'Enable')}
                    </span>
                  </Button>
                )}
                {/* Remove */}
                {!eosOverlayInstallingOrUpdating && (
                  <Button type="danger-secondary" onClick={removeEosOverlay}>
                    <FontAwesomeIcon icon={faTrash} />
                    <span>{t('setting.eosOverlay.remove', 'Uninstall')}</span>
                  </Button>
                )}
              </>
            )}
            {/* Install */}
            {!eosOverlayInstalled && !eosOverlayInstallingOrUpdating && (
              <Button type="primary" onClick={installEosOverlay} size="small">
                <FontAwesomeIcon icon={faDownload} />
                <span>{t('setting.eosOverlay.install', 'Install')}</span>
              </Button>
            )}
            {/* Cancel install/update */}
            {eosOverlayInstallingOrUpdating && (
              <Button
                type="danger-secondary"
                onClick={cancelEosOverlayInstallOrUpdate}
                size="small"
              >
                <FontAwesomeIcon icon={faCancel} />
                <span>{t('setting.eosOverlay.cancelInstall', 'Cancel')}</span>
              </Button>
            )}
          </div>
          <br />
          <hr />
          <hr />
        </div>
      )}
      <div className="footerFlex">
        <Button
          type="primary"
          size="small"
          className={classNames({
            isSuccess: isCopiedToClipboard
          })}
          onClick={() => {
            window.api.clipboardWriteText(
              JSON.stringify({ ...config }, null, 2)
            )
            setCopiedToClipboard(true)
          }}
        >
          <FontAwesomeIcon icon={faCopy} />
          <span>
            {isCopiedToClipboard
              ? t('settings.copiedToClipboard', 'Copied to Clipboard!')
              : t('settings.copyClipboard', 'Copy Advanced Settings')}
          </span>
        </Button>
        <Button
          type="danger-secondary"
          onClick={async () => clearAppCache()}
          size="small"
        >
          <FontAwesomeIcon icon={faPaintBrush} />
          <span>{t('settings.clear-cache', 'Clear HyperPlay Cache')}</span>
        </Button>

        <Button type="danger-secondary" onClick={showResetDialog} size="small">
          <FontAwesomeIcon icon={faX} />
          <span>{t('settings.reset-hyperplay', 'Reset HyperPlay')}</span>
        </Button>
        <Button
          type="danger-secondary"
          onClick={showResetExtensionDialog}
          size="small"
        >
          <FontAwesomeIcon icon={faX} />
          <span>{t('settings.reset-extension', 'Reset Extension')}</span>
        </Button>
      </div>
    </div>
  )
}
