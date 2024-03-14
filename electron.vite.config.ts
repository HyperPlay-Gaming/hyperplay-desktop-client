import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { join } from 'path'
import {
  bytecodePlugin,
  defineConfig,
  externalizeDepsPlugin
} from 'electron-vite'

const srcAliases = ['backend', 'frontend', 'common'].map((aliasName) => {
  return {
    find: aliasName,
    replacement: join(__dirname, 'src', aliasName)
  }
})

const dependenciesToNotExternalize = ['check-disk-space']

export default defineConfig(({ mode }) => ({
  main: {
    build: {
      rollupOptions: {
        input: 'src/backend/main.ts'
      },
      outDir: 'build/main',
      minify: mode === 'production',
      sourcemap: mode === 'development' ? 'inline' : false
    },
    resolve: { alias: srcAliases },
    plugins: [
      externalizeDepsPlugin({ exclude: dependenciesToNotExternalize }),
      bytecodePlugin()
    ]
  },
  preload: {
    build: {
      rollupOptions: {
        input: [
          'src/backend/preload.ts',
          'src/backend/hyperplay-extension-helper/extensionPreload.ts',
          'src/backend/hyperplay-proxy-server/providerPreload.ts',
          'src/backend/hyperplay_store_preload.ts',
          'src/backend/webview_style_preload.ts',
          'src/backend/auth_provider_preload.ts',
          'src/backend/email_modal_provider_preload.ts'
        ]
      },
      outDir: 'build/preload',
      minify: mode === 'production',
      sourcemap: mode === 'development' ? 'inline' : false
    },
    resolve: { alias: srcAliases },
    plugins: [externalizeDepsPlugin({ exclude: dependenciesToNotExternalize })]
  },
  renderer: {
    root: '.',
    build: {
      rollupOptions: {
        input: 'index.html'
      },
      target: 'esnext',
      outDir: 'build',
      emptyOutDir: false,
      minify: mode === 'production',
      sourcemap: mode === 'development' ? 'inline' : false
    },
    resolve: { alias: srcAliases },
    plugins: [react(), svgr()]
  }
}))

/* export default defineConfig({
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
      },
      {
        entry: path.resolve(
          __dirname + '/src/backend/email_modal_provider_preload.ts'
        ),
        vite: electronViteConfig
      }
    ]),
    svgr()
  ]
}) */
