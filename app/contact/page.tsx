// app/contact/page.tsx
import { ContactPageClient } from './contact-page-client'

export const metadata = {
  title: 'Contact',
  description:
    'Get in touch with the BLACKOUT team for media, retail partnership inquiries, county coordination, or general questions.',
}

export default function Page() {
  return <ContactPageClient />
}
