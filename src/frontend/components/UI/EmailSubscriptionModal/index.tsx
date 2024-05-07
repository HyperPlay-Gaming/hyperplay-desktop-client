import React, { useEffect, useState } from 'react'
import {
  CheckEmail,
  ModalAnimation,
  UpdatesSubscriptionModal
} from '@hyperplay/ui'
import { observer } from 'mobx-react-lite'
import emailSubscriptionState from '../../../state/EmailSubscriptionState'
import { useFlags } from 'launchdarkly-react-client-sdk'
import { useMutation } from 'react-query'
import { DEV_PORTAL_URL } from '../../../../common/constants'
import { MODAL_ANIMATION_DURATION } from '../../../constants'
import { newsLetterStore } from '../../../helpers/electronStores'

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
      const request = await fetch(`${DEV_PORTAL_URL}/api/newsletter`, {
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
      <ModalAnimation
        isOpen={isEnabled && emailSubscriptionState.isEmailModalOpen}
        onClose={handleClose}
      >
        <CheckEmail
          onClose={handleClose}
          email={submittedEmail}
          onResend={() => mutate(submittedEmail)}
        />
      </ModalAnimation>
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
