import { makeAutoObservable } from 'mobx'

class DeviceState {
  platform: NodeJS.Platform | 'unknown' = 'unknown'

  constructor() {
    makeAutoObservable(this)
  }

  async init() {
    this.platform = await window.api.getPlatform()
  }

  get isMac() {
    return this.platform === 'darwin'
  }

  get isWin() {
    return this.platform === 'win32'
  }
}

export default new DeviceState()
