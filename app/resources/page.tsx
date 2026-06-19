// app/resources/page.tsx
import { ResourcesPageClient } from './resources-page-client'

export const metadata = {
  title: 'Resources  -  BLACKOUT',
  description:
    'Data sources, ordinance documentation, field materials, and references used by the BLACKOUT initiative.',
}

export default function Page() {
  return <ResourcesPageClient />
}