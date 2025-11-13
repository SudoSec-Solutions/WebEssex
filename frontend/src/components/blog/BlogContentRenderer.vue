<script setup lang="ts">
defineProps<{
  html: string
}>()
</script>

<template>
  <article class="blog-content" v-html="html" />
</template>

<style scoped>
.blog-content :global(p) {
  margin-block: 1.25rem;
  line-height: 1.9;
  font-size: 1.05rem;
}

.blog-content :global(h2),
.blog-content :global(h3),
.blog-content :global(h4) {
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.blog-content :global(img) {
  width: 100%;
  border-radius: 1rem;
  margin-block: 1.5rem;
  box-shadow: 0 14px 28px rgba(var(--v-theme-on-background), 0.12);
}

.blog-content :global(ul),
.blog-content :global(ol) {
  padding-left: 1.5rem;
  line-height: 1.8;
}

.blog-content :global(blockquote) {
  border-left: 4px solid rgba(var(--v-theme-primary), 0.5);
  margin: 2rem 0;
  padding-left: 1rem;
  font-style: italic;
}

.blog-content :global(code),
.blog-content :global(pre) {
  font-family: 'JetBrains Mono', 'SFMono-Regular', Menlo, monospace;
  background: rgba(var(--v-theme-on-surface), 0.06);
  border-radius: 0.5rem;
  padding: 0.2rem 0.4rem;
}

.blog-content :global(pre) {
  padding: 1rem;
  overflow-x: auto;
}
</style>
