import 'vuetify/styles'

import { md3 } from 'vuetify/blueprints'
import { aliases as defaultAliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { createVuetify } from 'vuetify'
import {
  mdiAccountGroupOutline,
  mdiAlertCircle,
  mdiArrowTopRight,
  mdiChartTimelineVariant,
  mdiCheckCircle,
  mdiChevronDown,
  mdiChevronUp,
  mdiCompassOutline,
  mdiEmailOutline,
  mdiFlashOutline,
  mdiHandshakeOutline,
  mdiLightningBoltOutline,
  mdiMapMarker,
  mdiMapMarkerOutline,
  mdiMenu,
  mdiPalette,
  mdiPhone,
  mdiPhoneOutline,
  mdiRepeat,
  mdiRocketLaunch,
  mdiShieldCheckOutline,
  mdiTargetVariant,
  mdiWeatherNight,
  mdiWeatherSunny
} from '@mdi/js'

const toSvg = (path: string) => `svg:${path}`

const iconAliases = {
  ...defaultAliases,
  'mdi-arrow-top-right': toSvg(mdiArrowTopRight),
  'mdi-check-circle': toSvg(mdiCheckCircle),
  'mdi-alert-circle': toSvg(mdiAlertCircle),
  'mdi-email-outline': toSvg(mdiEmailOutline),
  'mdi-phone-outline': toSvg(mdiPhoneOutline),
  'mdi-map-marker-outline': toSvg(mdiMapMarkerOutline),
  'mdi-compass-outline': toSvg(mdiCompassOutline),
  'mdi-palette': toSvg(mdiPalette),
  'mdi-lightning-bolt-outline': toSvg(mdiLightningBoltOutline),
  'mdi-handshake-outline': toSvg(mdiHandshakeOutline),
  'mdi-check-circle-outline': toSvg(mdiCheckCircle),
  'mdi-flash-outline': toSvg(mdiFlashOutline),
  'mdi-shield-check-outline': toSvg(mdiShieldCheckOutline),
  'mdi-map-marker': toSvg(mdiMapMarker),
  'mdi-target-variant': toSvg(mdiTargetVariant),
  'mdi-chart-timeline-variant': toSvg(mdiChartTimelineVariant),
  'mdi-account-group-outline': toSvg(mdiAccountGroupOutline),
  'mdi-rocket-launch': toSvg(mdiRocketLaunch),
  'mdi-repeat': toSvg(mdiRepeat),
  'mdi-chevron-up': toSvg(mdiChevronUp),
  'mdi-chevron-down': toSvg(mdiChevronDown),
  'mdi-weather-sunny': toSvg(mdiWeatherSunny),
  'mdi-weather-night': toSvg(mdiWeatherNight),
  'mdi-phone': toSvg(mdiPhone),
  'mdi-menu': toSvg(mdiMenu),
}

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
    'on-surface': '#1f2933',
    'on-primary': '#ffffff'
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
    'on-surface': '#f8fafc',
    'on-primary': '#ffffff'
  }
}

export default createVuetify({
  blueprint: md3,
  icons: {
    defaultSet: 'mdi',
    aliases: iconAliases,
    sets: {
      mdi
    }
  },
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
