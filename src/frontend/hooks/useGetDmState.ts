import { useEffect, useState } from 'react'
import { DMQueueElement, DownloadManagerState } from 'common/types'
import { DMQueue } from 'frontend/types'

export function useGetDmState() {
  const [dmState, setDMState] = useState<DownloadManagerState>('idle')

  useEffect(() => {
    window.api.getDMQueueInformation().then(({ state }: DMQueue) => {
      setDMState(state)
    })

    const removeHandleDMQueueInformation = window.api.handleDMQueueInformation(
      (
        e: Electron.IpcRendererEvent,
        elements: DMQueueElement[],
        state: DownloadManagerState
      ) => {
        if (elements) {
          setDMState(state)
        }
      }
    )

    return () => {
      removeHandleDMQueueInformation()
    }
  }, [])

  return dmState
}
