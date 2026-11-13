// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

// Styles

import '@/styles/index.css'

// Icons

import { mdiAliases, NamedSvgIcon } from '@app/icons'

// Components
import App from '@app/App.vue'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          background: '#0e0e11',
          surface: '#16161b',
          'surface-variant': '#202028',
          primary: '#ffffff',
          secondary: '#b9b9c2',
          info: '#b9b9c2',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi-svg',
    aliases: mdiAliases,
    sets: {
      'mdi-svg': { component: NamedSvgIcon },
    },
  },
})

createApp(App).use(vuetify).mount('#app')
