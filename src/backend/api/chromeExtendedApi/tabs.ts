export const query = function (queryInfo: any, callback?: any) {
  console.log('called tabs query')
}

export const remove = function (tabIds: number | number[], callback?: any) {
  console.log('called tabs remove')
}

export const update = function (
  tabId?: number,
  updateProperties: any,
  callback?: any
) {
  console.log('called tabs update')
}
