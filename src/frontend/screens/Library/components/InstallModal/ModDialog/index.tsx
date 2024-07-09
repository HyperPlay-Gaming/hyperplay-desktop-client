import React, { useState } from 'react'
import { GameInfo } from 'common/types'
import { DialogHeader } from 'frontend/components/UI/Dialog'
import { useTranslation } from 'react-i18next'
import { DialogContent } from '@mui/material'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFile,
  faFolderOpen
} from '@fortawesome/free-solid-svg-icons'
import styles from './ModDialog.module.scss'
import { configStore } from 'frontend/helpers/electronStores'
import TextInputWithIconField from 'frontend/components/UI/TextInputWithIconField'
import { Button, Images } from '@hyperplay/ui'

interface Props {
  backdropClick: () => void
  gameInfo: GameInfo
}

const userHome = configStore.get('userHome', '')

const ModDialog: React.FC<Props> = ({ backdropClick, gameInfo }) => {
  const { t } = useTranslation()
  const [zipFilePath, setZipFilePath] = useState<string>('')
  const [installPath, setInstallPath] = useState<string>('')

  const { title } = gameInfo

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

  function handleInstall(): void | PromiseLike<void> {
    // Add your implementation here
    // For example, you can use async/await to perform an asynchronous operation
    // and handle any errors that may occur

    // Assuming you want to simulate an installation process that takes some time
    const simulateInstallation = async () => {
      try {
        // Simulate installation process
        console.log('Installing...')
        await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate 2 seconds of installation time
        console.log('Installation complete!')
      } catch (error) {
        console.error('Installation failed:', error)
      }
    }

    // Call the simulateInstallation function
    simulateInstallation()
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
      <DialogContent
        sx={{
          padding: 'var(--space-md) 0'
        }}
      >
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
            <p className={styles.stepDescription}>
              {t(
                'mods.instructions.step1.description',
                {
                  defaultValue: 'This game is a mod for World of Warcraft: Wrath of the Lich King (3.3.5a). In order to play this mod, players must own a copy of World of Warcraft 3.3.5a. {{newline}} {{newline}} HyperPlay does not host World of Warcraft. Players who own World of Warcraft can obtain version 3.3.5a from several external sources:',
                  newline: '\n'
                }
              )}
            </p>
            <ul className={styles.sourceList}>
              <li className={styles.sourceItem}>
                <a href="#" className={styles.sourceLink}>
                  {t(
                    'mods.instructions.step1.webTorrent',
                    'WebTorrent (recommended)'
                  )}
                </a>
              </li>
              <li className={styles.sourceItem}>
                <a href="#" className={styles.sourceLink}>
                  {t(
                    'mods.instructions.step1.bitTorrent',
                    'BitTorrent Magnet Link'
                  )}
                </a>
              </li>
              <li className={styles.sourceItem}>
                <a href="#" className={styles.sourceLink}>
                  {t('mods.instructions.step1.chromieCraft', 'ChromieCraft')}
                </a>
              </li>
              <li className={styles.sourceItem}>
                <a href="#" className={styles.sourceLink}>
                  {t('mods.instructions.step1.archive', 'Archive.org')}
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.step}>
            <div className={styles.stepTitle}>
              {t('mods.instructions.step2.title', 'Step 2')}
            </div>
            <div className={styles.stepSubtitle}>
              {t(
                'mods.instructions.step2.subtitle',
                'Select World of Warcraft 3.3.5a.zip File'
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
              inputProps={{ readOnly: true, className: styles.folderTextInput }}
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
            <TextInputWithIconField
              htmlId="setinstallpath"
              label={t('install.path', 'Select Install Path')}
              placeholder={getDefaultInstallPath()}
              value={installPath.replaceAll("'", '')}
              onChange={(event) => setInstallPath(event.target.value)}
              icon={<FontAwesomeIcon icon={faFolderOpen} />}
              inputProps={{ readOnly: true, className: styles.folderTextInput }}
              onIconClick={handleInstallPathSelection}
            />
          </div>

          <Button
            type="secondary"
            size="medium"
            onClick={async () => handleInstall()}
            disabled={!installPath || !zipFilePath}
            leftIcon={<Images.DownloadIcon fill="var(--color-success-400)" width={20} height={20} />}
            style={{ width: '100%' }}
          >
            {t('mods.instructions.step3.install', 'Install')}
          </Button>
        </div>
      </DialogContent>
    </>
  )
}

export default ModDialog
