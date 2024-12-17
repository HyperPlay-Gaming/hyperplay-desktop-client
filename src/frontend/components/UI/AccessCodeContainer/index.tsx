import React, { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import useAuthSession from 'frontend/hooks/useAuthSession'
import gameRequiresAccessCodes from 'frontend/helpers/gameRequiresAccessCodes'
import { GameInfo } from 'common/types'
import { AlertCard } from '@hyperplay/ui'

type AccessCodeContainerProps = {
  children: ReactNode
  warningMessage: string
  gameInfo: GameInfo
  channelNameToInstall: string
  matchingRunner?: boolean
}

const AccessCodeContainer = ({
  children,
  warningMessage,
  matchingRunner = true,
  gameInfo,
  channelNameToInstall
}: AccessCodeContainerProps) => {
  const { t } = useTranslation()
  const { isSignedIn } = useAuthSession()

  const channelRequiresAccessCode = gameInfo
    ? gameRequiresAccessCodes(gameInfo, channelNameToInstall)
    : false

  let accessCodeContent = null

  if (channelRequiresAccessCode && matchingRunner) {
    if (!isSignedIn) {
      accessCodeContent = (
        <AlertCard
          showClose={false}
          title={t('installModal.loginRequired', 'Login Required')}
          message={warningMessage}
          variant="warning"
        />
      )
    } else {
      accessCodeContent = children
    }
  }

  return <>{accessCodeContent}</>
}

export default AccessCodeContainer
