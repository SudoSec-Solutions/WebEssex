<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'

interface FaqItem {
  question: string
  answer: string
}

const props = defineProps<{
  title: string
  subtitle?: string
  items: FaqItem[]
}>()

const faqHead = computed(() => {
  if (!props.items?.length) {
    return {}
  }

  const mainEntity = props.items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer
    }
  }))

  const keyBase = props.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  return {
    script: [
      {
        type: 'application/ld+json',
        key: `faq-jsonld-${keyBase || 'section'}`,
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity
        })
      }
    ]
  }
})

useHead(faqHead)
</script>

<template>
  <section class="faq" aria-labelledby="faq-heading">
    <header class="faq__header">
      <h2 id="faq-heading" class="faq__title">{{ props.title }}</h2>
      <p v-if="props.subtitle" class="faq__subtitle">{{ props.subtitle }}</p>
    </header>

    <VExpansionPanels variant="accordion" class="faq__panels">
      <VExpansionPanel v-for="item in props.items" :key="item.question">
        <VExpansionPanelTitle>{{ item.question }}</VExpansionPanelTitle>
        <VExpansionPanelText>{{ item.answer }}</VExpansionPanelText>
      </VExpansionPanel>
    </VExpansionPanels>
  </section>
</template>

<style scoped>
.faq {
  display: grid;
  gap: clamp(1.25rem, 3vw, 1.75rem);
}

.faq__header {
  text-align: center;
  display: grid;
  gap: 0.6rem;
  justify-items: center;
}

.faq__title {
  margin: 0;
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: linear-gradient(120deg, #4c52ff 0%, #2bb673 50%, #0c77c2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.faq__subtitle {
  margin: 0;
  max-width: 42rem;
  color: rgba(var(--v-theme-on-background), 0.78);
  line-height: 1.6;
}

.faq__panels :deep(.v-expansion-panel) {
  border-radius: 1rem;
  border: 1px solid rgba(var(--v-theme-primary), 0.12);
  background: rgba(var(--v-theme-surface), 0.96);
  box-shadow: 0 14px 26px rgba(var(--v-theme-on-background), 0.08);
}

.faq__panels :deep(.v-expansion-panel-title) {
  font-weight: 600;
  letter-spacing: 0.04em;
}

.faq__panels :deep(.v-expansion-panel-text__wrapper) {
  color: rgba(var(--v-theme-on-surface), 0.78);
  line-height: 1.6;
}
</style>
