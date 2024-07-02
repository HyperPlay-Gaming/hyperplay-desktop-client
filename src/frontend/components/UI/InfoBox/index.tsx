import './index.css'

import { useToggle } from 'frontend/hooks'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { faInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  children: React.ReactNode
  text: string
}

export default function InfoBox({ children, text }: Props) {
  const { on: isHidden, toggle: toggleIsHidden } = useToggle(true)
  const { t } = useTranslation()

  /*
    keys to parse
      t('infobox.help', 'Help')
      t('infobox.requirements')
      t('infobox.warning', 'Warning')
    */

  return (
    <>
      <a
        role={'tooltip'}
        href="#"
        className="helpLink"
        onClick={(e) => {
          e.preventDefault()
          toggleIsHidden()
        }}
        data-testid="infoboxSpan"
      >
        <FontAwesomeIcon className="Dialog__CloseIcon" icon={faInfo} />
        <p>{t(text)}</p>
      </a>
      <div
        style={{ display: isHidden ? 'none' : 'block' }}
        className="infoBox"
        data-testid="infoboxDiv"
      >
        {children}
      </div>
    </>
  )
}
