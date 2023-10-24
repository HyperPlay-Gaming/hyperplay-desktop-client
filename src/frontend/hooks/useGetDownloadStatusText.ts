import { useContext } from 'react'
import { GameInfo } from 'common/types'
import { getMessage } from 'frontend/screens/Library/constants'
import { getCardStatus } from 'frontend/screens/Library/components/GameCard/constants'
import { hasStatus } from './hasStatus'
import { useTranslation } from 'react-i18next'
import ContextProvider from 'frontend/state/ContextProvider'
import { useGetDmState } from './useGetDmState'

export function useGetDownloadStatusText(
  appName: string,
  gameInfo: GameInfo | undefined
) {
  const dmState = useGetDmState()
  const { status } = hasStatus(appName, gameInfo)
  const { t } = useTranslation('gamepage')
  const { layout } = useContext(ContextProvider)
  const { isInstalling } = getCardStatus(
    status,
    !!gameInfo?.is_installed,
    layout
  )

  function getStatus() {
    if (status === 'extracting') {
      return 'extracting'
    }
    if (dmState === 'paused') {
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
