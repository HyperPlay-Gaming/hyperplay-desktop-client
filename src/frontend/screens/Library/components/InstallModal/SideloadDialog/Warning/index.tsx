import React, { useState } from 'react'
import { AlertCard, Typography, Images } from '@hyperplay/ui'

import styles from './index.module.scss'
import { t } from 'i18next'

const { ButtonText } = Typography
const { WarningIcon } = Images

export default function SideloadDialogWarning() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className={styles.container}>
      {isOpen ? (
        <AlertCard
          style={{ maxWidth: 670 }}
          onClose={() => setIsOpen(!isOpen)}
          variant="danger"
          title={t('sideload.warningTitle', 'Important')}
          message={t(
            'sideload.warningMessage',
            'Side-loading a game is a feature intended for developers and experienced power users. Side-loading an installer that contains malware could compromise your computer and lead to theft of funds.'
          )}
        />
      ) : (
        <div
          className={styles.titleContainer}
          onClick={() => setIsOpen(!isOpen)}
        >
          <WarningIcon />
          <ButtonText className={styles.title}>
            {t('sideload.warningTitle', 'Important')}
          </ButtonText>
        </div>
      )}
    </div>
  )
}
