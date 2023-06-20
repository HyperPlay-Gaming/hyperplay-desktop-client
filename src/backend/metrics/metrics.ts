import { apiObject } from '@rudderstack/rudder-sdk-node'
import { sendFrontendMessage } from 'backend/main_window'
import { GameInfo, MetricsOptInStatus } from 'common/types'
import Store from 'electron-store'
import web3 from 'web3'
import { getAppVersion, getFormattedOsName, processIsClosed } from '../utils'
import { rudderstack } from './rudderstack-client'
import { PossibleMetricEventNames, PossibleMetricPayloads } from './types'
import { hrtime } from 'process'
import find from 'find-process'

/**
 * Our global anonymous id which is used for any events that contain data that
 * could be backwards traced through the chain to associate a user id with a
 * wallet address. Using this ID prevents Rudderstack from correlating any data
 * about the events that are attached to it to any given profile.
 */
type GlobalAnonymousId = '0x0000000000000000'

const ANONYMOUS_ID: GlobalAnonymousId = '0x0000000000000000'

/**
 * This interface defines the shape of the Metrics Store, which is used as an
 * input to the Store type so that TypeScript knows what the underlying value
 * types are.
 */
interface MetricsStore {
  metricsOptInStatus: MetricsOptInStatus
  metricsId: typeof ANONYMOUS_ID | 'string'
}

/**
 * We need a minimal store for metrics events to keep track of the users
 * randomized anonymous id. We use two different kinds of anonymous ids to
 * protect our users
 *
 * 1. A global anonymous id, also known as the burn address, 0x0000000000000000
 * This id is used for any events that are tracked with sensitive properties,
 * otherwise known as properties that could reveal the identity of the user or
 * could somehow be backwards traced to addresses the user owns. Anything that
 * adds on-chain data to our event store will be tracked using this global
 * anonymous id. When tracking events with this id we will use the key
 * 'anonymousId' in the event payload. This is how Rudderstack identifies
 * events that do not belong to any given user profile, and will be grouped
 * together in all warehouses.
 *
 * 2. A randomized hex that is *not* a ethereum address or seeded with any info
 * derived from the user. It is truly random and can be seen in this file. We
 * use web3.js's randomHex to create it. This id is used when we are working
 * with data that cannot make a connection between our user's random ID and any
 * property they own. It will allow us to get an accurate count of our users
 * and provid us with crucial information on how to improve the experience for
 * our customers.
 */
const metricsStore = new Store<MetricsStore>({
  cwd: 'store',
  name: 'metrics-store',
  schema: {
    metricsOptInStatus: {
      type: 'string',
      enum: ['OPTED_IN', 'OPTED_OUT', 'UNDECIDED'],
      default: MetricsOptInStatus.undecided
    },
    metricsId: {
      type: 'string',
      default: ANONYMOUS_ID
    }
  }
})

/**
 * the only key, currently, that the frontend needs to be aware of is the
 * metricsOptInStatus key. This will be used to populate the settings page as
 * well as whether or not to show the metrics opt in screen in the onboarding
 * screen.
 */
metricsStore.onDidChange('metricsOptInStatus', (newValue) => {
  sendFrontendMessage('optInStatusChanged', newValue as MetricsOptInStatus)
})

/**
 * There are two events that we *ignore* the users preference for tracking on.
 * The reason is that we need to get an accurate count of opt ins and opt outs.
 * In the event of an opt out we will use the global anonymous id to continue
 * to protect our user's privacy.
 */
const METRICS_PARTICIPATION_EVENTS = ['Metrics Opt-in', 'Metrics Opt-out']

/**
 * We will send the version of HyperPlay with all events for the ability to
 * track improvements in experiences overtime.
 */

/**
 * Generates a randomized 24 byte hex string.
 * @returns A random hex string
 */
function generateRandomId() {
  return web3.utils.randomHex(24)
}

/**
 * An internal only function that adds context and global properties to the
 * event payload before sending.
 *
 * @param eventName
 * @param properties
 * @param idFieldName
 * @param id
 */
async function _trackEventPrivate(
  eventName: PossibleMetricEventNames,
  properties:
    | PossibleMetricPayloads['properties']
    | PossibleMetricPayloads['sensitiveProperties'],
  idFieldName: 'anonymousId' | 'userId',
  id: GlobalAnonymousId | 'string'
): Promise<void> {
  rudderstack.track({
    event: eventName,
    [idFieldName]: id,
    properties: {
      ...properties,
      OS: getFormattedOsName()
    },
    context: {
      app: {
        name: 'HyperPlay',
        version: getAppVersion()
      }
    }
  })
}

export const trackEvent = async ({
  event,
  properties,
  sensitiveProperties
}: PossibleMetricPayloads): Promise<void> => {
  const metricsId = metricsStore.get('metricsId')
  const optInStatus = metricsStore.get('metricsOptInStatus')
  const idFieldName = metricsId === ANONYMOUS_ID ? 'anonymousId' : 'userId'
  if (
    optInStatus === MetricsOptInStatus.optedIn ||
    METRICS_PARTICIPATION_EVENTS.includes(event)
  ) {
    // full tracking
    _trackEventPrivate(event, properties, idFieldName, metricsId)
    if (sensitiveProperties) {
      _trackEventPrivate(
        event,
        sensitiveProperties,
        'anonymousId',
        ANONYMOUS_ID
      )
    }
  }
}

export const trackScreen = async (name: string, properties?: apiObject) => {
  const metricsId = metricsStore.get('metricsId')
  const optInStatus = metricsStore.get('metricsOptInStatus')
  const idFieldName = metricsId === ANONYMOUS_ID ? 'anonymousId' : 'userId'
  if (optInStatus === MetricsOptInStatus.optedIn) {
    rudderstack.screen({
      [idFieldName]: metricsId,
      name,
      properties: {
        ...(properties ?? {}),
        OS: getFormattedOsName()
      },
      context: {
        app: {
          name: 'HyperPlay',
          version: getAppVersion()
        }
      }
    })
  }
}

export const changeMetricsOptInStatus = async (
  newStatus: MetricsOptInStatus.optedIn | MetricsOptInStatus.optedOut
): Promise<void> => {
  const currentId = metricsStore.get('metricsId')
  const oldStatus = metricsStore.get('metricsOptInStatus')
  metricsStore.set('metricsOptInStatus', newStatus)
  // Only process this as a new Opt In if the user wasn't previously optedIn
  if (
    newStatus === MetricsOptInStatus.optedIn &&
    oldStatus !== MetricsOptInStatus.optedIn
  ) {
    // Only generate a new id if the old id was anonymous.
    // This will allow users who were opted in, had an id, then opted out to
    // opt back in and the metrics would show their history.
    if (currentId === ANONYMOUS_ID) {
      metricsStore.set('metricsId', generateRandomId())
    }
    trackEvent({
      event: 'Metrics Opt-in'
    })
  } else if (
    newStatus === MetricsOptInStatus.optedOut &&
    oldStatus !== MetricsOptInStatus.optedOut
  ) {
    trackEvent({
      event: 'Metrics Opt-out'
    })
  }
}

export async function trackPidPlaytime(
  pid: string | number,
  gameInfo: GameInfo
) {
  try {
    const start = hrtime.bigint()
    const processInfoArr = await find('pid', pid)
    if (processInfoArr.length === 0) {
      console.log('No process info found with pid', pid)
      return
    }
    for (const processInfo of processInfoArr) {
      trackEvent({
        event: 'Game Launched',
        properties: {
          isBrowserGame: false,
          game_name: gameInfo.app_name,
          game_title: gameInfo.title,
          store_name: gameInfo.runner,
          processName: processInfo.name
        }
      })
    }

    // wait for process to close
    const pidNum = typeof pid === 'number' ? pid : Number.parseInt(pid)
    await processIsClosed(pidNum)

    const end = hrtime.bigint()
    const elapsedInMs = Math.round(Number(end - start) / 10 ** 6)
    for (const processInfo of processInfoArr) {
      trackEvent({
        event: 'Game Closed',
        properties: {
          isBrowserGame: false,
          game_name: gameInfo.app_name,
          game_title: gameInfo.title,
          store_name: gameInfo.runner,
          processName: processInfo.name,
          playTimeInMs: elapsedInMs
        }
      })
    }
  } catch (err) {
    console.error(err)
  }
}
