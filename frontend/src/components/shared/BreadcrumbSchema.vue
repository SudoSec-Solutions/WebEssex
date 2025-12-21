<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const envSiteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.trim()
const baseUrl =
  envSiteUrl?.replace(/\/+$/, '') ??
  (typeof window !== 'undefined' ? window.location.origin : '')

const resolveUrl = (path: string) => {
  if (!baseUrl) return path
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`
}

const breadcrumbLabels: Record<string, string> = {
  home: 'Home',
  about: 'About',
  services: 'Services',
  blog: 'Blog',
  contact: 'Contact',
  privacy: 'Privacy Policy',
  cookies: 'Cookie Policy'
}

const breadcrumbHead = computed(() => {
  if (!baseUrl) {
    return {}
  }

  if (route.name === 'blog-detail') {
    return {}
  }

  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: resolveUrl('/')
    }
  ]

  if (route.path !== '/' && route.name) {
    const label = breadcrumbLabels[String(route.name)] ?? route.meta.title ?? route.path
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: typeof label === 'string' ? label : String(label),
      item: resolveUrl(route.path)
    })
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
  }

  return {
    script: [
      {
        type: 'application/ld+json',
        key: 'breadcrumb-jsonld',
        innerHTML: JSON.stringify(jsonLd)
      }
    ]
  }
})

useHead(breadcrumbHead)
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
