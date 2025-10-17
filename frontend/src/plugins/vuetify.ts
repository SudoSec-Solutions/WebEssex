import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { md3 } from 'vuetify/blueprints'
import { createVuetify } from 'vuetify'

const wesLight = {
  dark: false,
  colors: {
    background: '#f5f7ff',
    surface: '#ffffff',
    primary: '#646cff',
    'primary-darken-1': '#535bf2',
    secondary: '#42b883',
    tertiary: '#0ea5e9',
    accent: '#f59e0b',
    info: '#2563eb',
    success: '#16a34a',
    warning: '#f97316',
    error: '#dc2626',
    'on-background': '#1f2933',
    'on-surface': '#1f2933'
  }
}

const wesDark = {
  dark: true,
  colors: {
    background: '#131420',
    surface: '#1f2333',
    primary: '#9ca4ff',
    secondary: '#53d3a6',
    tertiary: '#38bdf8',
    accent: '#fbbf24',
    info: '#60a5fa',
    success: '#22c55e',
    warning: '#fb923c',
    error: '#f87171',
    'on-background': '#f8fafc',
    'on-surface': '#f8fafc'
  }
}

export default createVuetify({
  blueprint: md3,
  theme: {
    defaultTheme: 'wesLight',
    themes: {
      wesLight,
      wesDark
    }
  },
  defaults: {
    VBtn: {
      ripple: false
    }
  }
})
