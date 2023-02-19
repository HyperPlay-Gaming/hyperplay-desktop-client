import Analytics from '@rudderstack/rudder-sdk-node'

/**
 * The rudderstack node client. Node client was chosen over the frontend
 * javascript library to opt out of the automatic tracking of things like
 * location, ip address, and many other browser specific details that we
 * consider to be privacy leaking. Note that even though the ip address will be
 * omitted from the payloads sent to Rudderstack, the very nature of making an
 * https request will reveal the users ip address to Rudderstack. There is an
 * option in Rudderstack to remove that from any records of the event which we
 * have enabled.
 */
export const rudderstack = process.env.RUDDERSTACK_CLIENT_ID
  ? new Analytics(process.env.RUDDERSTACK_CLIENT_ID as string, {
      dataPlaneUrl: 'https://hyperplayvc.dataplane.rudderstack.com'
    })
  : {
      track: () => {
        // Noop, we should decide how to handle this
      },
      screen: () => {
        // Noop, we should decide how to handle this
      }
    }
