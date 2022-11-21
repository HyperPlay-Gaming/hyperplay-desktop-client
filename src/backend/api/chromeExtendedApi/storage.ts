export const session = {
  get: (key: string) => {
    console.log('storage session get called')
    const retObj = {}
    retObj[key] = 'testing'
    return retObj
  },
  set: (obj: any) => {
    console.log('storage session set called')
  }
}
