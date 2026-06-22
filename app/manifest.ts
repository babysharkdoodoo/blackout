import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BLACKOUT',
    short_name: 'BLACKOUT',
    description:
      "A student-led initiative preparing public reminders, survey data, and field records around Brevard County's existing Summer Fertilizer Blackout Ordinance.",
    start_url: '/',
    display: 'standalone',
    background_color: '#07100d',
    theme_color: '#07100d',
    icons: [
      {
        src: '/icon.svg?v=public-icon',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
