'use strict'
const { ipcRenderer } = require('electron')
console.log('renderer js imported')
const startButton = document.getElementById('start')
startButton.addEventListener('click', () => {
  console.log('startButton clicked')
  ipcRenderer.send('start')
})
const injectButton = document.getElementById('inject')
const titleInput = document.getElementById('title')
injectButton.addEventListener('click', () => {
  console.log('inject clicked')
  const title = titleInput.value
  ipcRenderer.send('inject', title)
})
const imageElem = document.getElementById('image')
ipcRenderer.on('osrImage', (event, arg) => {
  const { image } = arg
  imageElem.src = image
})
window.onfocus = function () {
  console.log('focus')
}
window.onblur = function () {
  console.log('blur')
}
export {}
