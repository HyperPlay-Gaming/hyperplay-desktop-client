import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getDecimalNumberFromAmount } from '@hyperplay/utils'
import { getRewardCategory } from 'frontend/helpers/getRewardCategory'
import { useTranslation } from 'react-i18next'
import { QuestReward } from '@hyperplay/ui'
import { useGetQuest } from '@hyperplay/quests-ui'

export function useGetRewards(questId: number | null) {
  const questResult = useGetQuest(questId, window.api.getQuest)
  const questMeta = questResult.data.data

  const queryClient = useQueryClient()
  const queryKey = `useGetRewards:${questId}:${questMeta?.rewards?.length}`

  const { t } = useTranslation()

  const query = useQuery<QuestReward[]>({
    queryKey: [queryKey],
    queryFn: async () => {
      const rewards: QuestReward[] = []
      const questRewards = questMeta?.rewards
      if (!questRewards) {
        return rewards
      }
      for (const reward_i of questRewards) {
        let numToClaim: string | undefined = undefined
        if (
          reward_i.amount_per_user &&
          reward_i.decimals !== undefined &&
          reward_i.decimals !== null
        ) {
          numToClaim = getDecimalNumberFromAmount(
            reward_i.amount_per_user.toString(),
            reward_i.decimals
          ).toString()
        }

        if (reward_i.reward_type === 'EXTERNAL-TASKS') {
          const taskAmountToClaim = await window.api.getExternalTaskCredits(
            reward_i.id.toString()
          )
          numToClaim = getDecimalNumberFromAmount(
            taskAmountToClaim,
            0
          ).toString()
        }

        if (
          reward_i.reward_type === 'ERC1155' &&
          reward_i.token_ids &&
          reward_i.token_ids.length
        ) {
          for (const token_i of reward_i.token_ids) {
            const questReward_i: QuestReward = {
              title: reward_i.name,
              imageUrl: reward_i.image_url,
              chainName: getRewardCategory(reward_i, t),
              numToClaim: token_i.amount_per_user,
              numOfClaimsLeft: token_i.numClaimsLeft
            }
            rewards.push(questReward_i)
          }
        } else {
          const questReward_i: QuestReward = {
            title: reward_i.name,
            imageUrl: reward_i.image_url,
            chainName: getRewardCategory(reward_i, t),
            numToClaim,
            numOfClaimsLeft: reward_i.numClaimsLeft
          }
          rewards.push(questReward_i)
        }
      }
      return rewards
    },
    refetchOnWindowFocus: false
  })

  return {
    data: query,
    isLoading: query.isLoading || query.isFetching,
    invalidateQuery: async () =>
      queryClient.invalidateQueries({ queryKey: [queryKey] })
  }
}
