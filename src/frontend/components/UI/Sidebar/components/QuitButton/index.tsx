import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useTranslation } from 'react-i18next'

const QuitButton: React.FC = () => {
  const { t } = useTranslation()
  return (
    <div className="Sidebar__item">
      <button onClick={() => window.api.quit()}>
        <FontAwesomeIcon
          icon={faPowerOff}
          title={t('userselector.quit', 'Quit')}
          size={'xl'}
          color="var(--color-neutral-400)"
        />
      </button>
    </div>
  )
}

export default QuitButton
