<script setup lang="ts">
import ContactHero from '../components/contact/ContactHero.vue'
import ContactDetails from '../components/contact/ContactDetails.vue'
import ContactForm from '../components/contact/ContactForm.vue'
import ContactCta from '../components/contact/ContactCta.vue'
</script>

<template>
  <div class="contact-page">
    <ContactHero />
    <ContactDetails />
    <ContactForm />
    <ContactCta />
  </div>
</template>

<style scoped>
.contact-page {
  display: flex;
  flex-direction: column;
  gap: clamp(2.5rem, 5vw, 3.5rem);
}
</style>
