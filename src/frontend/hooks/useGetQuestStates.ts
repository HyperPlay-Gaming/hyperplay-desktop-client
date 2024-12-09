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
  enabled?: boolean
}

type getQuestQueryOptionsType = ReturnType<typeof getQuestQueryOptions>
type getUserPlaystreakQueryOptionsType = ReturnType<
  typeof getUserPlaystreakQueryOptions
>
export function useGetQuestStates({
  quests,
  enabled = true
}: UseGetQuestLogInfosProps) {
  const { isSignedIn } = useAuthSession()
  let getQuestQueries: getQuestQueryOptionsType[] = []
  if (isSignedIn) {
    getQuestQueries =
      quests?.map((quest) => ({
        ...getQuestQueryOptions(quest.id, window.api.getQuest),
        enabled
      })) ?? []
  }
  const getQuestQuery = useQueries({
    queries: getQuestQueries
  })

  let getUserPlaystreakQueries: getUserPlaystreakQueryOptionsType[] = []
  if (isSignedIn) {
    getUserPlaystreakQueries =
      quests?.map((quest) => ({
        ...getUserPlaystreakQueryOptions(
          quest.id,
          window.api.getUserPlayStreak
        ),
        enabled
      })) ?? []
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

  const questIdToQuestStateMap: Record<
    number,
    QuestLogInfo['state'] | undefined
  > = {}

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
    isPending: allQueries.some((val) => val.status === 'pending'),
    isLoading: allQueries.some((val) => val.isLoading),
    isFetching: allQueries.some((val) => val.isFetching),
    questIdToQuestStateMap
  }
}
