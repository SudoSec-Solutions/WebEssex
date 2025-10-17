<template>
  <section class="contact-hero" aria-labelledby="contact-heading">
    <VChip color="secondary" variant="tonal" size="large" class="contact-hero__badge">
      Say hello to WebEssex
    </VChip>
    <h1 id="contact-heading" class="contact-hero__title">Let’s build something brilliant together</h1>
    <p class="contact-hero__subtitle">
      Share your goals, timelines, and team setup. We’ll respond within two working days with next steps.
    </p>
  </section>
</template>

<style scoped>
.contact-hero {
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 3vw, 1.75rem);
  text-align: center;
  align-items: center;
}

.contact-hero__badge {
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.contact-hero__title {
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.75rem);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: linear-gradient(120deg, #4c52ff 0%, #2bb673 50%, #0c77c2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.contact-hero__subtitle {
  margin: 0;
  max-width: 42rem;
  font-size: clamp(1rem, 2.4vw, 1.2rem);
  color: rgba(var(--v-theme-on-surface), 0.78);
  line-height: 1.65;
}
</style>
