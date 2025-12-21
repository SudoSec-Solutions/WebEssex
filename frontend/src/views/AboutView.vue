<script setup lang="ts">
import FaqSection from '../components/shared/FaqSection.vue'

const caseStudies = [
  {
    title: 'Product launch sprint',
    metric: '+38% conversion lift',
    summary: 'A focused 3-week launch for a UK startup, turning a static site into a lead-ready experience.',
    highlights: ['New positioning + page flow', 'Performance tuning and SEO fixes', 'Analytics + launch handover']
  },
  {
    title: 'Brand refresh rollout',
    metric: '2x faster content updates',
    summary: 'A modular design system that helped a growing team publish consistently without developer bottlenecks.',
    highlights: ['Design system + templates', 'Component library in Vue', 'Editorial guidance for teams']
  },
  {
    title: 'Performance turnaround',
    metric: '-55% load time',
    summary: 'A high-traffic site rebuild focused on speed, accessibility, and stability.',
    highlights: ['Core Web Vitals improvement', 'Image + asset optimisation', 'Launch monitoring + QA']
  }
]

const aboutFaqs = [
  {
    question: 'Are you an agency?',
    answer: 'No. We are a product and delivery studio that embeds with teams to ship work quickly and with clarity.'
  },
  {
    question: 'Where are you based?',
    answer: 'We are Essex-based and work with teams across the UK.'
  },
  {
    question: 'How do you approach security and GDPR?',
    answer: 'We build with a security-first mindset and align delivery to UK GDPR standards from day one.'
  },
  {
    question: 'Do you provide post-launch support?',
    answer: 'Yes. We offer launch support and ongoing iteration depending on your plan and goals.'
  }
]
</script>

<template>
  <div class="about-page">
    <section class="about-hero" aria-labelledby="about-heading">
      <VChip color="secondary" variant="tonal" size="large" class="about-hero__badge">
        Building with intent since 2025
      </VChip>
      <h1 id="about-heading" class="about-hero__title">Why teams partner with WebEssex</h1>
      <div class="about-hero__content">
        <p class="about-hero__subtitle">
          WebEssex is a product and delivery studio, not an agency. We embed with founders and growing teams to ship
          brand-led digital experiences, fast-moving launches, and reliable platforms that scale — with a security-first
          approach aligned to UK GDPR standards.
        </p>
        <ul class="about-hero__pillars" aria-label="Our delivery pillars">
          <li>
            <VIcon icon="$mdi-rocket-launch" size="20" />
            Faster launches with clear, measurable outcomes.
          </li>
          <li>
            <VIcon icon="$mdi-chart-timeline-variant" size="20" />
            Growth-focused delivery that improves performance.
          </li>
          <li>
            <VIcon icon="$mdi-shield-check-outline" size="20" />
            Security-first builds aligned to UK GDPR standards.
          </li>
        </ul>
      </div>
    </section>

    <section class="about-details" aria-label="About WebEssex">
      <article class="about-card about-card--primary">
        <div class="about-card__header">
          <div class="about-card__icon">
            <VIcon icon="$mdi-account-group-outline" size="22" />
          </div>
          <h2>What we are</h2>
        </div>
        <div class="about-card__content">
          <p>
            We are a senior, cross-functional studio that partners directly with your team. Think product strategy,
            brand design, and engineering under one roof — with a delivery cadence built for momentum and clarity at
            every stage. We are an Essex-based digital studio delivering web design, UX/UI, and web development across
            the UK.
          </p>
        </div>
      </article>
      <article class="about-card about-card--secondary">
        <div class="about-card__header">
          <div class="about-card__icon">
            <VIcon icon="$mdi-target-variant" size="22" />
          </div>
          <h2>How we help</h2>
        </div>
        <div class="about-card__content">
          <p>
            From discovery to launch, we turn complex ideas into clear scope, usable design, and production-ready code.
            We stay lean, collaborative, and measurable at every stage. You get a clear plan, weekly progress, and a
            launch path that reduces risk while keeping the pace high. Every step is documented so handover is smooth
            for your internal team.
          </p>
        </div>
      </article>
      <article class="about-card about-card--tertiary">
        <div class="about-card__header">
          <div class="about-card__icon">
            <VIcon icon="$mdi-rocket-launch" size="22" />
          </div>
          <h2>What you get</h2>
        </div>
        <div class="about-card__content">
          <ul>
            <li>Brand & design systems that feel unmistakably yours</li>
            <li>High-performance web builds with clear handover</li>
            <li>Launch support, optimisation, and GDPR compliance</li>
            <li>24/7 SOC monitoring for Growth and Scale plans</li>
          </ul>
        </div>
      </article>
    </section>

    <section class="about-case-studies" aria-label="Case studies and results">
      <header class="about-case-studies__header">
        <h2>Case studies & results</h2>
        <p>Recent wins that show the momentum we build for founders and growing teams.</p>
      </header>
      <div class="about-case-studies__grid">
        <article
          v-for="study in caseStudies"
          :key="study.title"
          class="about-case-studies__card"
        >
          <span class="about-case-studies__metric">{{ study.metric }}</span>
          <h3>{{ study.title }}</h3>
          <p>{{ study.summary }}</p>
          <ul>
            <li v-for="item in study.highlights" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="about-focus" aria-label="Who we work with">
      <div class="about-focus__copy">
        <h2>Who we work with</h2>
        <p>
          We partner with startups, local teams, and growing businesses that need a fast, dependable partner — without
          the overhead of traditional agencies. Our work is outcome-led, practical, and built to last.
        </p>
      </div>
      <ul class="about-focus__list">
        <li>
          <VIcon icon="$mdi-compass-outline" size="20" />
          Product discovery and launch planning
        </li>
        <li>
          <VIcon icon="$mdi-palette" size="20" />
          Brand refreshes and design system foundations
        </li>
        <li>
          <VIcon icon="$mdi-lightning-bolt-outline" size="20" />
          Engineering delivery and performance tuning
        </li>
        <li>
          <VIcon icon="$mdi-repeat" size="20" />
          Ongoing iteration and release support
        </li>
      </ul>
    </section>

    <FaqSection
      title="About FAQs"
      subtitle="Quick answers on who we are and how we work."
      :items="aboutFaqs"
    />
  </div>
</template>

<style scoped>
.about-page {
  display: flex;
  flex-direction: column;
  gap: clamp(2.5rem, 5vw, 3.5rem);
}

.about-hero {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(1rem, 3vw, 1.75rem);
}

.about-hero__badge {
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.about-hero__title {
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

.about-hero__subtitle {
  margin: 0;
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  color: rgba(var(--v-theme-on-background), 0.8);
  line-height: 1.65;
}

.about-hero__content {
  width: 100%;
  max-width: 52rem;
  display: grid;
  gap: 1rem;
  align-items: start;
  text-align: left;
}

.about-hero__pillars {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  color: rgba(var(--v-theme-on-background), 0.85);
}

.about-hero__pillars li {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1rem;
  border-radius: 0.85rem;
  background: rgba(var(--v-theme-on-background), 0.08);
  border: 1px solid rgba(var(--v-theme-on-background), 0.1);
  font-weight: 600;
}

.about-details {
  display: grid;
  gap: clamp(1.25rem, 3vw, 1.75rem);
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
}

.about-card {
  position: relative;
  background: rgba(var(--v-theme-surface), 0.96);
  border-radius: 1.5rem;
  padding: 2rem 1.75rem;
  border: 1px solid rgba(var(--about-accent-rgb, var(--v-theme-primary)), 0.12);
  box-shadow: 0 18px 36px rgba(var(--v-theme-on-background), 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  --about-accent-rgb: var(--v-theme-primary);
}

.about-card__header {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  min-height: 3.2rem;
}

.about-card__icon {
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 0.9rem;
  display: grid;
  place-items: center;
  background: rgba(var(--about-accent-rgb), 0.18);
  color: rgb(var(--about-accent-rgb));
}

.about-card h2 {
  margin: 0;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.about-card__content {
  display: grid;
  gap: 0.5rem;
  align-content: start;
}

.about-card p {
  margin: 0;
  color: rgba(var(--v-theme-on-surface), 0.75);
  line-height: 1.6;
}

.about-card ul {
  margin: 0;
  padding-left: 1.25rem;
  color: rgba(var(--v-theme-on-surface), 0.75);
  line-height: 1.6;
  display: grid;
  gap: 0.35rem;
}

.about-card--primary {
  --about-accent-rgb: var(--v-theme-primary);
}

.about-card--secondary {
  --about-accent-rgb: var(--v-theme-secondary);
}

.about-card--tertiary {
  --about-accent-rgb: var(--v-theme-tertiary);
}

.about-focus {
  display: grid;
  gap: clamp(1.25rem, 3vw, 2rem);
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  align-items: start;
}

.about-focus__copy h2 {
  margin: 0 0 0.75rem;
  font-size: clamp(1.4rem, 3vw, 1.9rem);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.about-focus__copy p {
  margin: 0;
  color: rgba(var(--v-theme-on-background), 0.78);
  line-height: 1.6;
}

.about-focus__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.75rem;
}

.about-focus__list li {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.7rem 1rem;
  border-radius: 0.95rem;
  background: rgba(var(--v-theme-on-background), 0.08);
  border: 1px solid rgba(var(--v-theme-on-background), 0.1);
  font-weight: 600;
}

.about-case-studies {
  display: grid;
  gap: clamp(1.25rem, 3vw, 1.75rem);
}

.about-case-studies__header {
  text-align: center;
  display: grid;
  gap: 0.6rem;
  justify-items: center;
}

.about-case-studies__header h2 {
  margin: 0;
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: linear-gradient(120deg, #4c52ff 0%, #2bb673 50%, #0c77c2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.about-case-studies__header p {
  margin: 0;
  max-width: 42rem;
  color: rgba(var(--v-theme-on-background), 0.78);
  line-height: 1.6;
}

.about-case-studies__grid {
  display: grid;
  gap: clamp(1.25rem, 3vw, 1.75rem);
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
}

.about-case-studies__card {
  background: rgba(var(--v-theme-surface), 0.96);
  border-radius: 1.4rem;
  padding: 1.9rem 1.6rem;
  border: 1px solid rgba(var(--v-theme-primary), 0.12);
  box-shadow: 0 18px 36px rgba(var(--v-theme-on-background), 0.08);
  display: grid;
  gap: 0.75rem;
}

.about-case-studies__metric {
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.85rem;
  color: rgba(var(--v-theme-primary), 0.9);
}

.about-case-studies__card h3 {
  margin: 0;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.about-case-studies__card p {
  margin: 0;
  color: rgba(var(--v-theme-on-surface), 0.75);
  line-height: 1.6;
}

.about-case-studies__card ul {
  margin: 0;
  padding-left: 1.1rem;
  color: rgba(var(--v-theme-on-surface), 0.72);
  display: grid;
  gap: 0.35rem;
}

@media (max-width: 640px) {
  .about-hero__content {
    text-align: center;
  }

  .about-hero__pillars {
    flex-direction: column;
    align-items: stretch;
  }

  .about-hero__pillars li {
    justify-content: center;
  }

  .about-card {
    padding: 1.75rem 1.5rem;
  }

  .about-case-studies__card {
    padding: 1.6rem 1.4rem;
  }
}

@media (min-width: 900px) {
  .about-hero__content {
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
    column-gap: clamp(1.5rem, 4vw, 2.5rem);
  }
}
</style>
