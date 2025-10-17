const sanitizeBaseUrl = (url: string) => url.replace(/\/$/, '')

const resolveApiBaseUrl = (): string => {
  const envBaseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined

  if (envBaseUrl && envBaseUrl.trim().length > 0) {
    return sanitizeBaseUrl(envBaseUrl)
  }

  if (import.meta.env.DEV) {
    return sanitizeBaseUrl('http://127.0.0.1:8000')
  }

  if (typeof window !== 'undefined' && window.location) {
    return sanitizeBaseUrl(window.location.origin)
  }

  return ''
}

export const apiUrl = (path: string): string => `${resolveApiBaseUrl()}${path}`

