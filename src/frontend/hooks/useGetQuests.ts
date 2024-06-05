import { useQuery, useQueryClient } from 'react-query'

export default function useGetQuests(projectId?: string) {
  const queryClient = useQueryClient()
  const queryKey = `getQuestsForProject:${projectId ?? 'allActive'}`
  const query = useQuery(
    queryKey,
    async () => {
      const response = await window.api.getQuests(projectId)
      if (!response) return null
      return response
    },
    {
      refetchOnWindowFocus: false
    }
  )

  return {
    data: query,
    invalidateQuery: async () => queryClient.invalidateQueries(queryKey)
  }
}
