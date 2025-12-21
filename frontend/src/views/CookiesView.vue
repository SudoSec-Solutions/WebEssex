<script setup lang="ts">
import { onMounted, ref } from 'vue'

const consentStatus = ref('Not set')

const loadStatus = () => {
  if (typeof window === 'undefined') return
  const stored = window.localStorage.getItem('webessex_cookie_consent')
  if (!stored) {
    consentStatus.value = 'Not set'
    return
  }
  if (stored === 'accepted' || stored === 'rejected') {
    consentStatus.value = stored
    return
  }
  try {
    const parsed = JSON.parse(stored) as { status?: string }
    consentStatus.value = parsed.status ? parsed.status : 'Not set'
  } catch {
    consentStatus.value = 'Not set'
  }
}

const resetConsent = () => {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem('webessex_cookie_consent')
  loadStatus()
}

onMounted(loadStatus)
</script>

<template>
  <section class="legal-page" aria-labelledby="cookies-heading">
    <header class="legal-page__header">
      <p class="legal-page__eyebrow">Cookie policy</p>
      <h1 id="cookies-heading" class="legal-page__title">
        Cookies and tracking
      </h1>
      <p class="legal-page__subtitle">
        We use essential cookies to keep the site working. If we enable analytics, you can control those preferences
        here.
      </p>
    </header>

    <div class="legal-page__content">
      <section class="legal-page__section">
        <h2>Essential cookies</h2>
        <p>
          These cookies are required for the website to function and cannot be switched off. They help with security,
          accessibility, and site stability.
        </p>
      </section>

      <section class="legal-page__section">
        <h2>Analytics cookies</h2>
        <p>
          Analytics cookies help us understand how visitors use the site so we can improve performance. We only enable
          analytics after you give consent.
        </p>
      </section>

      <section class="legal-page__section">
        <h2>Managing your preferences</h2>
        <p>
          You can update your cookie preferences at any time from the consent banner on the site.
        </p>
        <div class="legal-page__actions">
          <span class="legal-page__status">Current consent: {{ consentStatus }}</span>
          <VBtn variant="outlined" color="secondary" @click="resetConsent">
            Reset cookie choice
          </VBtn>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.legal-page {
  display: grid;
  gap: clamp(2rem, 4vw, 3rem);
}

.legal-page__header {
  text-align: left;
  max-width: 52rem;
  display: grid;
  gap: 0.75rem;
}

.legal-page__eyebrow {
  margin: 0;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(var(--v-theme-on-background), 0.65);
}

.legal-page__title {
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.75rem);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: linear-gradient(120deg, #4c52ff 0%, #2bb673 50%, #0c77c2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.legal-page__subtitle {
  margin: 0;
  color: rgba(var(--v-theme-on-background), 0.78);
  line-height: 1.7;
}

.legal-page__content {
  display: grid;
  gap: 1.5rem;
}

.legal-page__section {
  background: rgba(var(--v-theme-surface), 0.95);
  border-radius: 1.4rem;
  padding: clamp(1.5rem, 3vw, 2.25rem);
  border: 1px solid rgba(var(--v-theme-primary), 0.12);
  box-shadow: 0 18px 36px rgba(var(--v-theme-on-background), 0.08);
}

.legal-page__section h2 {
  margin: 0 0 0.75rem;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.legal-page__section p {
  margin: 0;
  color: rgba(var(--v-theme-on-surface), 0.74);
  line-height: 1.6;
}

.legal-page__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  margin-top: 1.25rem;
}

.legal-page__status {
  font-weight: 600;
  color: rgba(var(--v-theme-on-surface), 0.8);
  text-transform: capitalize;
}
</style>
