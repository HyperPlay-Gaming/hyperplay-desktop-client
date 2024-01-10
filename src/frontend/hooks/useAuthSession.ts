import { useQuery } from 'react-query'

export default function useAuthSession() {
  return useQuery('authSession', async () => {
    console.log('GET AUTH SESSION')
    const response = await window.api.getAuthSession()
    console.log('GET AUTH SESSION', response)
    return response
  })
}
