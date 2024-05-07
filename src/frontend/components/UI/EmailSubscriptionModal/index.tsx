import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalAnimation,
  UpdatesSubscriptionModal,
  Images
} from '@hyperplay/ui'
import { observer } from 'mobx-react-lite'
import emailSubscriptionState from '../../../state/EmailSubscriptionState'
import { useFlags } from 'launchdarkly-react-client-sdk'
import { useMutation } from 'react-query'
import { DEV_PORTAL_URL } from '../../../../common/constants'
import { MODAL_ANIMATION_DURATION } from '../../../constants'
import { newsLetterStore } from '../../../helpers/electronStores'
import styles from './index.module.scss'
import { t } from 'i18next'

const EmailSubscriptionModal = () => {
  const flags = useFlags()
  const [submittedEmail, setSubmittedEmail] = useState<string>()
  const isEnabled = flags.emailSubscriptionModal

  const handleClose = () => {
    emailSubscriptionState.closeEmailModal()
    setTimeout(() => {
      setSubmittedEmail(undefined)
    }, MODAL_ANIMATION_DURATION)
  }

  const { mutate, error, isLoading } = useMutation(
    'newsletter/subscribe',
    async (email: string) => {
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
    },
    {
      onSuccess: (email) => {
        setSubmittedEmail(email)
        newsLetterStore.set('subscribed', true)
        setTimeout(() => {
          emailSubscriptionState.closeEmailModal()
        }, 3000)
      }
    }
  )

  useEffect(() => {
    return () => {
      setSubmittedEmail(undefined)
    }
  }, [])

  if (submittedEmail) {
    return (
      <Modal
        withCloseButton
        isOpen={isEnabled && emailSubscriptionState.isEmailModalOpen}
        onClose={handleClose}
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
        </Modal.Header>
      </Modal>
    )
  }

  return (
    <ModalAnimation
      isOpen={isEnabled && emailSubscriptionState.isEmailModalOpen}
      onClose={handleClose}
    >
      <UpdatesSubscriptionModal
        loading={isLoading}
        onSubmit={mutate}
        onCancel={handleClose}
        error={error ? 'Something went wrong. Please try again.' : undefined}
        onClose={handleClose}
      />
    </ModalAnimation>
  )
}

export default observer(EmailSubscriptionModal)
