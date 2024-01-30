import { useQuery } from 'react-query'

export default function useAuthSession() {
  return useQuery(
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
}
