import { defineConfig } from 'vite'
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

const aliases = [
  {
    find: '~@fontsource',
    replacement: path.resolve(__dirname, 'node_modules/@fontsource')
  },
  ...srcAliases
]

const electronViteConfig = {
  build: { outDir: 'build/electron', target: 'es2020' },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020'
    }
  },
  resolve: {
    alias: aliases
  }
}

export default defineConfig({
  build: {
    outDir: 'build'
  },
  resolve: {
    alias: aliases
  },
  plugins: [
    react(),
    electron([
      {
        entry: 'src/backend/main.ts',
        vite: {
          ...electronViteConfig,
          plugins: [bytecodePlugin()],
          resolve: {
            alias: [
              {
                find: 'axios',
                replacement: path.resolve(
                  __dirname,
                  'node_modules/axios/dist/node/axios.cjs'
                )
              },
              {
                find: 'form-data',
                replacement: path.resolve(
                  __dirname,
                  'node_modules/form-data/lib/form_data.js'
                )
              },
              ...aliases
            ]
          }
        }
      },
      {
        entry: path.resolve(__dirname + '/src/backend/preload.ts'),
        vite: electronViteConfig
      },
      {
        entry: path.resolve(
          __dirname +
            '/src/backend/hyperplay-extension-helper/extensionPreload.ts'
        ),
        vite: electronViteConfig
      },
      {
        entry: path.resolve(
          __dirname + '/src/backend/hyperplay-proxy-server/providerPreload.ts'
        ),
        vite: electronViteConfig
      },
      {
        entry: path.resolve(
          __dirname + '/src/backend/hyperplay_store_preload.ts'
        ),
        vite: electronViteConfig
      },
      {
        entry: path.resolve(
          __dirname + '/src/backend/webview_style_preload.ts'
        ),
        vite: electronViteConfig
      },
      {
        entry: path.resolve(
          __dirname + '/src/backend/auth_provider_preload.ts'
        ),
        vite: electronViteConfig
      }
    ]),
    svgr()
  ]
})
