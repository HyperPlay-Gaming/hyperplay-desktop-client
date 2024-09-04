import { useQuery, useQueryClient } from '@tanstack/react-query'

export default function useGetPointsBalancesForProject(projectId: string) {
  const queryClient = useQueryClient()
  const queryKey = `getPointsBalancesForProject:${projectId}`
  const query = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await window.api.getPointsBalancesForProject(projectId)
      if (!response) return undefined
      return response
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
