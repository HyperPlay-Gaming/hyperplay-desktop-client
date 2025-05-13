import { useQuery, useQueryClient } from '@tanstack/react-query'
import useCheckG7ConnectionStatus from './useCheckG7ConnectionStatus'

export default function useGetG7UserCredits() {
  const queryClient = useQueryClient()
  const isConnectedToG7 = useCheckG7ConnectionStatus()
  const queryKey = `useGetG7UserCredits`
  const query = useQuery<string>({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await window.api.getG7Credits()
      if (!response) return ''
      return response
    },
    refetchOnWindowFocus: false
  })

  return {
    data: query,
    enabled: isConnectedToG7.data,
    isLoading: query.isLoading || query.isFetching,
    invalidateQuery: async () =>
      queryClient.invalidateQueries({ queryKey: [queryKey] })
  }
}
