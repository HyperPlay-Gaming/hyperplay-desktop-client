import * as Auth from './auth'
import * as Misc from './misc'
import * as Helpers from './helpers'
import * as Library from './library'
import * as Menu from './menu'
import * as Settings from './settings'
import * as Wine from './wine'
import * as Proxy from './proxy'
import * as DownloadManager from './downloadmanager'
import * as Extensions from './extensionImporter'
import * as Metrics from './metrics'
import * as Overlay from 'backend/overlay/api'
import * as Achievements from './questsAchievements'

export default {
  ...Auth,
  ...Misc,
  ...Helpers,
  ...Library,
  ...Menu,
  ...Settings,
  ...Wine,
  ...Proxy,
  ...DownloadManager,
  ...Extensions,
  ...Metrics,
  ...Overlay,
  ...Achievements
}
