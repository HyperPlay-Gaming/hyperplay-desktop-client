import React from 'react'
import { useTranslation } from 'react-i18next'

import { useAwaited } from 'frontend/hooks/useAwaited'

import { ReactComponent as SteamDeckLogo } from 'frontend/assets/steam-deck-logo.svg'

import CPUCard from './cpu'
import MemoryProgress from './memory'
import GPUCard from './gpu'
import OSInfo from './os'
import SoftwareInfo from './software'

import './index.scss'

import type { SystemInformation } from 'backend/utils/systeminfo'
import { Button, LoadingSpinner } from '@hyperplay/ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import styles from './index.module.scss'

interface SystemSpecificationsProps {
  systemInformation: SystemInformation
}

function SystemSpecifications({
  systemInformation
}: SystemSpecificationsProps) {
  return (
    <>
      <CPUCard cpu={systemInformation.CPU} />
      <MemoryProgress memory={systemInformation.memory} />
      {systemInformation.GPUs.map((gpu, index) => (
        <div key={index}>
          <GPUCard
            gpu={gpu}
            gpuNumber={index}
            showNumber={systemInformation.GPUs.length !== 1}
          />
        </div>
      ))}
    </>
  )
}

function SteamDeckSystemSpecifications({
  systemInformation
}: SystemSpecificationsProps) {
  const { t } = useTranslation()

  return (
    <>
      <div>
        <h6>{t('settings.systemInformation.systemModel', 'System Model:')}</h6>
        <div>
          <div>
            <SteamDeckLogo className="logo fillWithThemeColor" />
          </div>
          <div>{t('settings.systemInformation.steamDeck', 'Steam Deck')}</div>
        </div>
      </div>
      <details>
        <summary className="showSystemSpecifications">
          {t(
            'settings.systemInformation.showDetailed',
            'Show detailed system specifications'
          )}
        </summary>
        <SystemSpecifications systemInformation={systemInformation} />
      </details>
    </>
  )
}

export default function SystemInfo() {
  const { t } = useTranslation()

  const systemInformation = useAwaited(async () =>
    window.api.systemInfo.get(false)
  )
  if (!systemInformation) return <LoadingSpinner />

  return (
    <div style={{ width: '770px', textAlign: 'start' }} className="systeminfo">
      <h5 style={{ marginBottom: 'var(--space-xs)' }}>
        {t('settings.navbar.systemInformation', 'System Information')}
      </h5>
      <div className={styles.gridContainer}>
        {systemInformation.isSteamDeck ? (
          <SteamDeckSystemSpecifications
            systemInformation={systemInformation}
          />
        ) : (
          <SystemSpecifications systemInformation={systemInformation} />
        )}
        <OSInfo
          os={systemInformation.OS}
          isFlatpak={systemInformation.isFlatpak}
        />
        <div>
          <SoftwareInfo software={systemInformation.softwareInUse} />
        </div>
      </div>
      <Button
        className="copyToClipboardButton"
        type="secondary"
        leftIcon={<FontAwesomeIcon icon={faCopy} />}
        onClick={window.api.systemInfo.copyToClipboard}
      >
        {t('settings.systemInformation.copyToClipboard', 'Copy to clipboard')}
      </Button>
    </div>
  )
}
