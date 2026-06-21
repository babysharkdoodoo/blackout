import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

interface SiteLayoutProps {
  children: React.ReactNode
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[#f5efe3] focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-[#07100d] focus:shadow-xl"
      >
        Skip to main content
      </a>
      <Navigation />
      {children}
      <Footer />
    </>
  )
}
