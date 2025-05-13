import { useQuery, useQueryClient } from '@tanstack/react-query'

const queryKey = 'authSession'

export default function useAuthSession() {
  const queryClient = useQueryClient()
  const query = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await window.api.getAuthSession()
      if (!response) return null
      return {
        ...response,
        linkedAccounts: new Map(
          response.linkedAccounts.map((account) => [
            account.provider,
            account.providerAccountId
          ])
        )
      }
    },
    refetchOnWindowFocus: false
  })

  return {
    ...query,
    session: query.data,
    isSignedIn: Boolean(query.data),
    invalidateQuery: async () =>
      queryClient.invalidateQueries({ queryKey: [queryKey] })
  }
}
