<template>
  <section class="services-hero" aria-labelledby="services-heading">
    <VChip color="secondary" variant="tonal" size="large" class="services-hero__badge">
      Coverage from strategy to delivery
    </VChip>
    <h1 id="services-heading" class="services-hero__title">
      Services built for ambitious teams
    </h1>
    <p class="services-hero__subtitle">
      WebEssex delivers end-to-end engagements that blend product discovery, brand-rich design, and scalable
      engineering. Choose a flexible partnership that meets you where you are.
    </p>
  </section>
</template>

<style scoped>
.services-hero {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(1rem, 3vw, 1.75rem);
}

.services-hero__badge {
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: clamp(0.7rem, 2vw, 0.9rem);
  line-height: 1.4;
  text-align: center;
  white-space: normal;
  padding-inline: 1rem;
}

.services-hero__badge :deep(.v-chip__content) {
  white-space: normal;
  text-align: center;
  flex-wrap: wrap;
  line-height: 1.4;
}

.services-hero__title {
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

.services-hero__subtitle {
  margin: 0;
  max-width: 46rem;
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  color: rgba(var(--v-theme-on-background), 0.78);
  line-height: 1.65;
}
</style>
