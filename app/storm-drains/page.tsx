import { StormDrainsPageClient } from './storm-drains-page-client'

export const metadata = {
  title: 'Storm Drain Marking — BLACKOUT',
  description:
    'GPS-documented storm drain markers connecting lawn behavior to specific manatee mortality events.',
}

export default function Page() {
  return <StormDrainsPageClient />
}