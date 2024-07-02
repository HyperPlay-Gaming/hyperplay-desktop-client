import React from 'react'

import { ReactComponent as HyperPlayIcon } from 'frontend/assets/hyperplay/hyperplay_logo_white.svg'

import type { SystemInformation } from 'backend/utils/systeminfo'
import { useTranslation } from 'react-i18next'

interface Props {
  software: SystemInformation['softwareInUse']
}

function SoftwareInfo({ software }: Props) {
  const { t } = useTranslation()

  const { appVersion, legendaryVersion, gogdlVersion } = software

  return (
    <div>
      <h6>HyperPlay</h6>
      <div className="gridItemContainer">
        <div>
          <HyperPlayIcon className="app-icon" />
        </div>
        <div style={{ margin: 'auto', paddingLeft: 'var(--space-xs-fixed)' }}>
          {t('settings.systemInformation.version', 'Version: {{appVersion}}', {
            appVersion
          })}
          <br />
          {t(
            'settings.systemInformation.legendaryVersion',
            'Legendary: {{legendaryVersion}}',
            { legendaryVersion }
          )}
          <br />
          {t(
            'settings.systemInformation.gogdlVersion',
            'Gogdl: {{gogdlVersion}}',
            {
              gogdlVersion
            }
          )}
        </div>
      </div>
    </div>
  )
}

export default React.memo(SoftwareInfo)
