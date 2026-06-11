'use client'

import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { SiteLayout } from '@/components/site-layout'

const heroBg =
  'https://images.openai.com/static-rsc-4/qo73Sje-HVuELxwCyJv_PZ6P2USF-UC_H0UA-Hh2UILq392KxnaQxY1XA0_irEKzHMks8lcpdfR6Ktfi1su60eDb2NZHWr1VoqQKAxA-e5ZKELH5OuphoDyHz2ss2Dve8YdzHhABJgEEz07Up-c5zYdzPTHrIun3xs4uj_YRDLU?purpose=inline'

const stats = [
  { k: 'Team', v: '5 members + 1 parent volunteer' },
  { k: 'Launch', v: 'Summer 2026' },
  { k: 'Primary', v: 'CmPS' },
  { k: 'Secondary', v: 'HOSA Community Awareness' },
]

const projectNotes = [
  'Built for one complete year of work, not a last-minute sprint.',
  'Wave 1 closes before any drain markings, retail tags, or public outreach begin.',
  'The same field work feeds every competition application, with the framing changed to fit the rubric.',
]

const principles = [
  {
    title: 'Existing law, new visibility',
    body:
      'BLACKOUT does not ask the county to create a new ordinance. It makes a real rule easier to see, understand, and follow.',
  },
  {
    title: 'Evidence first',
    body:
      'The project leans on original survey data, retail reach, and drain documentation instead of vague claims or broad generalities.',
  },
  {
    title: 'Built to keep going',
    body:
      'The handoff package, renewal language, and documentation structure are designed so a county or future students can continue the work.',
  },
]

const process = [
  {
    n: '01',
    title: 'Find the gap',
    body:
      'The ordinance already protects the lagoon, but almost nobody in Brevard County knows it exists. That awareness gap is the problem.',
  },
  {
    n: '02',
    title: 'Make it visible',
    body:
      'The team uses surveys, shelf tags, and drain markers to place the ordinance in the places where people make decisions.',
  },
  {
    n: '03',
    title: 'Leave something usable',
    body:
      'The final result is a repeatable program, a cleaner public message, and a handoff packet that can keep working without the students.',
  },
]

const roles = [
  {
    role: 'Project Lead',
    work: 'Owns the timeline, meeting minutes, applications, correspondence, and the Master Paragraph Library.',
  },
  {
    role: 'Survey Lead',
    work: 'Builds both survey waves, manages distribution, tracks responses, and produces the compliance gap analysis.',
  },
  {
    role: 'Retail Partnership Lead',
    work: 'Recruits stores, secures signed agreements, and manages the Manatee Safe shelf tag rollout.',
  },
  {
    role: 'Field Operations Lead',
    work: 'Maps drains, logs GPS data, calculates mortality distance, and runs the marking sessions.',
  },
  {
    role: 'Documentation Lead',
    work: 'Keeps the drive organized, uploads photos, and adapts the same evidence into multiple applications.',
  },
]

const closingPoints = [
  'The law already exists.',
  'The awareness gap is the problem.',
  'The three-prong model is the solution.',
  'The handoff package is the sustainability plan.',
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
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f8167]">{label}</span>
    </div>
  )
}

function LightBand({ children }: { children: ReactNode }) {
  return <section className="bg-[#faf7f0] py-16 sm:py-20 lg:py-24">{children}</section>
}

function DarkBand({ children }: { children: ReactNode }) {
  return <section className="bg-[#060807] py-16 text-[#f3efe5] sm:py-20 lg:py-24">{children}</section>
}

export function AboutPageClient() {
  return (
    <SiteLayout>
      <main className="overflow-hidden bg-[#f6f1e7] text-[#111814] selection:bg-[#d9cfb6] selection:text-[#111814] font-sans">
        {/* Hero */}
        <section id="top" className="relative isolate overflow-hidden bg-[#060807] text-white">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${heroBg})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(163,177,138,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_22%),linear-gradient(180deg,#0a0f0d_0%,#050706_100%)]" />
          <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060807] via-[#060807]/82 to-[#060807]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060807] via-transparent to-transparent" />

          <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <Fade y={10}>
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#8f978a]">About BLACKOUT</p>
            </Fade>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
              <div className="max-w-3xl">
                <Fade delay={0.05}>
                  <h1 className="max-w-3xl font-sans text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-[#f4efe5]">
                    A quiet ordinance,
                    <br />
                    made <Accent>visible</Accent>.
                  </h1>
                </Fade>

                <Fade delay={0.12}>
                  <p className="mt-6 max-w-xl text-[1.05rem] leading-8 text-[#c1c8ba]">
                    A law that protects manatees already exists. Almost nobody in Brevard County knows it is there.
                  </p>
                </Fade>

                <Fade delay={0.18}>
                  <p className="mt-4 max-w-xl text-base leading-7 text-[#9fa79a]">
                    BLACKOUT activates this law through community awareness, retail partnerships, and storm drain marking.
                  </p>
                </Fade>

                <Fade delay={0.24}>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href="/mission"
                      className="group inline-flex items-center gap-2 rounded-full bg-[#efe8d6] px-5 py-3 text-sm font-medium text-[#111814] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
                    >
                      Read our mission
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
                      The Indian River Lagoon supports a rich ecosystem of over 4,300 species but faces collapse from nutrient runoff.
                    </p>
                  </div>
                </div>
              </Fade>
            </div>
          </div>
        </section>

        {/* Snapshot */}
        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="01 / Snapshot" />
            <SectionTitle eyebrow="Snapshot" title={<>The project in <Accent>one glance</Accent>.</>} />
            <div className="grid gap-0 border-t border-[#e2dbc9] md:grid-cols-4">
              {stats.map((item, index) => (
                <Fade key={item.k} delay={0.04 * index}>
                  <div className="border-b border-[#e2dbc9] py-6 md:border-r md:px-6 md:last:border-r-0">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#7c8576]">{item.k}</p>
                    <p className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-[#111814] tabular-nums">
                      {item.v}
                    </p>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </LightBand>

        {/* Foundation */}
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
                    A law that protects manatees already exists. Almost nobody in Brevard County knows it is there.
                    BLACKOUT is designed as a complete year-long project, not a single event. The guide is built for
                    five students and one parent volunteer, with a clear sequence that keeps the work credible from the
                    first survey to the final handoff.
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
                    {projectNotes.map((note) => (
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

        {/* Principles */}
        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="03 / Why it works" />
            <SectionTitle
              eyebrow="Three ideas"
              title={
                <>
                  BLACKOUT is built around <Accent>visibility, evidence, and continuity</Accent>.
                </>
              }
            />

            <div className="grid gap-0 border-t border-[#e2dbc9]">
              {principles.map((item) => (
                <div key={item.title} className="grid gap-4 border-b border-[#e2dbc9] py-6 lg:grid-cols-[240px_1fr]">
                  <h3 className="font-sans text-xl font-semibold tracking-[-0.03em] text-[#173027]">{item.title}</h3>
                  <p className="text-[14px] leading-[1.9] text-[#5a625b]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </LightBand>         {/* Process */}
        <DarkBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="04 / How it unfolds" />
            <SectionTitle
              eyebrow="A simple sequence"
              title={
                <>
                  The strict field timeline <Accent>cannot be reversed.</Accent>
                </>
              }
              dark
            />

            <div className="mb-10 rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-md">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f978a]">Project Flowchart</p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-mono font-medium text-white/90">
                <span className="rounded bg-white/5 px-2.5 py-1.5 border border-white/10 text-[#a3b18a]">Wave 1 Survey Closes</span>
                <span className="text-[#8f978a]">&rarr;</span>
                <span className="rounded bg-white/5 px-2.5 py-1.5 border border-white/10">Drain Marking Begins</span>
                <span className="text-[#8f978a]">&rarr;</span>
                <span className="rounded bg-white/5 px-2.5 py-1.5 border border-white/10">Store Tags Go Up</span>
                <span className="text-[#8f978a]">&rarr;</span>
                <span className="rounded bg-white/5 px-2.5 py-1.5 border border-white/10">Outreach Runs</span>
                <span className="text-[#8f978a]">&rarr;</span>
                <span className="rounded bg-white/5 px-2.5 py-1.5 border border-white/10">Wave 2 Survey Closes</span>
                <span className="text-[#8f978a]">&rarr;</span>
                <span className="rounded bg-white/5 px-2.5 py-1.5 border border-white/10 text-emerald-400">Applications Written</span>
              </div>
              <p className="mt-4 text-center text-xs font-semibold text-red-400">
                Warning: This sequence cannot be reversed at any step.
              </p>
            </div>

            <div className="grid gap-0 border-t border-white/10">
              {process.map((step) => (
                <div key={step.n} className="grid gap-4 border-b border-white/10 py-6 lg:grid-cols-[160px_1fr]">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f978a]">Step {step.n}</p>
                    <h3 className="mt-2 font-sans text-2xl font-semibold tracking-[-0.03em] text-[#f3efe5]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="max-w-3xl text-[15px] leading-[1.9] text-[#a6ad9f]">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </DarkBand>

        {/* Roles */}
        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="05 / Team structure" />
            <SectionTitle
              eyebrow="Roles and accountability"
              title={
                <>
                  Defined team roles <Accent>ensure project repeatability.</Accent>
                </>
              }
            />

            <div className="grid gap-0 border-t border-[#e2dbc9]">
              {roles.map((item) => (
                <div key={item.role} className="grid gap-4 border-b border-[#e2dbc9] py-6 lg:grid-cols-[240px_1fr]">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#7c8576]">{item.role}</p>
                  <p className="text-[14px] leading-[1.9] text-[#5a625b]">{item.work}</p>
                </div>
              ))}
            </div>
          </div>
        </LightBand>

        {/* Context strip */}
        <DarkBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="06 / Context" />
            <SectionTitle
              eyebrow="Why the work matters"
              title={
                <>
                  Lagoon seagrass loss <Accent>impacts manatee survival.</Accent>
                </>
              }
              dark
            />

            <div className="max-w-3xl text-[15px] leading-[1.9] text-[#b8afa1]">
              <p>
                In 2021, more than 1,100 manatees died in the Indian River Lagoon. The lagoon spans 156 miles and
                supports thousands of species, which makes the loss feel bigger than a single statistic. BLACKOUT
                exists because the ordinance already on the books should matter in everyday behavior, not just in a
                county code.
              </p>
            </div>
          </div>
        </DarkBand>

        {/* Competition framing */}
        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="07 / Competition framing" />
            <SectionTitle
              eyebrow="Why the same work can win in multiple places"
              title={
                <>
                  One set of facts <Accent>framed for multiple rubrics.</Accent>
                </>
              }
            />

            <div className="grid gap-0 border-t border-[#e2dbc9]">
              {competitionNotes.map((note) => (
                <div key={note} className="border-b border-[#e2dbc9] py-5">
                  <p className="text-[15px] leading-[1.9] text-[#5a625b]">{note}</p>
                </div>
              ))}
            </div>

            <Fade delay={0.12}>
              <div className="mt-10 border-t border-[#e2dbc9] pt-8">
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

        {/* Closing */}
        <DarkBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="08 / Closing" />
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
                <div className="space-y-3 text-[14px] leading-[1.85] text-[#a6ad9f]">
                  {closingPoints.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </Fade>

              <Fade delay={0.08}>
                <div>
                  <h3 className="font-sans text-2xl font-semibold tracking-[-0.03em] text-white">
                    BLACKOUT is a communication project with a civic purpose.
                  </h3>
                  <p className="mt-4 text-[14px] leading-[1.9] text-[#a6ad9f]">
                    The page now carries a different rhythm from the problem page: less stacked structure, more
                    narrative flow, and more room for the image to do work.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/mission"
                      className="inline-flex items-center gap-2 rounded-full bg-[#efe8d6] px-5 py-3 text-sm font-medium text-[#111814] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                    >
                      Read our mission
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
