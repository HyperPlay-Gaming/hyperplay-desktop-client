export const clear = function () {
  console.log('alarms clear called')
}

export const getAll = function () {
  console.log('alarms getAll called')
}

export const create = function () {
  console.log('alarms create called')
}

export const onAlarm = function (onAlarm: (alarm: any) => void) {
  console.log('alarms onAlarm called')
}
