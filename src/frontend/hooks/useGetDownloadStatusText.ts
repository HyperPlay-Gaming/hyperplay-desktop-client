import { useContext } from 'react'
import { GameInfo } from 'common/types'
import { getMessage } from 'frontend/screens/Library/constants'
import { getCardStatus } from 'frontend/screens/Library/components/GameCard/constants'
import { hasStatus } from './hasStatus'
import { useTranslation } from 'react-i18next'
import ContextProvider from 'frontend/state/ContextProvider'
import { ContextType } from 'frontend/types'
import DMQueueState from 'frontend/state/DMQueueState'

export function useGetDownloadStatusText(
  appName: string,
  gameInfo: GameInfo | undefined
) {
  const { status } = hasStatus(appName, gameInfo)
  const { t } = useTranslation('gamepage')
  const { layout } = useContext<ContextType>(ContextProvider)
  const { isInstalling } = getCardStatus(
    status,
    !!gameInfo?.is_installed,
    layout
  )

  function getStatus() {
    if (status === 'distributables') {
      return 'distributables'
    }
    if (status === 'extracting') {
      return 'extracting'
    }
    if (DMQueueState.isPaused(appName)) {
      return 'paused'
    }
    if (isInstalling) {
      return 'installing'
    }
    if (gameInfo?.is_installed) {
      return 'installed'
    }
    return 'installing'
  }

  return { statusText: getMessage(t, getStatus()), status: getStatus() }
}
