import { Quest, UserPlayStreak } from 'common/types'
import { getNextMidnightTimestamp } from './getMidnightUTC'

export function getPlayStreakDays(
  questMeta: Quest,
  questPlayStreakData: UserPlayStreak | undefined
) {
  const requiredStreakInDays =
    questMeta.eligibility?.play_streak?.required_playstreak_in_days ?? 0
  let currentStreakInDays = questPlayStreakData?.current_playstreak_in_days ?? 0
  if (currentStreakInDays > requiredStreakInDays) {
    currentStreakInDays = requiredStreakInDays
  }
  return { requiredStreakInDays, currentStreakInDays }
}

export function getPlayStreak(
  questMeta: Quest,
  questPlayStreakData: UserPlayStreak | undefined
) {
  const { currentStreakInDays, requiredStreakInDays } = getPlayStreakDays(
    questMeta,
    questPlayStreakData
  )
  return {
    resetTimeInMsSinceEpoch: getNextMidnightTimestamp(),
    currentStreakInDays,
    requiredStreakInDays
  }
}
