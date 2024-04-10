import { makeAutoObservable, runInAction } from 'mobx'
import gameSummaryAbi from 'common/abis/gameSummary.json'

class MintAchievementsState {
  achievementsToBeMinted = [] as string[]
  achievementsToBeUpdated = [] as string[]
  isLoading = false
  isMinting = false

  constructor() {
    makeAutoObservable(this)
  }

  toggleAchievementToBeMinted = (id: string) => {
    if (this.achievementsToBeMinted.includes(id)) {
      this.achievementsToBeMinted = this.achievementsToBeMinted.filter(
        (item) => item !== id
      )
    } else {
      this.achievementsToBeMinted = [...this.achievementsToBeMinted, id]
    }
  }

  toggleAchievementToBeUpdated = (id: string) => {
    if (this.achievementsToBeUpdated.includes(id)) {
      this.achievementsToBeUpdated = this.achievementsToBeUpdated.filter(
        (item) => item !== id
      )
    } else {
      this.achievementsToBeUpdated = [...this.achievementsToBeUpdated, id]
    }
  }

  testLoad = (ms: number) => {
    this.isLoading = true
    setTimeout(() => {
      runInAction(() => {
        this.isLoading = false
        this.achievementsToBeMinted = []
      })
    }, ms)
  }

  handleMint = async () => {
    this.isMinting = true
    const success = await window.api.freeBatchMintGameSummaries(
      JSON.parse(JSON.stringify(this.achievementsToBeMinted))
    )
    this.isMinting = false

    if (!success) {
      this.isMinting = true
      const result = await window.api.getGameSummaryMintSignature()
      console.log('result of get signature in frontend ', result)
      // request mint txn from proxy server connected wallet
      const isTestnet = true

      const achievementsEarnedOffChain = this.achievementsToBeMinted.map(
        (val) => 100
      )
      const storeIds = this.achievementsToBeMinted.map((val) => 1)

      window.api.callOrSendRequest(false, {
        body: {
          contractAddress: isTestnet
            ? '0x31565432930858b7bc8C62d4Fd2CDFBaBAde5894'
            : '0x123',
          functionName: 'batchMintGameSummaryWithSignature',
          abi: gameSummaryAbi,
          params: [
            `${this.achievementsToBeMinted}`,
            `${achievementsEarnedOffChain}`,
            `${storeIds}`,
            `${result.nonce}`,
            result.signature
          ],
          valueInWei: '0',
          gasLimit: '200000',
          chain: {
            chainId: isTestnet ? '5001' : '5000',
            chainMetadata: {
              chainName: isTestnet ? 'Mantle Testnet' : 'Mantle',
              nativeCurrency: {
                name: 'MNT',
                symbol: 'MNT',
                decimals: 18
              },
              rpcUrls: isTestnet
                ? ['https://rpc.testnet.mantle.xyz/']
                : ['https://rpc.mantle.xyz/'],
              blockExplorerUrls: isTestnet
                ? ['https://explorer.testnet.mantle.xyz/']
                : ['https://explorer.mantle.xyz/']
            }
          }
        }
      })

      this.isMinting = false
    }
  }

  handleUpdate = () => this.testLoad(3000)
}

export default new MintAchievementsState()
