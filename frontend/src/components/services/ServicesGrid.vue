<script setup lang="ts">
interface ServiceTile {
  title: string
  label: string
  description: string
  highlights: string[]
  icon: string
  accent: 'primary' | 'secondary' | 'tertiary' | 'quaternary'
}

const services: ServiceTile[] = [
  {
    title: 'Strategy & discovery',
    label: 'Discover',
    description:
      'Map business goals to user needs with collaborative workshops, journey mapping, and prioritised backlogs that unlock clarity.',
    highlights: ['Product framing & roadmaps', 'Stakeholder alignment sessions', 'Prototyping & validation sprints'],
    icon: '$mdi-compass-outline',
    accent: 'primary'
  },
  {
    title: 'Brand & experience design',
    label: 'Design',
    description:
      'Create visual systems and responsive interfaces that feel unmistakably yours, while staying accessible and easy to evolve.',
    highlights: ['Brand identity & design systems', 'UX / UI for web & product', 'Content playbooks & tone'],
    icon: '$mdi-palette',
    accent: 'secondary'
  },
  {
    title: 'Engineering delivery',
    label: 'Build',
    description:
      'Ship performant Vue applications backed by modern tooling, automated QA, and support that keeps releases reliable.',
    highlights: ['Vue & Vite engineering teams', 'Design system implementation', 'Performance audits & optimisation'],
    icon: '$mdi-lightning-bolt-outline',
    accent: 'tertiary'
  },
  {
    title: 'Growth partnerships',
    label: 'Grow',
    description:
      'Embed WebEssex within your product organisation for long-term iteration, measurement, and cross-team enablement.',
    highlights: ['Roadmap co-ownership', 'Data-informed optimisation', 'Enablement & documentation'],
    icon: '$mdi-handshake-outline',
    accent: 'quaternary'
  }
]
</script>

<template>
  <section class="services-grid" aria-label="Service offerings">
    <article
      v-for="service in services"
      :key="service.title"
      :class="['service-card', `service-card--${service.accent}`]"
    >
      <div class="service-card__halo" aria-hidden="true" />
      <span :class="['service-card__badge', `service-card__badge--${service.accent}`]">
        {{ service.label }}
      </span>
      <div class="service-card__icon">
        <VIcon :icon="service.icon" size="32" />
      </div>
      <h2 :class="['service-card__title', `service-card__title--${service.accent}`]">
        {{ service.title }}
      </h2>
      <p>{{ service.description }}</p>
      <ul class="service-card__list">
        <li v-for="item in service.highlights" :key="item">
          <VIcon
            :class="['service-card__list-icon', `service-card__list-icon--${service.accent}`]"
            icon="$mdi-check-circle"
            size="18"
          />
          <span>{{ item }}</span>
        </li>
      </ul>
    </article>
  </section>
</template>

<style scoped>
.services-grid {
  display: grid;
  gap: clamp(1.25rem, 3vw, 1.75rem);
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
}

.services-grid > article:last-child {
  grid-column: 1 / -1;
  justify-self: center;
}

@media (max-width: 720px) {
  .services-grid > article:last-child {
    grid-column: auto;
    justify-self: stretch;
  }
}

.service-card {
  position: relative;
  background: rgba(var(--v-theme-surface), 0.96);
  border-radius: 1.5rem;
  padding: 2.15rem 1.9rem;
  border: 1px solid rgba(var(--service-accent-rgb, var(--v-theme-primary)), 0.12);
  box-shadow: 0 18px 36px rgba(var(--v-theme-on-background), 0.08);
  overflow: hidden;
  transition: transform 200ms ease, box-shadow 200ms ease;
  --service-accent-rgb: var(--v-theme-primary);
  --service-halo-opacity: 0.24;
}

.service-card__halo {
  position: absolute;
  inset: -50% -40% auto;
  width: 140%;
  height: 140%;
  opacity: 0.7;
  background: radial-gradient(circle at top, rgba(var(--service-accent-rgb), var(--service-halo-opacity)), transparent 60%);
  pointer-events: none;
}

.service-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 26px 44px rgba(var(--v-theme-on-background), 0.14);
}

.service-card__badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 1rem;
  border-radius: 999px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 0.75rem;
  background: rgba(var(--service-accent-rgb), 0.14);
  color: rgb(var(--service-accent-rgb));
  box-shadow: 0 12px 22px rgba(var(--v-theme-on-background), 0.08);
  z-index: 1;
  width: fit-content;
  margin-bottom: 1.1rem;
}

.service-card__icon {
  position: relative;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 1.1rem;
  display: grid;
  place-items: center;
  margin-bottom: 1.25rem;
  color: var(--service-icon-color, rgb(var(--service-accent-rgb)));
  background: rgba(var(--service-accent-rgb), 0.16);
  z-index: 1;
}

.service-card__title {
  position: relative;
  margin: 0 0 1rem;
  font-size: 1.25rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(var(--v-theme-on-surface), 0.9);
  z-index: 1;
}

.service-card p {
  position: relative;
  margin: 0 0 1.25rem;
  color: rgba(var(--v-theme-on-surface), 0.75);
  line-height: 1.6;
  z-index: 1;
}

.service-card__list {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.55rem;
  color: rgba(var(--v-theme-on-surface), 0.72);
  z-index: 1;
}

.service-card__list li {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
}

.service-card__list-icon {
  color: rgba(var(--service-accent-rgb), 0.9);
}

.service-card--primary {
  --service-accent-rgb: var(--v-theme-primary);
}

.service-card--secondary {
  --service-accent-rgb: var(--v-theme-secondary);
}

.service-card--tertiary {
  --service-accent-rgb: var(--v-theme-tertiary);
}

.service-card--quaternary {
  --service-accent-rgb: var(--v-theme-accent);
}

@media (max-width: 600px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
