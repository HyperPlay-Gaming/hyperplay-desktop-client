import { addressAtom } from 'frontend/store/Wallet'
import { atom } from 'jotai'

const walletTextAtom = atom<string>((get) => {
  const address = get(addressAtom)
  const processedAddress = address ? truncateAddress(address) : '???'

  return processedAddress
})

export default walletTextAtom

const truncateAddress = (address: string) => {
  return address.substring(0, 6) + '..' + address.substring(address.length - 4)
}
