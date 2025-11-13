<template>
  <section class="services-cta" aria-labelledby="services-cta-heading">
    <div class="services-cta__content">
      <h2 id="services-cta-heading">Need something tailor-made?</h2>
      <p>
        Whether you’re validating a new idea or scaling an established product, we build flexible scopes that plug
        into your team’s cadence.
      </p>
    </div>
    <div class="services-cta__actions">
      <VBtn color="secondary" variant="flat" size="large" to="/contact">
        Talk to us
      </VBtn>
      <VBtn color="tertiary" variant="outlined" size="large" to="/about">
        Meet the team
      </VBtn>
    </div>
  </section>
</template>

<style scoped>
.services-cta {
  display: grid;
  gap: 1.5rem;
  background: linear-gradient(135deg, rgba(76, 82, 255, 0.08), rgba(12, 119, 194, 0.08));
  border-radius: 1.75rem;
  padding: clamp(1.75rem, 4vw, 2.75rem);
  border: 1px solid rgba(76, 82, 255, 0.15);
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.08);
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
}

.services-cta__content h2 {
  margin: 0 0 0.75rem;
  font-size: clamp(1.5rem, 3vw, 1.9rem);
  background: linear-gradient(120deg, #4c52ff 0%, #2bb673 50%, #0c77c2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.services-cta__content p {
  margin: 0;
  color: rgb(var(--v-theme-on-background));
  line-height: 1.6;
}

.services-cta__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .services-cta {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .services-cta__actions {
    justify-content: center;
  }
}
</style>
