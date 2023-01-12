const getWalletText = (address: string) =>
  address ? truncateAddress(address) : '???'

export default getWalletText

const truncateAddress = (address: string) => {
  return address.substring(0, 6) + '..' + address.substring(address.length - 4)
}
