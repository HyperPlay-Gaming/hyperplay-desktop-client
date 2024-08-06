import React, { useState } from 'react'
import { Button, Modal } from '@hyperplay/ui'
import screenshot from 'frontend/assets/g7PortalScreenshot.png'
import styles from './index.module.scss'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

let isShown = true

export function G7CreditsModal() {
  const [showModal, setShowModal] = useState(isShown)
  const { t } = useTranslation()
  const navigate = useNavigate()

  function closeModal() {
    isShown = false
    setShowModal(false)
  }

  return (
    <Modal
      isOpen={showModal}
      onClose={closeModal}
      className={styles.modalContainer}
      classNames={{ root: styles.root }}
      withCloseButton={true}
    >
      <div className="title">
        {t('quests.g7CreditsModal.title', 'Introducing Game7 Credits 🔥')}
      </div>
      <div className="caption">
        {t(
          'quests.g7CreditsModal.description',
          `Dive into HyperPlay's top games with exciting Play Streak Challenges. Each activity encourages you to engage with a different game, showcasing the best of web3 gaming. Your playtime matters!`
        )}
      </div>
      <img src={screenshot} />
      <Button
        type="secondary"
        onClick={() => {
          navigate('/quests?search=Game7')
          closeModal()
        }}
      >
        {t('quests.g7CreditsModal.title', 'Earn Game7 Credits')}
      </Button>
    </Modal>
  )
}
