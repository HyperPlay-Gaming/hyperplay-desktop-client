import { useQueries } from 'react-query'

export default function useGetSteamGame(
  steam_games: {
    id: string
  }[]
) {
  const query = useQueries(
    steam_games.map((val) => ({
      queryKey: ['getSteamGame', val.id],
      queryFn: async () => {
        const response = await window.api.getSteamGameMetadata(
          Number.parseInt(val.id)
        )
        if (!response) return null
        return response
      },
      staleTime: Infinity
    }))
  )

  return {
    data: query
  }
}
