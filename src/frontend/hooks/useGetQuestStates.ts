import {
  getPlaystreakQuestStatus,
  getGetQuestQueryKey,
  getGetUserPlayStreakQueryKey,
  getGetQuestQuery,
  getGetUserPlaystreakQuery
} from '@hyperplay/quests-ui'
import { QuestLogInfo } from '@hyperplay/ui'
import { Quest } from '@hyperplay/utils'
import { useQueries } from '@tanstack/react-query'

export interface UseGetQuestLogInfosProps {
  quests?: Quest[] | null
}

export function useGetQuestStates({ quests }: UseGetQuestLogInfosProps) {
  const getQuestQuery = useQueries({
    queries:
      quests?.map((quest) => getGetQuestQuery(quest.id, window.api.getQuest)) ??
      []
  })

  const getUserPlaystreakQuery = useQueries({
    queries:
      quests?.map((quest) =>
        getGetUserPlaystreakQuery(quest.id, window.api.getUserPlayStreak)
      ) ?? []
  })

  const questMap: Record<number, Quest> = {}
  getQuestQuery
    .filter((val) => !!val.data)
    // @ts-expect-error we filter above
    .forEach((val) => (questMap[val.data.id] = val.data))

  const questIdToQuestStateMap: Record<number, QuestLogInfo['state']> = {}

  getUserPlaystreakQuery
    .filter((val) => !!val.data)
    .filter((val) => Object.hasOwn(questMap, val.data.questId))
    .forEach((val) => {
      const questId = val.data.questId
      const questData = questMap[questId]
      return (questIdToQuestStateMap[questId] = getPlaystreakQuestStatus(
        questData,
        val.data.userPlayStreak
      ))
    })

  console.log(
    'get quest query ',
    getQuestQuery.map((val) => val.data)
  )
  console.log(
    'get user playstreak query ',
    getUserPlaystreakQuery.map((val) => val.data)
  )
  console.log('quest id to state map ', questIdToQuestStateMap)

  return {
    // if any is loading or fetching
    isLoading: [...getQuestQuery, ...getUserPlaystreakQuery]
      .map((val) => val.isLoading || val.isFetching)
      .reduce((prev, curr) => prev || curr, false),
    questIdToQuestStateMap
  }
}
