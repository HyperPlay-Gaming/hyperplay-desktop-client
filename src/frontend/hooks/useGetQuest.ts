import { Quest } from 'common/types'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export default function useGetQuest(questId: number | null) {
  const queryClient = useQueryClient()
  const queryKey = `getQuest:${questId}`
  const query = useQuery<Quest>({
    queryKey: [queryKey],
    queryFn: async () => {
      if (questId === null) {
        return null
      }
      const response = await window.api.getQuest(questId)
      if (!response) return null
      return response
    },
    refetchOnWindowFocus: false,
    enabled: questId !== null
  })

  return {
    data: query,
    isLoading: query.isLoading || query.isFetching,
    invalidateQuery: async () =>
      queryClient.invalidateQueries({ queryKey: [queryKey] })
  }
}
