import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

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

const routes: RouteRecordRaw[] = [
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
        canonical: 'https://www.webessex.dev/',
        ogTitle: 'WebEssex | Digital Design & Web Development in Essex',
        ogDescription:
          'WebEssex is a design-led digital agency crafting high-performing websites, brand experiences, and product launches for ambitious teams across Essex and the UK.',
        ogType: 'website',
        ogImage: 'https://www.webessex.dev/social/home.jpg',
        twitterCard: 'summary_large_image',
        twitterTitle: 'WebEssex | Digital Design & Web Development in Essex',
        twitterDescription:
          'Design, engineering, and product strategy under one roof. Launch faster with WebEssex.'
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
        canonical: 'https://www.webessex.dev/about',
        ogTitle: 'About WebEssex',
        ogDescription: 'Meet the team behind WebEssex and learn how we deliver measurable, design-led launches.',
        ogType: 'profile',
        ogImage: 'https://www.webessex.dev/social/about.jpg',
        twitterCard: 'summary_large_image',
        twitterTitle: 'About WebEssex',
        twitterDescription: 'Get to know the multidisciplinary team building products for ambitious brands.'
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
        canonical: 'https://www.webessex.dev/services',
        ogTitle: 'WebEssex Services',
        ogDescription:
          'Explore strategy workshops, brand-rich design, Vue engineering, and growth partnerships built for ambitious teams.',
        ogType: 'website',
        ogImage: 'https://www.webessex.dev/social/services.jpg',
        twitterCard: 'summary_large_image',
        twitterTitle: 'WebEssex Services',
        twitterDescription: 'From discovery to delivery, WebEssex is your end-to-end product partner.'
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
        canonical: 'https://www.webessex.dev/contact',
        ogTitle: 'Contact WebEssex',
        ogDescription:
          'Book a workshop, request a bespoke engagement, or talk to the WebEssex team about your next launch.',
        ogType: 'website',
        ogImage: 'https://www.webessex.dev/social/contact.jpg',
        twitterCard: 'summary_large_image',
        twitterTitle: 'Contact WebEssex',
        twitterDescription: 'Say hello—let’s design, build, and launch your next experience.'
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

const DEFAULT_TITLE = 'WebEssex'
const SEO_ATTRIBUTES: Record<string, string> = {
  ogTitle: 'property',
  ogDescription: 'property',
  ogImage: 'property',
  ogType: 'property',
  twitterTitle: 'name',
  twitterDescription: 'name',
  twitterImage: 'name',
  twitterCard: 'name'
}
const OG_PREFIXES: Record<string, string> = {
  ogTitle: 'og:title',
  ogDescription: 'og:description',
  ogImage: 'og:image',
  ogType: 'og:type'
}
const TWITTER_NAMES: Record<string, string> = {
  twitterTitle: 'twitter:title',
  twitterDescription: 'twitter:description',
  twitterImage: 'twitter:image',
  twitterCard: 'twitter:card'
}

router.afterEach((to) => {
  document.title = to.meta.title ?? DEFAULT_TITLE

  document
    .querySelectorAll('meta[data-router-controlled]')
    .forEach((tag) => tag.parentNode?.removeChild(tag))

  const metaTags = to.meta.metaTags ?? []
  metaTags.forEach((tagDef) => {
    const tag = document.createElement('meta')
    Object.entries(tagDef).forEach(([key, value]) => {
      tag.setAttribute(key, value)
    })
    tag.setAttribute('data-router-controlled', '')
    document.head.appendChild(tag)
  })

  const canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"][data-router-controlled]')
  if (canonicalLink) {
    canonicalLink.remove()
  }

  if (to.meta.seo?.canonical) {
    const link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    link.setAttribute('href', to.meta.seo.canonical)
    link.setAttribute('data-router-controlled', '')
    document.head.appendChild(link)
  }

  const seo = to.meta.seo ?? {}

  if (seo.keywords) {
    const keywordsValue = Array.isArray(seo.keywords) ? seo.keywords.join(', ') : seo.keywords
    if (keywordsValue) {
      const tag = document.createElement('meta')
      tag.setAttribute('name', 'keywords')
      tag.setAttribute('content', keywordsValue)
      tag.setAttribute('data-router-controlled', '')
      document.head.appendChild(tag)
    }
  }

  Object.entries(seo).forEach(([key, value]) => {
    if (!value || key === 'canonical' || key === 'keywords') return

    const attr = SEO_ATTRIBUTES[key]
    if (!attr) return

    const tag = document.createElement('meta')
    const propertyName = OG_PREFIXES[key] ?? TWITTER_NAMES[key] ?? key
    tag.setAttribute(attr, propertyName)
    const content = Array.isArray(value) ? value.join(', ') : value
    tag.setAttribute('content', content)
    tag.setAttribute('data-router-controlled', '')
    document.head.appendChild(tag)
  })
})

export default router
