<script setup lang="ts">
import TeamShowcase from '../components/about/TeamShowcase.vue'
</script>

<template>
  <div class="about-page">
    <section class="about-hero" aria-labelledby="about-heading">
      <VChip color="secondary" variant="tonal" size="large" class="about-hero__badge">
        Building with intent since 2025
      </VChip>
      <h1 id="about-heading" class="about-hero__title">Why teams partner with WebEssex</h1>
      <p class="about-hero__subtitle">
        We combine senior design, engineering, and product strategy into one integrated team. Our studio delivers
        launch-ready experiences that make ambitious organisations memorable and measurable.
      </p>
      <ul class="about-hero__pillars" aria-label="Our delivery pillars">
        <li>
          <VIcon icon="$mdi-compass-outline" size="20" />
          Strategic discovery that aligns stakeholders from day one.
        </li>
        <li>
          <VIcon icon="$mdi-flash-outline" size="20" />
          Rapid, iterative delivery that keeps momentum visible every week.
        </li>
        <li>
          <VIcon icon="$mdi-shield-check-outline" size="20" />
          Launch support and optimisation baked into every engagement.
        </li>
      </ul>
    </section>

    <TeamShowcase />
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
  max-width: 46rem;
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  color: rgba(var(--v-theme-on-background), 0.8);
  line-height: 1.65;
}

.about-hero__pillars {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  max-width: 46rem;
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

@media (max-width: 640px) {
  .about-hero__pillars {
    flex-direction: column;
    align-items: stretch;
  }

  .about-hero__pillars li {
    justify-content: center;
  }
}
</style>
