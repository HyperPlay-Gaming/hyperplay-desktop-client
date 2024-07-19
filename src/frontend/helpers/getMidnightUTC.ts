export const oneDayInMs = 24 * 60 * 60 * 1000

export function getMidnightUTCTimestamp(timeDiff = oneDayInMs) {
  // Get the current date and time in UTC
  const now = new Date()

  // Get the timestamp for the next 00:00:00 UTC by adding 24 hours and then flooring it to the nearest day
  const nextMidnight = new Date(now.getTime() + timeDiff)
  nextMidnight.setUTCHours(0, 0, 0, 0)

  return nextMidnight.valueOf()
}
