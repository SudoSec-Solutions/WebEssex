import type { RouteLocationNormalizedLoaded, RouteRecordRaw, Router } from 'vue-router'
import type { ActiveHeadEntry, VueHeadClient } from '@unhead/vue'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    metaTags?: Array<Record<string, string>>
    seo?: {
      keywords?: string | string[]
      canonical?: string
      ogTitle?: string
      ogDescription?: string
      ogImage?: string
      ogType?: string
      twitterTitle?: string
      twitterDescription?: string
      twitterImage?: string
      twitterCard?: string
    }
  }
}

const envSiteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.trim()
const SITE_URL = envSiteUrl ? envSiteUrl.replace(/\/+$/, '') : undefined

const ensureLeadingSlash = (value: string) => (value.startsWith('/') ? value : `/${value}`)
const isAbsoluteUrl = (value: string) => /^[a-z][a-z\d+\-.]*:\/\//i.test(value)

const resolveBaseOrigin = () => SITE_URL ?? (typeof window !== 'undefined' ? window.location.origin : undefined)

const resolveUrl = (raw?: string, fallbackPath?: string) => {
  const candidate = raw ?? fallbackPath ?? ''
  if (!candidate) return undefined

  if (isAbsoluteUrl(candidate)) {
    return candidate
  }

  const base = resolveBaseOrigin()
  if (!base) return undefined

  return `${base}${ensureLeadingSlash(candidate)}`
}

const resolveCanonicalUrl = (route: RouteLocationNormalizedLoaded, raw?: string) =>
  resolveUrl(raw, route.path)

const resolveAssetUrl = (raw?: string) => {
  if (!raw) return undefined
  if (isAbsoluteUrl(raw)) return raw
  const base = resolveBaseOrigin()
  if (!base) return raw
  return `${base}${ensureLeadingSlash(raw)}`
}

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      title: 'WebEssex | Digital Design & Web Development in Essex',
      metaTags: [
        {
          name: 'description',
          content:
            'WebEssex is a design-led digital agency crafting high-performing websites, brand experiences, and product launches for ambitious teams across Essex and the UK.'
        }
      ],
      seo: {
        keywords: [
          'WebEssex',
          'Essex digital agency',
          'website design Essex',
          'product design studio',
          'UX agency UK',
          'web development Essex'
        ],
        canonical: '/',
        ogTitle: 'WebEssex | Digital Design & Web Development in Essex',
        ogDescription:
          'WebEssex is a design-led digital agency crafting high-performing websites, brand experiences, and product launches for ambitious teams across Essex and the UK.',
        ogType: 'website',
        ogImage: '/social/home.png',
        twitterCard: 'summary_large_image',
        twitterTitle: 'WebEssex | Digital Design & Web Development in Essex',
        twitterDescription:
          'Design, engineering, and product strategy under one roof. Launch faster with WebEssex.',
        twitterImage: '/social/home.png'
      }
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: {
      title: 'WebEssex | About',
      metaTags: [
        {
          name: 'description',
          content: 'Discover the goals and background of the WebEssex project.'
        }
      ],
      seo: {
        keywords: ['WebEssex team', 'about WebEssex', 'digital studio Essex', 'product team UK'],
        canonical: '/about',
        ogTitle: 'About WebEssex',
        ogDescription: 'Meet the team behind WebEssex and learn how we deliver measurable, design-led launches.',
        ogType: 'profile',
        ogImage: '/social/about.png',
        twitterCard: 'summary_large_image',
        twitterTitle: 'About WebEssex',
        twitterDescription: 'Get to know the multidisciplinary team building products for ambitious brands.',
        twitterImage: '/social/about.png'
      }
    }
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('../views/ServicesView.vue'),
    meta: {
      title: 'WebEssex | Services',
      metaTags: [
        {
          name: 'description',
          content:
            'Explore WebEssex services spanning product strategy, brand and UX design, engineering delivery, and growth partnerships tailored to ambitious teams.'
        }
      ],
      seo: {
        keywords: [
          'WebEssex services',
          'product strategy Essex',
          'UX design Essex',
          'Vue engineering agency',
          'growth partnerships'
        ],
        canonical: '/services',
        ogTitle: 'WebEssex Services',
        ogDescription:
          'Explore strategy workshops, brand-rich design, Vue engineering, and growth partnerships built for ambitious teams.',
        ogType: 'website',
        ogImage: '/social/services.png',
        twitterCard: 'summary_large_image',
        twitterTitle: 'WebEssex Services',
        twitterDescription: 'From discovery to delivery, WebEssex is your end-to-end product partner.',
        twitterImage: '/social/services.png'
      }
    }
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/BlogListView.vue'),
    meta: {
      title: 'WebEssex | Blog',
      metaTags: [
        {
          name: 'description',
          content:
            'Case studies, launch playbooks, and SEO-backed insights from the WebEssex studio.'
        }
      ],
      seo: {
        keywords: ['WebEssex blog', 'design insights', 'Vue case studies', 'product launches'],
        canonical: '/blog',
        ogTitle: 'WebEssex Blog',
        ogDescription: 'Stories and insights from the WebEssex team.',
        ogType: 'website',
        ogImage: '/social/blog.png',
        twitterCard: 'summary_large_image',
        twitterTitle: 'WebEssex Blog',
        twitterDescription: 'Insights for ambitious digital teams.',
        twitterImage: '/social/blog.png'
      }
    }
  },
  {
    path: '/blog/:slug',
    name: 'blog-detail',
    component: () => import('../views/BlogDetailView.vue'),
    meta: {
      title: 'WebEssex | Article',
      metaTags: [
        {
          name: 'description',
          content: 'Detailed article from the WebEssex team.'
        }
      ],
      seo: {
        canonical: '/blog',
        ogTitle: 'WebEssex Article',
        ogDescription: 'A new perspective from the WebEssex studio.',
        ogType: 'article',
        ogImage: '/social/blog.png',
        twitterCard: 'summary_large_image',
        twitterTitle: 'WebEssex Article',
        twitterDescription: 'A new perspective from the WebEssex studio.',
        twitterImage: '/social/blog.png'
      }
    }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
    meta: {
      title: 'WebEssex | Contact',
      metaTags: [
        {
          name: 'description',
          content:
            'Contact WebEssex to discuss product strategy, design, and engineering support. Book a workshop or request a bespoke engagement.'
        }
      ],
      seo: {
        keywords: ['Contact WebEssex', 'book discovery workshop', 'Essex digital agency contact'],
        canonical: '/contact',
        ogTitle: 'Contact WebEssex',
        ogDescription:
          'Book a workshop, request a bespoke engagement, or talk to the WebEssex team about your next launch.',
        ogType: 'website',
        ogImage: '/social/contact.png',
        twitterCard: 'summary_large_image',
        twitterTitle: 'Contact WebEssex',
        twitterDescription: 'Say hello—let’s design, build, and launch your next experience.',
        twitterImage: '/social/contact.png'
      }
    }
  }
]

const DEFAULT_TITLE = 'WebEssex'
const DEFAULT_DESCRIPTION =
  'WebEssex is a design-led digital agency delivering websites, product launches, and growth partnerships for ambitious teams.'
const DEFAULT_OG_TYPE = 'website'
const DEFAULT_TWITTER_CARD = 'summary_large_image'
const ABSOLUTE_URL_KEYS = new Set(['ogImage', 'twitterImage'])
const SEO_ATTRIBUTE_MAP: Record<string, { attribute: 'property' | 'name'; value: string }> = {
  ogTitle: { attribute: 'property', value: 'og:title' },
  ogDescription: { attribute: 'property', value: 'og:description' },
  ogImage: { attribute: 'property', value: 'og:image' },
  ogType: { attribute: 'property', value: 'og:type' },
  twitterTitle: { attribute: 'name', value: 'twitter:title' },
  twitterDescription: { attribute: 'name', value: 'twitter:description' },
  twitterImage: { attribute: 'name', value: 'twitter:image' },
  twitterCard: { attribute: 'name', value: 'twitter:card' }
}

type HeadPayload = Record<string, any>
type HeadMetaEntry = Record<string, string>
type HeadLinkEntry = Record<string, string>

const createMetaEntry = (entry: Record<string, string>, keyHint?: string): HeadMetaEntry => {
  const dedupeKey = keyHint ?? entry.name ?? entry.property ?? entry.rel ?? undefined
  return dedupeKey ? { ...entry, key: dedupeKey } : { ...entry }
}

const buildHeadFromRoute = (route: RouteLocationNormalizedLoaded): HeadPayload => {
  const title = route.meta.title ?? DEFAULT_TITLE
  const head: HeadPayload = { title }

  const metaEntries: HeadMetaEntry[] = []
  const linkEntries: HeadLinkEntry[] = []
  const metaKeys = new Set<string>()
  const linkKeys = new Set<string>()

  const addMetaEntry = (entry: Record<string, string>, keyHint?: string) => {
    const dedupeKey = keyHint ?? entry.name ?? entry.property ?? entry.rel ?? undefined
    if (dedupeKey && metaKeys.has(dedupeKey)) return
    if (dedupeKey) metaKeys.add(dedupeKey)
    metaEntries.push(createMetaEntry(entry, keyHint))
  }

  const addLinkEntry = (entry: HeadLinkEntry, keyHint?: string) => {
    const dedupeKey = keyHint ?? (entry.key as string | undefined) ?? entry.rel ?? entry.href ?? undefined
    if (dedupeKey && linkKeys.has(dedupeKey)) return
    if (dedupeKey) {
      linkKeys.add(dedupeKey)
      linkEntries.push({ ...entry, key: dedupeKey })
    } else {
      linkEntries.push({ ...entry })
    }
  }

  const metaTags = route.meta.metaTags ?? []
  let metaDescriptionContent: string | undefined
  metaTags.forEach((tagDef) => {
    if (tagDef.name === 'description' && tagDef.content) {
      metaDescriptionContent = tagDef.content
    }
    addMetaEntry(tagDef)
  })

  const rawSeo = route.meta.seo ?? {}
  const fallbackDescription =
    rawSeo.ogDescription ?? metaDescriptionContent ?? DEFAULT_DESCRIPTION

  const normalizedSeo = {
    ...rawSeo,
    ogTitle: rawSeo.ogTitle ?? title,
    ogDescription: rawSeo.ogDescription ?? fallbackDescription,
    ogType: rawSeo.ogType ?? DEFAULT_OG_TYPE,
    twitterTitle: rawSeo.twitterTitle ?? rawSeo.ogTitle ?? title,
    twitterDescription: rawSeo.twitterDescription ?? rawSeo.ogDescription ?? fallbackDescription,
    twitterCard: rawSeo.twitterCard ?? DEFAULT_TWITTER_CARD,
    twitterImage: rawSeo.twitterImage ?? rawSeo.ogImage
  }

  const canonical = resolveCanonicalUrl(route, normalizedSeo.canonical)

  if (canonical) {
    addLinkEntry({ rel: 'canonical', href: canonical }, 'canonical')
    addMetaEntry({ property: 'og:url', content: canonical }, 'og:url')
  }

  const keywords = normalizedSeo.keywords
  if (keywords && (Array.isArray(keywords) ? keywords.length : keywords)) {
    const content = Array.isArray(keywords) ? keywords.join(', ') : keywords
    addMetaEntry({ name: 'keywords', content }, 'keywords')
  }

  Object.entries(normalizedSeo).forEach(([key, value]) => {
    if (!value || key === 'canonical' || key === 'keywords') return

    const mapping = SEO_ATTRIBUTE_MAP[key]
    if (!mapping) return

    let content = Array.isArray(value) ? value.join(', ') : value
    if (!content) return

    if (ABSOLUTE_URL_KEYS.has(key)) {
      const resolved = resolveAssetUrl(content)
      if (resolved) {
        content = resolved
      }
    }

    addMetaEntry(
      {
        [mapping.attribute]: mapping.value,
        content
      },
      mapping.value
    )
  })

  if (!metaKeys.has('description')) {
    addMetaEntry({ name: 'description', content: fallbackDescription }, 'description')
  }

  addMetaEntry({ property: 'og:site_name', content: DEFAULT_TITLE }, 'og:site_name')

  if (metaEntries.length) {
    head.meta = metaEntries
  }

  if (linkEntries.length) {
    head.link = linkEntries
  }

  return head
}

export const installRouteHead = (router: Router, head: VueHeadClient) => {
  let activeEntry: ActiveHeadEntry<HeadPayload> | undefined

  const applyHead = (route: RouteLocationNormalizedLoaded) => {
    const headPayload = buildHeadFromRoute(route)
    activeEntry?.dispose()
    activeEntry = head.push(headPayload)
  }

  router.afterEach((to) => {
    applyHead(to)
  })

  applyHead(router.currentRoute.value)
}
