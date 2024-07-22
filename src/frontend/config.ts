import { createConfig, http } from 'wagmi'
import { Chain, hardhat, mainnet, polygon } from 'wagmi/chains'
import { chainMap } from '@hyperplay/chains'

type RpcUrls = {
  http: string[]
  webSocket?: string[]
}

type ChainMetadata = typeof chainMap[keyof typeof chainMap]

export function parseChainMetadataToWagmiChain(
  chainMetadata: ChainMetadata
): Chain {
  const validRpcs = chainMetadata.chain.rpc.filter(
    (rpc) => !rpc.includes(`\${`)
  )

  const defaultRpcUrl = validRpcs[0]

  if (!defaultRpcUrl) {
    throw new Error('defaultRpcUrl is not defined')
  }

  const rpcUrls: Record<string, RpcUrls> = validRpcs.reduce((acc, url) => {
    acc[url] = {
      http: [url]
    }
    return acc
  }, {} as Record<string, RpcUrls>)

  const wagmiChain: Chain = {
    id: chainMetadata.chain.chainId,
    name: chainMetadata.chain.name,
    nativeCurrency: {
      name: chainMetadata.chain.nativeCurrency.name,
      symbol: chainMetadata.chain.nativeCurrency.symbol,
      decimals: chainMetadata.chain.nativeCurrency.decimals
    },
    rpcUrls: {
      ...rpcUrls,
      default: {
        http: [defaultRpcUrl]
      },
      public: {
        http: [defaultRpcUrl]
      }
    }
  }

  if (
    chainMetadata.chain.explorers &&
    chainMetadata.chain.explorers.length > 0
  ) {
    const defaultExplorer = chainMetadata.chain.explorers[0]

    const otherExplorers = chainMetadata.chain.explorers
      .slice(1)
      .reduce((acc, explorer) => {
        acc[explorer.name] = {
          name: explorer.name,
          url: explorer.url
        }
        return acc
      }, {} as Record<string, { name: string; url: string }>)

    wagmiChain.blockExplorers = {
      default: defaultExplorer,
      ...otherExplorers
    }
  }

  return wagmiChain
}

let chainsToSupport: Chain[] = []
const transports = {}

for (const chainId in chainMap) {
  const chainMetadata = chainMap[chainId]
  try {
    const chain = parseChainMetadataToWagmiChain(chainMetadata)
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
