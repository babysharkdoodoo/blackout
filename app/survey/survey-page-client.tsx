'use client'

import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { SiteLayout } from '@/components/site-layout'
import { SurveyForm } from '@/components/survey-form'

const heroBg =
  'https://commons.wikimedia.org/wiki/Special:Redirect/file/Indian%20River%20Lagoon%20National%20Scenic%20Byway%20-%20Underwater%20Manatee%20-%20NARA%20-%207719534.jpg'

const stats = [
  { k: 'Wave 1', v: 'Pre-intervention baseline' },
  { k: 'Wave 2', v: 'Post-intervention follow-up' },
  { k: 'Sample', v: '100–150 households' },
  { k: 'Method', v: 'Door-to-door' },
]

const auditMetrics = [
  {
    label: 'Target households per wave',
    value: '100–150',
    note: 'Within the designated campaign zone.',
  },
  {
    label: 'Wave 1 timing',
    value: 'Pre-intervention',
    note: 'Before outreach, tagging, or drain marking.',
  },
  {
    label: 'Wave 2 timing',
    value: 'Post-intervention',
    note: 'Following conclusion of all field operations.',
  },
  {
    label: 'Primary outcome',
    value: 'Awareness rate delta',
    note: 'Percentage point difference between waves.',
  },
  {
    label: 'Secondary outcomes',
    value: 'Behavioral intent',
    note: 'Planned application choices before and after.',
  },
  {
    label: 'Survey method',
    value: 'Door-to-door',
    note: 'Direct, in-person sample verification.',
  },
]

const pipelines = [
  {
    title: 'Competition submissions',
    body:
      'CmPS, HOSA, Earth Prize, EPA PEYA, and GENIUS Olympiad all need documented quantitative outcomes. The wave gap provides that verified evidence.',
  },
  {
    title: 'County handoff package',
    body:
      'Brevard County environmental management receives the raw survey dataset, methodology settings, and a validated baseline for future municipal use.',
  },
  {
    title: 'Replication guide',
    body:
      'The survey instrument and field protocol are documented so external teams can repeat the work without rebuilding the process from scratch.',
  },
]

const wavePoints = [
  'Wave 1 is the baseline. It closes before any BLACKOUT collateral is placed in the field.',
  'Wave 2 repeats the same sampling logic after outreach, tagging, and drain marking are complete.',
  'The difference between the two waves is the evidence: awareness, understanding, and intent should move.',
]

const dataFlow = [
  'Door-to-door collection becomes a clean baseline dataset.',
  'Baseline data is compared against the post-intervention wave.',
  'The resulting delta is reused for county handoff and competition submissions.',
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
        className={`mt-3 max-w-4xl font-sans text-[clamp(2rem,4vw,3.55rem)] font-semibold leading-[1.02] tracking-[-0.045em] ${
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

function LineItem({
  label,
  value,
  note,
  dark = false,
}: {
  label: string
  value: string
  note: string
  dark?: boolean
}) {
  return (
    <div
      className={`grid gap-3 border-b py-6 last:border-b-0 lg:grid-cols-[260px_1fr] ${
        dark ? 'border-white/10' : 'border-[#e2dbc9]'
      }`}
    >
      <div>
        <p
          className={`text-[11px] uppercase tracking-[0.18em] ${
            dark ? 'text-[#8f978a]' : 'text-[#7c8576]'
          }`}
        >
          {label}
        </p>
      </div>
      <div>
        <p
          className={`text-[16px] font-medium tracking-[-0.02em] ${
            dark ? 'text-[#f3efe5]' : 'text-[#173027]'
          }`}
        >
          {value}
        </p>
        <p className={`mt-2 text-[14px] leading-[1.85] ${dark ? 'text-[#b8afa1]' : 'text-[#5a625b]'}`}>
          {note}
        </p>
      </div>
    </div>
  )
}

function StatLine({
  k,
  v,
  dark = false,
}: {
  k: string
  v: string
  dark?: boolean
}) {
  return (
    <div className={`grid gap-3 border-b py-5 last:border-b-0 lg:grid-cols-[220px_1fr] ${dark ? 'border-white/10' : 'border-[#e2dbc9]'}`}>
      <p
        className={`text-[10px] uppercase tracking-[0.18em] ${
          dark ? 'text-[#8f978a]' : 'text-[#7c8576]'
        }`}
      >
        {k}
      </p>
      <p className={`text-[15px] leading-[1.8] ${dark ? 'text-[#f3efe5]' : 'text-[#173027]'}`}>{v}</p>
    </div>
  )
}

export function SurveyPageClient() {
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#060807] via-[#060807]/84 to-[#060807]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060807] via-transparent to-transparent" />

          <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <Fade y={10}>
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#8f978a]">04A / Community Survey</p>
            </Fade>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
              <div className="max-w-3xl">
                <Fade delay={0.05}>
                  <h1 className="max-w-5xl font-sans text-[clamp(3.25rem,6vw,6.25rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-[#f4efe5]">
                    Measure awareness.
                    <br />
                    <span className="text-[#a3b18a]">Reveal real change.</span>
                  </h1>
                </Fade>

                <Fade delay={0.12}>
                  <p className="mt-6 max-w-xl text-[1.05rem] leading-8 text-[#c1c8ba]">
                    The survey framework turns outreach into defensible data. Wave 1 establishes the baseline before any BLACKOUT activity begins; Wave 2 measures what changed.
                  </p>
                </Fade>

                <Fade delay={0.18}>
                  <p className="mt-4 max-w-xl text-base leading-7 text-[#9fa79a]">
                    The page is deliberately simple: a live instrument, a few clear metrics, and the logic that connects the data to the broader project.
                  </p>
                </Fade>

                <Fade delay={0.24}>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href="#survey"
                      className="group inline-flex items-center gap-2 rounded-full bg-[#efe8d6] px-5 py-3 text-sm font-medium text-[#111814] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
                    >
                      Open the survey
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                    </Link>
                    <Link
                      href="#method"
                      className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                    >
                      Read the method
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
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
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f978a]">Field instrument</p>
                  <p className="mt-2 text-sm leading-7 text-[#f3efe5]">
                    A single visual anchor keeps the hero calm while the page focuses on the audit logic.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Snapshot */}
        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="01 / Snapshot" />
            <SectionTitle eyebrow="Snapshot" title={<>The project in <Accent>one glance</Accent>.</>} />
            <div className="mt-8 border-t border-[#e2dbc9]">
              {stats.map((item, index) => (
                <Fade key={item.k} delay={0.04 * index}>
                  <StatLine k={item.k} v={item.v} />
                </Fade>
              ))}
            </div>
          </div>
        </LightBand>

        {/* Live instrument */}
        <DarkBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="02 / Live instrument" />
            <SectionTitle
              eyebrow="Wave 1 operational audit"
              title={<>The field form is the baseline capture for the entire project.</>}
              dark
            />

            <div id="survey" className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div className="space-y-8">
                <div className="border-t border-white/10 pt-8">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#8f978a]">Field context</p>
                  <p className="mt-4 max-w-xl text-[15px] leading-[1.9] text-[#b8afa1]">
                    This standardized instrument is deployed across the campaign zone before any outreach, tagging, or drain marking begins. The right side mirrors the questions used at residential access points.
                  </p>
                </div>

                <div className="border-t border-white/10 pt-8">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#8f978a]">Wave status</p>
                  <div className="mt-5 space-y-3">
                    <div className="flex items-center justify-between border border-emerald-900/15 bg-emerald-50/80 px-4 py-3 text-[#111814]">
                      <div className="flex items-center gap-2.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="text-[13px] font-medium text-emerald-900">Wave 1 — Live baseline</span>
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-emerald-700">Active</span>
                    </div>

                    <div className="flex items-center justify-between border border-white/10 bg-white/[0.03] px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className="h-2 w-2 rounded-full bg-[#c7c0b0]" />
                        <span className="text-[13px] font-medium text-[#b8afa1]">Wave 2 — Post-intervention</span>
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-[#8f978a]">Pending</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-8">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#8f978a]">Data directive</p>
                  <p className="mt-4 max-w-xl text-[15px] leading-[1.9] text-[#b8afa1]">
                    Verified door-to-door metadata acts as the primary baseline anchor. Digital supplements can help verify coverage, but they do not replace direct physical collection.
                  </p>
                </div>
              </div>

              <Fade delay={0.1}>
                <div className="overflow-hidden border border-white/10 bg-white/[0.035]">
                  <div className="border-b border-white/10 px-6 py-5">
                    <p className="text-[10px] font-mono font-bold tracking-[0.22em] text-[#8f978a] uppercase">
                      Document ref: BLK-SRV-2026A
                    </p>
                    <h3 className="mt-2 font-sans text-2xl font-semibold tracking-[-0.03em] text-[#f3efe5]">
                      Fertilizer Ordinance Awareness Verification
                    </h3>
                    <p className="mt-1 text-[13px] text-[#a6ad9f]">Brevard County residential sampling protocol</p>
                  </div>
                  <div className="p-6">
                    <SurveyForm />
                  </div>
                </div>
              </Fade>
            </div>
          </div>
        </DarkBand>

        {/* Method */}
        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="03 / Method" />
            <SectionTitle eyebrow="Two-wave audit logic" title={<>The baseline must finish before the intervention starts.</>} />

            <div id="method" className="max-w-3xl space-y-6 text-[15px] leading-[1.9] text-[#5a625b]">
              <p>
                Wave 1 anchors the pre-intervention dataset. It is collected in full resolution before any BLACKOUT awareness collateral, storm drain markers, or retail shelf tags are placed in the field.
              </p>
              <p>
                Wave 2 runs only after the intervention sequence is complete. The comparison between the two waves becomes the project’s primary empirical outcome.
              </p>
              <p>
                The split is non-negotiable because the data needs to show change, not a blurred mix of before and after.
              </p>
            </div>
          </div>
        </LightBand>

        {/* Technical parameters */}
        <DarkBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="04 / Technical parameters" />
            <SectionTitle eyebrow="Survey specifications" title={<>A small set of numbers keeps the fieldwork consistent.</>} dark />

            <div className="mt-8 border-t border-white/10">
              {auditMetrics.map((item, index) => (
                <Fade key={item.label} delay={index * 0.04}>
                  <LineItem label={item.label} value={item.value} note={item.note} dark />
                </Fade>
              ))}
            </div>
          </div>
        </DarkBand>

        {/* Data flow */}
        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="05 / Data flow" />
            <SectionTitle eyebrow="What the data feeds" title={<>The survey delta is reused everywhere the project needs proof.</>} />

            <div className="max-w-3xl space-y-4 text-[15px] leading-[1.9] text-[#5a625b]">
              {wavePoints.map((item) => (
                <div key={item} className="border-b border-[#e2dbc9] pb-4 last:border-b-0 last:pb-0">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-10 border-t border-[#e2dbc9] pt-8">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#6f8167]">Data path</p>
              <div className="mt-5 space-y-4">
                {dataFlow.map((item) => (
                  <Fade key={item}>
                    <div className="border-b border-[#e2dbc9] pb-4 last:border-b-0 last:pb-0 text-[15px] leading-[1.9] text-[#5a625b]">
                      {item}
                    </div>
                  </Fade>
                ))}
              </div>
            </div>
          </div>
        </LightBand>

        {/* Outputs */}
        <DarkBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="06 / Outputs" />
            <SectionTitle eyebrow="Where the survey goes next" title={<>One instrument, multiple destinations.</>} dark />

            <div className="max-w-3xl space-y-6 text-[15px] leading-[1.9] text-[#b8afa1]">
              {pipelines.map((item) => (
                <div key={item.title} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                  <span className="block text-[#f3efe5] font-medium">{item.title}</span>
                  <span className="block mt-2">{item.body}</span>
                </div>
              ))}
            </div>
          </div>
        </DarkBand>

        {/* Closing */}
        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="07 / Closing" />
            <SectionTitle eyebrow="Closing" title={<>The survey is the project’s cleanest proof that the work changed something measurable.</>} />

            <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
              <div className="space-y-3 text-[14px] leading-[1.85] text-[#5a625b]">
                <p>Wave 1 establishes the baseline.</p>
                <p>Wave 2 tests whether BLACKOUT moved the numbers.</p>
                <p>The difference becomes the evidence for the rest of the site.</p>
              </div>

              <div>
                <h3 className="font-sans text-2xl font-semibold tracking-[-0.03em] text-[#173027]">
                  The survey page should feel like a field instrument, not a dashboard.
                </h3>
                <p className="mt-4 text-[14px] leading-[1.9] text-[#5a625b]">
                  This version keeps the layout restrained, the motion subtle, and the structure consistent with the other pages: dark hero, light bands, clean rows, and one strong image-led anchor.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="#survey"
                    className="inline-flex items-center gap-2 rounded-full bg-[#efe8d6] px-5 py-3 text-sm font-medium text-[#111814] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                  >
                    Open the instrument
                    <span aria-hidden>→</span>
                  </Link>
                  <Link
                    href="#top"
                    className="inline-flex items-center gap-2 rounded-full border border-[#e2dbc9] bg-white/60 px-5 py-3 text-sm font-medium text-[#173027] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                  >
                    Back to top
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </LightBand>
      </main>
    </SiteLayout>
  )
}