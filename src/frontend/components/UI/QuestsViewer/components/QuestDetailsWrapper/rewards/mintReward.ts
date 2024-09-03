import { DepositContract, Reward, RewardClaimSignature } from 'common/types'
import { questRewardAbi } from 'frontend/abis/RewardsAbi'
import { WriteContractMutateAsync } from 'wagmi/query'
import { Config } from 'wagmi'

export async function mintReward({
  reward,
  questId,
  signature,
  writeContractAsync
}: {
  reward: Reward
  questId: number
  signature: RewardClaimSignature
  writeContractAsync: WriteContractMutateAsync<Config, unknown>
}) {
  if (reward.chain_id === null) {
    throw Error('chain id is not set for reward when trying to mint')
  }

  const isERC1155Reward =
    reward.reward_type === 'ERC1155' && reward.token_ids.length === 1

  const depositContracts: DepositContract[] =
    await window.api.getDepositContracts(questId)

  const depositContractAddress = depositContracts.find(
    (val) => val.chain_id === reward.chain_id
  )?.contract_address

  if (depositContractAddress === undefined) {
    throw Error(
      `Deposit contract address undefined for quest ${questId} and chain id ${reward.chain_id}`
    )
  }

  const logError = (error: Error) => {
    window.api.logError(`Error minting reward: ${error.message}`)
  }

  if (
    reward.reward_type === 'ERC20' &&
    reward.amount_per_user &&
    reward.decimals
  ) {
    return writeContractAsync(
      {
        address: depositContractAddress,
        abi: questRewardAbi,
        functionName: 'withdrawERC20',
        args: [
          BigInt(questId),
          reward.contract_address,
          BigInt(reward.amount_per_user),
          BigInt(signature.nonce),
          BigInt(signature.expiration),
          signature.signature
        ]
      },
      {
        onError: logError
      }
    )
  } else if (isERC1155Reward && reward.decimals !== null) {
    const { token_id, amount_per_user } = reward.token_ids[0]
    return writeContractAsync(
      {
        address: depositContractAddress,
        abi: questRewardAbi,
        functionName: 'withdrawERC1155',
        args: [
          BigInt(questId),
          reward.contract_address,
          BigInt(token_id),
          BigInt(amount_per_user),
          BigInt(signature.nonce),
          BigInt(signature.expiration),
          signature.signature
        ]
      },
      {
        onError: logError
      }
    )
  } else if (reward.reward_type === 'ERC721' && reward.amount_per_user) {
    return writeContractAsync(
      {
        address: depositContractAddress,
        abi: questRewardAbi,
        functionName: 'withdrawERC721',
        args: [
          BigInt(questId),
          reward.contract_address,
          BigInt(signature.tokenIds[0]),
          BigInt(signature.nonce),
          BigInt(signature.expiration),
          signature.signature
        ]
      },
      {
        onError: logError
      }
    )
  }

  throw Error('Unsupported reward type')
}
