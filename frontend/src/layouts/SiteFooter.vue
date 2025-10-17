<script setup lang="ts">
import NewsletterSubscription from '../components/footer/NewsletterSubscription.vue'

const currentYear = new Date().getFullYear()
</script>

<template>
  <VFooter app color="primary" class="footer" tag="footer">
    <VContainer class="footer__content" fluid>
      <div class="footer__grid">
        <div class="footer__social">
          <span class="footer__brand">© {{ currentYear }} WebEssex</span>
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
              href="https://x.com/WebEssex"
              target="_blank"
              rel="noopener"
            >
              X (Twitter)
            </a>
            <a
              href="https://www.linkedin.com/company/webessex"
              target="_blank"
              rel="noopener"
            >
              Github
            </a>
          </div>
        </div>
        <NewsletterSubscription class="footer__newsletter" />
      </div>
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

.footer__social {
  display: grid;
  gap: 1rem;
  justify-items: center;
  text-align: center;
}

.footer__brand {
  font-weight: 600;
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
}
</style>
