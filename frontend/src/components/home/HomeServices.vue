<script setup lang="ts">
interface ServiceSummary {
  title: string
  description: string
  icon: string
  accent: 'primary' | 'secondary' | 'tertiary' | 'quaternary'
}

const services: ServiceSummary[] = [
  {
    title: 'Strategy & discovery',
    description: 'Align goals, scope, and launch plans with focused discovery and stakeholder alignment.',
    icon: '$mdi-compass-outline',
    accent: 'primary'
  },
  {
    title: 'Brand & design',
    description: 'Web design and UX/UI that feels unmistakably yours, built to convert and scale.',
    icon: '$mdi-palette',
    accent: 'secondary'
  },
  {
    title: 'Engineering delivery',
    description: 'High-performance web development with reliable handover and launch support.',
    icon: '$mdi-lightning-bolt-outline',
    accent: 'tertiary'
  },
  {
    title: 'Growth partnerships',
    description: 'Ongoing iteration, optimisation, and delivery support for growing UK teams.',
    icon: '$mdi-repeat',
    accent: 'quaternary'
  }
]
</script>

<template>
  <section class="home-services" aria-labelledby="home-services-heading">
    <header class="home-services__header">
      <h2 id="home-services-heading" class="home-services__title">
        What we deliver
      </h2>
      <p class="home-services__subtitle">
        Product strategy, brand-led design, and web development delivered by a studio that stays close to the work.
      </p>
    </header>
    <div class="home-services__grid">
      <article
        v-for="service in services"
        :key="service.title"
        :class="['home-services__card', `home-services__card--${service.accent}`]"
      >
        <div class="home-services__title-row">
          <h3>{{ service.title }}</h3>
          <div class="home-services__icon">
            <VIcon :icon="service.icon" size="26" />
          </div>
        </div>
        <p>{{ service.description }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.home-services {
  width: 100%;
  max-width: 1100px;
  display: grid;
  gap: clamp(1.25rem, 3vw, 1.75rem);
  text-align: center;
  padding: 0 clamp(1rem, 3vw, 2.5rem);
}

.home-services__header {
  display: grid;
  gap: 0.6rem;
  justify-items: center;
}

.home-services__title {
  margin: 0;
  font-size: clamp(1.7rem, 3vw, 2.2rem);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: linear-gradient(120deg, #4c52ff 0%, #2bb673 50%, #0c77c2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.home-services__subtitle {
  margin: 0;
  max-width: 46rem;
  color: rgba(var(--v-theme-on-background), 0.78);
  line-height: 1.6;
}

.home-services__grid {
  display: grid;
  gap: clamp(1rem, 3vw, 1.5rem);
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
}

.home-services__card {
  background: rgba(var(--v-theme-surface), 0.96);
  border-radius: 1.35rem;
  padding: 1.75rem 1.5rem;
  border: 1px solid rgba(var(--service-accent-rgb, var(--v-theme-primary)), 0.12);
  box-shadow: 0 16px 32px rgba(var(--v-theme-on-background), 0.08);
  display: grid;
  gap: 0.75rem;
  text-align: left;
  --service-accent-rgb: var(--v-theme-primary);
}

.home-services__title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.home-services__icon {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.9rem;
  display: grid;
  place-items: center;
  background: rgba(var(--service-accent-rgb), 0.16);
  color: rgb(var(--service-accent-rgb));
  flex: 0 0 auto;
}

.home-services__card h3 {
  margin: 0;
  font-size: 1.05rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
}

.home-services__card p {
  margin: 0;
  color: rgba(var(--v-theme-on-surface), 0.75);
  line-height: 1.55;
}

.home-services__card--primary {
  --service-accent-rgb: var(--v-theme-primary);
}

.home-services__card--secondary {
  --service-accent-rgb: var(--v-theme-secondary);
}

.home-services__card--tertiary {
  --service-accent-rgb: var(--v-theme-tertiary);
}

.home-services__card--quaternary {
  --service-accent-rgb: var(--v-theme-accent);
}

@media (max-width: 640px) {
  .home-services__card {
    text-align: center;
    justify-items: center;
  }
}

@media (min-width: 900px) {
  .home-services__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
