<template>
  <section class="contact-cta" aria-labelledby="contact-cta-heading">
    <div class="contact-cta__content">
      <h2 id="contact-cta-heading">Prefer a workshop first?</h2>
      <p>
        We run half-day discovery sessions to help teams align on goals, audiences, and success metrics before we dive
        into delivery.
      </p>
    </div>
    <div class="contact-cta__actions">
      <VBtn color="secondary" variant="flat" size="large" href="mailto:hello@webessex.dev?subject=Workshop%20enquiry">
        Book a workshop
      </VBtn>
      <VBtn color="tertiary" variant="outlined" size="large" to="/services">
        View services
      </VBtn>
    </div>
  </section>
</template>

<style scoped>
.contact-cta {
  display: grid;
  gap: 1.5rem;
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-primary), 0.1),
    rgba(var(--v-theme-tertiary), 0.1)
  );
  border-radius: 1.75rem;
  padding: clamp(1.75rem, 4vw, 2.75rem);
  border: 1px solid rgba(var(--v-theme-primary), 0.22);
  box-shadow: 0 16px 32px rgba(var(--v-theme-on-background), 0.08);
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
}

.contact-cta__content h2 {
  margin: 0 0 0.75rem;
  font-size: clamp(1.5rem, 3vw, 1.9rem);
  color: rgba(var(--v-theme-on-surface), 0.9);
}

.contact-cta__content p {
  margin: 0;
  color: rgba(var(--v-theme-on-surface), 0.75);
  line-height: 1.6;
}

.contact-cta__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .contact-cta {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .contact-cta__actions {
    justify-content: center;
  }
}
</style>
