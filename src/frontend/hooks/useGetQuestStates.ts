import {
  getPlaystreakQuestStatus,
  getUserPlaystreakQueryOptions,
  getQuestQueryOptions
} from '@hyperplay/quests-ui'
import { QuestLogInfo } from '@hyperplay/ui'
import { Quest } from '@hyperplay/utils'
import { useQueries } from '@tanstack/react-query'
import useAuthSession from './useAuthSession'

export interface UseGetQuestLogInfosProps {
  quests?: Quest[] | null
}

export function useGetQuestStates({ quests }: UseGetQuestLogInfosProps) {
  const { isSignedIn } = useAuthSession()
  type getQuestQueryOptionsType = ReturnType<typeof getQuestQueryOptions>
  let getQuestQueries: getQuestQueryOptionsType[] = []
  if (isSignedIn) {
    getQuestQueries =
      quests?.map((quest) =>
        getQuestQueryOptions(quest.id, window.api.getQuest)
      ) ?? []
  }
  const getQuestQuery = useQueries({
    queries: getQuestQueries
  })

  type getUserPlaystreakQueryOptionsType = ReturnType<
    typeof getUserPlaystreakQueryOptions
  >
  let getUserPlaystreakQueries: getUserPlaystreakQueryOptionsType[] = []
  if (isSignedIn) {
    getUserPlaystreakQueries =
      quests?.map((quest) =>
        getUserPlaystreakQueryOptions(quest.id, window.api.getUserPlayStreak)
      ) ?? []
  }
  const getUserPlaystreakQuery = useQueries({
    queries: getUserPlaystreakQueries
  })

  const questMap: Record<number, Quest> = {}
  getQuestQuery
    .filter((val) => !!val.data)
    .forEach((val) => {
      if (!val.data) {
        return
      }
      questMap[val.data.id] = val.data
    })

  const questIdToQuestStateMap: Record<number, QuestLogInfo['state']> = {}

  getUserPlaystreakQuery.forEach((val) => {
    if (!val.data || !Object.hasOwn(questMap, val.data.questId)) {
      return
    }
    const questId = val.data.questId
    const questData = questMap[questId]
    return (questIdToQuestStateMap[questId] = getPlaystreakQuestStatus(
      questData,
      val.data.userPlayStreak
    ))
  })

  const allQueries = [...getQuestQuery, ...getUserPlaystreakQuery]

  return {
    isPending: allQueries
      .map((val) => val.status)
      .reduce((prev, curr) => prev || curr === 'pending', false),
    // if any is loading or fetching
    isLoading: allQueries
      .map((val) => val.isLoading || val.isFetching)
      .reduce((prev, curr) => prev || curr, false),
    questIdToQuestStateMap
  }
}
