// app/team/page.tsx
import { TeamPageClient } from './team-page-client'

export const metadata = {
  title: 'Team',
  description: 'Five students. Defined roles. Clear ownership of each planned deliverable.',
}

export default function Page() {
  return <TeamPageClient />
}
