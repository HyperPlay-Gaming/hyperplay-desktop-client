import { Reward } from '@hyperplay/utils'
import { useState, useCallback } from 'react'

export const useClaimedRewards = () => {
  const [claimedRewards, setClaimedRewards] = useState<Reward[] | null>(null)

  const handleRewardsClaim = useCallback((rewards: Reward[]) => {
    setClaimedRewards(rewards)
    setTimeout(() => {
      setClaimedRewards(null)
    }, 5000)
  }, [])

  const onClose = useCallback(() => {
    setClaimedRewards(null)
  }, [])

  return {
    claimedRewards,
    handleRewardsClaim,
    onClose
  }
}
