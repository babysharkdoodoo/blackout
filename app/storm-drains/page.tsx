import { StormDrainsPageClient } from './storm-drains-page-client'

export const metadata = {
  title: 'Storm Drain Marking',
  description:
    'The city-approved plan for GPS-documented storm drain markers and local runoff reminders.',
}

export default function Page() {
  return <StormDrainsPageClient />
}
