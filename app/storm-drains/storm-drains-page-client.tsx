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
    src: '/heroes/storm-drains-1.webp',
    label: 'Street drain marker',
  },
  {
    src: '/heroes/storm-drains-2.webp',
    label: 'Curbside drain',
  },
  {
    src: '/heroes/storm-drains-3.webp',
    label: 'Stormwater street',
  },
  {
    src: '/heroes/storm-drains-4.webp',
    label: 'Drainage inlet',
  },
]

const markerSpecs = [
  {
    label: 'Marker type',
    value: 'Cast aluminum',
    note: 'Permanent adhesion to drain surface.',
  },
  {
    label: 'Information displayed',
    value: 'Blackout dates + distance',
    note: 'June 1 - September 30 window and nearest mortality distance.',
  },
  {
    label: 'Mortality data source',
    value: 'FWC mortality database',
    note: 'Georeferenced manatee death events.',
  },
  {
    label: 'Distance calculation',
    value: 'Straight-line km',
    note: 'Planned for each approved drain.',
  },
  {
    label: 'Documentation',
    value: 'GPS + photo',
    note: 'Planned at each marker location.',
  },
  {
    label: 'Target installations',
    value: '30 - 40 drains',
    note: 'Within the campaign zone.',
  },
]

const geodatabaseFields = [
  {
    field: 'drain_id',
    type: 'STRING',
    desc: 'Unique identifier per planned marker',
  },
  {
    field: 'lat',
    type: 'FLOAT',
    desc: 'GPS latitude at marker location',
  },
  {
    field: 'lon',
    type: 'FLOAT',
    desc: 'GPS longitude at marker location',
  },
  {
    field: 'install_date',
    type: 'DATE',
    desc: 'Date of planned marker placement',
  },
  {
    field: 'mortality_site_id',
    type: 'STRING',
    desc: 'Nearest FWC mortality event reference',
  },
  {
    field: 'mortality_dist_km',
    type: 'FLOAT',
    desc: 'Straight-line distance to nearest death event',
  },
  {
    field: 'photo_ref',
    type: 'STRING',
    desc: 'Filename of marker photo',
  },
  {
    field: 'condition_notes',
    type: 'TEXT',
    desc: 'Field observations at install time',
  },
]

const installationSteps = [
  {
    n: '01',
    head: 'Site selection',
    body: 'Drains are being selected within the campaign zone based on residential fertilizer use and lagoon connectivity.',
  },
  {
    n: '02',
    head: 'Distance calculation',
    body: 'FWC mortality data will be used to calculate the nearest documented event for each approved drain.',
  },
  {
    n: '03',
    head: 'Marker placement',
    body: 'Each marker will be placed only after the approved site is confirmed. GPS coordinates and photos will be logged for the archive.',
  },
  {
    n: '04',
    head: 'Database entry',
    body: 'All fields will be entered into the geodatabase after field work. The data will be reviewed before county handoff.',
  },
]

const markerLogic = [
  {
    title: 'Specific location',
    body: 'Each marker belongs to a real drain in the campaign zone, not a generic outreach location.',
  },
  {
    title: 'Specific distance',
    body: 'The nearest documented manatee mortality distance makes the message local and measurable.',
  },
  {
    title: 'Specific record',
    body: 'GPS coordinates, photos, date, and condition notes make every installation auditable.',
  },
]

const closingPoints = [
  'The marker is designed to stay visible.',
  'The distance is specific.',
  'The archive becomes county-ready evidence.',
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
          Storm drain marking
        </motion.p>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] as const }}
          className="max-w-5xl text-[clamp(2.8rem,8vw,5.85rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-[#f5efe3]"
        >
          Mark drains.
          <br />
          Explain runoff.
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-6 max-w-2xl text-[clamp(1rem,2vw,1.25rem)] leading-[1.5] text-white/70"
        >
          City approval is in place. Planned markers will show blackout dates
          and connect drains to the lagoon.
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
            href="#marker"
            className="inline-flex items-center justify-center rounded-full bg-[#f5efe3] px-6 py-3 text-sm font-semibold text-[#07100d] transition hover:bg-white"
          >
            Marker plan
          </Link>

          <Link
            href="/impact"
            className="inline-flex items-center justify-center rounded-full border border-white/18 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/35 hover:text-white"
          >
            Impact plan
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
            30 - 40 drains
          </span>
          <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
            GPS + photo log
          </span>
          <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
            FWC mortality distance
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

export function StormDrainsPageClient() {
  return (
    <SiteLayout>
      <main id="main-content" tabIndex={-1} className="overflow-hidden bg-[#f7f2e8] font-sans text-[#173027] selection:bg-[#d8d0c2] selection:text-[#07100d]">
        <Hero />

        <LightSection id="marker">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <SectionHeader
              eyebrow="Marker logic"
              title="Make runoff local."
              body="BLACKOUT markers connect each approved drain to the blackout window and the nearby lagoon impact story."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl bg-[#173027] p-6 text-[#f7f2e8] sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a8b98c]">
                  Marker preview
                </p>

                <div className="mt-5 rounded-3xl bg-[#07100d] p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                    Brevard County ordinance
                  </p>

                  <p className="mt-2 text-[2.2rem] font-semibold leading-none tracking-[-0.06em] text-[#f5efe3]">
                    No fertilizer
                  </p>

                  <p className="mt-2 text-[1.05rem] font-semibold text-[#a8b98c]">
                    June 1 - September 30
                  </p>

                  <div className="my-5 h-px bg-white/10" />

                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                    Nearest documented manatee mortality site
                  </p>

                  <p className="mt-2 font-mono text-[2rem] font-semibold text-[#f5efe3]">
                    1.3 km
                  </p>

                  <p className="mt-3 text-sm leading-7 text-white/48">
                    This drain flows toward the Indian River Lagoon.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {markerLogic.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="h-full rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] p-6">
                  <h3 className="text-[1.15rem] font-semibold tracking-[-0.035em]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#5e665d]">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </LightSection>

        <DarkSection id="specs">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
            <SectionHeader
              dark
              eyebrow="Marker specifications"
              title="Same message."
              body="A consistent design keeps each marker easy to understand, photograph, log, and hand off."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-7">
                <div className="divide-y divide-white/10">
                  {markerSpecs.map((item, index) => (
                    <div
                      key={item.label}
                      className="grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[3rem_11rem_1fr]"
                    >
                      <p className="font-mono text-xs text-[#a8b98c]">
                        {String(index + 1).padStart(2, '0')}
                      </p>

                      <p className="text-sm font-semibold text-[#f5efe3]">
                        {item.label}
                      </p>

                      <div>
                        <p className="text-sm font-semibold text-[#f5efe3]">
                          {item.value}
                        </p>

                        <p className="mt-1 text-sm leading-6 text-white/56">
                          {item.note}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </DarkSection>

        <LightSection id="workflow">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
            <SectionHeader
              eyebrow="Installation process"
              title="Consistent workflow."
              body="Each planned marker needs a selected site, calculated distance, photo record, and database entry."
            />

            <div className="divide-y divide-[#ded6c8] border-y border-[#ded6c8]">
              {installationSteps.map((step, index) => (
                <Reveal key={step.n} delay={index * 0.05}>
                  <div className="grid gap-4 py-6 sm:grid-cols-[3rem_11rem_1fr] sm:gap-6">
                    <p className="font-mono text-xs text-[#6f8167]">
                      {step.n}
                    </p>

                    <h3 className="text-sm font-semibold text-[#173027]">
                      {step.head}
                    </h3>

                    <p className="max-w-3xl text-sm leading-7 text-[#5e665d]">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </LightSection>

        <DarkSection id="database">
          <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:gap-16">
            <SectionHeader
              dark
              eyebrow="Geodatabase"
              title="Each drain becomes a record."
              body="The database stores GPS data, proximity values, photo references, installation dates, and condition notes."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a8b98c]">
                  Schema
                </p>

                <div className="mt-5 divide-y divide-white/10">
                  {geodatabaseFields.map((row) => (
                    <div
                      key={row.field}
                      className="grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[11rem_7rem_1fr]"
                    >
                      <p className="font-mono text-xs font-semibold text-[#f5efe3]">
                        {row.field}
                      </p>

                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#a8b98c]">
                        {row.type}
                      </p>

                      <p className="text-sm leading-6 text-white/56">
                        {row.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <div className="mt-12 rounded-3xl bg-[#f5efe3] p-6 text-[#07100d] sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#607357]">
                Handoff value
              </p>

              <p className="mt-3 max-w-3xl text-[1.45rem] font-semibold leading-tight tracking-[-0.04em]">
                The county can use the layer as a public record, a planning
                layer, or a foundation for future stormwater messaging after
                the approved markers are in place.
              </p>
            </div>
          </Reveal>
        </DarkSection>

        <LightSection id="closing">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
            <SectionHeader
              eyebrow="Closing"
              title="Make drains readable."
              body="Each marker is a reminder, a field data point, and a small piece of public infrastructure."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
                  Summary
                </p>

                <div className="mt-5 divide-y divide-[#ded6c8]">
                  {closingPoints.map((point, index) => (
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
                See the impact record
              </Link>

              <Link
                href="/resources"
                className="inline-flex items-center justify-center rounded-full border border-[#d8d0c2] px-6 py-3 text-sm font-semibold text-[#53634f] transition hover:border-[#173027]/30 hover:text-[#173027]"
              >
                View source files
              </Link>
            </div>
          </Reveal>
        </LightSection>
      </main>
    </SiteLayout>
  )
}
