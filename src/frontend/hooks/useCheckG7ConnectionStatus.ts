import { useQuery, useQueryClient } from '@tanstack/react-query'

export default function useCheckG7ConnectionStatus() {
  const queryClient = useQueryClient()
  const queryKey = `checkG7ConnectionStatus`
  const query = useQuery<boolean>({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await window.api.checkG7ConnectionStatus()
      if (!response) return false
      return response
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60
  })

  return {
    data: query,
    isLoading: query.isLoading || query.isFetching,
    invalidateQuery: async () =>
      queryClient.invalidateQueries({ queryKey: [queryKey] })
  }
}
