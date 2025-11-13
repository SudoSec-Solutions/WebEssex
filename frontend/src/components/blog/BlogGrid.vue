<script setup lang="ts">
import { computed } from 'vue'
import type { BlogCategory, BlogPostListItem } from '../../utils/blogApi'
import BlogCard from './BlogCard.vue'

const props = defineProps<{
  posts: BlogPostListItem[]
  categories: BlogCategory[]
  selectedCategory: string | null
  loading: boolean
  error: string
}>()

const emit = defineEmits<{
  (e: 'update:category', value: string | null): void
  (e: 'retry'): void
}>()

const categoryChips = computed(() => [
  { label: 'All', value: null },
  ...props.categories.map((category) => ({ label: category.name, value: category.slug }))
])
</script>

<template>
  <section class="blog-grid" aria-live="polite">
    <div class="blog-grid__filters" role="tablist" aria-label="Filter posts by category">
      <VChip
        v-for="chip in categoryChips"
        :key="chip.label"
        :color="chip.value === selectedCategory ? 'secondary' : undefined"
        class="blog-grid__chip"
        role="tab"
        :aria-selected="chip.value === selectedCategory"
        @click="emit('update:category', chip.value)"
      >
        {{ chip.label }}
      </VChip>
    </div>

    <div v-if="loading" class="blog-grid__loading">
      <VProgressCircular indeterminate color="primary" size="32" />
      <span>Loading articles…</span>
    </div>

    <div v-else-if="error" class="blog-grid__error">
      <p>{{ error }}</p>
      <VBtn variant="outlined" color="primary" @click="emit('retry')">
        Try again
      </VBtn>
    </div>

    <div v-else-if="!posts.length" class="blog-grid__empty">
      <p>No articles in this category yet.</p>
    </div>

    <div v-else class="blog-grid__cards">
      <BlogCard v-for="post in posts" :key="post.slug" :post="post" />
    </div>
  </section>
</template>

<style scoped>
.blog-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
}

.blog-grid__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.blog-grid__chip {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
}

.blog-grid__cards {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.blog-grid__loading,
.blog-grid__error,
.blog-grid__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2rem;
  border-radius: 1.25rem;
  background: rgba(var(--v-theme-surface), 0.9);
  border: 1px solid rgba(var(--v-theme-primary), 0.08);
}
</style>
