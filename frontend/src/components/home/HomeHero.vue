<script setup lang="ts">
const offerings = ['Brand Strategy', 'UX & UI Design', 'Web Applications', 'Design Systems']
</script>

<template>
  <section class="home-hero" aria-labelledby="home-hero-title">
    <VChip color="secondary" variant="tonal" class="home-hero__badge" size="large">
      WebEssex · Essex, UK
    </VChip>
    <h1 id="home-hero-title" class="home-hero__title">
      <span class="home-hero__title-accent">Design.</span>
      <span class="home-hero__title-accent home-hero__title-accent--secondary">Build.</span>
      <span class="home-hero__title-accent home-hero__title-accent--tertiary">Launch.</span>
    </h1>
    <h2 class="home-hero__tagline">
      Digital design and web development for <span>ambitious brands.</span>
    </h2>
    <p class="home-hero__subtitle">
      WebEssex blends brand strategy, senior design talent, and high-performing websites to help Essex
      and UK teams launch products, grow revenue, and stay ahead of change.
    </p>

    <div class="home-hero__actions">
      <VBtn color="secondary" variant="flat" size="large" to="/about">
        Meet the team
      </VBtn>
      <VBtn color="tertiary" variant="outlined" size="large" to="/contact">
        Start a project
      </VBtn>
    </div>

    <div class="home-hero__offerings">
      <VChip
        v-for="item in offerings"
        :key="item"
        class="home-hero__chip"
        color="primary"
        variant="tonal"
        size="large"
      >
        {{ item }}
      </VChip>
    </div>
  </section>
</template>

<style scoped>
.home-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  max-width: 50rem;
  text-align: center;
  padding: clamp(2rem, 6vw, 4rem) clamp(1rem, 3vw, 2.5rem);
}

.home-hero__badge {
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.home-hero__title {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4ch;
  font-size: clamp(2.6rem, 6.5vw, 3.75rem);
  line-height: 1.05;
  text-align: center;
}

.home-hero__title-accent {
  display: inline-flex;
  align-items: center;
  padding: 0.1em 0.45em;
  border-radius: 0.45em;
  color: #fff;
  background: linear-gradient(135deg, #4c52ff 0%, #6f78ff 60%, #4c52ff 100%);
  box-shadow: 0 12px 28px rgba(76, 82, 255, 0.25);
}

.home-hero__title-accent--secondary {
  background: linear-gradient(135deg, #1f9d63 0%, #2ec47e 55%, #1f9d63 100%);
  box-shadow: 0 12px 28px rgba(31, 157, 99, 0.22);
}

.home-hero__title-accent--tertiary {
  background: linear-gradient(135deg, #0c77c2 0%, #11a6ff 55%, #0c77c2 100%);
  box-shadow: 0 12px 28px rgba(12, 119, 194, 0.22);
}

.home-hero__tagline {
  position: relative;
  font-size: clamp(1.25rem, 3vw, 1.8rem);
  font-weight: 600;
  margin: 0;
  color: rgba(var(--v-theme-on-background), 0.88);
  padding-bottom: 0.75rem;
}

.home-hero__tagline span {
  background: linear-gradient(120deg, rgba(100, 108, 255, 0.18), rgba(66, 184, 131, 0.2));
  padding: 0 0.35rem;
  border-radius: 0.45rem;
}

.home-hero__tagline::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: clamp(5rem, 14vw, 7rem);
  height: 4px;
  border-radius: 999px;
  background: linear-gradient(90deg, #646cff, #2bb673, #0ea5e9);
  opacity: 0.8;
}

.home-hero__subtitle {
  margin: 0;
  font-size: clamp(1rem, 2.4vw, 1.25rem);
  color: rgba(var(--v-theme-on-background), 0.78);
  max-width: 48rem;
}

.home-hero__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.home-hero__offerings {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}

.home-hero__chip {
  font-weight: 600;
}

@media (max-width: 480px) {
  .home-hero__actions {
    gap: 0.75rem;
  }
}

@media (min-width: 768px) {
  .home-hero__title {
    flex-wrap: nowrap;
  }
}
</style>
