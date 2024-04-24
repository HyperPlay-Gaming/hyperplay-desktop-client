import { createMainWindow, sendFrontendMessage } from '../main_window'
import { BrowserWindow, Display, screen } from 'electron'
import { configStore } from '../constants'

jest.mock('../logger/logfile')

describe('main_window', () => {
  describe('sendFrontendMessage', () => {
    describe('if no main window', () => {
      beforeAll(() => {
        BrowserWindow['setAllWindows']([])
      })

      it('returns false', () => {
        expect(sendFrontendMessage('message')).toBe(false)
      })
    })

    describe('if there is a main window', () => {
      const window = {
        webContents: {
          send: jest.fn()
        }
      }

      // stub windows
      beforeAll(() => {
        BrowserWindow['setAllWindows']([window])
      })

      // spy the `send` method
      beforeEach(() => {
        window.webContents.send = jest.fn()
      })

      // cleanup stubs
      afterAll(() => {
        BrowserWindow['setAllWindows']([])
      })

      it('sends a message to its webContents', () => {
        sendFrontendMessage('message', 'param1', 'param2')

        expect(window.webContents.send).toBeCalledWith(
          'message',
          'param1',
          'param2'
        )
      })
    })
  })

  describe('createMainWindow', () => {
    describe('with stored window geometry', () => {
      beforeEach(() => {
        jest.spyOn(configStore, 'has').mockReturnValue(true)
        jest.spyOn(configStore, 'get').mockReturnValue({
          width: 800,
          height: 600,
          x: 0,
          y: 0
        })
      })

      it('creates the new window with the given geometry', async () => {
        const window = await createMainWindow()
        const options = window['options']

        console.log(options)

        expect(options.height).toBe(600)
        expect(options.width).toBe(800)
        expect(options.x).toBe(0)
        expect(options.y).toBe(0)
      })
    })

    describe('without stored window geometry', () => {
      beforeAll(() => {
        jest.spyOn(configStore, 'has').mockReturnValue(false)
      })

      it('creates the new window with the default geometry', async () => {
        const window = await createMainWindow()
        const options = window['options']

        expect(options.height).toBe(1024)
        expect(options.width).toBe(1536)
        expect(options.x).toBe(0)
        expect(options.y).toBe(0)
      })

      it('ensures windows is not bigger than the screen', async () => {
        // mock a smaller screen info
        jest.spyOn(screen, 'getPrimaryDisplay').mockReturnValue({
          workAreaSize: {
            height: 768,
            width: 1024
          }
        } as Display)

        const window = await createMainWindow()
        const options = window['options']

        expect(options.height).toBe(800)
        expect(options.width).toBe(1280)
        expect(options.x).toBe(0)
        expect(options.y).toBe(0)
      })
    })
  })
})
