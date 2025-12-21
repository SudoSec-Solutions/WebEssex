<script setup lang="ts">
import { onMounted, ref } from 'vue'

const STORAGE_KEY = 'webessex_cookie_consent'

const visible = ref(false)

const readConsent = (): 'accepted' | 'rejected' | null => {
  if (typeof window === 'undefined') return null
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return null
    if (stored === 'accepted' || stored === 'rejected') {
      return stored
    }
    const parsed = JSON.parse(stored) as { status?: string }
    if (parsed.status === 'accepted' || parsed.status === 'rejected') {
      return parsed.status
    }
    return null
  } catch {
    return null
  }
}

const writeConsent = (status: 'accepted' | 'rejected') => {
  if (typeof window === 'undefined') return
  const payload = JSON.stringify({ status, timestamp: new Date().toISOString() })
  window.localStorage.setItem(STORAGE_KEY, payload)
}

const accept = () => {
  writeConsent('accepted')
  visible.value = false
}

const reject = () => {
  writeConsent('rejected')
  visible.value = false
}

onMounted(() => {
  const status = readConsent()
  if (!status && typeof window !== 'undefined') {
    window.localStorage.removeItem(STORAGE_KEY)
  }
  visible.value = !status
})
</script>

<template>
  <teleport to="body">
    <aside v-if="visible" class="cookie-consent" role="region" aria-label="Cookie consent">
      <div class="cookie-consent__content">
        <p class="cookie-consent__title">We respect your privacy</p>
        <p class="cookie-consent__text">
          We use essential cookies to keep the site running. Analytics cookies are optional and only enabled with your
          consent.
        </p>
      </div>
      <div class="cookie-consent__actions">
        <VBtn variant="text" to="/cookies">Manage</VBtn>
        <VBtn variant="outlined" color="secondary" @click="reject">Decline</VBtn>
        <VBtn color="primary" @click="accept">Accept</VBtn>
      </div>
    </aside>
  </teleport>
</template>

<style scoped>
.cookie-consent {
  position: fixed;
  z-index: 1200;
  left: 50%;
  bottom: 1.5rem;
  transform: translateX(-50%);
  width: min(960px, calc(100% - 2rem));
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: center;
  justify-content: space-between;
  padding: 1.35rem 1.5rem;
  border-radius: 1.5rem;
  background: rgba(var(--v-theme-surface), 0.98);
  border: 1px solid rgba(var(--v-theme-primary), 0.16);
  box-shadow: 0 24px 48px rgba(var(--v-theme-on-background), 0.2);
}

.cookie-consent__content {
  display: grid;
  gap: 0.4rem;
  max-width: 560px;
}

.cookie-consent__title {
  margin: 0;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: linear-gradient(120deg, #4c52ff 0%, #2bb673 50%, #0c77c2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.cookie-consent__text {
  margin: 0;
  color: rgba(var(--v-theme-on-surface), 0.75);
  line-height: 1.5;
}

.cookie-consent__actions {
  display: flex;
  gap: 0.65rem;
  flex-wrap: wrap;
}

@media (max-width: 720px) {
  .cookie-consent {
    flex-direction: column;
    align-items: flex-start;
  }

  .cookie-consent__actions {
    width: 100%;
  }
}
</style>
