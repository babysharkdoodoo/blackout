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
    src: '/heroes/impact-1.webp',
    label: 'Field notes',
  },
  {
    src: '/heroes/impact-2.webp',
    label: 'Awareness scoring',
  },
  {
    src: '/heroes/impact-3.webp',
    label: 'GIS mapping',
  },
  {
    src: '/heroes/impact-4.webp',
    label: 'Implementation record',
  },
]

const primarySources = [
  {
    name: 'Wave 1 awareness baseline',
    org: 'Survey',
    use: 'Measures what residents know before outreach',
    href: '/survey',
  },
  {
    name: 'Wave 2 follow-up survey',
    org: 'Survey',
    use: 'Shows whether awareness changed',
    href: '/survey',
  },
  {
    name: 'Retail shelf tag placements',
    org: 'Retail',
    use: 'Will track where customers see the rule',
    href: '/retail-partners',
  },
  {
    name: 'Partner reach estimates',
    org: 'Retail',
    use: 'Will estimate weekly exposure at displays',
    href: '/retail-partners',
  },
  {
    name: 'Storm drain installation log',
    org: 'Field',
    use: 'Will document approved drains, dates, and locations',
    href: '/storm-drains',
  },
  {
    name: 'Photo archive',
    org: 'Field',
    use: 'Will provide timestamped field records',
    href: '/resources',
  },
  {
    name: 'County handoff package',
    org: 'Handoff',
    use: 'Collects files needed to continue the model',
    href: '/resources',
  },
]

const fieldMaterials = [
  {
    title: 'Awareness change',
    desc: 'Planned difference between baseline and follow-up survey results.',
    status: 'Available',
    href: '/survey',
  },
  {
    title: 'Retail reach',
    desc: 'Target stores, planned product tags, and estimated display exposure.',
    status: 'In development',
    href: null,
  },
  {
    title: 'Drain markers',
    desc: 'Approved marker sites with planned GPS logs, photos, and site notes.',
    status: 'In development',
    href: null,
  },
  {
    title: 'Partner records',
    desc: 'Partner agreements, placement notes, and follow-up summaries.',
    status: 'In development',
    href: null,
  },
  {
    title: 'Handoff readiness',
    desc: 'Files organized for county review or future student use.',
    status: 'Post-season',
    href: null,
  },
  {
    title: 'Field archive',
    desc: 'Planned photos, session logs, meeting notes, approval records, and exported datasets.',
    status: 'Pending close',
    href: null,
  },
]

const furtherReading = [
  {
    title: 'Residents see the blackout dates before using fertilizer.',
    org: 'Community outcome',
    type: 'Behavior timing',
  },
  {
    title: 'Stores display the rule where fertilizer decisions happen.',
    org: 'Retail outcome',
    type: 'Point-of-purchase',
  },
  {
    title: 'Storm drains are planned as visible reminders in the campaign zone.',
    org: 'Field outcome',
    type: 'Runoff pathway',
  },
  {
    title: 'Survey results are planned to create a measurable awareness baseline.',
    org: 'Evidence outcome',
    type: 'Before/after data',
  },
  {
    title: 'Partners and files are organized for a practical handoff.',
    org: 'Continuity outcome',
    type: 'Documentation',
  },
  {
    title: 'The model can be repeated in another neighborhood.',
    org: 'Long-term outcome',
    type: 'Replication',
  },
]

const resourceSnapshot = [
  {
    label: 'Survey waves',
    value: '2',
    note: 'Baseline and follow-up comparison.',
  },
  {
    label: 'Partner stores',
    value: '4 - 6',
    note: 'Target retail placements per season.',
  },
  {
    label: 'Drain markers',
    value: '30 - 40',
    note: 'Target installations in one campaign zone.',
  },
  {
    label: 'Purpose',
    value: 'Reusable',
    note: 'Records are planned for handoff and repeat use.',
  },
]

const archiveLogic = [
  'Survey data shows whether awareness changed.',
  'Retail records will show where the rule was displayed.',
  'Drain logs will show where the runoff message becomes visible.',
  'The handoff package keeps the work usable after the field season.',
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
            fetchPriority="high"
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
          Impact & results
        </motion.p>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] as const }}
          className="max-w-5xl text-[clamp(2.8rem,8vw,5.85rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-[#f5efe3]"
        >
          Measure the work.
          <br />
          Keep the records.
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-6 max-w-2xl text-[clamp(1rem,2vw,1.25rem)] leading-[1.5] text-white/70"
        >
          BLACKOUT will track survey, retail, drain, and handoff records so
          impact is measured.
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
            href="#sources"
            className="inline-flex items-center justify-center rounded-full bg-[#f5efe3] px-6 py-3 text-sm font-semibold text-[#07100d] transition hover:bg-white"
          >
            Evidence streams
          </Link>

          <Link
            href="/resources"
            className="inline-flex items-center justify-center rounded-full border border-white/18 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/35 hover:text-white"
          >
            Resources
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
            Survey data
          </span>
          <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
            Retail reach
          </span>
          <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
            Drain records
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

export function ImpactPageClient() {
  return (
    <SiteLayout>
      <main id="main-content" tabIndex={-1} className="overflow-hidden bg-[#f7f2e8] font-sans text-[#173027] selection:bg-[#d8d0c2] selection:text-[#07100d]">
        <Hero />

        <LightSection id="overview">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <SectionHeader
              eyebrow="Impact snapshot"
              title="Verifiable work."
              body="BLACKOUT will record what is measured, where materials go, and what can be handed off. This page separates planned activity from evidence, so later results can be checked against real records instead of broad claims."
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
                The strongest result is a clear before-and-after record, paired
                with planned field evidence from stores, drains, and partner files.
              </p>
            </div>
          </Reveal>
        </LightSection>

        <DarkSection id="sources">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
            <SectionHeader
              dark
              eyebrow="Evidence streams"
              title="Every step leaves a record."
              body="The impact story is planned around survey data, retail documentation, drain logs, photos, approvals, and the handoff package. Each stream answers a different question: what changed, where the message appeared, and whether the work can be repeated."
            />

            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035]">
                <div className="hidden border-b border-white/10 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a8b98c] md:grid md:grid-cols-[1.2fr_0.45fr_0.85fr]">
                  <p>Record</p>
                  <p>Area</p>
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
                        <span className="text-[#a8b98c]">&rarr;</span>
                      </p>

                      <p className="text-sm text-white/54">{item.org}</p>

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
            eyebrow="Results tracked"
            title="Local results."
            body="Each result connects to a concrete output: a survey comparison, store placement, marked drain, partner record, or handoff file. The status labels show which records are ready, which are still being prepared, and which depend on field work."
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

        {/* Repeated across the field-work pages.
        <DarkSection id="reading">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
            <SectionHeader
              dark
              eyebrow="Expected outcomes"
              title="What should change."
              body="These outcomes describe the practical changes BLACKOUT is trying to create for residents, businesses, and the project record."
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
        */}

        <LightSection id="organization">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
            <SectionHeader
              eyebrow="Handoff value"
              title="Useful after the season."
              body="A result matters more when someone else can review it, repeat it, or build on it. The impact record is organized for that purpose, with enough context for a future team or county partner to understand what happened and what still needs work."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
                  Archive logic
                </p>

                <div className="mt-5 divide-y divide-[#ded6c8]">
                  {archiveLogic.map((point, index) => (
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
                href="/resources"
                className="inline-flex items-center justify-center rounded-full bg-[#173027] px-6 py-3 text-sm font-semibold text-[#f7f2e8] transition hover:bg-[#223a2e]"
              >
                Open resources
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

export default ImpactPageClient
