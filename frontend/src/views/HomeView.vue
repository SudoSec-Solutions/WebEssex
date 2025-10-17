<script setup lang="ts">
import HomeHero from '../components/home/HomeHero.vue'
import HomeHighlights from '../components/home/HomeHighlights.vue'
import HomeSeo from '../components/home/HomeSeo.vue'
</script>

<template>
  <div class="home-view">
    <HomeHero />
    <HomeHighlights />
    <HomeSeo />
  </div>
</template>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(2rem, 4vw, 3rem);
  width: 100%;
  padding-inline: clamp(1rem, 5vw, 2.5rem);
}
</style>
