'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { SiteLayout } from '@/components/site-layout'

const heroBg =
  'https://commons.wikimedia.org/wiki/Special:Redirect/file/Florida_Manatee_FWS_18.jpg'

const stats = [
  { figure: '1,101', label: 'manatee deaths in 2021' },
  { figure: '58%', label: 'seagrass lost in the lagoon' },
  { figure: '15,000+', label: 'storm drains in the watershed' },
  { figure: 'Jun 1–Sep 30', label: 'blackout window' },
]

const chain = [
  {
    n: '01',
    head: 'Fertilizer applied',
    body: 'Residents apply nitrogen and phosphorus fertilizer during the rainy season, peaking when runoff risk is highest.',
    data: 'Residential fertilizer use often peaks during the summer blackout window.',
    source: 'FDEP / Brevard County estimates',
  },
  {
    n: '02',
    head: 'Nitrogen mobilized',
    body: 'Rain and storm events mobilize nitrogen across impervious neighborhood surfaces like driveways.',
    data: 'Stormwater runoff moves dissolved nitrogen off lawns and pavement.',
    source: 'Brevard County Stormwater Utility',
  },
  {
    n: '03',
    head: 'Untreated runoff',
    body: 'Storm drains carry the untreated residential runoff directly to local lagoon outfalls.',
    data: 'Brevard County has a large storm drain network feeding the lagoon directly.',
    source: 'Brevard County Stormwater Utility',
  },
  {
    n: '04',
    head: 'Nutrients fuel blooms',
    body: 'Elevated nitrogen levels in the estuary fuel cyanobacteria and algal blooms.',
    data: 'Algal bloom intensity correlates with peak seasonal nitrogen loading.',
    source: 'SJRWMD monitoring database',
  },
  {
    n: '05',
    head: 'Sunlight blocked',
    body: 'Algal blooms block critical sunlight from reaching benthic seagrass beds.',
    data: 'Light attenuation surveys show severe blocks during active bloom periods.',
    source: 'SJRWMD light surveys',
  },
  {
    n: '06',
    head: 'Seagrass dies',
    body: 'Deprived of essential sunlight, the delicate estuarine seagrass beds die off rapidly.',
    data: 'Seagrass maps show severe acreage loss in high-bloom lagoon segments.',
    source: 'SJRWMD seagrass survey',
  },
  {
    n: '07',
    head: 'Manatees starve',
    body: 'Manatees lose their primary food source and experience catastrophic starvation across the lagoon.',
    data: 'FWC reports link manatee mortality clusters directly to seagrass loss zones.',
    source: 'FWC mortality database',
  }
]

const actions = [
  {
    title: 'Measure awareness first',
    body: 'Before changing anything, the team documents what residents know, misunderstand, and ignore.',
  },
  {
    title: 'Make the rule visible',
    body: 'The project places simple, direct information where people make lawn-care decisions.',
  },
  {
    title: 'Leave a repeatable system',
    body: 'The result is built so a county partner can keep using it after the student team is done.',
  },
]

const roles = [
  'Project Lead owns the timeline, meeting minutes, applications, correspondence, and the Master Paragraph Library.',
  'Survey Lead builds both survey waves, manages distribution, tracks responses, and produces the compliance gap analysis.',
  'Retail Partnership Lead recruits stores, secures signed agreements, and manages the Manatee Safe shelf tag rollout.',
  'Field Operations Lead maps drains, logs GPS data, calculates mortality distance, and runs the marking sessions.',
  'Documentation Lead keeps the drive organized, uploads photos, and adapts the same evidence into multiple applications.',
]

const surveyPoints = [
  'Wave 1 asks whether residents are aware of the ordinance, know the blackout dates, understand where runoff goes, and recognize the lagoon’s value.',
  'Wave 2 repeats the same streets after the intervention and adds questions about behavior change, shelf tags, and drain markings.',
  'The headline metric is the combined correct-knowledge rate from Q1 and Q2 — the percentage of respondents who know the ordinance exists and can identify the dates.',
]

const storePoints = [
  'Target local independent garden centers, nurseries, and Ace Hardware locations within about 15 miles of West Shore.',
  'Use an in-person pitch with a sample Manatee Safe tag and a one-page partnership agreement.',
  'Keep the shelf tag simple: ordinance dates, the manatee connection, and a QR code to the project website.',
]

const drainPoints = [
  'Use Melbourne Public Works drainage maps to identify a compact campaign zone with the same streets as the survey.',
  'Mark 30–40 drains and log every drain at the site before leaving — not later that evening.',
  'Each marker includes the blackout dates and the straight-line distance to the nearest documented manatee mortality site.',
]

const competitionNotes = [
  'CmPS uses the project as a problem-solving portfolio with a real implementation arc: identify the gap, test alternatives, execute, and document results.',
  'HOSA uses the same field work as a public health intervention because it interrupts the nitrogen pathway that drives cyanotoxin-producing blooms.',
  'Earth Prize, PEYA, GENIUS Olympiad, Roots & Shoots, Fairchild Challenge, and others all reuse the same evidence with different framing.',
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
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

function SimpleRow({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-b border-[#e2dbc9] py-5 last:border-b-0">
      <h3 className="font-sans text-xl font-semibold tracking-[-0.03em] text-[#173027]">{title}</h3>
      <p className="mt-2 text-[14px] leading-[1.85] text-[#5a625b]">{body}</p>
    </div>
  )
}

function ChainRow({
  n,
  head,
  body,
  data,
  source,
  index,
}: {
  n: string
  head: string
  body: string
  data: string
  source: string
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative grid items-stretch transition-colors duration-300 hover:z-10 hover:bg-white/[0.03] lg:grid-cols-[110px_1fr_1fr]"
    >
      <div className="flex h-full items-start justify-between border-b border-white/10 bg-[#121915] px-6 py-8 lg:flex-col lg:justify-between lg:border-b-0 lg:border-r">
        <span className="font-sans text-[2.2rem] font-light leading-none text-white/30 transition-colors group-hover:text-white/45">
          {n}
        </span>
        <span className="mt-6 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8f978a] lg:mt-0">
          Node {n}
        </span>
      </div>

      <div className="border-b border-white/10 px-8 py-8 transition-colors duration-300 group-hover:bg-white/[0.02] lg:border-b-0 lg:border-r">
        <h3 className="mb-4 font-sans text-2xl text-[#f3efe5]">{head}</h3>
        <p className="text-[14px] leading-[1.85] text-[#a6ad9f]">{body}</p>
      </div>

      <div className="bg-white/[0.02] px-8 py-8 transition-colors duration-300 group-hover:bg-white/[0.04]">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8f978a]">Data stream</span>
        </div>
        <p className="text-[14px] font-medium leading-[1.7] text-[#f3efe5]">{data}</p>
        <p className="mt-8 text-[11px] font-mono tracking-wide text-white/35">// {source}</p>
      </div>
    </motion.div>
  )
}

export default function MissionPageClient() {
  return (
    <SiteLayout>
      <main className="overflow-hidden bg-[#f6f1e7] text-[#111814] selection:bg-[#d9cfb6] selection:text-[#111814] font-sans">
        <section id="top" className="relative isolate overflow-hidden bg-[#060807] text-white">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-22"
            style={{ backgroundImage: `url(${heroBg})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(163,177,138,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_22%),linear-gradient(180deg,#0a0f0d_0%,#050706_100%)]" />
          <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060807] via-[#060807]/82 to-[#060807]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060807] via-transparent to-transparent" />

          <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <Fade y={10}>
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#8f978a]">02 / The Problem</p>
            </Fade>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <div className="max-w-3xl">
                <Fade delay={0.05}>
                  <h1 className="max-w-4xl font-sans text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-[#f4efe5]">
                    Lawn care choices <Accent>impact lagoon survival.</Accent>
                  </h1>
                </Fade>

                <Fade delay={0.12}>
                  <p className="mt-6 max-w-xl text-[1.05rem] leading-8 text-[#c1c8ba]">
                    A law that protects manatees already exists. Almost nobody in Brevard County knows it is there.
                  </p>
                </Fade>

                <Fade delay={0.18}>
                  <p className="mt-4 max-w-xl text-base leading-7 text-[#9fa79a]">
                    BLACKOUT activates this law through community surveys, point-of-purchase retail shelf tags, and storm drain markings.
                  </p>
                </Fade>

                <Fade delay={0.24}>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href="/about"
                      className="group inline-flex items-center gap-2 rounded-full bg-[#efe8d6] px-5 py-3 text-sm font-medium text-[#111814] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
                    >
                      Read about BLACKOUT
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                    </Link>
                    <Link
                      href="/ordinance"
                      className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                    >
                      Read the ordinance
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                    </Link>
                  </div>
                </Fade>
              </div>

              <Fade delay={0.1}>
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl">
                  <div className="relative aspect-[4/5]">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${heroBg})` }}
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050706] via-transparent to-transparent" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />
                  </div>
                  <div className="border-t border-white/10 px-6 py-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f978a]">Indian River Lagoon</p>
                    <p className="mt-2 text-sm leading-7 text-[#f3efe5]">
                      Algal blooms fuel seagrass die-off, blocking sunlight and leaving manatees without their primary food source.
                    </p>
                  </div>
                </div>
              </Fade>
            </div>
          </div>
        </section>

        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="01 / Snapshot" />
            <SectionTitle eyebrow="Snapshot" title={<>The project in <Accent>one glance</Accent>.</>} />
            <div className="grid gap-0 border-t border-[#e2dbc9] md:grid-cols-4">
              {stats.map((item, index) => (
                <Fade key={item.label} delay={0.04 * index}>
                  <div className="border-b border-[#e2dbc9] px-0 py-6 md:border-r md:px-6 md:last:border-r-0">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#7c8576]">{item.label}</p>
                    <p className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-[#111814] tabular-nums">
                      {item.figure}
                    </p>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </LightBand>

        <DarkBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="02 / Foundation" />
            <SectionTitle
              eyebrow="Project foundation"
              title={
                <>
                  A law protects manatees. <Accent>Nobody knows it is there.</Accent>
                </>
              }
              dark
            />

            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
              <div className="space-y-6 text-[15px] leading-[1.9] text-[#b8afa1]">
                <Fade>
                  <p>
                    BLACKOUT is designed as a complete year-long project, not a single event. The guide is built for
                    five students and one parent volunteer, with a clear sequence that keeps the work credible from the
                    first survey to the final handoff. The project is meant to win in CmPS and also build a strong
                    HOSA Community Awareness portfolio using the same evidence.
                  </p>
                </Fade>
                <Fade delay={0.06}>
                  <p>
                    The most important rule is timing. Wave 1 must close before any drain marking or retail shelf tags
                    go up. That makes the survey the baseline. If it gets contaminated, the whole comparison weakens.
                  </p>
                </Fade>
                <Fade delay={0.12}>
                  <p className="rounded-[1.35rem] border border-white/10 bg-white/[0.035] px-5 py-4 text-[#f3efe5]">
                    Wave 1 closes first. Then the other prongs begin. The sequence is part of the evidence.
                  </p>
                </Fade>
              </div>

              <Fade delay={0.1}>
                <div className="border-t border-white/10 pt-8">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f978a]">Key rules from the guide</p>
                  <div className="mt-5 space-y-4">
                    {[
                      'Water quality testing was deliberately removed from this version because the timeline for estuarine nutrient response is too long for one season.',
                      'The project uses original primary data instead: survey results, retail reach, and drain marking documentation.',
                      'The same field work serves multiple competitions; the framing changes, but the evidence stays the same.',
                    ].map((note) => (
                      <div key={note} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-[#a3b18a]" />
                        <p className="text-[14px] leading-[1.8] text-[#b8afa1]">{note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Fade>
            </div>
          </div>
        </DarkBand>

        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="03 / The problem" />
            <SectionTitle
              eyebrow="Manatees, seagrass, and the lagoon"
              title={
                <>
                  The lagoon seagrass loss <Accent>impacts manatee survival.</Accent>
                </>
              }
            />

            <div className="grid gap-4 lg:grid-cols-3">
              {[
                'In 2021, more than 1,100 manatees died in the Indian River Lagoon — the largest single-year manatee die-off ever recorded in the United States.',
                'The lagoon spans 156 miles and supports more than 4,300 species, making it one of the most biodiverse estuaries in North America.',
                'The causal chain is simple: fertilizer, storm drain, bloom, seagrass loss, manatee starvation. BLACKOUT attacks the chain at the first step.',
              ].map((text) => (
                <Fade key={text}>
                  <div className="rounded-[1.35rem] border border-[#e2dbc9] bg-white/75 p-6 backdrop-blur-sm h-full">
                    <p className="text-[14px] leading-[1.9] text-[#5a625b]">{text}</p>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </LightBand>

        <DarkBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="04 / The causal chain" />
            <SectionTitle
              eyebrow="How the problem moves"
              title={
                <>
                  A seven-step chain <Accent>leading to lagoon harm.</Accent>
                </>
              }
              dark
            />

            <div className="max-w-3xl">
              <p className="text-[16px] italic leading-[1.9] text-[#b8c0b1]">
                This problem looks abstract until you break it apart. Fertilizer goes on the lawn, rain moves it into
                drains, the lagoon receives the runoff, blooms take over, seagrass declines, and the wildlife that
                depends on that habitat feels the loss. BLACKOUT intervenes at the first step.
              </p>
            </div>

            <div className="mt-12 overflow-hidden border-t border-white/10">
              {chain.map((step, index) => (
                <ChainRow key={step.n} {...step} index={index} />
              ))}
            </div>

            <div className="mt-8 rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f978a]">Intervention point</p>
              <p className="mt-3 text-[15px] leading-[1.9] text-[#b8afa1]">
                The goal is not to fix the lagoon with a slogan. The goal is to interrupt the chain before the
                fertilizer enters the stormwater system.
              </p>
            </div>
          </div>
        </DarkBand>

        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="05 / What BLACKOUT does" />
            <SectionTitle
              eyebrow="The work"
              title={
                <>
                  Measure awareness and make <Accent>the rule visible.</Accent>
                </>
              }
            />

            <div className="grid gap-4 md:grid-cols-3">
              {actions.map((item) => (
                <Fade key={item.title}>
                  <div className="rounded-[1.35rem] border border-[#e2dbc9] bg-white/75 p-6 backdrop-blur-sm h-full">
                    <h3 className="font-sans text-xl font-semibold tracking-[-0.03em] text-[#173027]">{item.title}</h3>
                    <p className="mt-3 text-[14px] leading-[1.85] text-[#5a625b]">{item.body}</p>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </LightBand>

        <DarkBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="06 / Roles" />
            <SectionTitle
              eyebrow="Team structure"
              title={
                <>
                  Defined team roles <Accent>ensure project repeatability.</Accent>
                </>
              }
              dark
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {roles.map((role) => (
                <Fade key={role}>
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-md h-full">
                    <p className="text-[14px] leading-[1.85] text-[#a6ad9f]">{role}</p>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </DarkBand>

        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="07 / Survey and evidence" />
            <SectionTitle
              eyebrow="Wave 1 and Wave 2"
              title={
                <>
                  Survey delta proves what <Accent>residents knew after.</Accent>
                </>
              }
            />

            <div className="grid gap-4 lg:grid-cols-3">
              {surveyPoints.map((point) => (
                <Fade key={point}>
                  <div className="rounded-[1.35rem] border border-[#e2dbc9] bg-white/75 p-6 backdrop-blur-sm h-full">
                    <p className="text-[14px] leading-[1.85] text-[#5a625b]">{point}</p>
                  </div>
                </Fade>
              ))}
            </div>

            <Fade delay={0.12}>
              <div className="mt-8 max-w-3xl border-t border-[#e2dbc9] pt-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6f8167]">Headline metric</p>
                <p className="mt-4 text-[clamp(1.45rem,3vw,2.1rem)] font-medium leading-[1.22] tracking-[-0.03em] text-[#173027]">
                  The combined correct-knowledge rate from Q1 and Q2 is the number that matters most.
                </p>
              </div>
            </Fade>
          </div>
        </LightBand>

        <DarkBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="08 / Retail intercept" />
            <SectionTitle
              eyebrow="Point of purchase"
              title={
                <>
                  Shelf tags reach buyers <Accent>at purchase decision.</Accent>
                </>
              }
              dark
            />

            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div className="space-y-4">
                {storePoints.map((point) => (
                  <Fade key={point}>
                    <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-md">
                      <p className="text-[14px] leading-[1.85] text-[#b8afa1]">{point}</p>
                    </div>
                  </Fade>
                ))}
              </div>

              <Fade delay={0.08}>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-md h-full">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f978a]">Tag content</p>
                  <p className="mt-3 text-[15px] leading-[1.85] text-[#a6ad9f]">
                    The tag includes the ordinance name, the blackout dates, the manatee connection, and a QR code to
                    the project website.
                  </p>
                  <div className="mt-6 border-t border-white/10 pt-5 text-sm leading-7 text-[#a6ad9f]">
                    The same shelf tag design becomes evidence for CmPS, HOSA, Earth Prize, and the other add-on
                    competitions without rewriting the facts.
                  </div>
                </div>
              </Fade>
            </div>
          </div>
        </DarkBand>

        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="09 / Drain marking" />
            <SectionTitle
              eyebrow="Permanent reminder"
              title={
                <>
                  Drain markers connect <Accent>runoff to lagoon harm.</Accent>
                </>
              }
            />

            <div className="grid gap-4 lg:grid-cols-3">
              {drainPoints.map((point) => (
                <Fade key={point}>
                  <div className="rounded-[1.35rem] border border-[#e2dbc9] bg-white/75 p-6 backdrop-blur-sm h-full">
                    <p className="text-[14px] leading-[1.85] text-[#5a625b]">{point}</p>
                  </div>
                </Fade>
              ))}
            </div>

            <Fade delay={0.12}>
              <div className="mt-8 max-w-3xl border-t border-[#e2dbc9] pt-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6f8167]">Field rule</p>
                <p className="mt-4 text-[15px] leading-[1.9] text-[#5a625b]">
                  Document at the site, before you leave, every time. The project guide is very direct about this:
                  data written from memory is more error-prone, and those errors are hard to fix later.
                </p>
              </div>
            </Fade>
          </div>
        </LightBand>

        <DarkBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="10 / Operations" />
            <SectionTitle
              eyebrow="Documentation and handoff"
              title={
                <>
                  Clean documentation system <Accent>enables county handoff.</Accent>
                </>
              }
              dark
            />

            <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              <Fade>
                <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-md h-full">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f978a]">Documentation system</p>
                  <p className="mt-3 text-[14px] leading-[1.9] text-[#a6ad9f]">
                    The guide uses a simple three-platform architecture: Google Sheets for field logs, Google Photos
                    for organized visual evidence, and Google Drive for letters, minutes, tag designs, and drafts.
                  </p>
                </div>
              </Fade>

              <Fade delay={0.08}>
                <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-md h-full">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f978a]">Handoff outcome</p>
                  <p className="mt-3 text-[14px] leading-[1.9] text-[#a6ad9f]">
                    The final package includes the drain database, survey instrument, tag template, monitoring
                    protocol, and a written acknowledgment from Brevard County that they received it.
                  </p>
                </div>
              </Fade>
            </div>
          </div>
        </DarkBand>

        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="11 / Competition framing" />
            <SectionTitle
              eyebrow="Why the same work can win in multiple places"
              title={
                <>
                  One set of facts <Accent>framed for multiple rubrics.</Accent>
                </>
              }
            />

            <div className="grid gap-4 lg:grid-cols-3">
              {competitionNotes.map((note) => (
                <Fade key={note}>
                  <div className="rounded-[1.35rem] border border-[#e2dbc9] bg-white/75 p-6 backdrop-blur-sm h-full">
                    <p className="text-[14px] leading-[1.85] text-[#5a625b]">{note}</p>
                  </div>
                </Fade>
              ))}
            </div>

            <Fade delay={0.12}>
              <div className="mt-10 rounded-[1.5rem] border border-[#e2dbc9] bg-white/75 p-6 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#7c8576]">Writing system</p>
                <p className="mt-3 max-w-3xl text-[15px] leading-[1.9] text-[#5a625b]">
                  The guide recommends writing a reusable paragraph library once, then adapting the same material for
                  each application instead of rebuilding every submission from scratch. That keeps the work cleaner and
                  avoids the generic, overworked feel that comes from forcing the same information into a new shape
                  every time.
                </p>
              </div>
            </Fade>
          </div>
        </LightBand>

        <DarkBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="12 / Closing" />
            <SectionTitle
              eyebrow="Closing"
              title={
                <>
                  A civic project <Accent>built with operational discipline.</Accent>
                </>
              }
              dark
            />

            <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
              <Fade>
                <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-md h-full">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f978a]">What stays true</p>
                  <div className="mt-4 space-y-3 text-[14px] leading-[1.85] text-[#a6ad9f]">
                    <p>The law already exists.</p>
                    <p>The awareness gap is the problem.</p>
                    <p>The three-prong model is the solution.</p>
                    <p>The handoff package is the sustainability plan.</p>
                  </div>
                </div>
              </Fade>

              <Fade delay={0.08}>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-md">
                  <h3 className="font-sans text-2xl font-semibold tracking-[-0.03em] text-white">
                    BLACKOUT is a communication project with a civic purpose.
                  </h3>
                  <p className="mt-4 text-[14px] leading-[1.9] text-[#a6ad9f]">
                    The page now follows the same visual logic as the About page: dark hero, alternating bands,
                    split-color headings, and minimal decoration so the content can breathe.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/about"
                      className="inline-flex items-center gap-2 rounded-full bg-[#efe8d6] px-5 py-3 text-sm font-medium text-[#111814] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                    >
                      Read about BLACKOUT
                      <span aria-hidden>→</span>
                    </Link>
                    <Link
                      href="/ordinance"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                    >
                      Read the ordinance
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
