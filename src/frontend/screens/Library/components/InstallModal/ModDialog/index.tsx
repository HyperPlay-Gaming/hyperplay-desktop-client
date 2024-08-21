import React, { useState } from 'react'
import { GameInfo } from 'common/types'
import { DialogHeader, DialogContent } from 'frontend/components/UI/Dialog'
import { useTranslation } from 'react-i18next'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import styles from './ModDialog.module.scss'
import { configStore } from 'frontend/helpers/electronStores'
import TextInputWithIconField from 'frontend/components/UI/TextInputWithIconField'
import { Button, Images } from '@hyperplay/ui'
import { install } from 'frontend/helpers'
import { signSiweMessage } from 'frontend/helpers/library'
import { downloadLinks } from './constants'

interface Props {
  backdropClick: () => void
  gameInfo: GameInfo
  accessCode: string
  children: React.ReactNode
  requiresToken: boolean
  enableCTAButton: boolean
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
  enableCTAButton
}) => {
  const { t } = useTranslation()
  const [zipFilePath, setZipFilePath] = useState<string>('')
  const [installPath, setInstallPath] = useState<string>(
    getDefaultInstallPath()
  )

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
      siweValues = await signSiweMessage()
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
            <p className={styles.stepDescription}>
              {t('mods.instructions.step1.description', {
                defaultValue:
                  'This game is a mod for World of Warcraft: Wrath of the Lich King (3.3.5a). In order to play this mod, players must own a copy of World of Warcraft 3.3.5a. {{newline}} {{newline}} HyperPlay does not host World of Warcraft. Players who own World of Warcraft can obtain version 3.3.5a from several external sources:',
                newline: '\n'
              })}
            </p>
            <ul className={styles.sourceList}>
{/*               <li className={styles.sourceItem}>
                <a
                  className={styles.sourceLink}
                  href={downloadLinks[appName]?.webtorrent ?? ''}
                  onClick={(ev) => {
                    window.api.openExternalUrl(
                      downloadLinks[appName]?.webtorrent
                    )
                    ev.preventDefault()
                  }}
                >
                  {t(
                    'mods.instructions.step1.webTorrent',
                    'WebTorrent (recommended)'
                  )}
                </a>
              </li> */}
{/*               <li className={styles.sourceItem}>
                <div className={styles.magnetContainer}>
                  <a
                    href={downloadLinks[appName]?.magnet ?? ''}
                    className={styles.sourceLink}
                    onClick={(ev) => {
                      window.api.openExternalUrl(
                        downloadLinks[appName]?.magnet ?? ''
                      )
                      ev.preventDefault()
                    }}
                  >
                    {t(
                      'mods.instructions.step1.bitTorrent',
                      'BitTorrent Magnet Link'
                    )}
                  </a>
                  <ButtonCopy
                    text={downloadLinks[appName]?.magnet ?? ''}
                    className={styles.copyMagnetButton}
                  />
                </div>
              </li> */}
              <li className={styles.sourceItem}>
                <a
                  href={downloadLinks[appName]?.chromieCraft ?? ''}
                  className={styles.sourceLink}
                  onClick={(ev) => {
                    window.api.openExternalUrl(
                      downloadLinks[appName]?.chromieCraft ?? ''
                    )
                    ev.preventDefault()
                  }}
                >
                  {t('mods.instructions.step1.chromieCraft', 'ChromieCraft')}
                </a>
              </li>
{/*               <li className={styles.sourceItem}>
                <a
                  href={downloadLinks[appName]?.archiveOrg ?? ''}
                  className={styles.sourceLink}
                  onClick={(ev) => {
                    window.api.openExternalUrl(
                      downloadLinks[appName]?.archiveOrg ?? ''
                    )
                    ev.preventDefault()
                  }}
                >
                  {t('mods.instructions.step1.archive', 'Archive.org')}
                </a>
              </li> */}
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

          {children !== null && 
          <div className={styles.step} style={{paddingBottom: 'var(--space-xl-fixed)'}}>
            <div className={styles.stepTitle}>
              {t('mods.instructions.step4.title', 'Step 4')}
            </div>
            <div className={styles.stepSubtitle}>
              {t(
                'mods.instructions.step4.subtitle',
                'Access Code'
              )}
              {children}
            </div>
          </div>
          }

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
              {t('mods.instructions.step3.install', 'Install')}
            </div>
          </Button>
        </div>
      </DialogContent>
    </>
  )
}

export default ModDialog
