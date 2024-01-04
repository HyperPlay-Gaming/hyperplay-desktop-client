function getDomainNameFromHostName(url: URL) {
  const domainNameParts = url.hostname.split('.')
  if (domainNameParts.length < 3) return url.hostname
  return domainNameParts[1] + '.' + domainNameParts[2]
}

export function domainsAreEqual(url: URL, otherUrl: URL) {
  if (url.hostname === otherUrl.hostname) return true
  const urlDomain = getDomainNameFromHostName(url)
  const otherUrlDomain = getDomainNameFromHostName(otherUrl)
  if (urlDomain === otherUrlDomain) return true
  return false
}

export function isTimestampInPast(unixTimestamp: number) {
  const currentTime = new Date().getTime()
  const timestampInMilliseconds = unixTimestamp * 1000 // Convert to milliseconds

  return timestampInMilliseconds < currentTime
}
