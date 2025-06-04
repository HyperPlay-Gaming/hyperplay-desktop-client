import React, { useState } from 'react'
import { AlertCard, Images, Typography } from '@hyperplay/ui'
import styles from './index.module.scss'
import { t } from 'i18next'

export default function SideloadDialogWarning() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className={styles.container}>
      {isOpen ? (
        <AlertCard
          icon={<Images.AlertOctagon />}
          style={{ maxWidth: 670 }}
          onClose={() => setIsOpen(!isOpen)}
          variant="error"
          title={t('sideload.warningTitle', 'Important')}
          message={t(
            'sideload.warningMessage',
            'Side-loading a game is a feature intended for developers and experienced power users. Side-loading an installer that contains malware could compromise your computer and lead to theft of funds.'
          )}
        />
      ) : (
        <button
          className={styles.warningAlert}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Images.AlertOctagon className={styles.warningAlertIcon} />
          <Typography.Button>
            {t('sideload.warningTitle', 'Important')}
          </Typography.Button>
        </button>
      )}
    </div>
  )
}
