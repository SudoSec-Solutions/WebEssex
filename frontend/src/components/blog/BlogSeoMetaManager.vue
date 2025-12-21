<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import type { BlogPostDetail } from '../../utils/blogApi'

const props = defineProps<{
  post: BlogPostDetail | null
}>()

const envSiteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.trim()
const SITE_URL = envSiteUrl ? envSiteUrl.replace(/\/+$/, '') : ''
const organizationId = SITE_URL ? `${SITE_URL}/#organization` : undefined

const resolveUrl = (path?: string) => {
  if (!path) return undefined
  if (/^[a-z]+:/i.test(path)) return path
  if (!SITE_URL) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

const headPayload = computed(() => {
  if (!props.post) {
    return {
      title: 'WebEssex Blog'
    }
  }

  const seo = props.post.seo
  const canonical = resolveUrl(props.post.canonical_url || seo.canonical)
  const ogImage = resolveUrl(seo.ogImage)
  const keywords = seo.keywords?.join(', ')
  const blogUrl = resolveUrl('/blog')
  const homeUrl = resolveUrl('/')
  const blogPostingId = canonical ? `${canonical}#blogposting` : undefined

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': blogPostingId,
    headline: seo.title,
    description: seo.description,
    image: ogImage ? [ogImage] : undefined,
    author: props.post.author
      ? {
          '@type': 'Person',
          name: props.post.author.full_name
        }
      : organizationId
        ? { '@id': organizationId }
        : { '@type': 'Organization', name: 'WebEssex' },
    datePublished: props.post.published_at,
    dateModified: props.post.published_at,
    url: canonical,
    mainEntityOfPage: canonical,
    publisher: organizationId ? { '@id': organizationId } : { '@type': 'Organization', name: 'WebEssex' },
    isPartOf: blogUrl
      ? {
          '@type': 'Blog',
          name: 'WebEssex Blog',
          url: blogUrl
        }
      : undefined,
    keywords: keywords || undefined,
    inLanguage: 'en-GB'
  }

  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: homeUrl
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: blogUrl
    }
  ]

  if (canonical) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 3,
      name: seo.title,
      item: canonical
    })
  }

  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.filter((item) => item.item)
  }

  return {
    title: `${seo.title} | WebEssex Blog`,
    meta: [
      { name: 'description', content: seo.description },
      ...(keywords ? [{ name: 'keywords', content: keywords }] : []),
      { property: 'og:title', content: seo.title },
      { property: 'og:description', content: seo.description },
      { property: 'og:type', content: 'article' },
      ...(canonical ? [{ property: 'og:url', content: canonical }] : []),
      ...(ogImage ? [{ property: 'og:image', content: ogImage }] : []),
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: seo.title },
      { name: 'twitter:description', content: seo.description },
      ...(ogImage ? [{ name: 'twitter:image', content: ogImage }] : [])
    ],
    link: canonical ? [{ rel: 'canonical', href: canonical }] : [],
    script: [
      {
        type: 'application/ld+json',
        key: 'blog-jsonld',
        innerHTML: JSON.stringify([blogPosting, breadcrumbList])
      }
    ]
  }
})

useHead(headPayload)
</script>

<template>
  <span class="visually-hidden" aria-hidden="true" />
</template>

<style scoped>
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  clip: rect(0, 0, 0, 0);
  overflow: hidden;
}
</style>
