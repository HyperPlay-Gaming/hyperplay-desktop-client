import { downloadFileWithAxios, ProgressCallback } from '../utils'

jest.mock('../logger/logfile')

const abortController = new AbortController()

const url = `https://gateway-b3.valist.io/ipfs/bafybeighhu6pnmekcy2wy5v3li5taugib7gjbvweazvlrmyd4f3pkbbf3u/windows_amd64/OutClient1840.zip`
const destPath = `D:\\test.zip`
let startTime = new Date()
let resolve = (value?:unknown)=>{}
let prevLogTime = new Date()
const minSpeedToPass = 5

function cb
(
  downloadedBytes: number,
  downloadSpeed: number,
  diskWriteSpeed: number,
  progress: number
)
{
  const downloadSpeedInMbPerSecond = downloadSpeed / 1024 / 1024
  const writeSpeedInMbPerSecond = diskWriteSpeed / 1024 / 1024
  const timeNow = new Date()
  const timeElapsedSinceLastLog = timeNow.valueOf() - prevLogTime.valueOf()
  let shouldLog = false
  if (timeElapsedSinceLastLog > 1000){
    shouldLog = true
    prevLogTime = timeNow
  }
  const timeElapsed = timeNow.valueOf() - startTime.valueOf()
  const averageDownloadSpeed = downloadedBytes / timeElapsed * 1000 / 1024 / 1024
  if (shouldLog)
    console.debug(
      `avg download speed MB/s = ${averageDownloadSpeed} current download speed MB/s = ${downloadSpeedInMbPerSecond} disk write speed MB/s = ${writeSpeedInMbPerSecond}`
    )

  if (averageDownloadSpeed > minSpeedToPass) {
    if (shouldLog)
      console.debug(`avg download speed exceeded ${minSpeedToPass} so test passed`)
    resolve()
    abortController.abort()
  }
}

describe.skip('test download speed', () => {
  test('need to fix path and replace correctly', async () => {
    return new Promise(async (res, rej)=>{
      console.debug('Starting download')
      startTime = new Date()
      resolve = res
      try{
        await downloadFileWithAxios(url, destPath, abortController, cb)
        console.debug(`Download Finished without exceeding ${minSpeedToPass} MB/s average download speed`)
        rej()
      }
      catch(err){
        console.debug(`Error during downloadFileWithAxios: ${err}`)
      }
    })
  }, 30000)
})
