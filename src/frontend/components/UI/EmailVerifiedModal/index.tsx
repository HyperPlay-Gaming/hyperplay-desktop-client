import React, { useEffect, useState } from 'react'
import { EmailVerified, ModalAnimation } from '@hyperplay/ui'

const EmailVerifiedModal = () => {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

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
      <EmailVerified onContinue={close} onClose={close} />
    </ModalAnimation>
  )
}

export default EmailVerifiedModal
