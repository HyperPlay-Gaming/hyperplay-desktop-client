import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@hyperplay/ui'
import { Dialog } from 'frontend/components/UI/Dialog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

interface SteamInstallDialogProps {
  isInstalling: boolean
  setIsInstalling: (value: boolean) => void
  onClose: () => void
  setShowAlert: (value: 'success' | 'danger' | 'none') => void
}

const SteamInstallDialog: React.FC<SteamInstallDialogProps> = ({
  isInstalling,
  setIsInstalling,
  onClose,
  setShowAlert
}) => {
  const { t } = useTranslation()

  const handleInstallSteam = async () => {
    try {
      setIsInstalling(true)
      await window.api.installSteamWindows()
      setShowAlert('success')
      setTimeout(() => setShowAlert('none'), 5000)
      setIsInstalling(false)
      onClose()
    } catch (error) {
      setShowAlert('danger')
      setTimeout(() => setShowAlert('none'), 5000)
      setIsInstalling(false)
    }
  }

  return (
    <Dialog showCloseButton={false} onClose={onClose}>
      <div>
        <h6>{t('Steam Installation')}</h6>
      </div>
      <div>
        <ul>
          <li>
            {t(
              'If you wish to continue, be patient since it can take a few minutes to finish depending on your internet connection and system configuration;',
              'If you wish to continue, be patient since it can take a few minutes to finish depending on your internet connection and system configuration;'
            )}
          </li>
          <li>
            {t(
              'HyperPlay will download and start the Steam for you. Please follow Steam instructions on their installer;',
              'HyperPlay will download and start the Steam for you. Please follow Steam instructions on their installer;'
            )}
          </li>
          <li>
            {t('At the end make sure to', 'At the end make sure to')}{' '}
            <strong>{t("UNCHECK 'Run Steam'", "UNCHECK 'Run Steam'")}</strong>,{' '}
            {t(
              'since it will block HyperPlay configuration until Steam is closed;'
            )}
          </li>
          <li>
            {t(
              'HyperPlay will notify you once the installation is done.',
              'HyperPlay will notify you once the installation is done.'
            )}
          </li>
          <li>
            {t(
              'On first launch Steam will download the necessary files and will take a few minutes to finish and the login screen to appear.',
              'On first launch Steam will download the necessary files and will take a few minutes to finish and the login screen to appear.'
            )}
          </li>
        </ul>
      </div>
      <div className="Dialog__footer" style={{ marginTop: 'var(--space-md)' }}>
        <Button
          type="secondary"
          size="medium"
          onClick={handleInstallSteam}
          disabled={isInstalling}
        >
          {isInstalling ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            t('Install Steam', 'Install Steam')
          )}
        </Button>
        <Button
          type="tertiary"
          size="medium"
          onClick={onClose}
          disabled={isInstalling}
        >
          {t('Cancel Installation', 'Cancel Installation')}
        </Button>
      </div>
    </Dialog>
  )
}

export default SteamInstallDialog
