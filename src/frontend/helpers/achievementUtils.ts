export function isTimestampInPast(unixTimestamp: number) {
  const currentTime = new Date().getTime()
  const timestampInMilliseconds = unixTimestamp * 1000 // Convert to milliseconds

  return timestampInMilliseconds < currentTime
}
