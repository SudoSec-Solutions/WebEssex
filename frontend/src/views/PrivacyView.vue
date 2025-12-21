<template>
  <section class="legal-page" aria-labelledby="privacy-heading">
    <header class="legal-page__header">
      <p class="legal-page__eyebrow">Privacy policy</p>
      <h1 id="privacy-heading" class="legal-page__title">
        How we handle your data
      </h1>
      <p class="legal-page__subtitle">
        We collect only what we need to deliver your project and keep you informed. This page explains what we collect,
        why we collect it, and how you can control your data.
      </p>
    </header>

    <div class="legal-page__content">
      <section class="legal-page__section">
        <h2>Who we are</h2>
        <p>
          WebEssex is the data controller for personal information submitted through this website. If you have any
          questions about how we use your data, email us at hello@webessex.uk.
        </p>
      </section>

      <section class="legal-page__section">
        <h2>What we collect</h2>
        <ul>
          <li>Contact details (name, email, phone, company) you submit in enquiry forms.</li>
          <li>Project details and plan selections you share with us.</li>
          <li>Newsletter subscription details if you opt in.</li>
        </ul>
      </section>

      <section class="legal-page__section">
        <h2>Why we collect it</h2>
        <ul>
          <li>To respond to enquiries and deliver services you request.</li>
          <li>To send updates you explicitly opt in to receive.</li>
          <li>To improve our services and maintain site security.</li>
        </ul>
      </section>

      <section class="legal-page__section">
        <h2>How long we keep it</h2>
        <p>
          We keep enquiry data only as long as needed to manage our relationship and meet legal obligations. You can
          request deletion at any time.
        </p>
      </section>

      <section class="legal-page__section">
        <h2>Your rights</h2>
        <ul>
          <li>Request access, correction, or deletion of your data.</li>
          <li>Withdraw consent for marketing at any time.</li>
          <li>Ask for a copy of the data we hold about you.</li>
        </ul>
      </section>
    </div>
  </section>
</template>

<style scoped>
.legal-page {
  display: grid;
  gap: clamp(2rem, 4vw, 3rem);
}

.legal-page__header {
  text-align: left;
  max-width: 52rem;
  display: grid;
  gap: 0.75rem;
}

.legal-page__eyebrow {
  margin: 0;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(var(--v-theme-on-background), 0.65);
}

.legal-page__title {
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.75rem);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: linear-gradient(120deg, #4c52ff 0%, #2bb673 50%, #0c77c2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.legal-page__subtitle {
  margin: 0;
  color: rgba(var(--v-theme-on-background), 0.78);
  line-height: 1.7;
}

.legal-page__content {
  display: grid;
  gap: 1.5rem;
}

.legal-page__section {
  background: rgba(var(--v-theme-surface), 0.95);
  border-radius: 1.4rem;
  padding: clamp(1.5rem, 3vw, 2.25rem);
  border: 1px solid rgba(var(--v-theme-primary), 0.12);
  box-shadow: 0 18px 36px rgba(var(--v-theme-on-background), 0.08);
}

.legal-page__section h2 {
  margin: 0 0 0.75rem;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.legal-page__section p,
.legal-page__section li {
  margin: 0;
  color: rgba(var(--v-theme-on-surface), 0.74);
  line-height: 1.6;
}

.legal-page__section ul {
  margin: 0;
  padding-left: 1.25rem;
  display: grid;
  gap: 0.5rem;
}
</style>
