import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

import vueDevTools from 'vite-plugin-vue-devtools'
// Auto import plugin
import AutoImport from 'unplugin-auto-import/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Only bundle the Vuetify components/directives actually used + their CSS,
    // and trim the utility stylesheet via the SASS settings override.
    vuetify({
      autoImport: true,
      styles: { configFile: 'src/styles/settings.scss' },
    }),
    vueDevTools(),
    AutoImport({
      /* options */
      imports: ['vue'],
      eslintrc: {
        enabled: true, // <-- this
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@composables': fileURLToPath(new URL('./src/composables', import.meta.url)),
      '@sections': fileURLToPath(new URL('./src/sections', import.meta.url)),
      '@config': fileURLToPath(new URL('./src/config', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
    },
  },
})
