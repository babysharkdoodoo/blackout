import { SiteLayout } from '@/components/site-layout'
import { Hero } from '@/components/hero'
import { ProblemSection } from '@/components/problem-section'
import { OrdinanceSection } from '@/components/ordinance-section'
import { ApproachSection } from '@/components/approach-section'
import { ImpactSection } from '@/components/impact-section'
import { VisionSection } from '@/components/vision-section'
import { TeamSection } from '@/components/team-section'
import { CTASection } from '@/components/cta-section'

export default function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <ProblemSection />
      <OrdinanceSection />
      <ApproachSection />
      <ImpactSection />
      <VisionSection />
      <TeamSection />
      <CTASection />
    </SiteLayout>
  )
}
