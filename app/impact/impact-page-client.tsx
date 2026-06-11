'use client'

import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { SiteLayout } from '@/components/site-layout'

const heroBg =
  'https://commons.wikimedia.org/wiki/Special:FilePath/Runoff%20of%20soil%20%26%20fertilizer.jpg'

const seasonStatus = [
  { k: 'Season', v: '2026', note: 'First field season', status: 'active' },
  { k: 'Wave 1 survey', v: 'Open', note: 'Pre-intervention baseline', status: 'active' },
  { k: 'Wave 2 survey', v: 'Pending', note: 'Post-intervention follow-up', status: 'pending' },
  { k: 'County handoff', v: 'Planned', note: 'Oct–Nov 2026', status: 'pending' },
]

const evidenceStreams = [
  {
    n: '01',
    label: 'Survey dataset',
    desc: 'Pre/post compliance rates with sample size, methodology notes, and wave gap calculation.',
  },
  {
    n: '02',
    label: 'Retail partner agreements',
    desc: 'Signed letters documenting store names, shelf tag placement, and weekly customer reach.',
  },
  {
    n: '03',
    label: 'Storm drain geodatabase',
    desc: 'GPS coordinates, mortality distances, installation dates, and photos for all marked drains.',
  },
  {
    n: '04',
    label: 'Photo documentation archive',
    desc: 'Timestamped field photos covering survey sessions, drain installation, and retail visits.',
  },
  {
    n: '05',
    label: 'County handoff package',
    desc: 'Complete program documentation enabling Brevard County to operate the system independently.',
  },
  {
    n: '06',
    label: 'Formal handoff meeting',
    desc: 'Recorded meeting with county representatives confirming transfer of program ownership.',
  },
]

const changePoints = [
  'Residents learn the ordinance exists before June 1.',
  'Retail stores display the blackout window at the point of purchase.',
  'Storm drains connect lawn behavior to specific, documented mortality events.',
  'A GPS database makes the problem geographically legible to anyone with a map.',
]

const countyPoints = [
  'First documented baseline of ordinance awareness in the county.',
  'Retail partnerships that can continue in future seasons.',
  'Physical storm drain infrastructure already installed and GPS-catalogued.',
  'A replication model tested and documented for other Florida jurisdictions.',
]

const sustainabilityPoints = [
  'BLACKOUT is designed to make itself unnecessary.',
  'The deliverable is not a project that needs students to maintain it forever.',
  'It is a documented program with a trained institutional handoff.',
  'Brevard County can run it independently in every subsequent summer.',
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

function StreamRow({
  n,
  label,
  desc,
}: {
  n: string
  label: string
  desc: string
}) {
  return (
    <div className="grid gap-4 border-b border-white/10 py-6 lg:grid-cols-[72px_1fr]">
      <div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-[#8f978a]">{n}</p>
      </div>
      <div>
        <h3 className="font-sans text-xl font-semibold tracking-[-0.03em] text-[#f3efe5]">
          {label}
        </h3>
        <p className="mt-2 text-[14px] leading-[1.85] text-[#a6ad9f]">{desc}</p>
      </div>
    </div>
  )
}

export function ImpactPageClient() {
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
                05 / Impact &amp; Results
              </p>
            </Fade>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
              <div className="max-w-3xl">
                <Fade delay={0.05}>
                  <h1 className="max-w-5xl font-sans text-[clamp(3.25rem,6vw,6.25rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-[#f4efe5]">
                    Every field activity
                    <br />
                    produces a document.
                    <br />
                    <Accent>Every document survives.</Accent>
                  </h1>
                </Fade>

                <Fade delay={0.12}>
                  <p className="mt-6 max-w-xl text-[1.05rem] leading-8 text-[#c1c8ba]">
                    The goal is not a project report. It is a complete, transferable program that Brevard County can operate independently after the student team has graduated.
                  </p>
                </Fade>

                <Fade delay={0.18}>
                  <p className="mt-4 max-w-xl text-base leading-7 text-[#9fa79a]">
                    This page keeps the structure calm and readable: a season snapshot, evidence streams, what changes, and the sustainability argument.
                  </p>
                </Fade>

                <Fade delay={0.24}>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href="#streams"
                      className="group inline-flex items-center gap-2 rounded-full bg-[#efe8d6] px-5 py-3 text-sm font-medium text-[#111814] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
                    >
                      Evidence streams
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                        →
                      </span>
                    </Link>
                    <Link
                      href="#sustainability"
                      className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                    >
                      Sustainability
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
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f978a]">Runoff pathway</p>
                  <p className="mt-2 text-sm leading-7 text-[#f3efe5]">
                    Impact becomes visible when fertilizer runoff is no longer abstract and the chain is documented.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Season status */}
        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="01 / Season status" />
            <SectionTitle
              eyebrow="Live overview"
              title={
                <>
                  A short season snapshot keeps the work easy to read without turning the page into a dashboard.
                </>
              }
            />

            <div className="mt-8 border-t border-[#e2dbc9]">
              {seasonStatus.map((item, index) => (
                <Fade key={item.k} delay={0.04 * index}>
                  <Row
                    left={item.k}
                    right={
                      <>
                        <span className="block text-[16px] font-medium text-[#173027]">{item.v}</span>
                        <span className="mt-1 block text-[13px] text-[#5a625b]">{item.note}</span>
                        <span
                          className={`mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium ${
                            item.status === 'active'
                              ? 'border border-emerald-500/10 bg-emerald-500/5 text-emerald-800'
                              : 'border border-[#e2dbc9] bg-white/70 text-[#7c8576]'
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              item.status === 'active' ? 'bg-emerald-500' : 'bg-[#c7c0b0]'
                            }`}
                          />
                          {item.status === 'active' ? 'In progress' : 'Not yet started'}
                        </span>
                      </>
                    }
                  />
                </Fade>
              ))}
            </div>
          </div>
        </LightBand>

        {/* Evidence streams */}
        <DarkBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="02 / Evidence streams" />
            <SectionTitle
              eyebrow="What survives"
              title={
                <>
                  Six document types. Each one independently verifiable and useful beyond the student team.
                </>
              }
              dark
            />

            <div id="streams" className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div className="space-y-6 text-[15px] leading-[1.9] text-[#b8afa1]">
                <Fade>
                  <p>
                    Competition submissions, grant applications, and county handoff packages all require the same thing: documented, repeatable evidence of community impact.
                  </p>
                </Fade>
                <Fade delay={0.06}>
                  <p>
                    BLACKOUT is structured to produce that evidence as it goes, instead of trying to reconstruct it at the end.
                  </p>
                </Fade>
              </div>

              <Fade delay={0.1}>
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-md">
                  <div className="border-t border-white/10">
                    {evidenceStreams.map((item) => (
                      <StreamRow key={item.n} {...item} />
                    ))}
                  </div>
                </div>
              </Fade>
            </div>
          </div>
        </DarkBand>

        {/* What changes */}
        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="03 / What changes" />
            <SectionTitle
              eyebrow="Community and county"
              title={
                <>
                  The work changes behavior in the community and leaves Brevard County with a system it can actually keep using.
                </>
              }
            />

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-[2rem] border border-[#e2dbc9] bg-white/70 p-6 lg:p-8">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#6f8167]">In the community</p>
                <ul className="mt-6 space-y-5">
                  {changePoints.map((item) => (
                    <li key={item} className="flex items-start gap-4 text-[14px] leading-[1.8] text-[#5a625b]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a3b18a]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[2rem] border border-[#e2dbc9] bg-white/70 p-6 lg:p-8">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#6f8167]">For Brevard County</p>
                <ul className="mt-6 space-y-5">
                  {countyPoints.map((item) => (
                    <li key={item} className="flex items-start gap-4 text-[14px] leading-[1.8] text-[#5a625b]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a3b18a]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </LightBand>

        {/* Sustainability */}
        <DarkBand>
          <div id="sustainability" className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="04 / Sustainability" />
            <SectionTitle
              eyebrow="The handoff goal"
              title={
                <>
                  Not permanent student involvement. <Accent>A complete transfer.</Accent>
                </>
              }
              dark
            />

            <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
              <div className="space-y-3 text-[14px] leading-[1.85] text-[#a6ad9f]">
                {sustainabilityPoints.map((point) => (
                  <p key={point}>{point}</p>
                ))}
              </div>

              <Fade delay={0.08}>
                <div>
                  <h3 className="font-sans text-2xl font-semibold tracking-[-0.03em] text-white">
                    The county receives the program, not the project.
                  </h3>
                  <p className="mt-4 text-[14px] leading-[1.9] text-[#a6ad9f]">
                    That is what makes the work meaningful after the season ends: the markers stay, the partners stay, the data stays, and the county knows how to repeat it.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="#streams"
                      className="inline-flex items-center gap-2 rounded-full bg-[#efe8d6] px-5 py-3 text-sm font-medium text-[#111814] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                    >
                      Evidence streams
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

        {/* Closing */}
        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="05 / Closing" />
            <SectionTitle
              eyebrow="Closing"
              title={
                <>
                  Every field activity produces a document. <Accent>Every document survives.</Accent>
                </>
              }
            />

            <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
              <div className="space-y-3 text-[14px] leading-[1.85] text-[#5a625b]">
                <p>Wave 1 establishes the baseline.</p>
                <p>Wave 2 tests whether the work changed the numbers.</p>
                <p>The archive makes the result transferable.</p>
              </div>

              <div>
                <h3 className="font-sans text-2xl font-semibold tracking-[-0.03em] text-[#173027]">
                  Impact means the work remains useful after the student team leaves.
                </h3>
                <p className="mt-4 text-[14px] leading-[1.9] text-[#5a625b]">
                  This version stays aligned with the other pages: rounded corners, an image-led hero, calm motion, and fewer heavy blocks.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="#sustainability"
                    className="inline-flex items-center gap-2 rounded-full bg-[#efe8d6] px-5 py-3 text-sm font-medium text-[#111814] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                  >
                    Sustainability
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