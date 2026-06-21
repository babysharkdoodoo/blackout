import { SurveyPageClient } from './survey-page-client'

export const metadata = {
  title: 'Community Survey',
  description:
    'Planned two-wave awareness survey for Brevard County fertilizer ordinance visibility.',
}

export default function Page() {
  return <SurveyPageClient />
}
