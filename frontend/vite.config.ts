import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { promises as fs } from 'node:fs'
import { resolve, join } from 'node:path'
import type { ViteSSGOptions } from 'vite-ssg'

const renderedRoutes = new Set<string>()

const ensureLeadingSlash = (value: string) => (value.startsWith('/') ? value : `/${value}`)

const injectPreloadLinks = (html: string) => {
  const stylesheetRegex = /<link rel="stylesheet"([^>]*href="[^"]+"[^>]*)>/g
  return html.replace(stylesheetRegex, (_match, attrs) => {
    const attributes = String(attrs)
    if (attributes.includes('rel="preload"')) {
      return `<link rel="stylesheet"${attributes}>`
    }
    return `<link rel="preload"${attributes} as="style">\n<link rel="stylesheet"${attributes}>`
  })
}

const htmlFileForRoute = (outDir: string, route: string) => {
  if (route === '/') return resolve(outDir, 'index.html')
  const normalized = route.endsWith('/') ? `${route.slice(0, -1)}.html` : `${route}.html`
  return resolve(outDir, normalized.replace(/^\//, ''))
}

function createSsgOptions(): ViteSSGOptions {
  return {
    onPageRendered: (route: string, html: string) => {
    renderedRoutes.add(route)
    return injectPreloadLinks(html)
  },
  async onFinished() {
      const siteUrl = (process.env.VITE_SITE_URL ?? 'https://webessex.uk').replace(/\/+$/, '')
      const outDir = resolve(process.cwd(), process.env.VITE_SSG_OUT_DIR ?? 'dist')
      await fs.mkdir(outDir, { recursive: true })

      const routes = Array.from(renderedRoutes)
      const now = new Date().toISOString()

      const urlMeta = new Map<string, { lastmod: string; changefreq: string; priority: string }>()
      const addUrl = (loc: string, meta: { lastmod: string; changefreq: string; priority: string }) => {
        if (!loc || urlMeta.has(loc)) return
        urlMeta.set(loc, meta)
      }

      for (const route of routes) {
        const filePath = htmlFileForRoute(outDir, route)
        let canonical = ''
        try {
          const html = await fs.readFile(filePath, 'utf8')
          const match = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
          if (match?.[1]) {
            canonical = match[1]
          }
        } catch {
          // ignore missing file
        }

        if (!canonical) {
          canonical = `${siteUrl}${ensureLeadingSlash(route)}`
        }

        const priority = canonical === siteUrl || canonical === `${siteUrl}/` ? '1.0' : '0.8'
        addUrl(canonical, { lastmod: now, changefreq: 'weekly', priority })
      }

      const sitemapEntries = Array.from(urlMeta.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([loc, meta]) => {
          return [
            '  <url>',
            `    <loc>${loc}</loc>`,
            `    <lastmod>${meta.lastmod}</lastmod>`,
            `    <changefreq>${meta.changefreq}</changefreq>`,
            `    <priority>${meta.priority}</priority>`,
            '  </url>'
          ].join('\n')
        })

      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...sitemapEntries,
        '</urlset>',
        ''
      ].join('\n')

      await fs.writeFile(resolve(outDir, 'sitemap.xml'), sitemap, 'utf8')

      const sitemapLine = `Sitemap: ${siteUrl}/sitemap.xml`
      const blogSitemapLine = `Sitemap: ${siteUrl}/api/blog/sitemap.xml`
      const robotsPath = resolve(outDir, 'robots.txt')
      let robotsContent = ''
      try {
        robotsContent = await fs.readFile(robotsPath, 'utf8')
      } catch {
        // ignore missing robots, will be created
      }

      const cleaned = robotsContent.replace(/Sitemap:[^\n]*/gi, '').trim()
      const updatedRobots = cleaned
        ? `${cleaned}\n\n${sitemapLine}\n${blogSitemapLine}\n`
        : `User-agent: *\nAllow: /\n\n${sitemapLine}\n${blogSitemapLine}\n`

      await fs.writeFile(robotsPath, `${updatedRobots.trim()}\n`, 'utf8')

      const humansContent = [
        '/* TEAM */',
        'Team: WebEssex',
        `Site: ${siteUrl}`,
        'Contact: hello@webessex.uk',
        'Twitter: https://twitter.com/WebEssex',
        '',
        '/* TECHNOLOGY */',
        'Tools: Vue 3, Vite, Vuetify, TypeScript',
        `Last-Updated: ${now}`,
        '',
        '/* THANKS */',
        'Thanks: Our clients, collaborators, and the open-source community.',
        ''
      ].join('\n')

      await fs.writeFile(resolve(outDir, 'humans.txt'), humansContent, 'utf8')

      const wellKnownDir = resolve(outDir, '.well-known')
      await fs.mkdir(wellKnownDir, { recursive: true })

      const expiresDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 180).toISOString().split('T')[0]
      const securityContent = [
        'Contact: mailto:security@webessex.uk',
        'Preferred-Languages: en',
        `Canonical: ${siteUrl}/.well-known/security.txt`,
        `Expires: ${expiresDate}`,
        ''
      ].join('\n')

      await fs.writeFile(join(wellKnownDir, 'security.txt'), securityContent, 'utf8')
    }
  }
}

const ssgOptions = createSsgOptions()

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      autoImport: true
    })
  ],
  ssr: {
    noExternal: ['vuetify']
  },
  ssgOptions
})
