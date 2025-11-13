<script setup lang="ts">
import type { BlogPostListItem } from '../../utils/blogApi'

defineProps<{
  post: BlogPostListItem
}>()
</script>

<template>
  <article class="blog-card">
    <RouterLink :to="`/blog/${post.slug}`" class="blog-card__image" v-if="post.hero_image_url">
      <img :src="post.hero_image_url" :alt="post.title" loading="lazy">
    </RouterLink>
    <div class="blog-card__body">
      <div class="blog-card__meta">
        <span>{{ new Date(post.published_at).toLocaleDateString() }}</span>
        <span aria-hidden="true">•</span>
        <span>{{ post.reading_time_minutes }} min read</span>
      </div>
      <RouterLink :to="`/blog/${post.slug}`" class="blog-card__title">
        {{ post.title }}
      </RouterLink>
      <p class="blog-card__excerpt">
        {{ post.excerpt }}
      </p>
      <div class="blog-card__categories">
        <VChip
          v-for="category in post.categories"
          :key="category.slug"
          color="primary"
          size="small"
          variant="outlined"
        >
          {{ category.name }}
        </VChip>
      </div>
      <RouterLink :to="`/blog/${post.slug}`" class="blog-card__cta">
        Read article
        <VIcon icon="$mdi-arrow-top-right" size="18" />
      </RouterLink>
    </div>
  </article>
</template>

<style scoped>
.blog-card {
  background: rgba(var(--v-theme-surface), 0.98);
  border: 1px solid rgba(var(--v-theme-primary), 0.08);
  border-radius: 1.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 18px 38px rgba(var(--v-theme-on-background), 0.08);
}

.blog-card__image {
  display: block;
  height: 220px;
  overflow: hidden;
}

.blog-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 250ms ease;
}

.blog-card__image:hover img {
  transform: scale(1.05);
}

.blog-card__body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.blog-card__meta {
  font-size: 0.9rem;
  letter-spacing: 0.04em;
  color: rgba(var(--v-theme-on-surface), 0.6);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
}

.blog-card__title {
  font-size: 1.3rem;
  font-weight: 700;
  color: rgba(var(--v-theme-on-surface), 0.95);
  text-decoration: none;
}

.blog-card__title:hover {
  color: rgb(var(--v-theme-primary));
}

.blog-card__excerpt {
  margin: 0;
  color: rgba(var(--v-theme-on-surface), 0.72);
  line-height: 1.6;
}

.blog-card__categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.blog-card__cta {
  display: inline-flex;
  gap: 0.3rem;
  align-items: center;
  font-weight: 600;
  color: rgb(var(--v-theme-tertiary));
}
</style>
