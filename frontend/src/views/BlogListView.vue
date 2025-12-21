<script setup lang="ts">
import { computed, onMounted, onServerPrefetch, ref, watch } from 'vue'
import BlogHero from '../components/blog/BlogHero.vue'
import BlogGrid from '../components/blog/BlogGrid.vue'
import type { BlogCategory, BlogPostListItem } from '../utils/blogApi'
import { fetchBlogCategories, fetchBlogPosts } from '../utils/blogApi'

const posts = ref<BlogPostListItem[]>([])
const categories = ref<BlogCategory[]>([])
const selectedCategory = ref<string | null>(null)
const loading = ref(true)
const error = ref('')
const categoriesLoaded = ref(false)
const totalCount = ref(0)
const currentPage = ref(1)
const pageSize = 12

const loadCategories = async () => {
  if (categoriesLoaded.value) return
  categories.value = await fetchBlogCategories()
  categoriesLoaded.value = true
}

const loadPosts = async (page = currentPage.value) => {
  loading.value = true
  error.value = ''
  try {
    await loadCategories()
    const response = await fetchBlogPosts({
      category: selectedCategory.value ?? undefined,
      page,
      pageSize
    })
    posts.value = response.results
    totalCount.value = response.count
    currentPage.value = page
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unable to load blog posts.'
  } finally {
    loading.value = false
  }
}

const bootstrap = async () => {
  if (!posts.value.length) {
    await loadPosts(1)
  }
}

onServerPrefetch(() => loadPosts(1))

onMounted(() => {
  if (!posts.value.length) {
    bootstrap()
  }
})

watch(selectedCategory, () => {
  currentPage.value = 1
  loadPosts(1)
})

const handleCategoryChange = (value: string | null) => {
  if (selectedCategory.value === value) return
  selectedCategory.value = value
}

const totalPages = computed(() => {
  if (!totalCount.value) return 1
  return Math.max(1, Math.ceil(totalCount.value / pageSize))
})

const canGoPrev = computed(() => currentPage.value > 1)
const canGoNext = computed(() => currentPage.value < totalPages.value)

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value || page === currentPage.value) return
  loadPosts(page)
}

const nextPage = () => {
  if (canGoNext.value) {
    goToPage(currentPage.value + 1)
  }
}

const prevPage = () => {
  if (canGoPrev.value) {
    goToPage(currentPage.value - 1)
  }
}
</script>

<template>
  <div class="blog-view">
    <BlogHero />
    <BlogGrid
      :posts="posts"
      :categories="categories"
      :selected-category="selectedCategory"
      :loading="loading"
      :error="error"
      @update:category="handleCategoryChange"
      @retry="loadPosts"
    />
    <div
      v-if="!loading && !error && totalPages > 1"
      class="blog-pagination"
      aria-label="Blog pagination"
    >
      <VBtn
        variant="tonal"
        color="primary"
        :disabled="!canGoPrev"
        @click="prevPage"
        aria-label="Previous page"
      >
        Previous
      </VBtn>
      <span class="blog-pagination__status">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <VBtn
        variant="tonal"
        color="primary"
        :disabled="!canGoNext"
        @click="nextPage"
        aria-label="Next page"
      >
        Next
      </VBtn>
    </div>
  </div>
</template>

<style scoped>
.blog-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.blog-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.blog-pagination__status {
  font-weight: 600;
  letter-spacing: 0.05em;
}
</style>
