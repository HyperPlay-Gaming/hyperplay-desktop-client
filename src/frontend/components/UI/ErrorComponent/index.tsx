import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import {
  faHeartCrack,
  faPowerOff,
  faSyncAlt,
  faTrash
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './index.css'
import ContextProvider from 'frontend/state/ContextProvider'
import libraryState from 'frontend/state/libraryState'

export default function ErrorComponent({ message }: { message: string }) {
  const { t } = useTranslation()
  const { showResetDialog } = useContext(ContextProvider)

  return (
    <div className="errorComponent">
      <FontAwesomeIcon icon={faHeartCrack} />
      <span className="errorText">{message}</span>
      <span className="buttonsWrapper">
        <button
          className="button is-footer"
          onClick={async () =>
            libraryState.refreshLibrary({
              runInBackground: false
            })
          }
        >
          <div className="button-icontext-flex">
            <div className="button-icon-flex">
              <FontAwesomeIcon className="refreshIcon" icon={faSyncAlt} />
            </div>
            <span className="button-icon-text">
              {t('generic.library.refresh', 'Refresh Library')}
            </span>
          </div>
        </button>

        <button
          className="button is-footer is-danger"
          onClick={() => window.api.clearCache(true, false)}
        >
          <div className="button-icontext-flex">
            <div className="button-icon-flex">
              <FontAwesomeIcon className="Dialog__CloseIcon" icon={faTrash} />
            </div>
            <span className="button-icon-text">
              {t('settings.clear-cache', 'Clear HyperPlay Cache')}
            </span>
          </div>
        </button>

        <button
          className="button is-footer is-danger"
          onClick={showResetDialog}
        >
          <div className="button-icontext-flex">
            <div className="button-icon-flex">
              <FontAwesomeIcon
                className="Dialog__CloseIcon"
                icon={faPowerOff}
              />
            </div>
            <span className="button-icon-text">
              {t('settings.reset-hyperplay', 'Reset HyperPlay')}
            </span>
          </div>
        </button>
      </span>
    </div>
  )
}
