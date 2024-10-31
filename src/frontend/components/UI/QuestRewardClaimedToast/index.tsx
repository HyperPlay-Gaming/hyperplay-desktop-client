import React from 'react'
import { Reward } from '@hyperplay/utils'
import { ToastQuest } from '@hyperplay/ui'
import Draggable from 'react-draggable'

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
          questAvailable: 'Quest available!',
          questComplete: 'Quest complete!',
          rewardClaimed: 'Claim successful',
          toClaimReward: 'to claim your reward.',
          toSeeDetails: 'to see details.',
          youHaveClaimed: `You have claimed ${totalRewards} reward${
            totalRewards > 1 ? 's' : ''
          }.`
        }}
        onCloseClick={onCloseClick}
        status="claimed"
      />
    </div>
  )

  return draggable ? <Draggable>{toast}</Draggable> : toast
}
