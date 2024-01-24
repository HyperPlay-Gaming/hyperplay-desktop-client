import { ipcMain } from 'electron'
import { release } from 'os'
import { platform as platformNode } from 'process'
import { promisify } from 'util'
import { execFile } from 'child_process'
import { access, constants, unlink, writeFile } from 'graceful-fs'
import checkDiskSpace, {
  getFirstExistingParentPath
} from '@hyperplay/check-disk-space'
import { logError, LogPrefix, logWarning } from 'backend/logger/logger'
import { getFileSize } from 'backend/utils'
import path from 'path'
import { isWindows } from 'backend/constants'

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
  const writeError = await checkWriteAccess(parent)
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
    logWarning(['Cannot write to', `"${folder}":`], LogPrefix.Backend)
  }

  const ret = {
    free,
    diskSize,
    message: `${getFileSize(free)} / ${getFileSize(diskSize)}`,
    validPath: !writeError
  }
  return ret
})

const testWriteFile = promisify(writeFile)
const testUnlink = promisify(unlink)
const testAccess = promisify(access)

async function checkWriteAccess(dir: string): Promise<boolean> {
  const testFile = path.join(dir, 'test.txt')
  if (isWindows) {
    try {
      await testWriteFile(testFile, '')
      await testUnlink(testFile) // delete the test file
      return false
    } catch (error) {
      return true
    }
  } else {
    try {
      await testAccess(dir, constants.W_OK)
      return false
    } catch (error) {
      return true
    }
  }
}
