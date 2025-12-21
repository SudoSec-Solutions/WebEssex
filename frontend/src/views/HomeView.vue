<script setup lang="ts">
import HomeHero from '../components/home/HomeHero.vue'
import HomeServices from '../components/home/HomeServices.vue'
import HomeHighlights from '../components/home/HomeHighlights.vue'
import HomeSeo from '../components/home/HomeSeo.vue'

const caseStudies = [
  {
    title: 'Product launch sprint',
    metric: '+38% conversion lift',
    summary: 'A UK startup launch rebuilt around clear positioning and fast, conversion-ready UX.',
    to: 'https://webessex.uk/blog/best-web-design-services-in-essex-2025-what-to-look-for',
    external: true
  },
  {
    title: 'Performance turnaround',
    metric: '-55% load time',
    summary: 'A high-traffic site rebuilt for Core Web Vitals, accessibility, and reliability.',
    to: 'https://webessex.uk/blog/core-web-vitals-explained-simply-what-essex-businesses-need-to-know',
    external: true
  },
  {
    title: 'Brand refresh rollout',
    metric: '2x faster updates',
    summary: 'A modular design system that helped teams publish faster without developer bottlenecks.',
    to: 'https://webessex.uk/blog/branding-basics-for-essex-small-businesses',
    external: true
  }
]
</script>

<template>
  <div class="home-view">
    <HomeHero />
    <HomeServices />
    <section class="home-case-studies" aria-labelledby="home-case-studies-heading">
      <header class="home-case-studies__header">
        <h2 id="home-case-studies-heading" class="home-case-studies__title">
          Recent results
        </h2>
        <p class="home-case-studies__subtitle">
          Short wins that show how our studio delivers measurable impact for UK teams.
        </p>
      </header>
      <div class="home-case-studies__grid">
        <component
          :is="study.external ? 'a' : 'RouterLink'"
          v-for="study in caseStudies"
          :key="study.title"
          :to="study.external ? undefined : study.to"
          :href="study.external ? study.to : undefined"
          :target="undefined"
          :rel="undefined"
          class="home-case-studies__card"
        >
          <span class="home-case-studies__metric">{{ study.metric }}</span>
          <h3>{{ study.title }}</h3>
          <p>{{ study.summary }}</p>
          <span class="home-case-studies__link">
            Read more
            <VIcon icon="$mdi-arrow-top-right" size="18" />
          </span>
        </component>
      </div>
    </section>
    <HomeHighlights />
    <HomeSeo />
  </div>
</template>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(2rem, 4vw, 3rem);
  width: 100%;
  padding-inline: clamp(1rem, 5vw, 2.5rem);
}

.home-case-studies {
  width: 100%;
  max-width: 1100px;
  display: grid;
  gap: clamp(1.25rem, 3vw, 1.75rem);
}

.home-case-studies__header {
  text-align: center;
  display: grid;
  gap: 0.6rem;
  justify-items: center;
}

.home-case-studies__title {
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

.home-case-studies__subtitle {
  margin: 0;
  max-width: 42rem;
  color: rgba(var(--v-theme-on-background), 0.78);
  line-height: 1.6;
}

.home-case-studies__grid {
  display: grid;
  gap: clamp(1rem, 3vw, 1.5rem);
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
}

.home-case-studies__card {
  background: rgba(var(--v-theme-surface), 0.96);
  border-radius: 1.4rem;
  padding: 1.75rem 1.5rem;
  border: 1px solid rgba(var(--v-theme-primary), 0.12);
  box-shadow: 0 16px 32px rgba(var(--v-theme-on-background), 0.08);
  display: grid;
  gap: 0.6rem;
  text-decoration: none;
  color: inherit;
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.home-case-studies__card:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 38px rgba(var(--v-theme-on-background), 0.14);
}

.home-case-studies__metric {
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: rgba(var(--v-theme-primary), 0.9);
}

.home-case-studies__card h3 {
  margin: 0;
  font-size: 1.05rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.home-case-studies__card p {
  margin: 0;
  color: rgba(var(--v-theme-on-surface), 0.75);
  line-height: 1.6;
}

.home-case-studies__link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-weight: 600;
  color: rgba(var(--v-theme-on-background), 0.7);
}
</style>
