import { oneDayInMs } from '../getMidnightUTC'
import {
  getPlayStreak,
  GetPlayStreakArgs,
  getPlaytimePercentage
} from '../getPlayStreak'

describe('get playstreak test', () => {
  describe('getPlaytimePercentage', () => {
    test('10%', () => {
      const now = new Date().toUTCString()
      const percentage = getPlaytimePercentage({
        minimumSessionTimeInSeconds: 1000,
        accumulatedPlaytimeTodayInSeconds: 100,
        lastPlaySessionCompletedDateTimeUTC: now
      })
      expect(percentage).toEqual(10)
    })

    test('> 100%', () => {
      const now = new Date().toUTCString()
      const percentage = getPlaytimePercentage({
        minimumSessionTimeInSeconds: 1000,
        accumulatedPlaytimeTodayInSeconds: 10000,
        lastPlaySessionCompletedDateTimeUTC: now
      })
      expect(percentage).toEqual(100)
    })

    test('< 0%', () => {
      const now = new Date().toUTCString()
      const percentage = getPlaytimePercentage({
        minimumSessionTimeInSeconds: 1000,
        accumulatedPlaytimeTodayInSeconds: -100,
        lastPlaySessionCompletedDateTimeUTC: now
      })
      expect(percentage).toEqual(0)
    })

    test('= 0% when timestamp is > 1 UTC day old', () => {
      const old = new Date(Date.now() - 2 * oneDayInMs).toUTCString()
      const percentage = getPlaytimePercentage({
        minimumSessionTimeInSeconds: 1000,
        accumulatedPlaytimeTodayInSeconds: 951,
        lastPlaySessionCompletedDateTimeUTC: old
      })
      expect(percentage).toEqual(0)
    })
  })

  describe('getPlayStreak', () => {
    function testGetPlaystreak(
      args: GetPlayStreakArgs,
      expectedResult: {
        currentStreakInDays: number
        requiredStreakInDays: number
        dailySessionPercentCompleted: number
      }
    ) {
      const {
        /* eslint-disable-next-line */
        getResetTimeInMsSinceEpoch,
        getDailySessionPercentCompleted,
        ...result
      } = getPlayStreak(args)
      const { dailySessionPercentCompleted, ...expected } = expectedResult
      expect(result).toEqual(expected)
      expect(getDailySessionPercentCompleted()).toEqual(
        dailySessionPercentCompleted
      )
    }

    test('3 out of 7 days', () => {
      const now = new Date().toUTCString()
      testGetPlaystreak(
        {
          lastPlaySessionCompletedDateTimeUTC: now,
          requiredStreakInDays: 7,
          currentStreakInDays: 3,
          minimumSessionTimeInSeconds: 100,
          accumulatedPlaytimeTodayInSeconds: 10
        },
        {
          currentStreakInDays: 3,
          requiredStreakInDays: 7,
          dailySessionPercentCompleted: 10
        }
      )
    })

    test('3 out of 7 days but > 2 day UTC old timestamp', () => {
      const old = new Date(Date.now() - 2 * oneDayInMs).toUTCString()
      testGetPlaystreak(
        {
          lastPlaySessionCompletedDateTimeUTC: old,
          requiredStreakInDays: 7,
          currentStreakInDays: 3,
          minimumSessionTimeInSeconds: 100,
          accumulatedPlaytimeTodayInSeconds: 10
        },
        {
          currentStreakInDays: 0,
          requiredStreakInDays: 7,
          dailySessionPercentCompleted: 0
        }
      )
    })

    test('8 out of 7 days', () => {
      const now = new Date().toUTCString()
      testGetPlaystreak(
        {
          lastPlaySessionCompletedDateTimeUTC: now,
          requiredStreakInDays: 7,
          currentStreakInDays: 8,
          minimumSessionTimeInSeconds: 100,
          accumulatedPlaytimeTodayInSeconds: 10
        },
        {
          currentStreakInDays: 7,
          requiredStreakInDays: 7,
          dailySessionPercentCompleted: 10
        }
      )
    })

    test('percentage increments', () => {
      const now = Date.now()
      const twoHoursAgo = new Date(Date.now() - 1000 * 3600 * 2).toUTCString()
      jest.useFakeTimers().setSystemTime(new Date(Date.now() + 1000 * 45))
      testGetPlaystreak(
        {
          lastPlaySessionCompletedDateTimeUTC: twoHoursAgo,
          requiredStreakInDays: 7,
          currentStreakInDays: 8,
          minimumSessionTimeInSeconds: 100,
          accumulatedPlaytimeTodayInSeconds: 10,
          dateTimeCurrentSessionStartedInMsSinceEpoch: now
        },
        {
          currentStreakInDays: 7,
          requiredStreakInDays: 7,
          dailySessionPercentCompleted: 55
        }
      )
    })
  })
})

export {}
