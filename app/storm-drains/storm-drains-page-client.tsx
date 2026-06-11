'use client'

import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { SiteLayout } from '@/components/site-layout'

const heroBg =
  'https://commons.wikimedia.org/wiki/Special:FilePath/Storm%20Drain%20Dryden.JPG'

const markerSpecs = [
  {
    label: 'Marker type',
    value: 'Cast aluminum',
    note: 'Permanent adhesion to drain surface.',
  },
  {
    label: 'Information displayed',
    value: 'Blackout dates + distance',
    note: 'Jun 1–Sep 30 window and nearest mortality km.',
  },
  {
    label: 'Mortality data source',
    value: 'FWC mortality database',
    note: 'Georeferenced manatee death events.',
  },
  {
    label: 'Distance calculation',
    value: 'Straight-line km',
    note: 'Calculated per drain at installation.',
  },
  {
    label: 'Documentation',
    value: 'GPS + photo',
    note: 'Logged at each installation point.',
  },
  {
    label: 'Target installations',
    value: '30–40 drains',
    note: 'Within the campaign zone.',
  },
]

const geodatabaseFields = [
  { field: 'drain_id', type: 'STRING', desc: 'Unique identifier per installation' },
  { field: 'lat', type: 'FLOAT', desc: 'GPS latitude at marker location' },
  { field: 'lon', type: 'FLOAT', desc: 'GPS longitude at marker location' },
  { field: 'install_date', type: 'DATE', desc: 'Date of marker installation' },
  { field: 'mortality_site_id', type: 'STRING', desc: 'Nearest FWC mortality event reference' },
  { field: 'mortality_dist_km', type: 'FLOAT', desc: 'Straight-line distance to nearest death event' },
  { field: 'photo_ref', type: 'STRING', desc: 'Filename of installation photo' },
  { field: 'condition_notes', type: 'TEXT', desc: 'Field observations at install time' },
]

const installationSteps = [
  {
    n: '01',
    head: 'Site selection',
    body: 'Drains are selected within the campaign zone based on proximity to residential fertilizer use and lagoon connectivity.',
  },
  {
    n: '02',
    head: 'Distance calc',
    body: 'FWC mortality data is pulled and the nearest documented event is calculated for each drain by GPS coordinates.',
  },
  {
    n: '03',
    head: 'Installation',
    body: 'The marker is installed and GPS coordinates are logged at the exact location. A photo is taken for the archive.',
  },
  {
    n: '04',
    head: 'Database entry',
    body: 'All fields are entered into the geodatabase within 24 hours. The data is reviewed before county handoff.',
  },
]

const closingPoints = [
  'The marker is permanent.',
  'The distance is specific.',
  'The archive becomes county-ready evidence.',
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

function SchemaRow({
  field,
  type,
  desc,
}: {
  field: string
  type: string
  desc: string
}) {
  return (
    <div className="grid gap-3 border-b border-white/10 px-0 py-5 last:border-b-0 lg:grid-cols-[180px_120px_1fr]">
      <p className="font-mono text-[12px] font-semibold text-white/85">{field}</p>
      <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#a3b18a]">
        {type}
      </p>
      <p className="text-[12px] leading-[1.75] text-[#b8afa1]">{desc}</p>
    </div>
  )
}

export function StormDrainsPageClient() {
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
                04C / Storm Drain Marking
              </p>
            </Fade>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
              <div className="max-w-3xl">
                <Fade delay={0.05}>
                  <h1 className="max-w-5xl font-sans text-[clamp(3.25rem,6vw,6.25rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-[#f4efe5]">
                    Every drain gets a distance.
                    <br />
                    <span className="text-[#a3b18a]">Every distance tells a story.</span>
                  </h1>
                </Fade>

                <Fade delay={0.12}>
                  <p className="mt-6 max-w-xl text-[1.05rem] leading-8 text-[#c1c8ba]">
                    Each marker shows the blackout dates and the straight-line distance from that drain to the nearest documented FWC manatee mortality site.
                  </p>
                </Fade>

                <Fade delay={0.18}>
                  <p className="mt-4 max-w-xl text-base leading-7 text-[#9fa79a]">
                    The page uses the same rhythm as the other sections: a calm hero, simple bands, and clean rows instead of a crowded dashboard.
                  </p>
                </Fade>

                <Fade delay={0.24}>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href="#marker"
                      className="group inline-flex items-center gap-2 rounded-full bg-[#efe8d6] px-5 py-3 text-sm font-medium text-[#111814] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
                    >
                      Marker details
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                        →
                      </span>
                    </Link>
                    <Link
                      href="#database"
                      className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                    >
                      Geodatabase
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
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f978a]">Street-side drain</p>
                  <p className="mt-2 text-sm leading-7 text-[#f3efe5]">
                    A visible drain marker makes the connection between neighborhood runoff and lagoon harm feel immediate.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Marker logic */}
        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="01 / Marker logic" />
            <SectionTitle
              eyebrow="What the marker says"
              title={
                <>
                  The marker turns an abstract drainage system into a <Accent>specific, local comparison</Accent>.
                </>
              }
            />

            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
              <div className="space-y-6 text-[15px] leading-[1.9] text-[#5a625b]">
                <Fade>
                  <p>
                    Most storm drain markers say “Drains to ocean” or show a generic fish symbol. They are easy to ignore because they never tell a resident what the drain connects to in real terms.
                  </p>
                </Fade>
                <Fade delay={0.06}>
                  <p>
                    BLACKOUT markers make the connection literal. Each one displays the blackout dates and the straight-line distance from that drain to the nearest FWC-documented manatee mortality site.
                  </p>
                </Fade>
                <Fade delay={0.12}>
                  <p>
                    The distance is the point. It gives the marker a measurable relationship to the lagoon instead of a vague warning.
                  </p>
                </Fade>
              </div>

              <Fade delay={0.1}>
                <div className="rounded-[2rem] border border-[#e2dbc9] bg-white/75 p-6 shadow-sm">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#6f8167]">Marker preview</p>
                  <div className="mt-5 rounded-[1.4rem] bg-[#171411] p-6 text-white">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                      Brevard County ordinance
                    </p>
                    <p className="mt-2 font-sans text-3xl font-semibold tracking-[-0.04em]">
                      NO FERTILIZER
                    </p>
                    <p className="mt-1 text-[1.05rem] font-medium text-[#a3b18a]">JUN 1 – SEP 30</p>
                    <div className="my-5 h-px bg-white/10" />
                    <p className="text-[11px] uppercase tracking-[0.16em] text-white/40">
                      Nearest manatee mortality site
                    </p>
                    <p className="mt-2 font-mono text-2xl font-semibold text-white">1.3 km</p>
                    <p className="mt-2 text-[11px] leading-[1.7] text-white/35">
                      This drain flows to the Indian River Lagoon.
                    </p>
                  </div>
                </div>
              </Fade>
            </div>

            <div className="mt-10 border-t border-[#e2dbc9]">
              {markerSpecs.map((item, index) => (
                <Fade key={item.label} delay={index * 0.04}>
                  <Row
                    left={item.label}
                    right={
                      <>
                        <span className="block text-[16px] font-medium text-[#173027]">{item.value}</span>
                        <span className="mt-1 block text-[13px] text-[#5a625b]">{item.note}</span>
                      </>
                    }
                  />
                </Fade>
              ))}
            </div>
          </div>
        </LightBand>

        {/* Geodatabase */}
        <DarkBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="02 / Geodatabase" />
            <SectionTitle
              eyebrow="Every drain becomes a record"
              title={
                <>
                  Every marker is logged as a data point, and the final map belongs to <Accent>the county</Accent>.
                </>
              }
              dark
            />

            <div id="database" className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div className="space-y-6 text-[15px] leading-[1.9] text-[#b8afa1]">
                <Fade>
                  <p>
                    At the end of the field cycle, BLACKOUT packages a validated geodatabase layer for Brevard County. The archive includes GPS variables, mortality proximity values, photo references, and condition notes from installation.
                  </p>
                </Fade>
                <Fade delay={0.06}>
                  <p>
                    The county can use the layer as a public record, a planning layer, or a foundation for future stormwater messaging.
                  </p>
                </Fade>
              </div>

              <Fade delay={0.1}>
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f978a]">
                    Geodatabase schema
                  </p>
                  <div className="mt-5 border-t border-white/10">
                    {geodatabaseFields.map((row) => (
                      <SchemaRow key={row.field} {...row} />
                    ))}
                  </div>
                </div>
              </Fade>
            </div>
          </div>
        </DarkBand>

        {/* Installation process */}
        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="03 / Installation process" />
            <SectionTitle
              eyebrow="Field workflow"
              title={<>A small sequence keeps every install consistent and easy to audit.</>}
            />

            <div className="grid gap-0 border-t border-[#e2dbc9]">
              {installationSteps.map((step) => (
                <div
                  key={step.n}
                  className="grid gap-4 border-b border-[#e2dbc9] py-6 lg:grid-cols-[160px_1fr]"
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#7c8576]">
                      Step {step.n}
                    </p>
                    <h3 className="mt-2 font-sans text-2xl font-semibold tracking-[-0.03em] text-[#173027]">
                      {step.head}
                    </h3>
                  </div>
                  <p className="text-[15px] leading-[1.9] text-[#5a625b]">{step.body}</p>
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
                  The drain marker page should feel <Accent>specific, calm, and permanent</Accent>.
                </>
              }
              dark
            />

            <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
              <div className="space-y-3 text-[14px] leading-[1.85] text-[#a6ad9f]">
                {closingPoints.map((point) => (
                  <p key={point}>{point}</p>
                ))}
              </div>

              <Fade delay={0.08}>
                <div>
                  <h3 className="font-sans text-2xl font-semibold tracking-[-0.03em] text-white">
                    BLACKOUT makes every drain readable.
                  </h3>
                  <p className="mt-4 text-[14px] leading-[1.9] text-[#a6ad9f]">
                    This version matches the rest of the site: dark hero, light and dark bands, rounded corners, subtle motion, and fewer heavy blocks.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="#marker"
                      className="inline-flex items-center gap-2 rounded-full bg-[#efe8d6] px-5 py-3 text-sm font-medium text-[#111814] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                    >
                      Back to marker logic
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
              </Fade>
            </div>
          </div>
        </DarkBand>
      </main>
    </SiteLayout>
  )
}