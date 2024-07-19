import { PlayStreakEligibility } from '@hyperplay/ui'
import { getMidnightUTCTimestamp, oneDayInMs } from './getMidnightUTC'

function questWillResetOnNextSession(
  lastPlaySessionCompletedDateTimeUTC: string
): boolean {
  if (lastPlaySessionCompletedDateTimeUTC === undefined) {
    return true
  }

  const lastSessionInMsSinceEpoch = new Date(
    lastPlaySessionCompletedDateTimeUTC
  ).valueOf()
  if (lastSessionInMsSinceEpoch < getMidnightUTCTimestamp(-1 * oneDayInMs)) {
    return true
  }
  return false
}

function getPlayStreakDays(
  lastPlaySessionCompletedDateTimeUTC: string,
  requiredStreakInDays: number,
  currentStreakInDays: number
) {
  if (questWillResetOnNextSession(lastPlaySessionCompletedDateTimeUTC)) {
    return { requiredStreakInDays, currentStreakInDays: 0 }
  }
  currentStreakInDays = Math.min(currentStreakInDays, requiredStreakInDays)
  currentStreakInDays = Math.max(currentStreakInDays, 0)
  return { requiredStreakInDays, currentStreakInDays }
}

interface GetPlaytimePercentageArgs {
  minimumSessionTimeInSeconds: number
  accumulatedPlaytimeTodayInSeconds: number
  lastPlaySessionCompletedDateTimeUTC: string
  dateTimeCurrentSessionStartedInMsSinceEpoch?: number
}

export function getPlaytimePercentage({
  minimumSessionTimeInSeconds,
  accumulatedPlaytimeTodayInSeconds,
  lastPlaySessionCompletedDateTimeUTC,
  dateTimeCurrentSessionStartedInMsSinceEpoch
}: GetPlaytimePercentageArgs) {
  if (questWillResetOnNextSession(lastPlaySessionCompletedDateTimeUTC)) {
    return 0
  }

  if (dateTimeCurrentSessionStartedInMsSinceEpoch) {
    const unrecordedPlaytimeInMs =
      Date.now() - dateTimeCurrentSessionStartedInMsSinceEpoch
    accumulatedPlaytimeTodayInSeconds += unrecordedPlaytimeInMs / 1000
  }

  let percentageCompleted = Math.round(
    (accumulatedPlaytimeTodayInSeconds / minimumSessionTimeInSeconds) * 100
  )
  percentageCompleted = Math.min(percentageCompleted, 100)
  percentageCompleted = Math.max(percentageCompleted, 0)
  return percentageCompleted
}

export interface GetPlayStreakArgs extends GetPlaytimePercentageArgs {
  requiredStreakInDays: number
  currentStreakInDays: number
}

export function getPlayStreak({
  minimumSessionTimeInSeconds,
  accumulatedPlaytimeTodayInSeconds,
  lastPlaySessionCompletedDateTimeUTC,
  requiredStreakInDays,
  currentStreakInDays,
  dateTimeCurrentSessionStartedInMsSinceEpoch
}: GetPlayStreakArgs): PlayStreakEligibility {
  const {
    currentStreakInDays: currentStreakInDaysToDisplay,
    requiredStreakInDays: requiredStreakInDaysToDisplay
  } = getPlayStreakDays(
    lastPlaySessionCompletedDateTimeUTC,
    requiredStreakInDays,
    currentStreakInDays
  )
  return {
    getResetTimeInMsSinceEpoch: getMidnightUTCTimestamp,
    currentStreakInDays: currentStreakInDaysToDisplay,
    requiredStreakInDays: requiredStreakInDaysToDisplay,
    getDailySessionPercentCompleted: () =>
      getPlaytimePercentage({
        minimumSessionTimeInSeconds,
        accumulatedPlaytimeTodayInSeconds,
        lastPlaySessionCompletedDateTimeUTC,
        dateTimeCurrentSessionStartedInMsSinceEpoch
      })
  }
}
