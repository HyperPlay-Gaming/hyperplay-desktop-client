import { createConfig, http } from 'wagmi'
import { Chain, hardhat, mainnet, polygon } from 'wagmi/chains'
import { chainMap, parseChainMetadataToViemChain } from '@hyperplay/chains'
import { injected, walletConnect } from 'wagmi/connectors'

let chainsToSupport: Chain[] = []
const transports: { [key: number]: unknown } = {}

for (const chainId in chainMap) {
  const chainMetadata = chainMap[chainId]
  try {
    const chain = parseChainMetadataToViemChain(chainMetadata)
    chainsToSupport.push(chain)
    transports[chain.id] = http(chainMetadata.chain.rpc[0])
    // eslint-disable-next-line no-empty
  } catch (error) {}
}

// add hardhat chain for development
chainsToSupport = chainsToSupport.filter((chain) => chain.id !== hardhat.id)
chainsToSupport.push(hardhat)

const projectId = '878099c5ebd1a07a3785ec7ebee59ba6'

export const config = createConfig({
  connectors: [injected(), walletConnect({ projectId })],

  // @ts-expect-error: Chain[] is a valid type for chains but wagmi a constant assertion which we can't do since the array is dynamic
  chains: chainsToSupport,
  transports: {
    ...transports,
    [mainnet.id]: http('https://rpc.valist.io/mainnet'),
    [polygon.id]: http('https://rpc.valist.io/polygon')
  }
})
