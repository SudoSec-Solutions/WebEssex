<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const envSiteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.trim()
const baseUrl =
  envSiteUrl?.replace(/\/+$/, '') ??
  (typeof window !== 'undefined' ? window.location.origin : '')

const websiteId = baseUrl ? `${baseUrl}/#website` : undefined
const organizationId = baseUrl ? `${baseUrl}/#organization` : undefined

const isAbsoluteUrl = (value: string) => /^[a-z][a-z\d+\-.]*:\/\//i.test(value)

const resolveUrl = (raw?: string, fallbackPath?: string) => {
  const candidate = raw ?? fallbackPath ?? ''
  if (!candidate) return undefined
  if (isAbsoluteUrl(candidate)) return candidate
  if (!baseUrl) return undefined
  return `${baseUrl}${candidate.startsWith('/') ? candidate : `/${candidate}`}`
}

const webPageHead = computed(() => {
  const title = route.meta.title ?? 'WebEssex'
  const metaTags = route.meta.metaTags ?? []
  const description =
    metaTags.find((tag) => tag.name === 'description')?.content ??
    route.meta.seo?.ogDescription ??
    undefined

  const canonical = resolveUrl(route.meta.seo?.canonical, route.path)
  if (!canonical) {
    return {}
  }

  const ogImage = resolveUrl(route.meta.seo?.ogImage)

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonical}#webpage`,
    "logo": "https://www.webessex.uk/logo.png",
    url: canonical,
    name: title,
    description,
    inLanguage: 'en-GB',
    isPartOf: websiteId ? { '@id': websiteId } : undefined,
    publisher: organizationId ? { '@id': organizationId } : undefined,
    primaryImageOfPage: ogImage ? { '@type': 'ImageObject', url: ogImage } : undefined
  }

  return {
    script: [
      {
        type: 'application/ld+json',
        key: 'webpage-jsonld',
        innerHTML: JSON.stringify(webPage)
      }
    ]
  }
})

useHead(webPageHead)
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
