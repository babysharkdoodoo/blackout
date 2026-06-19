// app/team/page.tsx
import { TeamPageClient } from './team-page-client'

export const metadata = {
  title: 'Team  -  BLACKOUT',
  description: 'Five students. Defined roles. Clear ownership of every deliverable.',
}

export default function Page() {
  return <TeamPageClient />
}