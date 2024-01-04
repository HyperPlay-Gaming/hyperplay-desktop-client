import { ipcMain } from 'electron'
import { release } from 'os'
import { platform as platformNode } from 'process'
import { promisify } from 'util'
import { execFile } from 'child_process'
import { access, constants } from 'graceful-fs'
import checkDiskSpace, {
  getFirstExistingParentPath
} from '@hyperplay/check-disk-space'
import { DiskSpaceData } from 'common/types'
import { logError, LogPrefix, logWarning } from 'backend/logger/logger'
import { getFileSize } from 'backend/utils'
import path from 'path'

ipcMain.handle('checkDiskSpace', async (event, folder) => {
  const deps = {
    platform: platformNode,
    release: release(),
    fsAccess: promisify(access),
    pathNormalize: path.normalize,
    pathSep: path.sep,
    cpExecFile: promisify(execFile)
  }
  const parent = await getFirstExistingParentPath(folder, deps)
  if (!parent) {
    return {
      free: 0,
      diskSize: 0,
      message: 'Path does not exist',
      validPath: false
    }
  }
  return new Promise<DiskSpaceData>((res) => {
    access(parent, constants.W_OK, async (writeError) => {
      const { free, size: diskSize } = await checkDiskSpace(folder).catch(
        (checkSpaceError) => {
          logError(
            [
              'Failed to check disk space for',
              `"${folder}":`,
              checkSpaceError.stack ?? `${checkSpaceError}`
            ],
            LogPrefix.Backend
          )
          return { free: 0, size: 0 }
        }
      )
      if (writeError) {
        logWarning(
          [
            'Cannot write to',
            `"${folder}":`,
            writeError.stack ?? `${writeError}`
          ],
          LogPrefix.Backend
        )
      }

      const ret = {
        free,
        diskSize,
        message: `${getFileSize(free)} / ${getFileSize(diskSize)}`,
        validPath: !writeError
      }
      res(ret)
    })
  })
})
