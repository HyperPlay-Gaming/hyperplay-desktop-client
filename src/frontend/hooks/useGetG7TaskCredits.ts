import { useQuery, useQueryClient } from '@tanstack/react-query'

export default function useGetG7TaskCredits(taskId: string) {
  const queryClient = useQueryClient()
  const queryKey = `useGetG7TaskCredits`
  const query = useQuery<string>({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await window.api.getG7TaskCredits(taskId)
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
