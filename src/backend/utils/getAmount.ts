import BigNumber from 'bignumber.js'

export function getAmount(amount: number, decimals: number) {
  const ten = new BigNumber(10)
  const exponent = BigNumber(decimals)
  const pow = ten.pow(exponent)
  const amt = new BigNumber(amount)
  const amountInDecimals = amt.multipliedBy(pow)
  return amountInDecimals
}
