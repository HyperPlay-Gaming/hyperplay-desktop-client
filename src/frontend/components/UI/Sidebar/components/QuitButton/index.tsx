import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useTranslation } from 'react-i18next'

const QuitButton: React.FC = () => {
  const { t } = useTranslation()
  return (
    <div
      className="Sidebar__item"
      onClick={() => window.api.quit()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          window.api.quit()
        }
      }}
    >
      <FontAwesomeIcon
        icon={faPowerOff}
        title={t('userselector.quit', 'Quit')}
        size={'xl'}
        color="var(--color-neutral-400)"
      />
    </div>
  )
}

export default QuitButton
