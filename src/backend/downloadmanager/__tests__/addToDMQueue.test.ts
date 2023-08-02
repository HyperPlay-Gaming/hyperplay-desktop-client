import { DMQueueElement, InstallParams } from '../../../common/types'
import addToDMQueue from '../utils/addToDMQueue'
import EventEmitter from 'events'
import * as Metrics from '../../metrics/metrics'

jest.mock('../../logger/logfile')
jest.mock('../../metrics/metrics')

const addToQueueEvents = new EventEmitter()
jest.mock('../downloadqueue', () => ({
  __esModule: true,
  addToQueue: (element: DMQueueElement) => {
    addToQueueEvents.emit('addToQueue', element)
  }
}))

const params: InstallParams = {
  path: 'test/path',
  platformToInstall: 'windows',
  appName: '1234',
  gameInfo: {
    runner: 'hyperplay',
    app_name: '1234',
    art_cover: '1234.png',
    art_square: '1234.png',
    is_installed: false,
    install: {},
    title: '1234 game',
    canRunOffline: false
  },
  runner: 'hyperplay'
}

const paramsWithDlc = { ...params, installDlcs: ['dlc1'] }

describe('Download Manager Utils - addToDMQueue', () => {
  afterEach(() => {
    addToQueueEvents.removeAllListeners()
  })
  test('Should add to dm queue to install', (resolve) => {
    addToQueueEvents.on('addToQueue', (args) => {
      const time = new Date()
      expect(args.params).toEqual(params)
      expect(args.startTime).toBe(0)
      expect(args.endTime).toBe(0)
      expect(args.type).toBe('install')
      expect(args.addToQueueTime).toBeGreaterThan(time.valueOf() - 10000)
      expect(args.addToQueueTime).toBeLessThanOrEqual(time.valueOf())
      resolve()
    })
    addToDMQueue(params, 'install')
  })

  test('Should add game and dlc to dm queue to install', (resolve) => {
    let i = 0
    addToQueueEvents.on('addToQueue', (args) => {
      if (i === 0) {
        expect(args.params).toEqual(paramsWithDlc)
        expect(args.startTime).toBe(0)
        expect(args.endTime).toBe(0)
        expect(args.type).toBe('install')
        const time = new Date()
        expect(args.addToQueueTime).toBeGreaterThan(time.valueOf() - 10000)
        expect(args.addToQueueTime).toBeLessThanOrEqual(time.valueOf())
      } else {
        const paramsToTest = {
          ...paramsWithDlc,
          appName: paramsWithDlc.installDlcs[0],
          installDlcs: false
        }
        expect(args.params).toEqual(paramsToTest)
        expect(args.startTime).toBe(0)
        expect(args.endTime).toBe(0)
        expect(args.type).toBe('install')
        const time = new Date()
        expect(args.addToQueueTime).toBeGreaterThan(time.valueOf() - 10000)
        expect(args.addToQueueTime).toBeLessThanOrEqual(time.valueOf())
        resolve()
      }
      ++i
    })
    addToDMQueue(paramsWithDlc, 'install')
  })

  test('Should add game to update and receive trackEvent', async () => {
    const spy = jest.spyOn(Metrics, 'trackEvent')
    await addToDMQueue(paramsWithDlc, 'update')
    expect(spy).toBeCalledWith({
      event: 'Game Update Requested',
      properties: {
        game_name: '1234',
        game_title: '1234 game',
        platform: 'windows',
        store_name: 'hyperplay'
      }
    })
  })
})
