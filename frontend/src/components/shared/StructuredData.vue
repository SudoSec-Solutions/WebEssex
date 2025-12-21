<script setup lang="ts">
import { useHead } from '@unhead/vue'

const envSiteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.trim()
const baseUrl =
  envSiteUrl?.replace(/\/+$/, '') ??
  (typeof window !== 'undefined' ? window.location.origin : '')

const organizationId = baseUrl ? `${baseUrl}/#organization` : undefined
const localBusinessId = baseUrl ? `${baseUrl}/#localbusiness` : undefined
const websiteId = baseUrl ? `${baseUrl}/#website` : undefined
const logoUrl = baseUrl ? `${baseUrl}/WebEssexLogo.svg` : undefined

const sameAs = [
  'https://www.linkedin.com/company/webessex/',
  'https://www.instagram.com/web_essex/',
  'https://x.com/WEssex25624',
  'https://www.facebook.com/profile.php?id=61582622033324'
]

const address = {
  '@type': 'PostalAddress',
  addressLocality: 'Colchester',
  addressRegion: 'Essex',
  addressCountry: 'GB'
}

const areaServed = [
  { '@type': 'AdministrativeArea', name: 'Essex' },
  { '@type': 'Country', name: 'United Kingdom' }
]

const contactPoint = {
  '@type': 'ContactPoint',
  contactType: 'customer service',
  telephone: '08002922472',
  email: 'hello@webessex.uk',
  areaServed: 'GB',
  availableLanguage: ['en-GB', 'en']
}

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': organizationId,
  name: 'WebEssex',
  url: baseUrl || undefined,
  logo: logoUrl,
  sameAs,
  contactPoint,
  areaServed
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ProfessionalService'],
  '@id': localBusinessId,
  name: 'WebEssex',
  url: baseUrl || undefined,
  image: logoUrl,
  logo: logoUrl,
  telephone: '08002922472',
  email: 'hello@webessex.uk',
  address,
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 51.8892,
    longitude: 0.9042
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00'
    }
  ],
  sameAs,
  areaServed
}

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': websiteId,
  name: 'WebEssex',
  url: baseUrl || undefined,
  publisher: organizationId ? { '@id': organizationId } : undefined,
  inLanguage: 'en-GB'
}

const service = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Product strategy, brand design, and web development',
  serviceType: [
    'Product strategy',
    'Brand design',
    'UX/UI design',
    'Web development',
    'Launch support'
  ],
  provider: organizationId ? { '@id': organizationId } : { '@type': 'Organization', name: 'WebEssex' },
  areaServed
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      key: 'structured-data',
      innerHTML: JSON.stringify([organization, localBusiness, website, service])
    }
  ]
})
</script>
