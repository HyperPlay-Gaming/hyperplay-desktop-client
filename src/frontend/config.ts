import { createConfig, http } from 'wagmi'
import { Chain, hardhat, mainnet, polygon } from 'wagmi/chains'
import { chainMap, parseChainMetadataToViemChain } from '@hyperplay/chains'

let chainsToSupport: Chain[] = []
const transports = {}

for (const chainId in chainMap) {
  const chainMetadata = chainMap[chainId]
  try {
    const chain = parseChainMetadataToViemChain(chainMetadata)
    // @ts-expect-error: the function is valid, there is just a mismatch in the types due to different versions of viem
    chainsToSupport.push(chain)
    transports[chain.id] = http(chainMetadata.chain.rpc[0])
    // eslint-disable-next-line no-empty
  } catch (error) {}
}

// add hardhat chain for development
chainsToSupport = chainsToSupport.filter((chain) => chain.id !== hardhat.id)
chainsToSupport.push(hardhat)

export const config = createConfig({
  // @ts-expect-error: Chain[] is a valid type for chains but wagmi a constant assertion which we can't do since the array is dynamic
  chains: chainsToSupport,
  transports: {
    ...transports,
    [mainnet.id]: http('https://rpc.valist.io/mainnet'),
    [polygon.id]: http('https://rpc.valist.io/polygon')
  }
})
