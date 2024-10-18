import { UserPlayStreak } from 'common/types'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import useAuthSession from './useAuthSession'

export default function useGetUserPlayStreak(questId: number | null) {
  const { isSignedIn } = useAuthSession()
  const queryClient = useQueryClient()
  const queryKey = `getUserPlayStreak:${questId}`
  const query = useQuery<UserPlayStreak>({
    queryKey: [queryKey],
    queryFn: async () => {
      if (questId === null) {
        return null
      }
      const response = await window.api.getUserPlayStreak(questId)
      if (!response) return null
      return response
    },
    refetchOnWindowFocus: false,
    enabled: questId !== null
  })

  return {
    enabled: isSignedIn,
    refetchInterval: 30_000, // 30 seconds
    data: query,
    isLoading: query.isLoading || query.isFetching,
    invalidateQuery: async () =>
      queryClient.invalidateQueries({ queryKey: [queryKey] })
  }
}
