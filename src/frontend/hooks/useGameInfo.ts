import { HyperPlayInstallInfo, InstallPlatform, Runner } from 'common/types'
import { GogInstallInfo } from 'common/types/gog'
import { LegendaryInstallInfo } from 'common/types/legendary'
import { getGameInfo, getInstallInfo } from 'frontend/helpers'
import { useQuery } from '@tanstack/react-query'

type InstallInfo =
  | GogInstallInfo
  | LegendaryInstallInfo
  | HyperPlayInstallInfo
  | null

interface UseGameInfoProps {
  appName: string
  runner: Runner
  platform?: InstallPlatform
  channel?: string
}

export const useGameInfo = ({
  appName,
  runner,
  platform,
  channel
}: UseGameInfoProps) => {
  const query = useQuery({
    queryKey: ['gameData', appName, runner, platform, channel],
    queryFn: async () => {
      const gameInfo = await getGameInfo(appName, runner)

      let installInfo: InstallInfo = null
      if (gameInfo && platform) {
        installInfo = await getInstallInfo(
          appName,
          gameInfo.runner,
          platform,
          channel ?? 'main'
        )
      }

      return { gameInfo, installInfo }
    }
  })

  return {
    ...query.data,
    isLoading: query.isLoading,
    isError: query.isError || false,
    error: query.error
  }
}
