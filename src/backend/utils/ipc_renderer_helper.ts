import { WrapRendererCallback } from 'common/types'
import { ipcRenderer } from 'electron'

export function getHandleFunction<
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  Handler extends WrapRendererCallback<(...args: any[]) => void>
>(topic: string) {
  return (cb: Handler) => {
    ipcRenderer.on(topic, cb)
    return () => {
      ipcRenderer.removeListener(topic, cb)
    }
  }
}
