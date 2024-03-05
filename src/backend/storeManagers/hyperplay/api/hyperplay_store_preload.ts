import { contextBridge } from 'electron'
import { api } from './preload_api'

contextBridge.exposeInMainWorld('api', api)
