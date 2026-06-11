// app/resources/resources-page-client.tsx
'use client'

import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { SiteLayout } from '@/components/site-layout'

const heroBg =
  'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=80'

const primarySources = [
  {
    name: 'Marine Mammal Mortality Reports (2019–2023)',
    org: 'FWC',
    use: 'Mortality event locations',
    href: 'https://myfwc.com/research/manatee/rescue-mortality-response/statistics/mortality/',
  },
  {
    name: 'Indian River Lagoon Seagrass Surveys',
    org: 'SJRWMD',
    use: 'Seagrass loss data',
    href: 'https://www.sjrwmd.com/programs/environmental-information/irl/',
  },
  {
    name: 'Brevard County Code of Ordinances',
    org: 'Brevard County',
    use: 'Ordinance text § 62-3601',
    href: 'https://library.municode.com/fl/brevard_county',
  },
  {
    name: 'National Estuary Program Reports',
    org: 'EPA',
    use: 'Species diversity data',
    href: 'https://www.epa.gov/nep',
  },
  {
    name: 'Indian River Lagoon Economic Value Study',
    org: 'Brevard County',
    use: '$2.2B economic impact figure',
    href: 'https://www.brevardcounty.us',
  },
  {
    name: 'FDEP Fertilizer Application Guidance',
    org: 'FDEP',
    use: 'Application window estimates',
    href: 'https://floridadep.gov',
  },
  {
    name: 'West Indian Manatee ESA Status',
    org: 'USFWS',
    use: 'Threatened species classification',
    href: 'https://www.fws.gov/species/west-indian-manatee-trichechus-manatus',
  },
]

const fieldMaterials = [
  {
    title: 'Wave 1 Survey Instrument',
    desc: 'The door-to-door questionnaire used to establish the pre-intervention baseline.',
    status: 'Available',
    href: '/survey',
  },
  {
    title: 'Manatee Safe Shelf Tag Design',
    desc: 'Print-ready retail tag layout for fertilizer aisles and point-of-purchase placement.',
    status: 'In development',
    href: null,
  },
  {
    title: 'Storm Drain Marker Spec Sheet',
    desc: 'Hardware specifications, installation steps, and distance-calculation notes for each drain marker.',
    status: 'In development',
    href: null,
  },
  {
    title: 'Retail Partner Agreement Template',
    desc: 'Standard placement, season timing, and weekly reach logging terms for store partners.',
    status: 'In development',
    href: null,
  },
  {
    title: 'County Handoff Package Template',
    desc: 'Documentation structure for transferring the program to Brevard County after the season ends.',
    status: 'Post-season',
    href: null,
  },
  {
    title: 'Wave 2 Survey Instrument',
    desc: 'Matched follow-up instrument used to measure post-intervention awareness changes.',
    status: 'Pending close',
    href: null,
  },
]

const furtherReading = [
  {
    title: 'The Indian River Lagoon: A National Treasure in Crisis',
    org: 'Indian River Lagoon National Estuary Program',
    type: 'Overview report',
  },
  {
    title: 'Unusual Mortality Event — Florida Manatee (2021)',
    org: 'FWC Wildlife Research Institute',
    type: 'Mortality investigation',
  },
  {
    title: 'Best Management Practices for Florida-Friendly Fertilization',
    org: 'University of Florida IFAS Extension',
    type: 'Applied guidance',
  },
  {
    title: 'Voluntary Environmental Compliance: What Works',
    org: 'EPA Office of Enforcement',
    type: 'Policy research',
  },
  {
    title: 'Seagrass Loss and Turbidity in the IRL: 2011–2023',
    org: 'SJRWMD Research Division',
    type: 'Longitudinal study',
  },
  {
    title: 'Florida Model Ordinance for Fertilizer Management',
    org: 'FDEP',
    type: 'Policy model',
  },
]

function Fade({
  children,
  delay = 0,
  y = 14,
  className = '',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-120px' })
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y, filter: 'blur(8px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function Accent({ children }: { children: ReactNode }) {
  return <span className="text-[#a3b18a]">{children}</span>
}

function SectionTitle({
  eyebrow,
  title,
  dark = false,
}: {
  eyebrow: string
  title: ReactNode
  dark?: boolean
}) {
  return (
    <div className="mb-10">
      <p
        className={`text-[10px] uppercase tracking-[0.3em] ${
          dark ? 'text-[#8f978a]' : 'text-[#6f8167]'
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 max-w-4xl font-sans text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.045em] ${
          dark ? 'text-[#f3efe5]' : 'text-[#173027]'
        }`}
      >
        {title}
      </h2>
    </div>
  )
}

function DividerLabel({ label }: { label: string }) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <span className="h-px w-10 bg-[#7a8d73]/35" />
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f8167]">
        {label}
      </span>
    </div>
  )
}

function LightBand({ children }: { children: ReactNode }) {
  return <section className="bg-[#faf7f0] py-16 sm:py-20 lg:py-24">{children}</section>
}

function DarkBand({ children }: { children: ReactNode }) {
  return <section className="bg-[#060807] py-16 text-[#f3efe5] sm:py-20 lg:py-24">{children}</section>
}

function Row({
  left,
  right,
  dark = false,
}: {
  left: string
  right: ReactNode
  dark?: boolean
}) {
  return (
    <div
      className={`grid gap-3 border-b py-6 last:border-b-0 lg:grid-cols-[260px_1fr] ${
        dark ? 'border-white/10' : 'border-[#e2dbc9]'
      }`}
    >
      <p
        className={`text-[11px] uppercase tracking-[0.18em] ${
          dark ? 'text-[#8f978a]' : 'text-[#7c8576]'
        }`}
      >
        {left}
      </p>
      <div className={`text-[14px] leading-[1.9] ${dark ? 'text-[#b8afa1]' : 'text-[#5a625b]'}`}>
        {right}
      </div>
    </div>
  )
}

function MaterialRow({
  title,
  desc,
  status,
  href,
}: {
  title: string
  desc: string
  status: string
  href: string | null
}) {
  return (
    <div className="grid gap-4 border-b border-white/10 py-6 last:border-b-0 lg:grid-cols-[1fr_auto] lg:gap-8">
      <div>
        <h3 className="font-sans text-xl font-semibold tracking-[-0.03em] text-[#f3efe5]">
          {title}
        </h3>
        <p className="mt-2 text-[14px] leading-[1.85] text-[#a6ad9f]">{desc}</p>
      </div>
      <div className="lg:text-right">
        {href ? (
          <Link
            href={href}
            className="inline-flex items-center rounded-full bg-[#efe8d6] px-4 py-2 text-[11px] font-medium text-[#111814] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
          >
            Access →
          </Link>
        ) : (
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-medium text-[#8f978a]">
            {status}
          </span>
        )}
      </div>
    </div>
  )
}

export function ResourcesPageClient() {
  const [loaded, setLoaded] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <SiteLayout>
      <main className="overflow-hidden bg-[#f6f1e7] text-[#111814] selection:bg-[#d9cfb6] selection:text-[#111814] font-sans">
        {/* Hero */}
        <section id="top" className="relative isolate overflow-hidden bg-[#060807] text-white">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-18"
            style={{ backgroundImage: `url(${heroBg})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(163,177,138,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_22%),linear-gradient(180deg,#0a0f0d_0%,#050706_100%)]" />
          <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060807] via-[#060807]/82 to-[#060807]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060807] via-transparent to-transparent" />

          <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <Fade y={10}>
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#8f978a]">
                06 / Resources
              </p>
            </Fade>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
              <div className="max-w-3xl">
                <Fade delay={0.05}>
                  <h1 className="max-w-5xl font-sans text-[clamp(3.25rem,6vw,6.25rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-[#f4efe5]">
                    Primary sources.
                    <br />
                    <span className="text-[#a3b18a]">Field materials.</span>
                    <br />
                    Documentation that lasts.
                  </h1>
                </Fade>

                <Fade delay={0.12}>
                  <p className="mt-6 max-w-xl text-[1.05rem] leading-8 text-[#c1c8ba]">
                    This page collects the ordinance references, research sources, and working materials used by BLACKOUT so the project stays transparent and easy to verify.
                  </p>
                </Fade>

                <Fade delay={0.18}>
                  <p className="mt-4 max-w-xl text-base leading-7 text-[#9fa79a]">
                    The layout stays restrained: rounded corners, subtle motion, and clean rows instead of a table-heavy archive.
                  </p>
                </Fade>

                <Fade delay={0.24}>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href="#sources"
                      className="group inline-flex items-center gap-2 rounded-full bg-[#efe8d6] px-5 py-3 text-sm font-medium text-[#111814] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
                    >
                      Primary sources
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                        →
                      </span>
                    </Link>
                    <Link
                      href="#materials"
                      className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                    >
                      Field materials
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                        →
                      </span>
                    </Link>
                  </div>
                </Fade>
              </div>

              <motion.div
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.99 }}
                animate={loaded ? { opacity: 1, y: 0, scale: 1 } : undefined}
                transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <motion.div
                    aria-hidden="true"
                    initial={reduceMotion ? { scale: 1 } : { scale: 1.05, opacity: 0.85 }}
                    animate={loaded ? { scale: 1, opacity: 1 } : undefined}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroBg})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050706] via-transparent to-transparent" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />
                </div>
                <div className="border-t border-white/10 px-6 py-5">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f978a]">Documentation archive</p>
                  <p className="mt-2 text-sm leading-7 text-[#f3efe5]">
                    Sources, field files, and references are organized so the project can be checked and reused without reconstruction.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Primary sources */}
        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="01 / Primary sources" />
            <SectionTitle
              eyebrow="Verified references"
              title={
                <>
                  The project rests on public data, ordinance text, and regional research that can be checked directly.
                </>
              }
            />

            <div
              id="sources"
              className="mt-8 overflow-hidden rounded-[2rem] border border-[#e2dbc9] bg-white/75"
            >
              {primarySources.map((item) => (
                <div
                  key={item.name}
                  className="grid gap-4 border-b border-[#e2dbc9] px-5 py-5 last:border-b-0 lg:grid-cols-[1fr_180px_240px] lg:items-center"
                >
                  <div>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-[#173027] transition-colors hover:text-[#2d6a2d]"
                    >
                      {item.name}
                      <span className="text-[#6f8167]">↗</span>
                    </a>
                  </div>
                  <p className="text-[13px] text-[#5a625b]">{item.org}</p>
                  <p className="text-[13px] text-[#5a625b]">{item.use}</p>
                </div>
              ))}
            </div>
          </div>
        </LightBand>

        {/* Field materials */}
        <DarkBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="02 / Field materials" />
            <SectionTitle
              eyebrow="Working documents"
              title={
                <>
                  These are the files that keep the campaign organized while it is happening.
                </>
              }
              dark
            />

            <div id="materials" className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-md">
              {fieldMaterials.map((item) => (
                <MaterialRow key={item.title} {...item} />
              ))}
            </div>
          </div>
        </DarkBand>

        {/* Further reading */}
        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="03 / Further reading" />
            <SectionTitle
              eyebrow="Background reading"
              title={
                <>
                  A short reading list helps keep the project grounded in regional science and policy.
                </>
              }
            />

            <div className="mt-8 grid gap-0 border-t border-[#e2dbc9]">
              {furtherReading.map((item) => (
                <div
                  key={item.title}
                  className="grid gap-3 border-b border-[#e2dbc9] py-6 lg:grid-cols-[1fr_240px] lg:items-start"
                >
                  <div>
                    <h3 className="font-sans text-xl font-semibold tracking-[-0.03em] text-[#173027]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.85] text-[#5a625b]">{item.org}</p>
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#7c8576] lg:text-right">
                    {item.type}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </LightBand>

        {/* Closing */}
        <DarkBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="04 / Closing" />
            <SectionTitle
              eyebrow="Closing"
              title={
                <>
                  The resources page should feel like a well-kept archive, not a crowded cabinet.
                </>
              }
              dark
            />

            <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
              <div className="space-y-3 text-[14px] leading-[1.85] text-[#a6ad9f]">
                <p>Every source is traceable.</p>
                <p>Every working file has a purpose.</p>
                <p>Every document is ready to hand off.</p>
              </div>

              <div>
                <h3 className="font-sans text-2xl font-semibold tracking-[-0.03em] text-white">
                  BLACKOUT keeps the evidence visible.
                </h3>
                <p className="mt-4 text-[14px] leading-[1.9] text-[#a6ad9f]">
                  This version matches the rest of the site: image-led hero, rounded corners, simple rows, and fewer boxed sections.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="#sources"
                    className="inline-flex items-center gap-2 rounded-full bg-[#efe8d6] px-5 py-3 text-sm font-medium text-[#111814] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                  >
                    Primary sources
                    <span aria-hidden>→</span>
                  </Link>
                  <Link
                    href="#top"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                  >
                    Back to top
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </DarkBand>
      </main>
    </SiteLayout>
  )
}