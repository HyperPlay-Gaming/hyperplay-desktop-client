import { useEffect, useState } from 'react'
import { GameStatus, InstallProgress } from 'common/types'

const storage: Storage = window.localStorage

const nullProgress: InstallProgress = {
  bytes: '0',
  eta: '00:00:00',
  percent: 0
}

const convertEtaToMs = (eta: string) => {
  const [hours, minutes, seconds] = eta.split(':').map(Number)
  return hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000 || 0
}

let currentApp: string = ''

export const hasProgress = (appName: string, isExtracting?: boolean) => {
  const previousProgress = JSON.parse(
    storage.getItem(appName) || '{}'
  ) as InstallProgress

  const [progress, setProgress] = useState<InstallProgress>(
    previousProgress ?? nullProgress
  )

  const calculatePercent = (currentProgress: InstallProgress) => {
    // current/100 * (100-stored) + stored
    if (currentProgress.percent && previousProgress.percent) {
      const currentPercent = currentProgress.percent
      const storedPercent = previousProgress.percent
      const newPercent: number = Math.round(
        (currentPercent / 100) * (100 - storedPercent) + storedPercent
      )
      return newPercent
    }
    return currentProgress.percent
  }

  useEffect(() => {
    const handleProgressUpdate = async (
      _e: Electron.IpcRendererEvent,
      { appName: appWithProgress, progress: currentProgress }: GameStatus
    ) => {
      if (appWithProgress && appName === appWithProgress && currentProgress) {
        currentApp = appName
        setProgress({
          ...currentProgress,
          percent: calculatePercent(currentProgress)
        })
      }
    }
    const setGameStatusRemoveListener = window.api.onProgressUpdate(
      appName,
      handleProgressUpdate
    )

    return () => {
      setGameStatusRemoveListener()
    }
  }, [appName])

  useEffect(() => {
    if (isExtracting) {
      setProgress(nullProgress) // reset progress to 0
    }
  }, [])

  if (!currentApp) {
    return {
      progress: nullProgress,
      previousProgress,
      etaInMs: 0
    }
  }

  return {
    progress,
    previousProgress,
    etaInMs: convertEtaToMs(progress.eta || '00:00:00')
  }
}
