export const create = function () {
  console.log('notifications create called')
}

export const onClicked = {
  hasListener: () => {
    console.log('notifications hasListener called')
  },
  addListener: () => {
    console.log('notifications addListener called')
  }
}
