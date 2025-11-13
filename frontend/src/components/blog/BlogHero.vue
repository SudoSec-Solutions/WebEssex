<template>
  <section class="blog-hero" aria-labelledby="blog-hero-heading">
    <VChip color="secondary" variant="tonal" class="blog-hero__eyebrow">
      WebEssex Blog
    </VChip>
    <h1 id="blog-hero-heading" class="blog-hero__title">
      Insights, launches, and lessons learned.
    </h1>
    <p class="blog-hero__description">
      Deep dives on design, engineering, growth-ready launches, and the systems that keep our clients shipping.
      Each article translates studio experience into client-ready action items you can apply on your next milestone.
    </p>
  </section>
</template>

<style scoped>
.blog-hero {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-block: clamp(1.5rem, 4vw, 3rem);
  max-width: 760px;
  margin: 0 auto;
}

.blog-hero__eyebrow {
  align-self: center;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 600;
}

.blog-hero__title {
  margin: 0;
  font-size: clamp(2.2rem, 5vw, 3.2rem);
  letter-spacing: -0.02em;
  color: rgba(var(--v-theme-on-background), 0.95);
}

.blog-hero__description {
  margin: 0;
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: rgba(var(--v-theme-on-background), 0.75);
  line-height: 1.75;
}
</style>
