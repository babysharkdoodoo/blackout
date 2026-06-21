// app/resources/page.tsx
import { ResourcesPageClient } from './resources-page-client'

export const metadata = {
  title: 'Resources',
  description:
    'Data sources, ordinance documentation, planned field materials, and references for BLACKOUT.',
}

export default function Page() {
  return <ResourcesPageClient />
}
