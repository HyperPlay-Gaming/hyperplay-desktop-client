import { parseUrl } from '../../backend/protocol'

jest.mock('electron')
jest.mock('../logger/logger')
jest.mock('../logger/logfile')
jest.mock('../dialog/dialog')

describe('backend/protocol.ts', () => {
  test('email confirmation url is parsed', () => {
    const emailConfirmationUrl = 'https://www.npmjs.com/'
    const url =
      'hyperplay://email-confirmation?url=' +
      encodeURIComponent(emailConfirmationUrl)

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars*/
    const [command, runner, arg = ''] = parseUrl(url)

    const decodedEmailConfirmationUrl = decodeURIComponent(arg)
    expect(decodedEmailConfirmationUrl).toEqual(emailConfirmationUrl)
  })

  test('email confirmation url with trailing / is parsed', () => {
    const emailConfirmationUrl = 'https://www.npmjs.com/'
    const url =
      'hyperplay://email-confirmation/?url=' +
      encodeURIComponent(emailConfirmationUrl)

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars*/
    const [command, runner, arg = ''] = parseUrl(url)

    const decodedEmailConfirmationUrl = decodeURIComponent(arg)
    expect(decodedEmailConfirmationUrl).toEqual(emailConfirmationUrl)
  })
})
