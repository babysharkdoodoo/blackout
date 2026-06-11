// app/team/team-page-client.tsx
'use client'

import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { SiteLayout } from '@/components/site-layout'

const heroBg =
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80'

const stats = [
  { k: 'Team', v: '5 students + 1 parent volunteer' },
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
    work: 'Owns the timeline, county correspondence, team coordination, and CmPS proposal management.',
    deliverables: 'Master schedule, county liaison contact, competition submission package.',
  },
  {
    role: 'Survey Lead',
    work: 'Builds both survey waves, manages distribution, tracks responses, and produces the compliance gap analysis.',
    deliverables: 'Wave 1 dataset, Wave 2 dataset, pre/post compliance gap report.',
  },
  {
    role: 'Retail Partnership Lead',
    work: 'Recruits stores, secures signed agreements, and manages the Manatee Safe shelf tag rollout.',
    deliverables: '4 to 6 signed agreements, weekly reach logs, end-of-season partner summary.',
  },
  {
    role: 'Field Operations Lead',
    work: 'Maps drains, logs GPS data, calculates mortality distance, and runs the marking sessions.',
    deliverables: 'Geodatabase with 30 to 40 entries, photo archive, county data package.',
  },
  {
    role: 'Documentation Lead',
    work: 'Keeps the drive organized, uploads photos, and adapts the same evidence into multiple applications.',
    deliverables: 'Complete documentation set, handoff meeting recording, replication guide.',
  },
]

const competitions = [
  { name: 'CmPS', note: 'Primary submission portfolio' },
  { name: 'HOSA', note: 'Health & environmental track' },
  { name: 'Earth Prize', note: 'Global sustainability' },
  { name: 'EPA PEYA', note: 'Presidential award' },
  { name: 'GENIUS Olympiad', note: 'International ecology' },
  { name: 'Roots & Shoots', note: 'Jane Goodall Institute' },
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

export function TeamPageClient() {
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#060807] via-[#060807]/82 to-[#060807]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060807] via-transparent to-transparent" />

          <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <Fade y={10}>
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#8f978a]">
                07 / Team
              </p>
            </Fade>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
              <div className="max-w-3xl">
                <Fade delay={0.05}>
                  <h1 className="max-w-5xl font-sans text-[clamp(3.25rem,6vw,6.25rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-[#f4efe5]">
                    Five students.
                    <br />
                    Defined roles.
                    <br />
                    <Accent>No ambiguity.</Accent>
                  </h1>
                </Fade>

                <Fade delay={0.12}>
                  <p className="mt-6 max-w-xl text-[1.05rem] leading-8 text-[#c1c8ba]">
                    BLACKOUT runs on a strict accountability structure. Every team member owns specific deliverables, and every deliverable is tied to the operational sequence.
                  </p>
                </Fade>

                <Fade delay={0.18}>
                  <p className="mt-4 max-w-xl text-base leading-7 text-[#9fa79a]">
                    The page is designed to feel calm and organized, with the same rounded, image-led system used across the rest of the site.
                  </p>
                </Fade>

                <Fade delay={0.24}>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href="/about"
                      className="group inline-flex items-center gap-2 rounded-full bg-[#efe8d6] px-5 py-3 text-sm font-medium text-[#111814] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
                    >
                      About the campaign
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                        →
                      </span>
                    </Link>
                    <Link
                      href="/mission"
                      className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                    >
                      Our mission
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
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f978a]">Quiet Observation</p>
                  <p className="mt-2 text-sm leading-7 text-[#f3efe5]">
                    A collaborative student team working together to document and submit a civic science project.
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
            <SectionTitle
              eyebrow="Core structure"
              title={<>A few simple facts about <Accent>the team</Accent>.</>}
            />

            <div className="mt-8 border-t border-[#e2dbc9]">
              {stats.map((item, index) => (
                <Fade key={item.k} delay={0.04 * index}>
                  <Row
                    left={item.k}
                    right={
                      <span className="text-[16px] font-medium text-[#173027]">
                        {item.v}
                      </span>
                    }
                  />
                </Fade>
              ))}
            </div>
          </div>
        </LightBand>

        {/* Roles */}
        <DarkBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="02 / Roles" />
            <SectionTitle
              eyebrow="Accountability structure"
              title={<>Every role leads to <Accent>a deliverable</Accent>.</>}
              dark
            />

            <div id="roles" className="grid gap-0 border-t border-white/10">
              {roles.map((member, index) => (
                <Fade key={member.role} delay={index * 0.04}>
                  <div className="grid gap-4 border-b border-white/10 py-6 lg:grid-cols-[220px_1fr_1fr] lg:gap-8">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[#8f978a]">
                        {member.role}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[#8f978a]">Work</p>
                      <p className="mt-2 text-[14px] leading-[1.9] text-[#b8afa1]">
                        {member.work}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[#8f978a]">Deliverables</p>
                      <p className="mt-2 text-[14px] leading-[1.9] text-[#b8afa1]">
                        {member.deliverables}
                      </p>
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </DarkBand>

        {/* Context */}
        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="03 / Institutional context" />
            <SectionTitle
              eyebrow="Why it matters"
              title={<>Student project with <Accent>professional standards</Accent>.</>}
            />

            <div
              id="context"
              className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:items-start"
            >
              <div className="space-y-6 text-[15px] leading-[1.9] text-[#5a625b]">
                <Fade>
                  <div>
                    <p className="text-[#173027] text-[18px] font-semibold tracking-[-0.02em]">
                      West Shore Jr./Sr. High School
                    </p>
                    <p className="mt-1 text-[13px] font-medium tracking-wide text-[#6f8167]">
                      Melbourne, Brevard County, FL
                    </p>
                  </div>
                </Fade>
                <Fade delay={0.06}>
                  <p>
                    West Shore is a magnet school with a long record of student success in competitive academic programs, including science research, HOSA, and environmental project competitions.
                  </p>
                </Fade>
                <Fade delay={0.12}>
                  <p>
                    BLACKOUT is the school’s first civic-science field initiative engineered to operate explicitly at the county government level.
                  </p>
                </Fade>
              </div>

              <Fade delay={0.1}>
                <div className="rounded-[2rem] border border-[#e2dbc9] bg-white/70 p-6 lg:p-8">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#6f8167]">
                    Operational facts
                  </p>
                  <div className="mt-5 border-t border-[#e2dbc9]">
                    <Row left="Field season" right="June 1 to Sept 30, 2026" />
                    <Row left="Jurisdiction" right="Brevard County" />
                    <Row left="Watershed" right="Indian River Lagoon" />
                  </div>
                </div>
              </Fade>
            </div>
          </div>
        </LightBand>

        {/* Principles */}
        <DarkBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="04 / Operating principles" />
            <SectionTitle
              eyebrow="Method and tone"
              title={<>Student-led work with <Accent>professional-grade standards</Accent>.</>}
              dark
            />

            <div className="grid gap-0 border-t border-white/10">
              {principles.map((item) => (
                <div
                  key={item.title}
                  className="grid gap-4 border-b border-white/10 py-6 lg:grid-cols-[240px_1fr] lg:gap-8"
                >
                  <h3 className="font-sans text-xl font-semibold tracking-[-0.03em] text-[#f3efe5]">
                    {item.title}
                  </h3>
                  <p className="text-[14px] leading-[1.9] text-[#b8afa1]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </DarkBand>

        {/* Process */}
        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="05 / Sequence" />
            <SectionTitle
              eyebrow="How the work unfolds"
              title={<>Identify the gap, make it visible, <Accent>leave something usable</Accent>.</>}
            />

            <div className="grid gap-0 border-t border-[#e2dbc9]">
              {process.map((step) => (
                <div
                  key={step.n}
                  className="grid gap-4 border-b border-[#e2dbc9] py-6 lg:grid-cols-[160px_1fr] lg:gap-8"
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#7c8576]">
                      Step {step.n}
                    </p>
                    <h3 className="mt-2 font-sans text-2xl font-semibold tracking-[-0.03em] text-[#173027]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="max-w-3xl text-[15px] leading-[1.9] text-[#5a625b]">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </LightBand>

        {/* Competition */}
        <DarkBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="06 / Competition portfolio" />
            <SectionTitle
              eyebrow="Where the same work fits"
              title={<>Same evidence, <Accent>multiple competition destinations</Accent>.</>}
              dark
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {competitions.map((comp) => (
                <div
                  key={comp.name}
                  className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5"
                >
                  <p className="text-[14px] font-semibold tracking-tight text-[#f3efe5]">
                    {comp.name}
                  </p>
                  <p className="mt-2 text-[12px] leading-[1.8] text-[#a6ad9f]">{comp.note}</p>
                </div>
              ))}
            </div>
          </div>
        </DarkBand>

        {/* Closing */}
        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="07 / Closing" />
            <SectionTitle
              eyebrow="Closing"
              title={<>Team page feels calm, specific, <Accent>and capable</Accent>.</>}
            />

            <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
              <div className="space-y-3 text-[14px] leading-[1.85] text-[#5a625b]">
                <p>Every deliverable has a named owner.</p>
                <p>Every field activity has a protocol.</p>
                <p>Every dataset has a methodology note.</p>
                <p>Every partner interaction is logged.</p>
              </div>

              <div>
                <h3 className="font-sans text-2xl font-semibold tracking-[-0.03em] text-[#173027]">
                  The goal is to make the county see a complete program, not a school assignment.
                </h3>
                <p className="mt-4 text-[14px] leading-[1.9] text-[#5a625b]">
                  This version stays consistent with the rest of the site: image-led hero, rounded corners, softer motion, and less card-heavy structure.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 rounded-full bg-[#efe8d6] px-5 py-3 text-sm font-medium text-[#111814] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                  >
                    About the campaign
                    <span aria-hidden>→</span>
                  </Link>
                  <Link
                    href="/mission"
                    className="inline-flex items-center gap-2 rounded-full border border-[#e2dbc9] bg-white/60 px-5 py-3 text-sm font-medium text-[#173027] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                  >
                    Our mission
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