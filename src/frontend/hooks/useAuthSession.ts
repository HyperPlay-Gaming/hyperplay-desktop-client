import { useQuery, useQueryClient } from 'react-query'

const queryKey = 'authSession'

export default function useAuthSession() {
  const queryClient = useQueryClient()
  const query = useQuery(
    'authSession',
    async () => {
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
    {
      refetchOnWindowFocus: false
    }
  )

  return {
    ...query,
    session: query.data,
    invalidate: async () => queryClient.invalidateQueries(queryKey)
  }
}
