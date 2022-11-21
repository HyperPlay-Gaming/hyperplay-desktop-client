export const clear = function () {
  console.log('alarms clear called')
}

export const getAll = function () {
  console.log('alarms getAll called')
}

export const create = function () {
  console.log('alarms create called')
}
/* es-lint-disable @typescript-eslint/no-unused-vars */
// es-lint-disable-next-line @typescript-eslint/no-explicit-any
export const onAlarm = function (onAlarm: (alarm: any) => void) {
  console.log('alarms onAlarm called')
}
