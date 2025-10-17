<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from 'vuetify'
import logoWhite from '../assets/WebEssexLogoWhite.svg'

const drawerOpen = ref(false)
const route = useRoute()
const drawerId = 'mobile-primary-navigation'

const navigation = [
  { title: 'Home', to: '/' },
  { title: 'Services', to: '/services' },
  { title: 'About', to: '/about' },
  { title: 'Contact', to: '/contact' }
]

watch(
  () => route.fullPath,
  () => {
    drawerOpen.value = false
  }
)

const isActive = (to: string) => route.path === to

const theme = useTheme()
const themeStorageKey = 'wesTheme'

const isDarkTheme = computed(() => theme.global.current.value.dark)
const themeIcon = computed(() => (isDarkTheme.value ? 'mdi-weather-sunny' : 'mdi-weather-night'))
const themeLabel = computed(() =>
  isDarkTheme.value ? 'Switch to light theme' : 'Switch to dark theme'
)

const applyTheme = (themeName: 'wesLight' | 'wesDark') => {
  theme.global.name.value = themeName
}

const toggleTheme = () => {
  applyTheme(isDarkTheme.value ? 'wesLight' : 'wesDark')
}

watch(
  isDarkTheme,
  (isDark) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(themeStorageKey, isDark ? 'wesDark' : 'wesLight')
    }
  },
)

onMounted(() => {
  if (typeof window === 'undefined') {
    return
  }
  const storedTheme = window.localStorage.getItem(themeStorageKey)
  if (storedTheme === 'wesLight' || storedTheme === 'wesDark') {
    applyTheme(storedTheme)
    window.localStorage.setItem(themeStorageKey, storedTheme)
  }
})
</script>

<template>
  <VAppBar
    app
    color="primary"
    density="comfortable"
    flat
    tag="header"
    elevation="0"
  >
    <VContainer class="nav-bar" fluid>
      <RouterLink to="/" class="nav-brand">
        <img :src="logoWhite" alt="WebEssex" class="nav-brand__image" />
        <span class="nav-brand__text">WebEssex</span>
      </RouterLink>
      <div class="nav-actions">
        <nav class="nav-links d-none d-md-flex" aria-label="Primary" role="navigation">
          <VBtn
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            :class="[
              'nav-link',
              isActive(item.to) && 'nav-link--active',
              'text-white'
            ]"
            variant="text"
          >
            {{ item.title }}
          </VBtn>
        </nav>
        <VBtn
          class="nav-theme-btn text-white"
          icon
          variant="text"
          :aria-label="themeLabel"
          :title="themeLabel"
          :aria-pressed="isDarkTheme"
          @click="toggleTheme"
        >
          <VIcon :icon="themeIcon" />
        </VBtn>
        <VBtn
          class="nav-menu-btn d-flex d-md-none text-white"
          icon
          variant="text"
          aria-label="Toggle navigation menu"
          :aria-expanded="drawerOpen"
          :aria-controls="drawerId"
          @click="drawerOpen = !drawerOpen"
        >
          <VIcon icon="mdi-menu" />
        </VBtn>
      </div>
    </VContainer>
  </VAppBar>

  <VNavigationDrawer
    v-model="drawerOpen"
    location="right"
    temporary
    width="280"
    aria-label="Mobile navigation"
    :id="drawerId"
    tag="nav"
  >
    <ul class="nav-drawer__list">
      <li v-for="item in navigation" :key="item.to" class="nav-drawer__item">
        <RouterLink
          :to="item.to"
          class="nav-drawer__link"
          :class="{ 'nav-drawer__link--active': isActive(item.to) }"
          @click="drawerOpen = false"
        >
          {{ item.title }}
        </RouterLink>
      </li>
      <li class="nav-drawer__item nav-drawer__item--theme">
        <VBtn
          class="nav-drawer__theme-btn"
          variant="tonal"
          block
          :aria-label="themeLabel"
          :title="themeLabel"
          :aria-pressed="isDarkTheme"
          @click="toggleTheme"
        >
          <VIcon :icon="themeIcon" start />
          <span>{{ themeLabel }}</span>
        </VBtn>
      </li>
    </ul>
  </VNavigationDrawer>
</template>

<style scoped>
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}

.nav-brand {
  display: inline-flex;
  align-items: center;
  flex: 1 1 auto;
  min-width: 0;
  gap: 0.75rem;
  color: inherit;
}

.nav-brand__image {
  height: 40px;
  width: auto;
}

.nav-brand__text {
  font-family: 'Poppins', 'Inter', 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.96);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
}

.nav-theme-btn {
  flex-shrink: 0;
}

.nav-menu-btn {
  flex-shrink: 0;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link {
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0.02em;
}

.nav-link--active {
  background-color: rgba(255, 255, 255, 0.18);
}

.nav-drawer__list {
  list-style: none;
  margin: 0;
  padding: 2rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-drawer__item {
  margin: 0;
}

.nav-drawer__item--theme {
  margin-top: 1.25rem;
}

.nav-drawer__link {
  display: block;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  color: inherit;
}

.nav-drawer__link:hover,
.nav-drawer__link--active {
  background-color: rgba(255, 255, 255, 0.12);
}

.nav-drawer__theme-btn {
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 640px) {
  .nav-brand {
    gap: 0.5rem;
  }

  .nav-brand__text {
    font-size: 0.8rem;
    letter-spacing: 0.08em;
  }
}

@media (max-width: 480px) {
  .nav-brand {
    gap: 0.25rem;
  }

  .nav-brand__image {
    height: 32px;
  }

  .nav-brand__text {
    display: none;
  }
}
</style>
