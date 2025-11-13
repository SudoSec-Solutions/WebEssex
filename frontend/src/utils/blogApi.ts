import { apiUrl } from './api'

export interface BlogCategory {
  id: number
  name: string
  slug: string
  description: string
}

export interface BlogAuthor {
  id: number
  full_name: string
  role?: string
  bio?: string
  avatar_url?: string
}

export interface BlogSeoPayload {
  title: string
  description: string
  keywords: string[]
  canonical: string
  ogImage?: string
}

export interface BlogPostListItem {
  id: number
  title: string
  slug: string
  excerpt: string
  hero_image_url?: string
  reading_time_minutes: number
  published_at: string
  author: BlogAuthor | null
  categories: BlogCategory[]
  seo: BlogSeoPayload
}

export interface BlogPostDetail extends BlogPostListItem {
  body: string
  canonical_url: string
  related_posts: BlogPostListItem[]
}

export interface PaginatedBlogPosts {
  count: number
  next: string | null
  previous: string | null
  results: BlogPostListItem[]
}

const fetchJson = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(apiUrl(path), {
    headers: {
      'Content-Type': 'application/json'
    },
    ...init
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Request failed: ${response.status}`)
  }

  return response.json() as Promise<T>
}

export const fetchBlogPosts = (options?: { category?: string; page?: number; pageSize?: number }): Promise<PaginatedBlogPosts> => {
  const params = new URLSearchParams()
  if (options?.category) {
    params.append('category', options.category)
  }
  if (options?.page) {
    params.append('page', String(options.page))
  }
  if (options?.pageSize) {
    params.append('page_size', String(options.pageSize))
  }
  const query = params.toString()
  const suffix = query ? `?${query}` : ''
  return fetchJson(`/api/blog/posts/${suffix}`)
}

export const fetchBlogPost = (slug: string): Promise<BlogPostDetail> => {
  return fetchJson(`/api/blog/posts/${slug}/`)
}

export const fetchBlogCategories = (): Promise<BlogCategory[]> => {
  return fetchJson('/api/blog/categories/')
}
