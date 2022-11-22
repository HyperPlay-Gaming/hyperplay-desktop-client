export const query = function (queryInfo: any, callback?: any) {
  console.log('called tabs query')
}

export const remove = function (tabIds: number | number[], callback?: any) {
  console.log('called tabs remove')
}

// tab id is optional in chrome docs but is included in all metamask calls
// so we make it required
export const update = function (
  tabId: number,
  updateProperties: any,
  callback?: any
) {
  console.log('called tabs update')
}
