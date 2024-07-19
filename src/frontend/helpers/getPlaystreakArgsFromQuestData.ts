import { Quest, UserPlayStreak } from 'common/types'
import { GetPlayStreakArgs } from './getPlayStreak'

// this is initialized when the overlay is started for this game
const dateTimeCurrentSessionStartedInMsSinceEpoch = Date.now()

export function getPlaystreakArgsFromQuestData(
  questMeta: Quest,
  questPlayStreakData: UserPlayStreak | undefined
): GetPlayStreakArgs {
  return {
    requiredStreakInDays:
      questMeta?.eligibility?.play_streak.required_playstreak_in_days ?? 0,
    currentStreakInDays: questPlayStreakData?.current_playstreak_in_days ?? 0,
    minimumSessionTimeInSeconds:
      questMeta?.eligibility?.play_streak.minimum_session_time_in_seconds ?? 0,
    lastPlaySessionCompletedDateTimeUTC:
      questPlayStreakData?.last_play_session_completed_datetime ??
      new Date().toUTCString(),
    accumulatedPlaytimeTodayInSeconds:
      questPlayStreakData?.accumulated_playtime_today_in_seconds ?? 0,
    dateTimeCurrentSessionStartedInMsSinceEpoch
  }
}
