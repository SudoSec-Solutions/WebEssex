<script setup lang="ts">
import ServicesHero from '../components/services/ServicesHero.vue'
import ServicesGrid from '../components/services/ServicesGrid.vue'
import ServicesCta from '../components/services/ServicesCta.vue'
</script>

<template>
  <div class="services-page">
    <ServicesHero />
    <ServicesGrid />
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
