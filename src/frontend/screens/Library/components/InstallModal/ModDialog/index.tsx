import React, { useContext, useState } from 'react'
import { GameInfo, WineInstallation } from 'common/types'
import { DialogHeader, DialogContent } from 'frontend/components/UI/Dialog'
import { useTranslation } from 'react-i18next'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import styles from './ModDialog.module.scss'
import { configStore } from 'frontend/helpers/electronStores'
import TextInputWithIconField from 'frontend/components/UI/TextInputWithIconField'
import { Button, Images } from '@hyperplay/ui'
import { install } from 'frontend/helpers'
import ContextProvider from 'frontend/state/ContextProvider'
import { useFlags } from 'launchdarkly-react-client-sdk'
import { marketWarsLinksFallback } from './constants'

interface Props {
  backdropClick: () => void
  gameInfo: GameInfo
  accessCode: string
  children: React.ReactNode
  requiresToken: boolean
  enableCTAButton: boolean
  winePrefix: string
  crossoverBottle: string
  wineVersion: WineInstallation | undefined
  isGated: boolean
}

const userHome = configStore.get('userHome', '')

const previousProgress = {
  bytes: '0.00MB',
  eta: '00:00:00',
  percent: 0
}

const ModDialog: React.FC<Props> = ({
  backdropClick,
  gameInfo,
  children,
  accessCode,
  requiresToken,
  enableCTAButton,
  winePrefix,
  wineVersion,
  crossoverBottle,
  isGated
}) => {
  const { t } = useTranslation()
  const flags = useFlags()
  const marketWarsDownloadLinks =
    flags.marketWarsLinks || marketWarsLinksFallback

  const [zipFilePath, setZipFilePath] = useState<string>('')
  const [installPath, setInstallPath] = useState<string>(
    getDefaultInstallPath()
  )

  const { platform } = useContext(ContextProvider)

  const isWin = platform === 'win32'

  const { title, app_name: appName } = gameInfo

  const handleZipFileSelection = async () => {
    const path = await window.api.openDialog({
      buttonLabel: t('box.choose'),
      properties: ['openFile'],
      title: t('mods.instructions.selectZip'),
      filters: [{ name: 'Zip Files', extensions: ['zip'] }]
    })
    if (path) setZipFilePath(path)
  }

  const handleInstallPathSelection = async () => {
    const path = await window.api.openDialog({
      buttonLabel: t('box.choose'),
      properties: ['openDirectory'],
      title: t('install.path'),
      defaultPath: getDefaultInstallPath()
    })
    if (path) setInstallPath(path)
  }

  function getDefaultInstallPath() {
    const { defaultInstallPath = `${userHome}/Games/HyperPlay` } = {
      ...configStore.get_nodefault('settings')
    }
    return defaultInstallPath
  }

  async function handleInstall(): Promise<void> {
    backdropClick()
    let siweValues

    if (requiresToken) {
      siweValues = await window.api.requestSIWE()
    }

    // Write Default game config with prefix on linux
    if (!isWin) {
      const gameSettings = await window.api.requestGameSettings(appName)

      if (wineVersion) {
        window.api.writeConfig({
          appName,
          config: {
            ...gameSettings,
            winePrefix,
            wineVersion,
            wineCrossoverBottle: crossoverBottle
          }
        })
      }
    }

    await install({
      gameInfo,
      installPath,
      t,
      isInstalling: false,
      previousProgress,
      progress: previousProgress,
      showDialogModal: () => {},
      channelName: 'main',
      accessCode,
      siweValues,
      modOptions: {
        zipFilePath
      }
    })
  }
  return (
    <>
      <DialogHeader onClose={backdropClick}>
        <span
          className="small"
          style={{
            fontSize: '0.7em',
            fontWeight: 'normal'
          }}
        >
          {title ? title : '...'}
        </span>
        <br />
        {t('mods.instructions.title', 'Mod Instructions')}
      </DialogHeader>
      <DialogContent>
        <div className={styles.stepContainer}>
          <div className={styles.step}>
            <div className={styles.stepTitle}>
              {t('mods.instructions.step1.title', 'Step 1')}
            </div>
            <div className={styles.stepSubtitle}>
              {t(
                'mods.instructions.step1.subtitle',
                'Download World of Warcraft 3.3.5a'
              )}
            </div>
            <span className={styles.stepDescription}>
              {t('mods.instructions.step1.description', {
                defaultValue:
                  'This game is a mod for World of Warcraft: Wrath of the Lich King (3.3.5a). In order to play this mod, players must own a copy of World of Warcraft 3.3.5a. {{newline}} {{newline}} HyperPlay does not host World of Warcraft. Players who own World of Warcraft can obtain the version needed from the following sources:',
                newline: '\n'
              })}
            </span>
            <ul className={styles.sourceList}>
              <li
                className={styles.sourceItem}
                onClick={() =>
                  window.api.openExternalUrl(
                    marketWarsDownloadLinks.chromieCraft
                  )
                }
              >
                {t('mods.instructions.step1.link1', 'Link 1')}
              </li>
              <li
                className={styles.sourceItem}
                onClick={() =>
                  window.api.openExternalUrl(marketWarsDownloadLinks.magnet)
                }
              >
                {t('mods.instructions.step1.link2', 'Link 2 (Magnet Link)')}
              </li>
            </ul>
          </div>
          <div className={styles.step}>
            <div className={styles.stepTitle}>
              {t('mods.instructions.step2.title', 'Step 2')}
            </div>
            <div className={styles.stepSubtitle}>
              {t(
                'mods.instructions.step2.subtitle1',
                'Select the downloaded 3.3.5a zip file'
              )}
            </div>
            <TextInputWithIconField
              htmlId="setzippath"
              label={t(
                'mod.instructions.zip.path',
                'Select Base Game File Location'
              )}
              placeholder={t(
                'mod.instructions.zip.placeholder',
                'Select Zip File'
              )}
              value={zipFilePath.replaceAll("'", '')}
              onChange={(event) => setZipFilePath(event.target.value)}
              icon={<FontAwesomeIcon icon={faFile} />}
              inputProps={{ readOnly: true }}
              onIconClick={handleZipFileSelection}
            />
          </div>

          <div className={styles.step}>
            <div className={styles.stepTitle}>
              {t('mods.instructions.step3.title', 'Step 3')}
            </div>
            <div className={styles.stepSubtitle}>
              {t(
                'mods.instructions.step3.subtitle',
                'Select Installation Folder'
              )}
            </div>
            <span className={styles.stepDescription}>
              {t('mods.instructions.step3.description', {
                defaultValue:
                  'Please choose the folder where World of Warcraft: Wrath of the Lich King (3.3.5a) should be installed.',
                newline: '\n'
              })}
            </span>
            <TextInputWithIconField
              htmlId="setinstallpath"
              label={t('install.path', 'Select Install Path')}
              placeholder={getDefaultInstallPath()}
              value={installPath.replaceAll("'", '')}
              onChange={(event) => setInstallPath(event.target.value)}
              icon={<FontAwesomeIcon icon={faFolderOpen} />}
              inputProps={{ readOnly: true }}
              onIconClick={handleInstallPathSelection}
            />
          </div>

          {children !== null && (
            <div
              className={styles.step}
              style={{ paddingBottom: 'var(--space-xl-fixed)' }}
            >
              {isGated && (
                <>
                  <div className={styles.stepTitle}>
                    {t('mods.instructions.step4.title', 'Step 4')}
                  </div>
                  <div className={styles.stepSubtitle}>
                    {t('mods.instructions.step4.subtitle', 'Access Code')}
                  </div>
                  <span className={styles.stepDescription}>
                    {t('mods.instructions.step4.description', {
                      defaultValue:
                        'Enter the access code to proceed with installing the game.',
                      newline: '\n'
                    })}
                  </span>
                </>
              )}
              {children}
            </div>
          )}

          <Button
            type="secondary"
            size="medium"
            onClick={async () => handleInstall()}
            disabled={!installPath || !zipFilePath || !enableCTAButton}
            leftIcon={
              <Images.DownloadIcon
                fill="var(--color-neutral-100)"
                width={20}
                height={20}
              />
            }
            style={{ width: '100%' }}
          >
            <div className="button-sm color-neutral-100">
              {t('button.install', 'Install')}
            </div>
          </Button>
        </div>
      </DialogContent>
    </>
  )
}

export default ModDialog
