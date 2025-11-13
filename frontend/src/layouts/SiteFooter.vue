<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { VExpandTransition } from 'vuetify/components'
import NewsletterSubscription from '../components/footer/NewsletterSubscription.vue'

const currentYear = new Date().getFullYear()

const DESKTOP_QUERY = '(min-width: 960px)'

const initialDesktopState = typeof window !== 'undefined' ? window.matchMedia(DESKTOP_QUERY).matches : false

const isDesktop = ref(import.meta.env.SSR ? true : initialDesktopState)
const isExpanded = ref(import.meta.env.SSR ? true : initialDesktopState)

const updateDesktopState = () => {
  if (typeof window === 'undefined') return
  const matches = window.matchMedia(DESKTOP_QUERY).matches
  isDesktop.value = matches
}

onMounted(() => {
  updateDesktopState()
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', updateDesktopState, { passive: true })
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateDesktopState)
  }
})

watch(
  isDesktop,
  (value) => {
    isExpanded.value = value
  },
  { immediate: true }
)

const contentExpanded = computed(() => isExpanded.value)

const toggleExpanded = () => {
  if (isDesktop.value) {
    return
  }
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <VFooter app color="primary" class="footer" tag="footer">
    <VContainer class="footer__content" fluid>
      <div class="footer__header">
        <span class="footer__brand">© {{ currentYear }} WebEssex</span>
        <VBtn
          v-if="!isDesktop"
          class="footer__toggle"
          icon
          variant="tonal"
          color="on-primary"
          size="small"
          :aria-expanded="contentExpanded"
          aria-controls="footer-sections"
          aria-label="Toggle footer content"
          @click="toggleExpanded"
        >
          <VIcon :icon="contentExpanded ? '$mdi-chevron-up' : '$mdi-chevron-down'" />
        </VBtn>
      </div>
      <VExpandTransition>
        <div
          v-show="contentExpanded"
          id="footer-sections"
          class="footer__grid"
        >
          <div class="footer__social">
            <span class="footer__brand footer__brand--desktop">© {{ currentYear }} WebEssex</span>
          <div class="footer__links">
            <a
              href="https://www.facebook.com/profile.php?id=61582622033324"
              target="_blank"
              rel="noopener"
              >
                Facebook
              </a>
              <a
                href="https://www.linkedin.com/company/webessex/"
                target="_blank"
                rel="noopener"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/WEssex25624"
                target="_blank"
                rel="noopener"
              >
                X (Twitter)
              </a>
              <a
                href="https://www.instagram.com/web_essex/"
                target="_blank"
                rel="noopener"
              >
                Instagram
              </a>
            </div>
          </div>
          <NewsletterSubscription class="footer__newsletter" />
        </div>
      </VExpandTransition>
    </VContainer>
  </VFooter>
</template>

<style scoped>
.footer {
  padding-block: 1.5rem;
}

.footer__content {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  color: rgb(var(--v-theme-on-primary));
  font-size: 0.9rem;
  letter-spacing: 0.03em;
}

.footer__grid {
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 4vw, 2.75rem);
  align-items: stretch;
}

.footer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  margin-bottom: 0.75rem;
}

.footer__toggle {
  color: inherit;
}

.footer__social {
  display: grid;
  gap: 1rem;
  justify-items: center;
  text-align: center;
}

.footer__brand {
  font-weight: 600;
}

.footer__brand--desktop {
  display: none;
}

.footer__links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
}

.footer__links a {
  color: inherit;
  font-weight: 600;
  transition: opacity 150ms ease-in-out;
}

.footer__links a:hover {
  opacity: 0.72;
}

.footer__newsletter {
  width: 100%;
}

@media (max-width: 640px) {
  .footer__links {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (min-width: 840px) {
  .footer__grid {
    flex-direction: row;
    align-items: flex-start;
    gap: clamp(2rem, 6vw, 3.5rem);
  }

  .footer__social,
  .footer__newsletter {
    flex: 1;
  }

  .footer__social {
    justify-items: flex-start;
    text-align: left;
  }

  .footer__links {
    justify-content: flex-start;
  }

  .footer__newsletter {
    margin-left: auto;
    max-width: 520px;
  }

  .footer__header {
    display: none;
    margin-bottom: 0;
  }

  .footer__brand--desktop {
    display: inline;
  }
}
</style>
