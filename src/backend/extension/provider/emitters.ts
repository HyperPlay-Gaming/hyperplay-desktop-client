import { EventEmitter } from 'node:events'

export const providerEvents: EventEmitter = new EventEmitter()
export const returnExtensionRequestEvents: EventEmitter = new EventEmitter()
export const errorExtensionRequestEvents: EventEmitter = new EventEmitter()
export const providerRequests: EventEmitter = new EventEmitter()
