import { useQuery, useQueryClient } from '@tanstack/react-query'
import useAuthSession from './useAuthSession'
import { useGetQuestStates } from '@hyperplay/quests-ui'

export default function useGetQuests(projectId?: string) {
  const { isSignedIn } = useAuthSession()
  const queryClient = useQueryClient()
  const queryKey = `getQuestsForProject:${projectId ?? 'allActive'}`
  const query = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await window.api.getQuests(projectId)
      if (!response) return null
      return response
    },
    refetchOnWindowFocus: false
  })

  let quests = query?.data

  // dependent query on the above get quests query
  const {
    questIdToQuestStateMap,
    isPending: isGetQuestStatesPending,
    isFetching: isGetQuestStatesFetching,
    isLoading: isGetQuestStatesLoading
  } = useGetQuestStates({
    quests: quests,
    enabled: !!quests,
    getQuest: window.api.getQuest,
    getUserPlayStreak: window.api.getUserPlayStreak,
    getExternalEligibility: window.api.getExternalEligibility,
    isSignedIn
  })

  /**
   * Filter out the completed status quests where the user hasn't met the eligibility requirements yet.
   * In these cases, the user can no longer earn a reward or claim a reward.
   */
  if (isSignedIn && !isGetQuestStatesPending && quests) {
    quests = quests.filter((quest_i) => {
      if (quest_i.status !== 'COMPLETED') {
        return true
      }

      // this means we detected that the user has met the eligibility requirements
      return (
        Object.hasOwn(questIdToQuestStateMap, quest_i.id) &&
        questIdToQuestStateMap[quest_i.id]
      )
    })
  }

  /**
   * If the user is not signed in, useGetQuestStates will not get any user info,
   * but we still do not want to show quests in COMPLETED state to users who may
   * not have met the eligibility requirements.
   */
  if (!isSignedIn && quests) {
    quests = quests.filter((quest_i) => quest_i.status !== 'COMPLETED')
  }

  return {
    data: {
      data: quests,
      isFetching: query?.isFetching || isGetQuestStatesFetching,
      isLoading: query?.isLoading || isGetQuestStatesLoading,
      isPending: query?.isPending || isGetQuestStatesPending
    },
    invalidateQuery: async () =>
      queryClient.invalidateQueries({ queryKey: [queryKey] })
  }
}
