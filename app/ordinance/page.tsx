'use client'

import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { SiteLayout } from '@/components/site-layout'

const heroImage =
  'https://commons.wikimedia.org/wiki/Special:Redirect/file/Trichechus%20manatus%20latirostris%20underwater%20manatee.jpg'

const stats = [
  { figure: '§ 62-3601 et seq.', label: 'Ordinance citation' },
  { figure: 'Jun 1–Sep 30', label: 'Blackout window' },
  { figure: 'All county properties', label: 'Where it applies' },
  { figure: 'Voluntary compliance', label: 'How it is followed' },
]

const ordinanceSections = [
  {
    title: 'What the ordinance says',
    body:
      'No nitrogen or phosphorus fertilizer on lawns, landscapes, or turf during the blackout period. It is a real county rule, not a campaign slogan.',
  },
  {
    title: 'Why that window matters',
    body:
      'The June-through-September period overlaps with Florida’s rainy season, when runoff risk is highest and nutrients are most likely to reach the lagoon.',
  },
  {
    title: 'What BLACKOUT does',
    body:
      'The project makes the rule visible through surveys, shelf tags, and drain markers so awareness can turn into compliance.',
  },
]

const chain = [
  {
    n: '01',
    title: 'Fertilizer applied',
    body: 'Residents apply nitrogen and phosphorus fertilizer during the summer rainy season when runoff risk is highest.',
  },
  {
    n: '02',
    title: 'Nitrogen mobilized',
    body: 'Rain and storm events mobilize nitrogen across impervious neighborhood surfaces and driveways.',
  },
  {
    n: '03',
    title: 'Untreated runoff',
    body: 'Storm drains carry the untreated residential runoff directly to local lagoon outfall channels.',
  },
  {
    n: '04',
    title: 'Nutrients fuel blooms',
    body: 'Elevated nitrogen levels fuel aggressive cyanobacteria and macroalgal blooms.',
  },
  {
    n: '05',
    title: 'Sunlight blocked',
    body: 'Algal blooms block critical sunlight from reaching the benthic floor, preventing photosynthesis.',
  },
  {
    n: '06',
    title: 'Seagrass dies',
    body: 'Deprived of essential sunlight, the delicate estuarine seagrass beds die off rapidly.',
  },
  {
    n: '07',
    title: 'Manatees starve',
    body: 'Manatees lose their primary food source and experience catastrophic starvation across the lagoon.',
  }
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
        className={`mt-3 max-w-4xl font-sans text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.045em] ${
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

function LineItem({ title, body, dark = false }: { title: string; body: string; dark?: boolean }) {
  return (
    <div className={`grid gap-3 border-b py-6 last:border-b-0 lg:grid-cols-[260px_1fr] ${dark ? 'border-white/10' : 'border-[#e2dbc9]'}`}>
      <h3 className={`font-sans text-xl font-semibold tracking-[-0.03em] ${dark ? 'text-[#f3efe5]' : 'text-[#173027]'}`}>
        {title}
      </h3>
      <p className={`text-[14px] leading-[1.9] ${dark ? 'text-[#b8afa1]' : 'text-[#5a625b]'}`}>{body}</p>
    </div>
  )
}

function SmallStat({ figure, label, dark = false }: { figure: string; label: string; dark?: boolean }) {
  return (
    <div className={`py-4 ${dark ? 'border-white/10' : 'border-[#e2dbc9]'}`}>
      <p className={`text-[10px] uppercase tracking-[0.18em] ${dark ? 'text-[#8f978a]' : 'text-[#7c8576]'}`}>{label}</p>
      <p className={`mt-2 text-[clamp(1.8rem,4vw,2.5rem)] font-semibold tracking-[-0.05em] tabular-nums ${dark ? 'text-[#f3efe5]' : 'text-[#111814]'}`}>
        {figure}
      </p>
    </div>
  )
}

export default function OrdinancePage() {
  const [loaded, setLoaded] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <SiteLayout>
      <main className="overflow-hidden bg-[#f6f1e7] text-[#111814] selection:bg-[#d9cfb6] selection:text-[#111814] font-sans">
        {/* HERO */}
        <section id="top" className="relative isolate overflow-hidden bg-[#060807] text-white">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${heroImage})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(163,177,138,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_22%),linear-gradient(180deg,#0a0f0d_0%,#050706_100%)]" />
          <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060807] via-[#060807]/82 to-[#060807]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060807] via-transparent to-transparent" />

          <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <Fade y={10}>
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#8f978a]">03 / The Ordinance</p>
            </Fade>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
              <div className="max-w-3xl">
                <Fade delay={0.05}>
                  <h1 className="max-w-3xl font-sans text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-[#f4efe5]">
                    No fertilizer from <Accent>June 1 to September 30.</Accent>
                  </h1>
                </Fade>

                <Fade delay={0.12}>
                  <p className="mt-6 max-w-xl text-[1.05rem] leading-8 text-[#c1c8ba]">
                    A law that protects manatees already exists. Almost nobody in Brevard County knows it is there.
                  </p>
                </Fade>

                <Fade delay={0.18}>
                  <p className="mt-4 max-w-xl text-base leading-7 text-[#9fa79a]">
                    BLACKOUT makes the ordinance visible, understandable, and easier to follow.
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
                      href="/about"
                      className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                    >
                      About BLACKOUT
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
                    style={{ backgroundImage: `url(${heroImage})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050706] via-transparent to-transparent" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />
                </div>
                <div className="border-t border-white/10 px-6 py-5">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f978a]">Underwater manatee</p>
                  <p className="mt-2 text-sm leading-7 text-[#f3efe5]">
                    Brevard County's ordinance legally prohibits nitrogen and phosphorus fertilizers from June 1 to September 30.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What it says */}
        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="01 / What it says" />
            <SectionTitle eyebrow="Plain language" title={<>Brevard County set rules. <Accent>Do residents know they exist?</Accent></>} />
            <div className="mt-8 border-t border-[#e2dbc9]">
              {ordinanceSections.map((item, index) => (
                <Fade key={item.title} delay={index * 0.06}>
                  <LineItem title={item.title} body={item.body} />
                </Fade>
              ))}
            </div>
          </div>
        </LightBand>

        {/* Context */}
        <DarkBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="02 / Context" />
            <SectionTitle eyebrow="Why it matters" title={<>The lagoon seagrass loss <Accent>impacts manatee survival.</Accent></>} dark />
            <div className="mt-8 border-t border-white/10">
              {stats.map((stat, index) => (
                <Fade key={stat.label} delay={index * 0.04}>
                  <div className="grid gap-4 border-b border-white/10 py-6 lg:grid-cols-[1fr_1.4fr] lg:gap-8">
                    <SmallStat figure={stat.figure} label={stat.label} dark />
                    <p className="self-end text-[14px] leading-[1.9] text-[#b8afa1]">
                      {index === 0 && 'In 2021, the lagoon saw one of the worst manatee die-offs on record.'}
                      {index === 1 && 'Lagoon seagrass has not fully recovered from earlier bloom-driven losses.'}
                      {index === 2 && 'Stormwater infrastructure moves runoff into the watershed before it can be treated.'}
                      {index === 3 && 'The estuary supports thousands of species and a major part of the regional economy.'}
                    </p>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </DarkBand>

        {/* Causal chain */}
        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="03 / Causal chain" />
            <SectionTitle eyebrow="How the problem moves" title={<>A seven-step chain, <Accent>completely reversible.</Accent></>} />
            <div className="mt-8 border-t border-[#e2dbc9]">
              {chain.map((step, index) => (
                <Fade key={step.n} delay={index * 0.05}>
                  <div className="grid gap-4 border-b border-[#e2dbc9] py-6 lg:grid-cols-[160px_1fr] lg:gap-8">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#7c8576]">Step {step.n}</p>
                      <h3 className="mt-2 font-sans text-2xl font-semibold tracking-[-0.03em] text-[#173027]">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-[15px] leading-[1.9] text-[#5a625b]">{step.body}</p>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </LightBand>

        {/* Intervention */}
        <DarkBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="04 / Intervention" />
            <SectionTitle eyebrow="What BLACKOUT does" title={<>We intervene at step one <Accent>to change outcomes.</Accent></>} dark />

            <div className="max-w-3xl space-y-6 text-[15px] leading-[1.9] text-[#b8afa1]">
              <p>
                The project does not try to fix the lagoon with a slogan. It makes the ordinance visible at the moment people need to make a fertilizer decision.
              </p>
              <p>
                Surveys measure awareness before and after. Shelf tags place the rule at point of purchase. Drain markers connect ordinary runoff to lagoon harm.
              </p>
              <p>
                The work is designed to be reusable, so a county partner or future student team can continue it without rebuilding the whole system.
              </p>
            </div>
          </div>
        </DarkBand>

        {/* Why it works */}
        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="05 / Why it works" />
            <SectionTitle eyebrow="Three ideas" title={<>BLACKOUT is built around <Accent>visibility, evidence, and continuity</Accent>.</>} />
            <div className="mt-8 border-t border-[#e2dbc9]">
              {principles.map((item) => (
                <Fade key={item.title}>
                  <LineItem title={item.title} body={item.body} />
                </Fade>
              ))}
            </div>
          </div>
        </LightBand>

        {/* How it unfolds */}
        <DarkBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="06 / How it unfolds" />
            <SectionTitle eyebrow="A simple sequence" title={<>A structured project sequence <Accent>that cannot be reversed.</Accent></>} dark />
            <div className="mt-8 border-t border-white/10">
              {process.map((step) => (
                <Fade key={step.n}>
                  <div className="grid gap-4 border-b border-white/10 py-6 lg:grid-cols-[160px_1fr] lg:gap-8">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f978a]">Step {step.n}</p>
                      <h3 className="mt-2 font-sans text-2xl font-semibold tracking-[-0.03em] text-[#f3efe5]">
                        {step.title}
                      </h3>
                    </div>
                    <p className="max-w-3xl text-[15px] leading-[1.9] text-[#a6ad9f]">{step.body}</p>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </DarkBand>

        {/* Team structure */}
        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="07 / Team structure" />
            <SectionTitle eyebrow="Roles and accountability" title={<>Defined team roles <Accent>ensure project repeatability.</Accent></>} />
            <div className="mt-8 border-t border-[#e2dbc9]">
              {roles.map((item) => (
                <Fade key={item.role}>
                  <div className="grid gap-4 border-b border-[#e2dbc9] py-6 lg:grid-cols-[220px_1fr] lg:gap-8">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#7c8576]">{item.role}</p>
                    <p className="text-[14px] leading-[1.9] text-[#5a625b]">{item.work}</p>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </LightBand>

        {/* Competition framing */}
        <DarkBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="08 / Competition framing" />
            <SectionTitle eyebrow="Why the same work can win in multiple places" title={<>One set of facts <Accent>framed for multiple rubrics.</Accent></>} dark />

            <div className="max-w-3xl space-y-6 text-[15px] leading-[1.9] text-[#b8afa1]">
              {competitionNotes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>

            <div className="mt-10 border-t border-white/10 pt-8">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f978a]">Writing system</p>
              <p className="mt-3 max-w-3xl text-[15px] leading-[1.9] text-[#b8afa1]">
                The guide recommends writing a reusable paragraph library once, then adapting the same material for each application instead of rebuilding every submission from scratch. That keeps the work cleaner and avoids the generic, overworked feel that comes from forcing the same information into a new shape every time.
              </p>
            </div>
          </div>
        </DarkBand>

        {/* Closing */}
        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="09 / Closing" />
            <SectionTitle eyebrow="Closing" title={<>A civic project <Accent>built with operational discipline.</Accent></>} />

            <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
              <div className="space-y-3 text-[14px] leading-[1.85] text-[#5a625b]">
                {closingPoints.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>

              <div>
                <h3 className="font-sans text-2xl font-semibold tracking-[-0.03em] text-[#173027]">
                  BLACKOUT is a communication project with a civic purpose.
                </h3>
                <p className="mt-4 text-[14px] leading-[1.9] text-[#5a625b]">
                  This page now has its own identity: an image-led hero, clean alternating bands, and fewer boxed sections. It feels related to the rest of the site without copying the Problem page.
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
                    href="/about"
                    className="inline-flex items-center gap-2 rounded-full border border-[#e2dbc9] bg-white/60 px-5 py-3 text-sm font-medium text-[#173027] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                  >
                    About BLACKOUT
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
