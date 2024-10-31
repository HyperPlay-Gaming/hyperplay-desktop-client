import React from 'react'
import { Reward } from '@hyperplay/utils'
import { ToastQuest } from '@hyperplay/ui'
import Draggable from 'react-draggable'
import { useTranslation } from 'react-i18next'

type QuestRewardClaimedToastProps = {
  onCloseClick: () => void
  rewards: Reward[] | null
  draggable?: boolean
  className?: string
}

export function QuestRewardClaimedToast({
  onCloseClick,
  rewards,
  draggable = true,
  className
}: QuestRewardClaimedToastProps) {
  const { t } = useTranslation()

  if (!rewards?.length) {
    return null
  }

  const totalRewards = rewards.length

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
              totalRewards,
              plural: totalRewards > 1 ? 's' : ''
            }
          )
        }}
        onCloseClick={onCloseClick}
        status="claimed"
      />
    </div>
  )

  return draggable ? <Draggable>{toast}</Draggable> : toast
}
