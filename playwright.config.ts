import { defineConfig } from 'playwright/test'

export default defineConfig({
  testMatch: ['*spec.ts'],
  /* Maximum time one test can run for. */
  timeout: 5 * 60 * 1000
})
