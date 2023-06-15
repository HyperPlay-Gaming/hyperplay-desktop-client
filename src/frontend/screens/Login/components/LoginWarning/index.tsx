import './index.scss'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader
} from 'frontend/components/UI/Dialog'
import { useTranslation } from 'react-i18next'
import { epicLoginPath, gogLoginPath } from '../..'
import { NavLink } from 'react-router-dom'
import { Button } from '@hyperplay/ui'

interface LoginWarningProps {
  warnLoginForStore: null | 'epic' | 'gog'
  onClose: () => void
}

const LoginWarning = function ({
  warnLoginForStore,
  onClose
}: LoginWarningProps) {
  const { t } = useTranslation('gamepage')

  if (!warnLoginForStore) {
    return null
  }

  let textContent = ''
  if (warnLoginForStore === 'epic') {
    textContent = t(
      'not_logged_in.epic',
      "You are not logged in with an Epic account in HyperPlay. Don't use the store page to login, click the following button instead:"
    )
  } else if (warnLoginForStore === 'gog') {
    textContent = t(
      'not_logged_in.gog',
      "You are not logged in with a GOG account in HyperPlay. Don't use the store page to login, click the following button instead:"
    )
  }

  return (
    <Dialog onClose={onClose} className="notLoggedIn" showCloseButton={true}>
      <DialogHeader onClose={onClose}>
        {t('not_logged_in.title', 'You are NOT logged in')}
      </DialogHeader>
      <DialogContent>
        <div className="body">{textContent}</div>
        <NavLink
          to={warnLoginForStore === 'gog' ? gogLoginPath : epicLoginPath}
        >
          <Button type="primary">{t('not_logged_in.login', 'Log in')}</Button>
        </NavLink>
      </DialogContent>
    </Dialog>
  )
}

export default LoginWarning
