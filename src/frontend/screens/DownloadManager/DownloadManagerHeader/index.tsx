import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  time: 'started' | 'finished' | 'queued'
}

export default function GameListHeader({ time }: Props) {
  const { t } = useTranslation()

  const getTimeLabel = () => {
    switch (time) {
      case 'started':
        return t('download-manager.queue.start-time', 'Started at')
      case 'finished':
        return t('download-manager.queue.end-time', 'Finished at')
      case 'queued':
        return t('download-manager.queue.queue-time', 'Added at')
    }
  }

  return (
    <tr>
      <th>{t('game.title', 'Game Title')}</th>
      <th>{getTimeLabel()}</th>
      <th>{t('download-manager.queue.type', 'Type')}</th>
      <th>{t('game.store', 'Store')}</th>
      <th>{t('wine.actions', 'Action')}</th>
    </tr>
  )
}
