import { defineConfig } from 'vitest/config'
import electron from 'vite-plugin-electron'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'
import { bytecodePlugin } from 'electron-vite'

const srcAliases = ['backend', 'frontend', 'common'].map((srcFolder) => {
  return {
    find: srcFolder,
    replacement: path.resolve(__dirname, `./src/${srcFolder}`)
  }
})

const electronViteConfig = {
  build: { outDir: 'build/electron', target: 'es2020' },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020'
    }
  },
  resolve: {
    alias: [
      {
        find: '~@fontsource',
        replacement: path.resolve(__dirname, 'node_modules/@fontsource')
      },
      ...srcAliases
    ]
  }
}

export default defineConfig({
  test: {
    include: ['src/backend/logger/__tests__/logger.test.ts'],
    // server: {
    //   deps: {
    //     inline: ['electron-store']
    //   }
    // },
    setupFiles: './test/vitest.setup.ts'
  },
  build: {
    outDir: 'build'
  },
  resolve: {
    alias: [
      {
        find: '~@fontsource',
        replacement: path.resolve(__dirname, 'node_modules/@fontsource')
      },
      ...srcAliases
    ]
  },
  plugins: [
    // electron([
    //   {
    //     entry: 'src/backend/main.ts',
    //     vite: { ...electronViteConfig }
    //   },
    //   {
    //     entry: path.resolve(__dirname + '/src/backend/preload.ts'),
    //     vite: electronViteConfig
    //   },
    //   {
    //     entry: path.resolve(
    //       __dirname +
    //         '/src/backend/hyperplay-extension-helper/extensionPreload.ts'
    //     ),
    //     vite: electronViteConfig
    //   },
    //   {
    //     entry: path.resolve(
    //       __dirname + '/src/backend/hyperplay-proxy-server/providerPreload.ts'
    //     ),
    //     vite: electronViteConfig
    //   },
    //   {
    //     entry: path.resolve(
    //       __dirname + '/src/backend/hyperplay_store_preload.ts'
    //     ),
    //     vite: electronViteConfig
    //   },
    //   {
    //     entry: path.resolve(
    //       __dirname + '/src/backend/webview_style_preload.ts'
    //     ),
    //     vite: electronViteConfig
    //   },
    //   {
    //     entry: path.resolve(
    //       __dirname + '/src/backend/transparent_body_preload.ts'
    //     ),
    //     vite: electronViteConfig
    //   },
    //   {
    //     entry: path.resolve(
    //       __dirname + '/src/backend/auth_provider_preload.ts'
    //     ),
    //     vite: electronViteConfig
    //   }
    // ]),
    // svgr()
  ]
})
