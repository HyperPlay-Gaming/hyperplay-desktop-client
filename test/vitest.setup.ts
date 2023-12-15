import { vi } from 'vitest'
console.log('setting up mocks')
vi.mock('../src/backend/logger/logfile')
vi.mock('electron', async () =>
  vi.importActual('../src/backend/__mocks__/electron')
)
vi.mock('electron-store')
// vi.mock('electron-store', async () =>
//   vi.importActual('../src/backend/__mocks__/electron-store')
// )
// vi.mock('../src/backend/constants')
// vi.mock('@rudderstack/rudder-sdk-node')
vi.mock('@sentry/electron', async () =>
  vi.importActual('../src/backend/__mocks__/@sentry/electron')
)
console.log('mocks set up!')
// vi.mock('../src/backend/logger/__mocks__/logfile.ts')
