import { Trans, useTranslation } from 'react-i18next'
import { Button, Images, Modal, ModalProps } from '@hyperplay/ui'
import styles from './index.module.scss'
import React from 'react'

interface ConfirmProps extends ModalProps {
  networkName: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmClaimModal(props: ConfirmProps) {
  const { t } = useTranslation()
  return (
    <Modal {...props} classNames={{ root: styles.confirmModal }}>
      <Images.AlertTriangle
        className={styles.alertIcon}
        width={24}
        height={24}
      />
      <div className={styles.confirmTextWrapper}>
        <Modal.Body className={styles.confirmText}>
          <Modal.Title>
            {t('quest.claimWarning.title', 'Confirm Quest Reward Claim')}
          </Modal.Title>
          <div>
            <Trans
              i18nKey="quest.claimWarning.body"
              defaultValue="<bold>IMPORTANT:</bold> Please ensure that you are allocating enough gas on the {{networkName}} network for the transaction to be successfully confirmed <bold>within 24 hrs.</bold>"
              values={{ networkName: props.networkName }}
              components={{ bold: <span className="text--bold" /> }}
            />
          </div>
          <div>
            <Trans
              i18nKey="quest.claimWarning.body2"
              defaultValue="Otherwise, the Quest Reward <bold>will expire and will no longer be claimable.</bold>"
              values={{ networkName: props.networkName }}
              components={{ bold: <span className="text--bold" /> }}
            />
          </div>
        </Modal.Body>
        <div className={styles.buttonsContainer}>
          <Button type="tertiary" onClick={props.onCancel}>
            {t('quest.claimWarning.cancel', 'Cancel')}
          </Button>
          <Button type="secondary" onClick={props.onConfirm}>
            {t('quest.claimWarning.confirm', 'Confirm')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
