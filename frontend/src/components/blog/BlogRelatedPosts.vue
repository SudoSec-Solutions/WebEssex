<script setup lang="ts">
import type { BlogPostListItem } from '../../utils/blogApi'
import BlogCard from './BlogCard.vue'

defineProps<{
  posts: BlogPostListItem[]
}>()
</script>

<template>
  <section v-if="posts.length" class="blog-related">
    <h2>Related reading</h2>
    <div class="blog-related__grid">
      <BlogCard v-for="post in posts" :key="post.slug" :post="post" />
    </div>
  </section>
</template>

<style scoped>
.blog-related {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.blog-related__grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.blog-related h2 {
  margin: 0;
  font-size: 1.8rem;
}
</style>
