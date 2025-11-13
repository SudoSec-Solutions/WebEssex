<script setup lang="ts">
import { computed, onMounted, onServerPrefetch, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BlogMeta from '../components/blog/BlogMeta.vue'
import BlogContentRenderer from '../components/blog/BlogContentRenderer.vue'
import BlogRelatedPosts from '../components/blog/BlogRelatedPosts.vue'
import BlogSeoMetaManager from '../components/blog/BlogSeoMetaManager.vue'
import type { BlogPostDetail } from '../utils/blogApi'
import { fetchBlogPost } from '../utils/blogApi'

const route = useRoute()
const post = ref<BlogPostDetail | null>(null)
const loading = ref(true)
const error = ref('')

const slug = computed(() => route.params.slug as string)

const loadPost = async () => {
  if (!slug.value) return
  loading.value = true
  error.value = ''
  try {
    post.value = await fetchBlogPost(slug.value)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Article not found.'
    post.value = null
  } finally {
    loading.value = false
  }
}

onServerPrefetch(loadPost)

onMounted(() => {
  if (!post.value) {
    loadPost()
  }
})

watch(slug, () => {
  loadPost()
})
</script>

<template>
  <div class="blog-detail">
    <BlogSeoMetaManager :post="post" />
    <div v-if="loading" class="blog-detail__loading">
      <VProgressCircular indeterminate color="primary" size="36" />
      <span>Loading article…</span>
    </div>
    <div v-else-if="error" class="blog-detail__error">
      <p>{{ error }}</p>
      <RouterLink to="/blog" class="blog-detail__back">
        Back to blog
      </RouterLink>
    </div>
    <article v-else-if="post" class="blog-detail__article">
      <header class="blog-detail__header">
        <p class="blog-detail__eyebrow">WebEssex Blog</p>
        <h1 class="blog-detail__title">
          {{ post.title }}
        </h1>
        <p class="blog-detail__excerpt">
          {{ post.excerpt }}
        </p>
        <BlogMeta :post="post" />
        <div v-if="post.hero_image_url" class="blog-detail__hero">
          <img :src="post.hero_image_url" :alt="post.title">
        </div>
      </header>
      <BlogContentRenderer :html="post.body" />
      <BlogRelatedPosts :posts="post.related_posts" />
    </article>
  </div>
</template>

<style scoped>
.blog-detail {
  max-width: 840px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.blog-detail__loading,
.blog-detail__error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2rem;
  border-radius: 1.5rem;
  background: rgba(var(--v-theme-surface), 0.95);
}

.blog-detail__article {
  background: rgba(var(--v-theme-surface), 0.98);
  border-radius: 2rem;
  padding: clamp(1.5rem, 4vw, 3rem);
  border: 1px solid rgba(var(--v-theme-primary), 0.08);
  box-shadow: 0 22px 44px rgba(var(--v-theme-on-background), 0.08);
}

.blog-detail__header {
  text-align: left;
}

.blog-detail__eyebrow {
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(var(--v-theme-secondary), 0.9);
  font-weight: 600;
}

.blog-detail__title {
  margin: 0.5rem 0;
  font-size: clamp(2rem, 4vw, 3rem);
}

.blog-detail__excerpt {
  margin: 0;
  color: rgba(var(--v-theme-on-surface), 0.75);
  font-size: 1.1rem;
  line-height: 1.7;
}

.blog-detail__hero {
  margin-top: 1.5rem;
  border-radius: 1.5rem;
  overflow: hidden;
}

.blog-detail__hero img {
  width: 100%;
  display: block;
  object-fit: cover;
}

.blog-detail__back {
  color: rgb(var(--v-theme-primary));
  font-weight: 600;
}
</style>
