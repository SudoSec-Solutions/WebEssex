<script setup lang="ts">
const highlights = [
  {
    title: 'Future ready builds',
    accent: 'primary',
    icon: 'mdi-rocket-launch',
    lead: 'Websites that perform on day one',
    points: [
      'Lightning-fast pages that convert visitors',
      'Built to grow with your roadmap',
      'Reliable support after every launch'
    ]
  },
  {
    title: 'Design first',
    accent: 'secondary',
    icon: 'mdi-palette',
    lead: 'Senior designers on every brief',
    points: [
      'Bespoke visuals shaped around your brand',
      'Responsive layouts that feel natural everywhere',
      'Accessibility baked into every journey'
    ]
  },
  {
    title: 'Iterate quickly',
    accent: 'tertiary',
    icon: 'mdi-repeat',
    lead: 'Momentum your team can feel',
    points: [
      'Clear milestones and frequent check-ins',
      'Early previews so you can react, not guess',
      'Data-informed improvements after go-live'
    ]
  }
]
</script>

<template>
  <section class="home-highlights" aria-labelledby="home-highlights-title">
    <h2 id="home-highlights-title" class="home-highlights__heading">
      <span class="home-highlights__heading-text">What partnering with WebEssex feels like</span>
    </h2>
    <div class="home-highlights__grid">
      <VCard
        v-for="highlight in highlights"
        :key="highlight.title"
        :class="['home-highlights__card', `home-highlights__card--${highlight.accent}`]"
        elevation="12"
        variant="elevated"
      >
        <div class="home-highlights__accent" />
        <div class="home-highlights__icon">
          <VIcon :icon="highlight.icon" size="32" />
        </div>
        <VCardTitle tag="h3">{{ highlight.title }}</VCardTitle>
        <VCardSubtitle class="home-highlights__lead" tag="p">
          {{ highlight.lead }}
        </VCardSubtitle>
        <VCardText class="home-highlights__body">
          <ul class="home-highlights__list">
            <li
              v-for="point in highlight.points"
              :key="point"
              class="home-highlights__list-item"
            >
              <span
                :class="[
                  'home-highlights__bullet',
                  `home-highlights__bullet--${highlight.accent}`
                ]"
              ></span>
              <span>{{ point }}</span>
            </li>
          </ul>
        </VCardText>
      </VCard>
    </div>
  </section>
</template>

<style scoped>
.home-highlights {
  width: 100%;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  padding: 0 clamp(1rem, 3vw, 2.5rem);
}

.home-highlights__heading {
  margin: 0;
  font-size: clamp(1.8rem, 3.5vw, 2.4rem);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  position: relative;
  text-align: center;
  color: rgba(15, 23, 42, 0.92);
  padding-bottom: 0.9rem;
}

.home-highlights__heading::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: clamp(7rem, 22vw, 16rem);
  height: 4px;
  border-radius: 999px;
  background: linear-gradient(90deg, #4c52ff, #2bb673, #0c77c2);
  opacity: 0.9;
}

.home-highlights__heading-text {
  display: inline-block;
  background: linear-gradient(120deg, #4c52ff 0%, #2bb673 50%, #0c77c2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  padding-bottom: 0.2em;
}

.home-highlights__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1.25rem;
  width: 100%;
}

.home-highlights__card {
  position: relative;
  overflow: hidden;
  padding-block: 1.75rem;
  padding-inline: 1.75rem;
  border-radius: 1.25rem;
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.home-highlights__card:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 32px rgba(15, 23, 42, 0.15);
}

.home-highlights__accent {
  position: absolute;
  inset-inline: -25%;
  top: -60%;
  height: 160%;
  transform: rotate(12deg);
  opacity: 0.12;
}

.home-highlights__icon {
  width: 3rem;
  height: 3rem;
  border-radius: 1rem;
  display: grid;
  place-items: center;
  margin-bottom: 1.25rem;
}

.home-highlights__grid :deep(.v-card-title) {
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: 0.02em;
  padding-inline: 0;
  margin-bottom: 0.35rem;
  text-align: left;
}

.home-highlights__lead {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: clamp(0.72rem, 1.8vw, 0.85rem);
  color: rgba(var(--v-theme-on-surface), 0.65);
  padding-inline: 0;
  margin-bottom: 0.75rem;
  text-align: left;
  line-height: 1.4;
  white-space: normal;
  overflow-wrap: anywhere;
}

.home-highlights__body {
  padding-inline: 0;
  padding-top: 0;
}

.home-highlights__list {
  list-style: none;
  display: grid;
  gap: 0.65rem;
  margin: 0;
  padding: 0;
  text-align: left;
}

.home-highlights__list-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.95rem;
  color: rgba(var(--v-theme-on-surface), 0.85);
}

.home-highlights__bullet {
  width: 0.85rem;
  height: 0.85rem;
  border-radius: 999px;
  margin-top: 0.25rem;
  flex-shrink: 0;
}

.home-highlights__card--primary .home-highlights__icon {
  background: rgba(100, 108, 255, 0.12);
  color: #646cff;
}

.home-highlights__card--primary .home-highlights__accent {
  background: radial-gradient(circle at center, #646cff 0%, transparent 70%);
}

.home-highlights__bullet--primary {
  background: linear-gradient(135deg, #646cff 0%, #8188ff 100%);
}

.home-highlights__card--secondary .home-highlights__icon {
  background: rgba(66, 184, 131, 0.12);
  color: #2bb673;
}

.home-highlights__card--secondary .home-highlights__accent {
  background: radial-gradient(circle at center, #42b883 0%, transparent 70%);
}

.home-highlights__bullet--secondary {
  background: linear-gradient(135deg, #2bb673 0%, #5dd697 100%);
}

.home-highlights__card--tertiary .home-highlights__icon {
  background: rgba(14, 165, 233, 0.12);
  color: #0ea5e9;
}

.home-highlights__card--tertiary .home-highlights__accent {
  background: radial-gradient(circle at center, #0ea5e9 0%, transparent 70%);
}

.home-highlights__bullet--tertiary {
  background: linear-gradient(135deg, #0ea5e9 0%, #34d3ff 100%);
}

@media (max-width: 480px) {
  .home-highlights__card {
    padding: 1.5rem;
  }

  .home-highlights__icon {
    width: 2.5rem;
    height: 2.5rem;
    margin-bottom: 1rem;
  }

  .home-highlights__list {
    gap: 0.5rem;
  }

  .home-highlights__list-item {
    font-size: 0.9rem;
    line-height: 1.4;
  }
}
</style>
