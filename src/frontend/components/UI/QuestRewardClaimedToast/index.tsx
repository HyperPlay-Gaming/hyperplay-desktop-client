import React from 'react'
import { ToastQuest } from '@hyperplay/ui'
import Draggable from 'react-draggable'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { claimedRewardToastState } from '@hyperplay/quests-ui'

type QuestRewardClaimedToastProps = {
  draggable?: boolean
  className?: string
}

export const QuestRewardClaimedToast = observer(
  ({ draggable = true, className }: QuestRewardClaimedToastProps) => {
    const { t } = useTranslation()

    if (!claimedRewardToastState.claimedReward) {
      return null
    }

    const toast = (
      <div className={className}>
        <ToastQuest
          i18n={{
            overlayToggleKey: 'X',
            overlayToggleModKey: 'option',
            plus: '+',
            questAvailable: t('quest.questAvailable', 'Quest available!'),
            questComplete: t('quest.questComplete', 'Quest complete!'),
            rewardClaimed: t('quest.rewardClaimed', 'Claim successful'),
            toClaimReward: t('quest.toClaimReward', 'to claim your reward.'),
            toSeeDetails: t('quest.toSeeDetails', 'to see details.'),
            youHaveClaimed: t(
              'quest.youHaveClaimed',
              'You have claimed {{totalRewards}} reward{{plural}}.',
              {
                totalRewards: 1,
                plural: ''
              }
            )
          }}
          onCloseClick={() => claimedRewardToastState.clearReward()}
          status="claimed"
        />
      </div>
    )

    return draggable ? <Draggable>{toast}</Draggable> : toast
  }
)
