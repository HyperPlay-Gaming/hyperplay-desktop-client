import { useQuery, useQueryClient } from 'react-query'

export default function useGetQuest(questId: number | null) {
  const queryClient = useQueryClient()
  const queryKey = `getQuest:${questId}`
  const query = useQuery(
    queryKey,
    async () => {
      if (questId === null) {
        return {}
      }
      const response = await window.api.getQuest(questId)
      if (!response) return null
      return response
    },
    {
      refetchOnWindowFocus: false
    }
  )

  return {
    data: query,
    isLoading: query.isLoading || query.isFetching,
    invalidateQuery: async () => queryClient.invalidateQueries(queryKey)
  }
}
