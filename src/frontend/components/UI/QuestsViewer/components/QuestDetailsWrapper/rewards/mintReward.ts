import { DepositContract, Reward, RewardClaimSignature } from 'common/types'
import { getAmount } from '@hyperplay/utils'
import { questRewardAbi } from 'frontend/abis/RewardsAbi'
import { SwitchChainMutateAsync, WriteContractMutate } from 'wagmi/query'
import { Config } from 'wagmi'

export async function mintReward({
  reward,
  questId,
  address,
  switchChainAsync,
  writeContract
}: {
  reward: Reward
  questId: number
  address: `0x${string}`
  switchChainAsync: SwitchChainMutateAsync<Config, unknown>
  writeContract: WriteContractMutate<Config, unknown>
}) {
  await switchChainAsync({ chainId: reward.chain_id })
  const sig: RewardClaimSignature = await window.api.getQuestRewardSignature(
    address,
    questId,
    reward.id
  )

  const depositContracts: DepositContract[] =
    await window.api.getDepositContracts(questId)
  const depositContractAddress = depositContracts.find(
    (val) => val.chain_id === reward.chain_id
  )?.contract_address
  if (depositContractAddress === undefined) {
    console.error(
      `Deposit contract address undefined for quest ${questId} and chain id ${reward.chain_id}`
    )
    return
  }
  if (reward.reward_type === 'ERC20') {
    writeContract({
      address: depositContractAddress,
      abi: questRewardAbi,
      functionName: 'withdrawERC20',
      args: [
        BigInt(questId),
        reward.contract_address,
        BigInt(getAmount(reward.amount_per_user, reward.decimals).toString()),
        BigInt(sig.nonce),
        BigInt(sig.expiration),
        sig.signature
      ]
    })
  }
}
