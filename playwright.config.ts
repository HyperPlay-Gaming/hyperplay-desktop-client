import { defineConfig } from 'playwright/test'

export default defineConfig({
  testMatch: ['*spec.ts'],
  /* Maximum time one test can run for. */
  timeout: 5 * 60 * 1000,
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  reporter: [
    ['list'],
    [
      'playwright-qase-reporter',
      {
        mode: 'testops',
        debug: false,
        testops: {
          api: {
            token: process.env.QASE_PW_DESKTOP_CLIENT_API_TOKEN
          },
          project: 'HC',
          uploadAttachments: true,
          run: {
            complete: true
          }
        }
      }
    ]
  ]
})
