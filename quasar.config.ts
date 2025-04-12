// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-file

import { configure } from 'quasar/wrappers'
import { fileURLToPath } from 'node:url'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import vue from '@vitejs/plugin-vue'

export default configure((ctx) => {
  return {
    eslint: {
      fix: true,
      include: [],
      rawOptions: {}
    },

    boot: [
      'i18n',
      'axios',
      'pinia'
    ],

    css: [
      'app.scss'
    ],

    extras: [
      'roboto-font',
      'material-icons'
    ],

    build: {
      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node16'
      },

      vueRouterMode: 'history',
      vueDevtools: true
    },

    devServer: {
      server: {
        type: 'http'
      },
      port: 8080,
      open: true
    },

    framework: {
      config: {},

      plugins: [
        'Notify'
      ]
    },

    animations: [],

    ssr: {
      prodPort: 3000,

      middlewares: [
        'render'
      ],

      pwa: false
    },

    pwa: {
      workboxMode: 'GenerateSW',
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false
    },

    cordova: {
    },

    capacitor: {
      hideSplashscreen: false
    },

    electron: {
      inspectPort: 5858,

      bundler: 'packager',

      packager: {
      },

      builder: {
        appId: 'quasar-project'
      }
    }
  }
})
