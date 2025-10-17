<script setup lang="ts">
const seoNarrative = [
  {
    heading: 'Digital design agency in Essex',
    body:
      'WebEssex partners with founders and marketing teams to launch distinctive digital experiences that feel unmistakably on brand.',
    icon: 'mdi-target-variant',
    accent: 'primary'
  },
  {
    heading: 'Conversion-focused delivery',
    body:
      'Every page is planned around clear goals—from lead generation to product launches—so your website becomes a growth engine, not just a brochure.',
    icon: 'mdi-chart-timeline-variant',
    accent: 'secondary'
  },
  {
    heading: 'Collaborative, transparent process',
    body:
      'Expect senior specialists, weekly momentum updates, and a roadmap that keeps stakeholders aligned from strategy through optimisation.',
    icon: 'mdi-account-group-outline',
    accent: 'tertiary'
  }
]

const seoKeywords = [
  'Digital design agency Essex',
  'Website redesign specialists',
  'Brand-led web development',
  'Product launch websites',
  'UX consultancy UK'
]
</script>

<template>
  <section class="home-seo" aria-labelledby="home-seo-heading">
    <h2 id="home-seo-heading" class="home-seo__heading">
      <span class="home-seo__heading-text">Why brands choose WebEssex</span>
    </h2>
    <div class="home-seo__grid">
      <article
        v-for="block in seoNarrative"
        :key="block.heading"
        :class="['home-seo__item', `home-seo__item--${block.accent}`]"
      >
        <div class="home-seo__icon">
          <VIcon :icon="block.icon" size="28" />
        </div>
        <h3>{{ block.heading }}</h3>
        <p>{{ block.body }}</p>
      </article>
    </div>
    <ul class="home-seo__keywords" aria-label="Core services and specialisms">
      <li v-for="keyword in seoKeywords" :key="keyword">{{ keyword }}</li>
    </ul>
  </section>
</template>

<style scoped>
.home-seo {
  width: 100%;
  max-width: 1100px;
  margin: clamp(1.5rem, 4vw, 3rem) auto 0;
  padding: 0 clamp(1rem, 3vw, 2.5rem);
  text-align: left;
}

.home-seo__heading {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  margin: 0 0 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: center;
  position: relative;
  color: rgba(var(--v-theme-on-surface), 0.92);
  padding-bottom: 0.75rem;
}

.home-seo__heading::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: clamp(6rem, 20vw, 14rem);
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, #4c52ff, #2bb673, #0c77c2);
  opacity: 0.8;
}

.home-seo__heading-text {
  display: inline-block;
  background: linear-gradient(120deg, #4c52ff 0%, #2bb673 50%, #0c77c2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.home-seo__grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
}

.home-seo__item {
  position: relative;
  background: rgba(var(--v-theme-surface), 0.94);
  border-radius: 1.35rem;
  padding: 2.25rem 1.85rem 2rem;
  border: 1px solid rgba(var(--seo-accent-rgb, var(--v-theme-primary)), 0.12);
  box-shadow: 0 18px 36px rgba(var(--v-theme-on-background), 0.08);
  overflow: hidden;
  transition: transform 200ms ease, box-shadow 200ms ease;
  --seo-accent-rgb: var(--v-theme-primary);
  --seo-accent-glow: rgba(var(--seo-accent-rgb), 0.22);
  --seo-icon-bg: rgba(var(--seo-accent-rgb), 0.16);
  --seo-icon-color: rgb(var(--seo-accent-rgb));
}

.home-seo__item::before {
  content: '';
  position: absolute;
  inset: -40% -40% auto;
  width: 140%;
  height: 140%;
  background: radial-gradient(circle at top, var(--seo-accent-glow), transparent 60%);
  opacity: 0.75;
  pointer-events: none;
}

.home-seo__item:hover {
  transform: translateY(-6px);
  box-shadow: 0 26px 44px rgba(var(--v-theme-on-background), 0.14);
}

.home-seo__icon {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  margin-bottom: 1.25rem;
  border-radius: 1rem;
  background: var(--seo-icon-bg);
  color: var(--seo-icon-color);
  z-index: 1;
}

.home-seo__item h3 {
  position: relative;
  margin: 0 0 1rem;
  font-size: 1.15rem;
  color: rgba(var(--v-theme-on-surface), 0.9);
  z-index: 1;
}

.home-seo__item--primary {
  --seo-accent-rgb: var(--v-theme-primary);
}

.home-seo__item--secondary {
  --seo-accent-rgb: var(--v-theme-secondary);
}

.home-seo__item--tertiary {
  --seo-accent-rgb: var(--v-theme-tertiary);
}

.home-seo__item p {
  position: relative;
  margin: 0;
  color: rgba(var(--v-theme-on-surface), 0.72);
  line-height: 1.65;
  z-index: 1;
}

.home-seo__keywords {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin: 2rem 0 0;
  padding: 0;
  list-style: none;
  font-weight: 600;
  color: rgba(var(--v-theme-on-surface), 0.72);
}

.home-seo__keywords li {
  position: relative;
  background: rgba(var(--v-theme-on-surface), 0.06);
  border-radius: 999px;
  padding: 0.5rem 1.25rem;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.16);
  backdrop-filter: blur(6px);
  box-shadow: 0 12px 24px rgba(var(--v-theme-on-background), 0.08);
  transition: transform 150ms ease, box-shadow 150ms ease;
}

.home-seo__keywords li::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: linear-gradient(
    120deg,
    rgba(var(--v-theme-primary), 0.15),
    rgba(var(--v-theme-tertiary), 0.15)
  );
  opacity: 0;
  transition: opacity 150ms ease;
  pointer-events: none;
}

.home-seo__keywords li:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 28px rgba(var(--v-theme-on-background), 0.14);
}

.home-seo__keywords li:hover::after {
  opacity: 1;
}

@media (max-width: 480px) {
  .home-seo__item {
    padding: 1.25rem;
  }

  .home-seo__keywords {
    justify-content: center;
    text-align: center;
  }
}
</style>
