import React, { useEffect, useState } from 'react'
import { EmailVerified, ModalAnimation } from '@hyperplay/ui'
import authState from 'frontend/state/authState'

const EmailVerifiedModal = () => {
  const [open, setOpen] = useState(false)
  const close = () => {
    setOpen(false)
    authState.closeSignInModal()
  }

  useEffect(() => {
    const emailConfirmedCleanup = window.api.handleEmailConfirmed(() => {
      setOpen(true)
    })

    return () => {
      emailConfirmedCleanup()
    }
  }, [])

  return (
    <ModalAnimation isOpen={open} onClose={close}>
      <EmailVerified onContinue={close} />
    </ModalAnimation>
  )
}

export default EmailVerifiedModal
