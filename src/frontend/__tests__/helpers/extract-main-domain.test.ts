import { extractMainDomain } from 'frontend/helpers/extract-main-domain'

describe('extractMainDomain', () => {
  it('should correctly extract main domain without subdomain', () => {
    const url = 'https://epicgames.com/store'
    const mainDomain = extractMainDomain(url)
    expect(mainDomain).toEqual('epicgames.com')
  })

  it('should correctly extract main domain with www subdomain', () => {
    const url = 'https://www.epicgames.com/store'
    const mainDomain = extractMainDomain(url)
    expect(mainDomain).toEqual('epicgames.com')
  })

  it('should correctly extract main domain with multiple subdomains', () => {
    const url = 'https://sub.sub.epicgames.com/store'
    const mainDomain = extractMainDomain(url)
    expect(mainDomain).toEqual('epicgames.com')
  })

  it('should return the full domain when no subdomains present', () => {
    const url = 'https://example.com'
    const mainDomain = extractMainDomain(url)
    expect(mainDomain).toEqual('example.com')
  })

  it('return null when url is invalid', () => {
    jest.spyOn(console, 'warn').mockImplementationOnce(jest.fn)
    const url = 'invalid url'
    const mainDomain = extractMainDomain(url)
    expect(mainDomain).toEqual(null)
  })
})
