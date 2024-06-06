import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalAnimation,
  UpdatesSubscriptionModal,
  Images,
  Button
} from '@hyperplay/ui'
import { observer } from 'mobx-react-lite'
import emailSubscriptionState from '../../../state/EmailSubscriptionState'
import { useFlags } from 'launchdarkly-react-client-sdk'
import { useMutation } from '@tanstack/react-query'
import { DEV_PORTAL_URL } from '../../../../common/constants'
import { MODAL_ANIMATION_DURATION } from '../../../constants'
import { newsLetterStore } from '../../../helpers/electronStores'
import styles from './index.module.scss'
import { useTranslation } from 'react-i18next'

const EmailSubscriptionModal = () => {
  const flags = useFlags()
  const [submittedEmail, setSubmittedEmail] = useState<string>()
  const isEnabled = flags.emailSubscriptionModal
  const { t } = useTranslation()

  const handleDismissed = () => {
    newsLetterStore.set('skipped', true)
    closeModal()
  }

  const closeModal = () => {
    emailSubscriptionState.closeEmailModal()
    setTimeout(() => {
      setSubmittedEmail(undefined)
    }, MODAL_ANIMATION_DURATION)
  }

  const { mutate, error, status } = useMutation({
    mutationKey: ['newsletter/subscribe'],
    onSuccess: (email) => {
      setSubmittedEmail(email)
      newsLetterStore.set('subscribed', true)
    },
    mutationFn: async (email: string) => {
      const request = await fetch(`${DEV_PORTAL_URL}/api/v1/newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })

      if (!request.ok) {
        throw new Error('Error sending email')
      }

      return email
    }
  })

  useEffect(() => {
    return () => {
      setSubmittedEmail(undefined)
    }
  }, [])

  if (submittedEmail) {
    return (
      <Modal
        isOpen={isEnabled && emailSubscriptionState.isEmailModalOpen}
        onClose={closeModal}
        classNames={{ root: styles.root }}
      >
        <Modal.HeadingIcon className={styles.emailRoundedIcon}>
          <Images.Email width={20} height={20} className={styles.icon} />
        </Modal.HeadingIcon>
        <Modal.Header>
          <Modal.Title>
            {t('email_subscription.title', 'Thank you for subscribing!')}
          </Modal.Title>
          <Modal.Body>
            {t(
              'email_subscription.subtitle',
              `You’re now a part of our community, and we’re excited to share valuable updates and insights with you.`
            )}
          </Modal.Body>
          <Button
            type="secondary"
            className={styles.manualClose}
            onClick={closeModal}
          >
            Close
          </Button>
        </Modal.Header>
      </Modal>
    )
  }

  return (
    <ModalAnimation
      isOpen={isEnabled && emailSubscriptionState.isEmailModalOpen}
      onClose={() => {}}
    >
      <UpdatesSubscriptionModal
        loading={status === 'pending'}
        onSubmit={mutate}
        onCancel={handleDismissed}
        error={error ? 'Something went wrong. Please try again.' : undefined}
        onClose={handleDismissed}
      />
    </ModalAnimation>
  )
}

export default observer(EmailSubscriptionModal)
