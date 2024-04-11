import { getAmount } from '../getAmount'

describe('getAmount util', () => {
  test('get amount of 10 with 18 decimals', () => {
    const amt = getAmount(10, 18).toString()
    expect(amt).toBe('10000000000000000000')
  })

  test('get amount with 6 decimals', () => {
    const amt = getAmount(12312312, 6).toString()
    expect(amt).toBe('12312312000000')
  })

  test('get amount of fraction with 18 decimals', () => {
    const amt = getAmount(1.5, 18).toString()
    expect(amt).toBe('1500000000000000000')
  })
})
