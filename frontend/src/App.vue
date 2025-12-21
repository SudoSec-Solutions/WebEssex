<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationBar from './layouts/NavigationBar.vue'
import SiteFooter from './layouts/SiteFooter.vue'
import CookieConsent from './components/legal/CookieConsent.vue'
import StructuredData from './components/shared/StructuredData.vue'
import BreadcrumbSchema from './components/shared/BreadcrumbSchema.vue'
import WebPageSchema from './components/shared/WebPageSchema.vue'
</script>

<template>
  <VApp>
    <NavigationBar />
    <VMain class="app-main" tag="main">
      <VContainer fluid class="app-shell">
        <RouterView />
      </VContainer>
    </VMain>
    <SiteFooter />
    <CookieConsent />
    <StructuredData />
    <BreadcrumbSchema />
    <WebPageSchema />
  </VApp>
</template>

<style scoped>
.app-main {
  background: linear-gradient(180deg, rgba(99, 102, 241, 0.06) 0%, transparent 240px);
}

.app-shell {
  padding-top: clamp(3rem, 8vw, 4.5rem);
  padding-bottom: clamp(3rem, 8vw, 4.5rem);
  padding-inline: clamp(1.5rem, 5vw, 2.75rem);
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
</style>
