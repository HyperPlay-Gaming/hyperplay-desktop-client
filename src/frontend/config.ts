import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(mainnet.rpcUrls.default[0]),
    [sepolia.id]: http(sepolia.rpcUrls.default[0])
  }
})
