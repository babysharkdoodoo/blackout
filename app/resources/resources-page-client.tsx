'use client'

import Link from 'next/link'
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { SiteLayout } from '@/components/site-layout'

const heroImages = [
  {
    src: '/heroes/resources-1.webp',
    label: 'Document contents',
  },
  {
    src: '/heroes/resources-2.webp',
    label: 'Research files',
  },
  {
    src: '/heroes/resources-3.webp',
    label: 'Reference page',
  },
  {
    src: '/heroes/resources-4.webp',
    label: 'Appendix record',
  },
]

const primarySources = [
  {
    name: 'Marine Mammal Mortality Reports (2019 - 2023)',
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
    use: 'Ordinance text \u00a7 62-3601',
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
    desc: 'The door-to-door questionnaire planned to establish the pre-intervention baseline.',
    status: 'Available',
    href: '/survey',
  },
  {
    title: 'Manatee Safe Shelf Tag Design',
    desc: 'Retail tag layout being prepared for fertilizer aisles and point-of-purchase placement.',
    status: 'In development',
    href: null,
  },
  {
    title: 'Storm Drain Marker Spec Sheet',
    desc: 'Hardware specifications, marker placement steps, and distance-calculation notes for each approved drain.',
    status: 'In development',
    href: null,
  },
  {
    title: 'Retail Partner Agreement Template',
    desc: 'Standard placement, season timing, and weekly reach logging terms planned for store partners.',
    status: 'In development',
    href: null,
  },
  {
    title: 'County Handoff Package Template',
    desc: 'Documentation structure for transferring the planned program to Brevard County after the season.',
    status: 'Post-season',
    href: null,
  },
  {
    title: 'Wave 2 Survey Instrument',
    desc: 'Matched follow-up instrument planned to measure post-intervention awareness changes.',
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
    title: 'Unusual Mortality Event  -  Florida Manatee (2021)',
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
    title: 'Seagrass Loss and Turbidity in the IRL: 2011 - 2023',
    org: 'SJRWMD Research Division',
    type: 'Longitudinal study',
  },
  {
    title: 'Florida Model Ordinance for Fertilizer Management',
    org: 'FDEP',
    type: 'Policy model',
  },
]

const resourceSnapshot = [
  {
    label: 'Source base',
    value: '7',
    note: 'Primary data and policy references.',
  },
  {
    label: 'Field files',
    value: '6',
    note: 'Planned materials for survey, retail, drains, and handoff.',
  },
  {
    label: 'Reading set',
    value: '6',
    note: 'Background reports and applied guidance.',
  },
  {
    label: 'Purpose',
    value: 'Traceable',
    note: 'Every claim should connect to a source or project record.',
  },
]

const organizationPoints = [
  'Primary sources support the public claims made across the project.',
  'Field materials are being organized to keep the campaign consistent from one activity to the next.',
  'Background reading keeps the work grounded in lagoon science and compliance practice.',
  'The planned final archive will make the project easier to check, repeat, and hand off.',
]

function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 18, filter: 'blur(10px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
      transition={{
        duration: 0.72,
        delay,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
    >
      {children}
    </motion.div>
  )
}

function LightSection({
  id,
  children,
}: {
  id?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className="bg-[#f7f2e8] px-6 py-16 text-[#173027] sm:px-10 sm:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

function DarkSection({
  id,
  children,
}: {
  id?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className="bg-[#07100d] px-6 py-16 text-white sm:px-10 sm:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

function SectionHeader({
  eyebrow,
  title,
  body,
  dark = false,
}: {
  eyebrow: string
  title: ReactNode
  body?: ReactNode
  dark?: boolean
}) {
  return (
    <div>
      <Reveal>
        <p
          className={`text-xs font-semibold uppercase tracking-[0.22em] ${dark ? 'text-[#a8b98c]' : 'text-[#6f8167]'
            }`}
        >
          {eyebrow}
        </p>
      </Reveal>

      <Reveal delay={0.06}>
        <h2
          className={`mt-4 max-w-4xl text-[clamp(2.35rem,5vw,4.45rem)] font-semibold leading-[0.98] tracking-[-0.06em] ${dark ? 'text-[#f5efe3]' : 'text-[#173027]'
            }`}
        >
          {title}
        </h2>
      </Reveal>

      {body ? (
        <Reveal delay={0.12}>
          <p
            className={`mt-6 max-w-2xl text-base leading-8 sm:text-[1.05rem] ${dark ? 'text-white/62' : 'text-[#5e665d]'
              }`}
          >
            {body}
          </p>
        </Reveal>
      ) : null}
    </div>
  )
}

function Hero() {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduceMotion) return

    const timer = window.setInterval(() => {
      if (document.hidden) return

      setIndex((current) => (current + 1) % heroImages.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [reduceMotion])

  const activeImage = heroImages[index]

  return (
    <section
      id="top"
      className="relative isolate h-[100svh] overflow-hidden bg-[#07100d] text-white"
    >
      <div aria-hidden="true" className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage.src}
            src={activeImage.src}
            alt=""
            draggable={false}
            referrerPolicy="no-referrer"
            loading="eager"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            initial={reduceMotion ? { opacity: 0.34, scale: 1, filter: 'none' } : { opacity: 0, scale: 1.03, filter: 'blur(14px)' }}
            animate={{
              opacity: 0.34,
              scale: reduceMotion ? 1 : 1.07,
              filter: reduceMotion ? 'none' : 'blur(0px)',
            }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{
              opacity: { duration: 1.1 },
              filter: { duration: 1.1 },
              scale: { duration: 6.2, ease: [0.16, 1, 0.3, 1] as const },
            }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-r from-[#07100d] via-[#07100d]/82 to-[#07100d]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07100d] via-transparent to-[#07100d]/20" />
      </div>

      <motion.div
        initial={reduceMotion ? false : 'hidden'}
        animate="show"
        transition={{ staggerChildren: 0.08, delayChildren: 0.14 }}
        className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-6 sm:px-10 lg:px-12"
      >
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#b9c89c]"
        >
          Resources
        </motion.p>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] as const }}
          className="max-w-5xl text-[clamp(2.8rem,8vw,5.85rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-[#f5efe3]"
        >
          Sources and files.
          <br />
          All in one place.
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-6 max-w-2xl text-[clamp(1rem,2vw,1.25rem)] leading-[1.5] text-white/70"
        >
          Ordinance sources, research, field materials, and handoff templates
          stay in one traceable system.
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href="/impact"
            className="inline-flex items-center justify-center rounded-full bg-[#f5efe3] px-6 py-3 text-sm font-semibold text-[#07100d] transition hover:bg-white"
          >
            Impact records
          </Link>

          <Link
            href="/survey"
            className="inline-flex items-center justify-center rounded-full border border-white/18 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/35 hover:text-white"
          >
            Survey page
          </Link>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-8 flex max-w-2xl flex-wrap gap-2 text-xs text-white/58"
        >
          <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
            Public data
          </span>
          <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
            Field files
          </span>
          <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
            Handoff-ready archive
          </span>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-6 left-6 right-6 z-10 mx-auto flex max-w-6xl items-center justify-between text-xs text-white/42 sm:left-10 sm:right-10 lg:left-12 lg:right-12">
        <AnimatePresence mode="wait">
          <motion.span
            key={activeImage.label}
            initial={{ opacity: 0, y: 4, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -4, filter: 'blur(6px)' }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] as const }}
          >
            {activeImage.label}
          </motion.span>
        </AnimatePresence>

        <div className="flex gap-2">
          {heroImages.map((image, imageIndex) => (
            <button
              key={image.src}
              type="button"
              aria-label={`Show ${image.label}`}
              aria-pressed={imageIndex === index}
              onClick={() => setIndex(imageIndex)}
              className={`h-1.5 rounded-full transition-all duration-300 ${imageIndex === index
                  ? 'w-8 bg-[#f5efe3]'
                  : 'w-3 bg-white/25 hover:bg-white/45'
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export function ResourcesPageClient() {
  return (
    <SiteLayout>
      <main id="main-content" tabIndex={-1} className="overflow-hidden bg-[#f7f2e8] font-sans text-[#173027] selection:bg-[#d8d0c2] selection:text-[#07100d]">
        <Hero />

        <LightSection id="overview">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <SectionHeader
              eyebrow="Resource archive"
              title="Trace every claim."
              body="This page collects the ordinance references, source data, working files, and background reading behind BLACKOUT."
            />

            <Reveal delay={0.1}>
              <div className="grid gap-px overflow-hidden rounded-3xl border border-[#ded6c8] bg-[#ded6c8] sm:grid-cols-2">
                {resourceSnapshot.map((item) => (
                  <div key={item.label} className="bg-[#fbf8f1] p-5 sm:p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
                      {item.label}
                    </p>

                    <p className="mt-3 text-[1.45rem] font-semibold leading-tight tracking-[-0.04em] text-[#173027]">
                      {item.value}
                    </p>

                    <p className="mt-3 text-sm leading-6 text-[#657064]">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <div className="mt-12 border-t border-[#ded6c8] pt-8">
              <p className="max-w-3xl text-[clamp(1.3rem,3vw,1.95rem)] font-semibold leading-tight tracking-[-0.04em]">
                Sources explain the problem. Field materials keep the work
                consistent. Planned documentation makes the handoff possible.
              </p>
            </div>
          </Reveal>
        </LightSection>

        <DarkSection id="sources">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
            <SectionHeader
              dark
              eyebrow="Primary sources"
              title="Checkable sources."
              body="These sources support the core claims about manatees, seagrass, ordinance language, fertilizer guidance, and lagoon value."
            />

            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035]">
                <div className="hidden border-b border-white/10 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a8b98c] md:grid md:grid-cols-[1.2fr_0.45fr_0.85fr]">
                  <p>Source</p>
                  <p>Agency</p>
                  <p>Used for</p>
                </div>

                {primarySources.map((item, index) => (
                  <Reveal key={item.name} delay={index * 0.035}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid gap-3 border-b border-white/10 px-5 py-5 transition last:border-b-0 hover:bg-white/[0.035] md:grid-cols-[1.2fr_0.45fr_0.85fr] md:items-center md:px-6"
                    >
                      <p className="text-sm font-semibold leading-6 text-[#f5efe3]">
                        {item.name}{' '}
                        <span className="text-[#a8b98c]">&nearr;</span>
                      </p>

                      <p className="text-sm text-white/54">
                        {item.org}
                      </p>

                      <p className="text-sm leading-6 text-white/54">
                        {item.use}
                      </p>
                    </a>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </DarkSection>

        <LightSection id="materials">
            <SectionHeader
              eyebrow="Field materials"
              title="Working documents."
              body="These materials are being prepared to keep surveys, shelf tags, marker specs, partner agreements, and handoff files organized."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fieldMaterials.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <div className="flex h-full flex-col rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] p-6">
                  <div className="flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
                      {item.status}
                    </p>

                    <h3 className="mt-4 text-[1.15rem] font-semibold tracking-[-0.035em] text-[#173027]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-[#5e665d]">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="inline-flex items-center rounded-full bg-[#173027] px-4 py-2 text-xs font-semibold text-[#f7f2e8] transition hover:bg-[#223a2e]"
                      >
                        Access &rarr;
                      </Link>
                    ) : (
                      <span className="inline-flex items-center rounded-full border border-[#d8d0c2] bg-white/60 px-4 py-2 text-xs font-semibold text-[#7c8576]">
                        {item.status}
                      </span>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </LightSection>

        <DarkSection id="reading">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
            <SectionHeader
              dark
              eyebrow="Further reading"
              title="Grounded in science."
              body="These readings explain the broader context: lagoon ecology, manatee mortality, fertilizer practice, compliance, seagrass decline, and model policy."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-7">
                <div className="divide-y divide-white/10">
                  {furtherReading.map((item, index) => (
                    <div
                      key={item.title}
                      className="grid gap-3 py-5 first:pt-0 last:pb-0 sm:grid-cols-[3rem_1fr]"
                    >
                      <p className="font-mono text-xs text-[#a8b98c]">
                        {String(index + 1).padStart(2, '0')}
                      </p>

                      <div>
                        <h3 className="text-[1.15rem] font-semibold tracking-[-0.035em] text-[#f5efe3]">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-sm leading-7 text-white/56">
                          {item.org}
                        </p>

                        <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a8b98c]">
                          {item.type}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </DarkSection>

        <LightSection id="organization">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
            <SectionHeader
              eyebrow="Organization"
              title="Easy to check."
              body="The resource system is the structure that lets the project defend its claims, run planned field work, and transfer the program after the season."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
                  Archive logic
                </p>

                <div className="mt-5 divide-y divide-[#ded6c8]">
                  {organizationPoints.map((point, index) => (
                    <div
                      key={point}
                      className="grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[3rem_1fr]"
                    >
                      <p className="font-mono text-xs text-[#6f8167]">
                        {String(index + 1).padStart(2, '0')}
                      </p>

                      <p className="text-sm leading-7 text-[#5e665d]">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <div className="mt-12 flex flex-col gap-3 border-t border-[#ded6c8] pt-8 sm:flex-row">
              <Link
                href="/impact"
                className="inline-flex items-center justify-center rounded-full bg-[#173027] px-6 py-3 text-sm font-semibold text-[#f7f2e8] transition hover:bg-[#223a2e]"
              >
                View impact
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-[#d8d0c2] px-6 py-3 text-sm font-semibold text-[#53634f] transition hover:border-[#173027]/30 hover:text-[#173027]"
              >
                Contact the team
              </Link>
            </div>
          </Reveal>
        </LightSection>
      </main>
    </SiteLayout>
  )
}

export default ResourcesPageClient
