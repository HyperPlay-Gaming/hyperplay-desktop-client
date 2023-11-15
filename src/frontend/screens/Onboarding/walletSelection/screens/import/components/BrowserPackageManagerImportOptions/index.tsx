import React from 'react'
import { BrowserPackageManagerImportOptionProps } from '../../types'
import { BrowserProfile } from 'backend/hyperplay-extension-helper/ipcHandlers/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Images } from '@hyperplay/ui'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import styles from './index.module.scss'
import { DEFAULT_BROWSER_PROFILE_IMPORT_COLOR } from 'frontend/constants'

export function BrowserPackageManagerImportOption({
  importOptions,
  browserSelected,
  handleImportMmExtensionClicked,
  pkgManager
}: BrowserPackageManagerImportOptionProps) {
  const browserProfilesToImportFrom =
    importOptions[browserSelected]![pkgManager]
  function getProfileBgColor(profile: BrowserProfile) {
    return (
      '#' + profile.imageBackgroundColor ?? DEFAULT_BROWSER_PROFILE_IMPORT_COLOR
    )
  }
  return (
    <div className={styles.packageOptionsContainer}>
      <div className={`caption ${styles.packageManagerSubTitle}`}>
        {pkgManager}
      </div>
      {browserProfilesToImportFrom.map(
        (profile: BrowserProfile, index: number) => (
          <button
            className={`${styles.importBrowserProfileOption} body`}
            key={`${browserSelected}-${pkgManager}-${profile.name}-menu-item`}
            onClick={async () =>
              handleImportMmExtensionClicked(
                'IMPORT',
                importOptions[browserSelected]![pkgManager][index].path,
                browserSelected
              )
            }
          >
            <div className={styles.profileImage}>
              {profile.imagePath !== '' ? (
                <img src={`file://${profile.imagePath}`} />
              ) : (
                <div
                  className={styles.defaultProfileImage}
                  style={{
                    backgroundColor: getProfileBgColor(profile)
                  }}
                >
                  <FontAwesomeIcon icon={faUser} />
                </div>
              )}
            </div>
            <div>
              <div className={`menu ${styles.profileName}`}>{profile.name}</div>
              <div className={`caption ${styles.displayName}`}>
                {profile.displayName}
              </div>
            </div>
            <div className={styles.profileRightArrow}>
              <Images.ChevronRight width="12px" height="12px" />
            </div>
          </button>
        )
      )}
    </div>
  )
}
