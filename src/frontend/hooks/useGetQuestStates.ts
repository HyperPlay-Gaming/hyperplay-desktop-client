import {
  getPlaystreakQuestStatus,
  getGetQuestLogInfoQueryKey
} from '@hyperplay/quests-ui'
import { Quest } from '@hyperplay/utils'
import { useQueries } from '@tanstack/react-query'

export interface UseGetQuestLogInfosProps {
  quests?: Quest[] | null
}

export function useGetQuestStates({ quests }: UseGetQuestLogInfosProps) {
  const query = useQueries({
    queries:
      quests?.map((quest) => ({
        queryKey: getGetQuestLogInfoQueryKey(quest.id.toString()),
        queryFn: async () => {
          const questResponse = await window.api.getQuest(quest.id)
          const userPlayStreak = await window.api.getUserPlayStreak(quest.id)
          const state = getPlaystreakQuestStatus(questResponse, userPlayStreak)
          return { questId: quest.id, state }
        },
        refetchOnWindowFocus: false
      })) ?? []
  })

  return {
    data: query,
    // if any is loading or fetching
    isLoading: query
      .map((val) => val.isLoading || val.isFetching)
      .reduce((prev, curr) => prev || curr, false)
  }
}
