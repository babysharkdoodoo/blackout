import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { SmoothScrollProvider } from './smooth-scroll-provider'
import { RetailPartnerUI } from './retail-partner-ui'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', 'Arial', 'sans-serif'],
})

const playfair = Playfair_Display({
  variable: '--font-source-serif',
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})

const SITE_NAME = 'BLACKOUT'
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000')
const SITE_ICON = '/icon.svg?v=public-icon'
const SITE_DESCRIPTION =
  "A student-led initiative preparing public reminders, survey data, and field records around Brevard County's existing Summer Fertilizer Blackout Ordinance."

const siteKeywords = [
  'Indian River Lagoon',
  'manatee protection',
  'environmental conservation',
  'Brevard County',
  'fertilizer ordinance',
  'seagrass',
  'water quality',
  'community action',
  'public awareness',
  'coastal ecology',
  'lagoon restoration',
  'sustainable landscaping',
  'environmental education',
  'civic engagement',
]

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'BLACKOUT | Brevard County Summer Fertilizer Ordinance Activation',
    template: '%s | BLACKOUT',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  manifest: '/manifest.webmanifest',
  referrer: 'origin-when-cross-origin',
  creator: 'West Shore Jr./Sr. High School',
  publisher: 'West Shore Jr./Sr. High School',
  category: 'environment',
  keywords: siteKeywords,
  authors: [
    { name: 'West Shore Jr./Sr. High School' },
    { name: 'BLACKOUT Team' },
  ],
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'BLACKOUT | Protecting the Indian River Lagoon',
    description:
      "Student-led initiative preparing survey, retail, and storm drain outreach around Brevard County's Summer Fertilizer Blackout Ordinance.",
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: '/heroes/home-1.webp',
        alt: 'BLACKOUT campaign hero image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BLACKOUT | Protecting the Indian River Lagoon',
    description:
      "Student-led initiative preparing survey, retail, and storm drain outreach around Brevard County's Summer Fertilizer Blackout Ordinance.",
    images: ['/heroes/home-1.webp'],
  },
  icons: {
    icon: [
      { url: SITE_ICON, type: 'image/svg+xml', sizes: 'any' },
    ],
    apple: '/apple-icon.png',
    shortcut: SITE_ICON,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  other: {
    'msapplication-TileColor': '#0b1d20',
    'msapplication-config': '/browserconfig.xml',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7fbfc' },
    { media: '(prefers-color-scheme: dark)', color: '#061114' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${playfair.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href={SITE_ICON} type="image/svg+xml" sizes="any" />
        <link rel="shortcut icon" href={SITE_ICON} type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div id="top" aria-hidden="true" />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <RetailPartnerUI />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
