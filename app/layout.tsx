import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { SmoothScrollProvider } from './smooth-scroll-provider'

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
const SITE_URL = 'https://blackout.example'
const SITE_DESCRIPTION =
  "A student-led initiative protecting the Indian River Lagoon, seagrass, and manatees by activating Brevard County's existing Summer Fertilizer Blackout Ordinance through community awareness and measurable action."

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
  generator: 'v0.app',
  applicationName: SITE_NAME,
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
      "Student-led initiative activating Brevard County's Summer Fertilizer Blackout Ordinance to protect manatees and seagrass.",
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BLACKOUT campaign hero image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BLACKOUT | Protecting the Indian River Lagoon',
    description:
      "Student-led initiative activating Brevard County's Summer Fertilizer Blackout Ordinance to protect manatees and seagrass.",
    images: ['/og-image.png'],
    creator: '@blackout',
    site: '@blackout',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
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
      className={`${inter.variable} ${playfair.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
