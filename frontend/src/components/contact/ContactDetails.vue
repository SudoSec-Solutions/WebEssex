<script setup lang="ts">
const contactChannels = [
  {
    title: 'Project enquiries',
    subtitle: 'Email',
    description: 'New products, redesigns, or partnership inquiries.',
    icon: 'mdi-email-outline',
    value: 'hello@webessex.uk',
    href: 'mailto:hello@webessex.uk',
    accent: 'primary'
  },
  {
    title: 'Phone',
    subtitle: 'Direct line',
    description: 'Weekdays 9am–5pm GMT.',
    icon: 'mdi-phone-outline',
    value: '+44 7454 320338',
    href: 'tel:+447454320338',
    accent: 'secondary'
  },
  {
    title: 'Studio',
    subtitle: 'Visit us',
    description: 'Colchester, Essex · Remote across UK & EU.',
    icon: 'mdi-map-marker-outline',
    value: 'By appointment only',
    accent: 'tertiary'
  }
]
</script>

<template>
  <section class="contact-details" aria-labelledby="contact-details-heading">
    <h2 id="contact-details-heading" class="contact-details__heading">
      Contact the team
    </h2>
    <div class="contact-details__grid">
      <article
        v-for="channel in contactChannels"
        :key="channel.title"
        :class="['contact-details__card', `contact-details__card--${channel.accent}`]"
      >
        <div class="contact-details__icon">
          <VIcon :icon="channel.icon" size="24" />
        </div>
        <div class="contact-details__heading">
          <h3>{{ channel.title }}</h3>
          <p v-if="channel.subtitle" class="contact-details__subtitle">{{ channel.subtitle }}</p>
        </div>
        <p class="contact-details__description">{{ channel.description }}</p>
        <p class="contact-details__value">
          <template v-if="channel.href">
            <a :href="channel.href">{{ channel.value }}</a>
          </template>
          <template v-else>{{ channel.value }}</template>
        </p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.contact-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: center;
}

.contact-details__heading {
  margin: 0;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: linear-gradient(120deg, #4c52ff 0%, #2bb673 50%, #0c77c2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.contact-details__grid {
  display: grid;
  gap: clamp(1.25rem, 3vw, 1.75rem);
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
}

.contact-details__card {
  position: relative;
  background: rgba(var(--v-theme-surface), 0.96);
  border-radius: 1.35rem;
  padding: 1.85rem 1.6rem;
  border: 1px solid rgba(var(--contact-accent-rgb, var(--v-theme-primary)), 0.14);
  box-shadow: 0 18px 34px rgba(var(--v-theme-on-background), 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: transform 200ms ease, box-shadow 200ms ease;
  overflow: hidden;
  --contact-accent-rgb: var(--v-theme-primary);
}

.contact-details__card:hover {
  transform: translateY(-6px);
  box-shadow: 0 26px 44px rgba(var(--v-theme-on-background), 0.14);
}

.contact-details__icon {
  width: 3rem;
  height: 3rem;
  border-radius: 1rem;
  display: grid;
  place-items: center;
  margin: 0 auto 0.35rem;
  background: rgba(var(--contact-accent-rgb), 0.16);
  color: rgb(var(--contact-accent-rgb));
}

.contact-details__description {
  margin: 0;
  color: rgba(var(--v-theme-on-surface), 0.68);
  line-height: 1.5;
}

.contact-details__heading {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.contact-details__heading h3 {
  margin: 0;
  font-size: 1.2rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(var(--v-theme-on-surface), 0.88);
}

.contact-details__subtitle {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(var(--v-theme-on-surface), 0.6);
}

.contact-details__value {
  margin: 0;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(var(--v-theme-on-surface), 0.82);
}

.contact-details__value a {
  color: inherit;
  text-decoration: none;
}

.contact-details__value a:hover {
  text-decoration: underline;
}

.contact-details__card::after {
  content: '';
  position: absolute;
  inset: -45% -30% auto;
  width: 140%;
  height: 140%;
  opacity: 0.65;
  pointer-events: none;
  background: radial-gradient(circle at top, rgba(var(--contact-accent-rgb), 0.2), transparent 60%);
}

.contact-details__card--primary {
  --contact-accent-rgb: var(--v-theme-primary);
}

.contact-details__card--secondary {
  --contact-accent-rgb: var(--v-theme-secondary);
}

.contact-details__card--tertiary {
  --contact-accent-rgb: var(--v-theme-tertiary);
}
@media (max-width: 600px) {
  .contact-details__grid {
    grid-template-columns: 1fr;
  }

  .contact-details__card {
    text-align: left;
    padding: 1.7rem 1.4rem;
  }

  .contact-details__icon {
    margin: 0 0 0.5rem;
  }
}
</style>
