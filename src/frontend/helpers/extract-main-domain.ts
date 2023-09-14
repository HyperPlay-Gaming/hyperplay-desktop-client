export function extractMainDomain(url: string) {
  try {
    const domain = new URL(url).hostname
    const parts = domain.split('.')

    if (parts.length >= 2) {
      return parts.slice(-2).join('.')
    }

    return domain
  } catch (e) {
    console.warn(e)
    return null
  }
}
