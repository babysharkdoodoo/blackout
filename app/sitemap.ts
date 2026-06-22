import type { MetadataRoute } from 'next'

const routes = [
  { path: '/', priority: 1 },
  { path: '/about', priority: 0.86 },
  { path: '/mission', priority: 0.86 },
  { path: '/ordinance', priority: 0.86 },
  { path: '/survey', priority: 0.78 },
  { path: '/retail-partners', priority: 0.78 },
  { path: '/storm-drains', priority: 0.78 },
  { path: '/impact', priority: 0.76 },
  { path: '/resources', priority: 0.72 },
  { path: '/team', priority: 0.7 },
  { path: '/contact', priority: 0.72 },
]

function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000')
  ).replace(/\/$/, '')
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl()
  const lastModified = new Date()

  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: route.priority,
  }))
}
