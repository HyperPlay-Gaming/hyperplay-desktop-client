import { Worker } from 'node:worker_threads'
import { extractOptions } from './types'
import { EventEmitter } from 'node:events'
import path from 'node:path'

export class ExtractZipServiceWorker extends EventEmitter {
  worker: Worker
  initPromise: Promise<void>
  #resolveInitPromise: () => void

  constructor(
    zipFile: string,
    destinationPath: string,
    options?: extractOptions
  ) {
    super()
    this.#resolveInitPromise = () => {
      console.error('resolve init promise not assigned!')
    }
    this.initPromise = new Promise((res) => {
      this.#resolveInitPromise = res
    })
    const extractZipServicePath = path.join(
      __dirname,
      '../preload/ExtractZipService.js'
    )
    this.worker = new Worker(extractZipServicePath)

    this.worker.on('message', (data) => {
      if (data?.initEvent === 'INITIALIZED') {
        this.worker.postMessage({
          type: 'INIT',
          zipFile,
          destinationPath,
          options
        })
        return
      } else if (data?.initEvent === 'ZIP_SERVICE_INSTANTIATED') {
        this.#resolveInitPromise()
        return
      }
      const { eventType, args } = data
      this.emit(eventType, ...args)
    })
  }

  public cancel() {
    this.worker.postMessage({ type: 'CANCEL' })
  }

  public pause(): void {
    this.worker.postMessage({ type: 'PAUSE' })
  }

  async extract() {
    this.worker.postMessage({ type: 'EXTRACT' })
  }
}
