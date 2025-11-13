<script setup lang="ts">
import type { BlogPostDetail } from '../../utils/blogApi'

defineProps<{
  post: BlogPostDetail
}>()
</script>

<template>
  <div class="blog-meta">
    <div class="blog-meta__author" v-if="post.author">
      <img
        v-if="post.author.avatar_url"
        :src="post.author.avatar_url"
        :alt="post.author.full_name"
        class="blog-meta__avatar"
        loading="lazy"
      >
      <div>
        <p class="blog-meta__author-name">{{ post.author.full_name }}</p>
        <p class="blog-meta__author-role">{{ post.author.role }}</p>
      </div>
    </div>
    <div class="blog-meta__details">
      <span>{{ new Date(post.published_at).toLocaleDateString() }}</span>
      <span aria-hidden="true">•</span>
      <span>{{ post.reading_time_minutes }} min read</span>
    </div>
    <div class="blog-meta__categories">
      <VChip
        v-for="category in post.categories"
        :key="category.slug"
        size="small"
        color="primary"
        variant="tonal"
      >
        {{ category.name }}
      </VChip>
    </div>
  </div>
</template>

<style scoped>
.blog-meta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-block: 1.5rem;
}

.blog-meta__author {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.blog-meta__avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.blog-meta__author-name {
  margin: 0;
  font-weight: 600;
}

.blog-meta__author-role {
  margin: 0;
  font-size: 0.9rem;
  color: rgba(var(--v-theme-on-surface), 0.65);
}

.blog-meta__details {
  font-size: 0.9rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(var(--v-theme-on-surface), 0.6);
  display: flex;
  gap: 0.5rem;
}

.blog-meta__categories {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
</style>
