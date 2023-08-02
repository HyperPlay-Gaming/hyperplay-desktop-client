import { trackEvent } from 'backend/metrics/metrics'
import { DMQueueElement, InstallParams } from 'common/types'
import { addToQueue } from '../downloadqueue'

export default async function addToDMQueue(
  args: InstallParams,
  type: 'update' | 'install'
) {
  if (type === 'update') {
    trackEvent({
      event: 'Game Update Requested',
      properties: {
        game_name: args.appName,
        store_name: args.runner,
        game_title: args.gameInfo.title,
        platform: args.platformToInstall
      }
    })
  }
  const dmQueueElement: DMQueueElement = {
    params: args,
    type: type,
    addToQueueTime: Date.now(),
    endTime: 0,
    startTime: 0
  }
  await addToQueue(dmQueueElement)

  // Add Dlcs to the queue
  if (Array.isArray(args.installDlcs) && args.installDlcs.length > 0) {
    args.installDlcs.forEach(async (dlc) => {
      const dlcArgs: InstallParams = {
        ...args,
        appName: dlc,
        installDlcs: false
      }
      const dlcQueueElement: DMQueueElement = {
        params: dlcArgs,
        type: type,
        addToQueueTime: Date.now(),
        endTime: 0,
        startTime: 0
      }
      await addToQueue(dlcQueueElement)
    })
  }
}
