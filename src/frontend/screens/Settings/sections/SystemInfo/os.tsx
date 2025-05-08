import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faApple, faLinux, faWindows } from '@fortawesome/free-brands-svg-icons'

import type { SystemInformation } from 'backend/utils/systeminfo'
import { useTranslation } from 'react-i18next'
import styles from './os.module.scss'

interface OSLogoProps {
  platform: string
}

function OSLogo({ platform }: OSLogoProps) {
  if (platform === 'win32')
    return <FontAwesomeIcon icon={faWindows} className="logo" />
  if (platform === 'darwin')
    return <FontAwesomeIcon icon={faApple} className="logo" />
  if (platform === 'linux')
    return <FontAwesomeIcon icon={faLinux} className="logo" />
  return <></>
}

interface OSInfoProps {
  os: SystemInformation['OS']
  isFlatpak: boolean
}

function OSInfo({ os, isFlatpak }: OSInfoProps) {
  const { t } = useTranslation()
  return (
    <div>
      <h6 className={styles.osinfoname}>
        {t('settings.systemInformation.os', 'Operating System:')}
      </h6>
      <div className={styles.gridItemContainer}>
        <div className={styles.logoContainer}>
          <OSLogo platform={os.platform} />
        </div>
        <div className={styles.osinfoversion}>
          {isFlatpak
            ? t(
                'settings.systemInformation.osNameFlatpak',
                '{{osName}} (inside Flatpak)',
                { osName: os.name }
              )
            : os.name}
          <br />
          {t(
            'settings.systemInformation.osVersion',
            'Version {{versionNumber}}',
            {
              versionNumber: os.version
            }
          )}
        </div>
      </div>
    </div>
  )
}

export default React.memo(OSInfo)
