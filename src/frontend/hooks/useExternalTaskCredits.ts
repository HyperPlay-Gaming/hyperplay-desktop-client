import { useQuery, useQueryClient } from '@tanstack/react-query'

export function useGetExternalTaskCredits(rewardId: string) {
  const queryClient = useQueryClient()
  const queryKey = `useGetExternalTaskCredits:${rewardId}`
  const query = useQuery<string>({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await window.api.getExternalTaskCredits(rewardId)
      if (!response) return ''
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
