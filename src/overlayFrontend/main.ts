import { IpcRendererEvent } from 'electron'
/* eslint-disable @typescript-eslint/no-var-requires */
const { ipcRenderer } = require('electron')
console.log('renderer js imported')

const startButton = document.getElementById('start') as HTMLButtonElement
startButton.addEventListener('click', () => {
  console.log('startButton clicked')
  ipcRenderer.send('start')
})

const injectButton = document.getElementById('inject') as HTMLButtonElement
const titleInput = document.getElementById('title') as HTMLInputElement
injectButton.addEventListener('click', () => {
  console.log('inject clicked')
  const title = titleInput.value
  console.log('title = ', title)
  ipcRenderer.send('inject', title)
})

// const canvas = document.getElementById("canvas") as HTMLCanvasElement
// const context = canvas.getContext("2d")!

const imageElem = document.getElementById('image') as HTMLImageElement

ipcRenderer.on(
  'osrImage',
  (event: IpcRendererEvent, arg: { image: string }) => {
    const { image } = arg
    // imageElem.onload = function() {
    //   context.clearRect(0, 0, canvas.width, canvas.height)
    //   context.drawImage(
    //     imageElem,
    //     0,
    //     0,
    //     imageElem.width,
    //     imageElem.height,
    //     0,
    //     0,
    //     canvas.width,
    //     canvas.height
    //   )
    // }
    imageElem.src = image
  }
)

window.onfocus = function () {
  console.log('focus')
}
window.onblur = function () {
  console.log('blur')
}

export {}
