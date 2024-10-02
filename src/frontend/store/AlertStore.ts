import { makeAutoObservable } from 'mobx'

type AlertType = 'warning' | 'danger' | 'info' | 'success'

interface AlertMessage {
  type: AlertType
  message: string
}

// TODO: add a headless toast package, this is just a temporary solution
class AlertStore {
  alert: AlertMessage | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setAlert(type: AlertType, message: string) {
    this.alert = { type, message }
    setTimeout(() => this.clearAlert(), 5000)
  }

  clearAlert() {
    this.alert = null
  }
}

const alertStore = new AlertStore()

export default alertStore
