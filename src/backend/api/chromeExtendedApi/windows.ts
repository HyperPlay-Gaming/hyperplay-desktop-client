// import { EventEmitter } from 'node:events'
export const create = function () {
  console.log('windows create called')
}

export const update = function () {
  console.log('windows update called')
}

export const getLastFocused = function () {
  console.log('windows getLastFocused called')
}

export const getCurrent = function () {
  console.log('windows getCurrent called')
}

export const remove = function () {
  console.log('windows remove called')
}

// export const onRemoved = new EventEmitter()

export const getAll = function () {
  console.log('windows getAll called')
}
