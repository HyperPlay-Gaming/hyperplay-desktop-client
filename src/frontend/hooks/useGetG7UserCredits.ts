import { useQuery, useQueryClient } from '@tanstack/react-query'

export default function useGetG7UserCredits() {
  const queryClient = useQueryClient()
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
    isLoading: query.isLoading || query.isFetching,
    invalidateQuery: async () =>
      queryClient.invalidateQueries({ queryKey: [queryKey] })
  }
}
