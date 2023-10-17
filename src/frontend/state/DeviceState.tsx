import { makeAutoObservable } from 'mobx'
import React, { useContext } from 'react'
import ContextProvider from './ContextProvider'

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

  get isLinux() {
    return this.platform === 'linux'
  }
}

const deviceState = new DeviceState()
export default new DeviceState()

export const DeviceStateController = () => {
  const { platform } = useContext(ContextProvider)

  deviceState.platform = platform
  return <></>
}
