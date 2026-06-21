import OrdinancePageClient from './ordinance-page-client'

export const metadata = {
  title: 'The Ordinance',
  description:
    "Plain-language details for Brevard County's summer fertilizer blackout window and why it matters.",
}

export default function OrdinancePage() {
  return <OrdinancePageClient />
}
