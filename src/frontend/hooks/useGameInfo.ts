import {
  GameInfo,
  HyperPlayInstallInfo,
  InstallPlatform,
  Runner
} from 'common/types'
import { GogInstallInfo } from 'common/types/gog'
import { LegendaryInstallInfo } from 'common/types/legendary'
import { getGameInfo, getInstallInfo } from 'frontend/helpers'
import { useEffect, useState } from 'react'

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
  const [gameInfo, setGameInfo] = useState<GameInfo | null>(null)
  const [installInfo, setInstallInfo] = useState<InstallInfo | null>(null)

  useEffect(() => {
    const getNewInfo = async () => {
      const newInfo = (await getGameInfo(appName, runner)) as GameInfo

      if (newInfo && platform) {
        const installInfo = await getInstallInfo(
          appName,
          newInfo.runner,
          platform,
          channel || 'main'
        )
        setInstallInfo(installInfo)
      }

      if (newInfo) {
        setGameInfo(newInfo)
      }
    }
    getNewInfo()
  }, [appName, runner, platform, channel])

  return { gameInfo, installInfo }
}
