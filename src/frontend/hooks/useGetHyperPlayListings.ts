import { HyperPlayRelease } from 'common/types'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export default function useGetHyperPlayListings() {
  const queryClient = useQueryClient()
  const queryKey = `getHyperPlayListings`
  const query = useQuery<Record<string, HyperPlayRelease> | null>({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await window.api.getHyperPlayListings()
      if (!response) return null
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
