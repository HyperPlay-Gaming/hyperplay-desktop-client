import * as Misc from './misc'
import * as Helpers from './helpers'
import * as Library from './library'
import * as Menu from './menu'
import * as Settings from './settings'
import * as Wine from './wine'
import * as Proxy from '../hyperplay-proxy-server/api/proxy'
import * as DownloadManager from './downloadmanager'
import * as Extensions from '../hyperplay-extension-helper/api/extensions'
import * as Overlay from '../overlay/api'
import * as Metrics from './metrics'
import * as HyperPlay from './hyperplay'

export default {
  ...Misc,
  ...Helpers,
  ...Library,
  ...Menu,
  ...Settings,
  ...Wine,
  ...Proxy,
  ...DownloadManager,
  ...Extensions,
  ...Overlay,
  ...Metrics,
  ...HyperPlay
}
