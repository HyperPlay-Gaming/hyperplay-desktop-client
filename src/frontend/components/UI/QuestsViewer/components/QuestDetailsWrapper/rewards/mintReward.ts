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
  if (reward.chain_id === null) {
    console.error('chain id is not set for reward when trying to mint')
    return
  }
  await switchChainAsync({ chainId: reward.chain_id })
  const isERC1155Reward =
    reward.reward_type === 'ERC1155' && reward.token_ids.length === 1
  let tokenId: number | undefined = undefined
  if (isERC1155Reward) {
    tokenId = reward.token_ids[0].token_id
  }
  const sig: RewardClaimSignature = await window.api.getQuestRewardSignature(
    address,
    reward.id,
    tokenId
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
  if (
    reward.reward_type === 'ERC20' &&
    reward.amount_per_user &&
    reward.decimals
  ) {
    writeContract({
      address: depositContractAddress,
      abi: questRewardAbi,
      functionName: 'withdrawERC20',
      args: [
        BigInt(questId),
        reward.contract_address,
        BigInt(
          getAmount(
            reward.amount_per_user.toString(),
            reward.decimals
          ).toString()
        ),
        BigInt(sig.nonce),
        BigInt(sig.expiration),
        sig.signature
      ]
    })
  } else if (isERC1155Reward && reward.decimals !== null) {
    const { token_id, amount_per_user } = reward.token_ids[0]
    writeContract({
      address: depositContractAddress,
      abi: questRewardAbi,
      functionName: 'withdrawERC1155',
      args: [
        BigInt(questId),
        reward.contract_address,
        BigInt(token_id),
        BigInt(getAmount(amount_per_user, reward.decimals).toString()),
        BigInt(sig.nonce),
        BigInt(sig.expiration),
        sig.signature
      ]
    })
  } else if (reward.reward_type === 'ERC721' && reward.amount_per_user) {
    writeContract({
      address: depositContractAddress,
      abi: questRewardAbi,
      functionName: 'withdrawERC721',
      args: [
        BigInt(questId),
        reward.contract_address,
        // TODO: supply token id from return statement of get sig
        BigInt('0'),
        BigInt(sig.nonce),
        BigInt(sig.expiration),
        sig.signature
      ]
    })
  }
}
