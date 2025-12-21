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

const LOCATION_META_TAGS: Array<Record<string, string>> = [
  { name: 'geo.position', content: '51.7356;0.4686', key: 'geo.position-chelmsford' },
  { name: 'ICBM', content: '51.7356, 0.4686', key: 'icbm-chelmsford' },
  { name: 'geo.position', content: '51.8892;0.9042', key: 'geo.position-colchester' },
  { name: 'ICBM', content: '51.8892, 0.9042', key: 'icbm-colchester' },
  { name: 'geo.position', content: '51.8789;0.5529', key: 'geo.position-braintree' },
  { name: 'ICBM', content: '51.8789, 0.5529', key: 'icbm-braintree' },
  { name: 'geo.position', content: '51.5459;0.7077', key: 'geo.position-southend' },
  { name: 'ICBM', content: '51.5459, 0.7077', key: 'icbm-southend' },
  { name: 'geo.position', content: '51.5761;0.4887', key: 'geo.position-basildon' },
  { name: 'ICBM', content: '51.5761, 0.4887', key: 'icbm-basildon' },
  { name: 'geo.position', content: '51.6200;0.3056', key: 'geo.position-brentwood' },
  { name: 'ICBM', content: '51.6200, 0.3056', key: 'icbm-brentwood' },
  { name: 'geo.position', content: '51.7729;0.1023', key: 'geo.position-harlow' },
  { name: 'ICBM', content: '51.7729, 0.1023', key: 'icbm-harlow' },
  { name: 'geo.position', content: '51.7890;1.1540', key: 'geo.position-clacton' },
  { name: 'ICBM', content: '51.7890, 1.1540', key: 'icbm-clacton' },
  { name: 'geo.position', content: '51.8000;0.6410', key: 'geo.position-witham' },
  { name: 'ICBM', content: '51.8000, 0.6410', key: 'icbm-witham' },
  { name: 'geo.position', content: '51.7310;0.6740', key: 'geo.position-maldon' },
  { name: 'ICBM', content: '51.7310, 0.6740', key: 'icbm-maldon' },
  { name: 'geo.position', content: '51.5850;0.6040', key: 'geo.position-rayleigh' },
  { name: 'ICBM', content: '51.5850, 0.6040', key: 'icbm-rayleigh' }
]

const BASE_META_TAGS: Array<Record<string, string>> = [
  { name: 'geo.region', content: 'GB-ESS' },
  { name: 'geo.placename', content: 'Essex, United Kingdom' },
  ...LOCATION_META_TAGS,
  {
    name: 'robots',
    content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
  },
  { property: 'og:locale', content: 'en_GB' },
  { property: 'og:site_name', content: 'WebEssex' }
]

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      title: 'WebEssex | Web Design & Development Studio in Essex (Chelmsford, Colchester, Braintree)',
      metaTags: [
        {
          name: 'description',
          content:
            'WebEssex is an Essex-based product, UX/UI, and web development studio. We design and build fast, secure websites and web apps for businesses in Chelmsford, Colchester, Braintree, Southend-on-Sea, Basildon, Brentwood, Harlow, and across the UK.'
        },
        ...BASE_META_TAGS
      ],
      seo: {
        keywords: [
          'WebEssex',
          'product studio Essex',
          'web design Essex',
          'website design Essex',
          'web development Essex',
          'UX UI design Essex',
          'web design Chelmsford',
          'web development Chelmsford',
          'website design Chelmsford',
          'UX UI designer Chelmsford',
          'web design Colchester',
          'web development Colchester',
          'website design Colchester',
          'UX UI design Colchester',
          'web design Braintree',
          'web development Braintree',
          'website design Braintree',
          'web design Southend-on-Sea',
          'web design Basildon',
          'web design Brentwood',
          'web design Harlow',
          'web design Clacton-on-Sea',
          'web design Witham',
          'web design Maldon',
          'web design Rayleigh',
          'web development Essex',
          'Essex web development',
          'web design studio UK',
          'web development studio UK',
          'digital product studio UK',
          'product and delivery studio',
          'custom website design',
          'responsive web design',
          'ecommerce website development',
          'startup MVP development',
          'website redesign Essex',
          'secure web applications',
          'performance optimisation',
          'Core Web Vitals optimisation'
        ],
        canonical: 'https://webessex.uk/',
        ogTitle: 'WebEssex | Web Design & Development Studio in Essex',
        ogDescription:
          'Product, UX/UI, and web development studio serving Essex (Chelmsford, Colchester, Braintree) and the UK. Fast, secure websites and web apps built to convert and scale.',
        ogType: 'website',
        ogImage: 'https://webessex.uk/social/home.png',
        twitterCard: 'summary_large_image',
        twitterTitle: 'WebEssex | Web Design & Development in Essex',
        twitterDescription:
          'Web design, UX/UI, and web development for Essex (Chelmsford, Colchester, Braintree) and UK teams.',
        twitterImage: 'https://webessex.uk/social/home.png'
      }
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: {
      title: 'WebEssex | About Our Essex Web Design & Development Studio',
      metaTags: [
        {
          name: 'description',
          content:
            'Learn about WebEssex, an Essex-based product and delivery studio partnering with founders and growing teams for web design, UX/UI, and secure web development aligned with UK GDPR.'
        },
        ...BASE_META_TAGS
      ],
      seo: {
        keywords: [
          'about WebEssex',
          'Essex web design studio',
          'Essex web development studio',
          'UX UI studio Essex',
          'product and delivery studio',
          'product studio Essex',
          'digital product studio UK',
          'web design studio Chelmsford',
          'web design studio Colchester',
          'web design studio Braintree',
          'web design studio Southend-on-Sea',
          'web design studio Basildon',
          'web design studio Brentwood',
          'web design studio Harlow',
          'website design Essex',
          'web development Essex',
          'product strategy Essex',
          'security-first web development',
          'UK GDPR web design',
          'UK GDPR web development'
        ],
        canonical: 'https://webessex.uk/about',
        ogTitle: 'About WebEssex | Product & Delivery Studio in Essex',
        ogDescription:
          'Learn about WebEssex, an Essex-based product and delivery studio partnering with founders and growing teams for web design, UX/UI, and secure web development aligned with UK GDPR.',
        ogType: 'website',
        ogImage: 'https://webessex.uk/social/about.png',
        twitterCard: 'summary_large_image',
        twitterTitle: 'About WebEssex | Product & Delivery Studio in Essex',
        twitterDescription:
          'Essex-based product and delivery studio delivering web design, UX/UI, and secure web development across the UK.',
        twitterImage: 'https://webessex.uk/social/about.png'
      }
    }
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('../views/ServicesView.vue'),
    meta: {
      title: 'WebEssex | Web Design & Development Services in Essex',
      metaTags: [
        {
          name: 'description',
          content:
            'WebEssex is an Essex-based product and delivery studio offering product strategy, UX/UI design, brand systems, and secure web development aligned with UK GDPR. We build high-performance sites and web apps for teams in Chelmsford, Colchester, Braintree, Southend-on-Sea, Basildon, Brentwood, Harlow, and across the UK.'
        },
        ...BASE_META_TAGS
      ],
      seo: {
        keywords: [
          'WebEssex services',
          'web design services Essex',
          'website design services Essex',
          'web development services Essex',
          'UX UI design services Essex',
          'product strategy workshop Essex',
          'digital product discovery Essex',
          'brand identity design Essex',
          'website redesign Essex',
          'ecommerce website development Essex',
          'custom web applications Essex',
          'SEO-ready websites Essex',
          'Core Web Vitals optimisation Essex',
          'performance optimisation Essex',
          'accessibility audits Essex',
          'secure web development UK',
          'web design Chelmsford',
          'web development Chelmsford',
          'web design Colchester',
          'web development Colchester',
          'web design Braintree',
          'web development Braintree',
          'web design Southend-on-Sea',
          'web design Basildon',
          'web design Brentwood',
          'web design Harlow',
          'web design Clacton-on-Sea',
          'web design Witham',
          'web design Maldon',
          'web design Rayleigh',
          'product studio Essex',
          'web design studio Essex',
          'web development studio UK'
        ],
        canonical: 'https://webessex.uk/services',
        ogTitle: 'WebEssex | Web Design & Development Services in Essex',
        ogDescription:
          'Product strategy, UX/UI, brand design, and secure web development for Essex and UK teams. Fast, performance-led sites and web apps.',
        ogType: 'website',
        ogImage: 'https://webessex.uk/social/services.png',
        twitterCard: 'summary_large_image',
        twitterTitle: 'WebEssex | Web Design & Development Services',
        twitterDescription:
          'Product strategy, UX/UI, brand systems, and secure web development for Essex and UK teams.',
        twitterImage: 'https://webessex.uk/social/services.png'
      }
    }
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/BlogListView.vue'),
    meta: {
      title: 'WebEssex | Web Design & Development Insights',
      metaTags: [
        {
          name: 'description',
          content:
            'Articles from the WebEssex product and delivery studio covering web design, UX/UI, performance, SEO, and UK GDPR-aligned security for Essex and UK businesses.'
        },
        ...BASE_META_TAGS
      ],
      seo: {
        keywords: [
          'WebEssex blog',
          'web design blog Essex',
          'web development blog UK',
          'UX UI design insights',
          'website performance tips',
          'Core Web Vitals guidance',
          'SEO tips for Essex businesses',
          'website redesign advice',
          'digital product strategy blog',
          'conversion optimisation tips',
          'secure website best practices',
          'UK GDPR website guidance',
          'web accessibility tips',
          'startup website launch guide',
          'small business web design Essex'
        ],
        canonical: 'https://webessex.uk/blog',
        ogTitle: 'WebEssex | Web Design & Development Insights',
        ogDescription:
          'Practical insights on web design, UX/UI, performance, SEO, and secure delivery for Essex and UK teams.',
        ogType: 'website',
        ogImage: 'https://webessex.uk/social/blog.png',
        twitterCard: 'summary_large_image',
        twitterTitle: 'WebEssex | Web Design & Development Insights',
        twitterDescription:
          'Insights on web design, UX/UI, performance, SEO, and secure delivery for Essex and UK teams.',
        twitterImage: 'https://webessex.uk/social/blog.png'
      }
    }
  },
  {
    path: '/blog/:slug',
    name: 'blog-detail',
    component: () => import('../views/BlogDetailView.vue'),
    meta: {
      title: 'WebEssex | Blog Article',
      metaTags: [
        {
          name: 'description',
          content:
            'In-depth web design, UX/UI, performance, and product delivery insight from the WebEssex studio.'
        },
        ...BASE_META_TAGS
      ],
      seo: {
        keywords: [
          'WebEssex blog article',
          'web design insights',
          'web development insights',
          'UX UI best practices',
          'website performance advice',
          'Core Web Vitals tips',
          'SEO guidance for UK businesses'
        ],
        ogTitle: 'WebEssex | Blog Article',
        ogDescription:
          'In-depth web design, UX/UI, performance, and product delivery insight from the WebEssex studio.',
        ogType: 'article',
        ogImage: 'https://webessex.uk/social/blog.png',
        twitterCard: 'summary_large_image',
        twitterTitle: 'WebEssex | Blog Article',
        twitterDescription:
          'In-depth web design, UX/UI, performance, and product delivery insight from the WebEssex studio.',
        twitterImage: 'https://webessex.uk/social/blog.png'
      }
    }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
    meta: {
      title: 'WebEssex | Contact the Essex Web Design & Development Studio',
      metaTags: [
        {
          name: 'description',
          content:
            'Talk to WebEssex about product strategy, UX/UI, web design, and secure web development. Book a workshop or request a tailored proposal for teams in Essex and across the UK.'
        },
        ...BASE_META_TAGS
      ],
      seo: {
        keywords: [
          'Contact WebEssex',
          'web design studio contact Essex',
          'web development studio contact Essex',
          'book discovery workshop Essex',
          'web design consultation Essex',
          'web development quote Essex',
          'website redesign consultation',
          'product strategy workshop Essex',
          'start website project Essex',
          'Chelmsford web design contact',
          'Colchester web design contact',
          'Braintree web design contact',
          'Southend-on-Sea web design contact',
          'Basildon web design contact',
          'Brentwood web design contact',
          'Harlow web design contact',
          'UK web development consultation',
          'request web design proposal',
          'secure web development consultation'
        ],
        canonical: 'https://webessex.uk/contact',
        ogTitle: 'Contact WebEssex | Essex Web Design & Development Studio',
        ogDescription:
          'Book a workshop, request a tailored proposal, or talk to the WebEssex team about your next launch in Essex or across the UK.',
        ogType: 'website',
        ogImage: 'https://webessex.uk/social/contact.png',
        twitterCard: 'summary_large_image',
        twitterTitle: 'Contact WebEssex | Essex Web Design & Development Studio',
        twitterDescription:
          'Say hello and plan a secure, high-performance website or web app with the WebEssex team.',
        twitterImage: 'https://webessex.uk/social/contact.png'
      }
    }
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../views/PrivacyView.vue'),
    meta: {
      title: 'WebEssex | Privacy Policy',
      metaTags: [
        {
          name: 'description',
          content: 'Learn how WebEssex collects, uses, and protects your data.'
        },
        ...BASE_META_TAGS
      ],
      seo: {
        keywords: ['WebEssex privacy', 'data protection', 'GDPR'],
        canonical: 'https://webessex.uk/privacy',
        ogTitle: 'WebEssex Privacy Policy',
        ogDescription: 'Learn how WebEssex collects, uses, and protects your data.',
        ogType: 'website',
        ogImage: 'https://webessex.uk/social/home.png',
        twitterCard: 'summary_large_image',
        twitterTitle: 'WebEssex Privacy Policy',
        twitterDescription: 'Learn how WebEssex collects, uses, and protects your data.',
        twitterImage: 'https://webessex.uk/social/home.png'
      }
    }
  },
  {
    path: '/cookies',
    name: 'cookies',
    component: () => import('../views/CookiesView.vue'),
    meta: {
      title: 'WebEssex | Cookie Policy',
      metaTags: [
        {
          name: 'description',
          content: 'View WebEssex cookie preferences and analytics information.'
        },
        ...BASE_META_TAGS
      ],
      seo: {
        keywords: ['WebEssex cookies', 'cookie policy', 'analytics cookies'],
        canonical: 'https://webessex.uk/cookies',
        ogTitle: 'WebEssex Cookie Policy',
        ogDescription: 'View WebEssex cookie preferences and analytics information.',
        ogType: 'website',
        ogImage: 'https://webessex.uk/social/home.png',
        twitterCard: 'summary_large_image',
        twitterTitle: 'WebEssex Cookie Policy',
        twitterDescription: 'View WebEssex cookie preferences and analytics information.',
        twitterImage: 'https://webessex.uk/social/home.png'
      }
    }
  }
]

const DEFAULT_TITLE = 'WebEssex'
const DEFAULT_DESCRIPTION =
  'WebEssex is a design-led product and delivery studio delivering websites, product launches, and growth partnerships for ambitious teams.'
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
  const dedupeKey = keyHint ?? entry.key ?? entry.name ?? entry.property ?? entry.rel ?? undefined
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
    const dedupeKey = keyHint ?? entry.key ?? entry.name ?? entry.property ?? entry.rel ?? undefined
    if (dedupeKey && metaKeys.has(dedupeKey)) return
    if (dedupeKey) metaKeys.add(dedupeKey)
    metaEntries.push(createMetaEntry(entry, dedupeKey))
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
