<script setup lang="ts">
import ServicesHero from '../components/services/ServicesHero.vue'
import ServicesGrid from '../components/services/ServicesGrid.vue'
import ServicesPlans from '../components/services/ServicesPlans.vue'
import ServicesCta from '../components/services/ServicesCta.vue'
import FaqSection from '../components/shared/FaqSection.vue'

const serviceFaqs = [
  {
    question: 'How much do projects cost?',
    answer:
      'Plans start at £199 for Starter, with Essentials, Growth, and Scale covering larger scopes. Custom workshops begin at £2,500+.'
  },
  {
    question: 'What timelines should we expect?',
    answer:
      'Starter sites ship in 5-7 days. Essentials is typically ~2 weeks, Growth ~3-4 weeks, and Scale ~5-6 weeks depending on content readiness.'
  },
  {
    question: 'Who owns the work?',
    answer:
      'You own the final design and code once the project is complete and paid. We hand over assets, documentation, and access.'
  },
  {
    question: 'Do you offer ongoing support?',
    answer:
      'Yes. We offer launch support and ongoing iteration, with SOC monitoring included on Growth and Scale plans.'
  }
]
</script>

<template>
  <div class="services-page">
    <ServicesHero />
    <ServicesGrid />
    <ServicesPlans />
    <FaqSection
      title="FAQs"
      subtitle="Clear answers on pricing, timelines, and ownership."
      :items="serviceFaqs"
    />
    <ServicesCta />
  </div>
</template>

<style scoped>
.services-page {
  display: flex;
  flex-direction: column;
  gap: clamp(2.5rem, 5vw, 3.5rem);
}
</style>
