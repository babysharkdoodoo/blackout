'use client'

import Link from 'next/link'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { SiteLayout } from '@/components/site-layout'

const heroImages = [
  {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Indian%20River%20Lagoon%20Area.jpg',
    label: 'Indian River Lagoon',
  },
  {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Floridian%20seagrass%20bed.jpg',
    label: 'Seagrass beds',
  },
  {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Manatee%20photo.jpg',
    label: 'Manatee habitat',
  },
  {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Storm%20Drain.JPG',
    label: 'Storm drain pathway',
  },
]

const snapshot = [
  {
    value: '5',
    label: 'student roles',
  },
  {
    value: '100 - 150',
    label: 'households in the survey zone',
  },
  {
    value: '30 - 40',
    label: 'storm drains marked and logged',
  },
  {
    value: '4 - 6',
    label: 'retail partners targeted',
  },
]

const projectScope = [
  {
    label: 'Wave 1 survey',
    value: 'Baseline awareness audit before any public outreach begins.',
  },
  {
    label: 'Retail placement',
    value: 'Shelf tags beside fertilizer during the blackout window.',
  },
  {
    label: 'Drain marking',
    value: 'GPS-logged storm drain markers in the same campaign zone.',
  },
  {
    label: 'County handoff',
    value: 'Survey tools, tag files, drain database, photos, and protocol documents.',
  },
]

const sequence = [
  'Wave 1 survey closes before any drain marking or store tags.',
  'Drain markers and shelf tags go live only after the baseline is protected.',
  'Outreach runs through the blackout window.',
  'Wave 2 measures whether awareness changed in the same neighborhood zone.',
  'The final handoff package gives the County a repeatable system.',
]

const problemStats = [
  {
    figure: '1,100+',
    label: 'manatee deaths recorded during the 2021 crisis',
  },
  {
    figure: '156 mi',
    label: 'length of the Indian River Lagoon',
  },
  {
    figure: '4,300+',
    label: 'species supported by the estuary',
  },
  {
    figure: 'June 1 - Sept. 30',
    label: 'fertilizer blackout window',
  },
]

const causalChain = [
  {
    title: 'Fertilizer is applied',
    body: 'Nitrogen and phosphorus are placed on lawns during the rainy season.',
  },
  {
    title: 'Rain moves it',
    body: 'Stormwater carries nutrients from pavement and yards into drains and canals.',
  },
  {
    title: 'Blooms expand',
    body: 'Excess nutrients feed algal growth that blocks light from reaching seagrass.',
  },
  {
    title: 'Seagrass disappears',
    body: 'Without healthy seagrass beds, manatees lose a primary food source.',
  },
]

const prongs = [
  {
    number: '01',
    title: 'Survey',
    body: 'Measure what residents know before outreach begins, then measure again after the campaign. The survey makes the awareness gap visible instead of assumed.',
    detail: 'Two-wave neighborhood audit',
  },
  {
    number: '02',
    title: 'Intercept',
    body: 'Place ordinance reminders beside fertilizer products, where residents are closest to making the decision the rule is meant to prevent.',
    detail: 'Point-of-purchase shelf tags',
  },
  {
    number: '03',
    title: 'Mark',
    body: 'Put the message at the storm drain, where lawn behavior becomes runoff. Each marker connects the ordinance to a real local pathway.',
    detail: 'GPS-logged drain markers',
  },
]

const roles = [
  {
    title: 'Project Lead',
    body: 'Owns the timeline, meeting structure, public correspondence, and final handoff coordination.',
  },
  {
    title: 'Survey Lead',
    body: 'Builds the survey instruments, manages door-to-door logistics, and analyzes the pre/post awareness data.',
  },
  {
    title: 'Retail Lead',
    body: 'Contacts stores, secures partner agreements, places shelf tags, and tracks estimated customer reach.',
  },
  {
    title: 'Field Lead',
    body: 'Selects drains, records GPS coordinates, manages installation sessions, and maintains the drain database.',
  },
  {
    title: 'Documentation Lead',
    body: 'Organizes photos, files, meeting notes, partner letters, website updates, and the final handoff archive.',
  },
]

const documentation = [
  {
    title: 'Survey data',
    body: 'Raw responses, response totals, street coverage, and the final awareness-change analysis.',
  },
  {
    title: 'Retail records',
    body: 'Store names, signed agreements, tag counts, shelf photos, and estimated weekly reach.',
  },
  {
    title: 'Drain database',
    body: 'Drain IDs, GPS coordinates, before/after photos, installation dates, and site notes.',
  },
  {
    title: 'Photo archive',
    body: 'Timestamped proof of field activity, organized by survey, retail, and drain marking sessions.',
  },
  {
    title: 'Handoff package',
    body: 'Everything needed for Brevard County or a future team to repeat the project without rebuilding it.',
  },
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
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

function LightSection({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <section
      id={id}
      className="bg-[#f7f2e8] px-6 py-16 text-[#173027] sm:px-10 sm:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

function DarkSection({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <section
      id={id}
      className="bg-[#07100d] px-6 py-16 text-white sm:px-10 sm:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

function Eyebrow({
  children,
  dark = false,
}: {
  children: ReactNode
  dark?: boolean
}) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.22em] ${dark ? 'text-[#a8b98c]' : 'text-[#6f8167]'
        }`}
    >
      {children}
    </p>
  )
}

function SectionHeading({
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
        <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
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

function Pill({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`rounded-full border px-3 py-1.5 text-xs ${dark
          ? 'border-white/12 bg-white/[0.04] text-white/58'
          : 'border-[#ded6c8] bg-[#fbf8f1] text-[#5e665d]'
        }`}
    >
      {children}
    </span>
  )
}

function Hero() {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduceMotion) return

    const timer = window.setInterval(() => {
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
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{
              opacity: 0.34,
              scale: reduceMotion ? 1 : 1.07,
            }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1 },
              scale: { duration: 5.2, ease: 'easeOut' },
            }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-r from-[#07100d] via-[#07100d]/80 to-[#07100d]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07100d] via-transparent to-[#07100d]/20" />
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.09, delayChildren: 0.12 }}
        className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-6 sm:px-10 lg:px-12"
      >
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#b9c89c]"
        >
          About BLACKOUT
        </motion.p>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl text-[clamp(2.8rem,8vw,5.85rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-[#f5efe3]"
        >
          A law on paper.
          <br />
          A system in public.
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-[clamp(1rem,2vw,1.25rem)] leading-[1.5] text-white/70"
        >
          BLACKOUT activates Brevard County’s Summer Fertilizer Blackout Ordinance
          through surveys, retail reminders, storm drain markers, and a handoff
          package the County can keep using.
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href="#foundation"
            className="inline-flex items-center justify-center rounded-full bg-[#f5efe3] px-6 py-3 text-sm font-semibold text-[#07100d] transition hover:bg-white"
          >
            Read the foundation
          </Link>

          <Link
            href="#model"
            className="inline-flex items-center justify-center rounded-full border border-white/18 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/35 hover:text-white"
          >
            See the field model
          </Link>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex max-w-2xl flex-wrap gap-2"
        >
          <Pill dark>June 1 - Sept. 30</Pill>
          <Pill dark>Survey → stores → storm drains</Pill>
          <Pill dark>Built for handoff</Pill>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-6 left-6 right-6 z-10 mx-auto flex max-w-6xl items-center justify-between text-xs text-white/42 sm:left-10 sm:right-10 lg:left-12 lg:right-12">
        <AnimatePresence mode="wait">
          <motion.span
            key={activeImage.label}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
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

export function AboutPageClient() {
  return (
    <SiteLayout>
      <main className="overflow-hidden bg-[#f7f2e8] font-sans text-[#173027] selection:bg-[#d8d0c2] selection:text-[#07100d]">
        <Hero />

        <LightSection id="snapshot">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <SectionHeading
              eyebrow="Snapshot"
              title="The project in one view."
              body="BLACKOUT is a field implementation project. It does not try to solve the entire lagoon crisis at once. It targets one controllable behavior, one existing ordinance, and one local pathway where awareness can change action."
            />

            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-[#ded6c8] bg-[#ded6c8]">
                {snapshot.map((item) => (
                  <div key={item.label} className="bg-[#fbf8f1] p-5 sm:p-6">
                    <p className="text-[2rem] font-semibold leading-none tracking-[-0.06em] tabular-nums sm:text-[2.45rem]">
                      {item.value}
                    </p>
                    <p className="mt-3 max-w-[11rem] text-sm leading-6 text-[#657064]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <div className="mt-12 border-t border-[#ded6c8] pt-8">
              <p className="max-w-3xl text-[clamp(1.3rem,3vw,1.95rem)] font-semibold leading-tight tracking-[-0.04em]">
                The project is built around a simple distinction: the ordinance
                already exists, but the public system around it is weak.
              </p>
            </div>
          </Reveal>
        </LightSection>

        <DarkSection id="foundation">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start lg:gap-16">
            <SectionHeading
              dark
              eyebrow="Foundation"
              title="The solution is already written. BLACKOUT makes it operational."
              body="Brevard County restricts nitrogen and phosphorus fertilizer use during the rainy season. BLACKOUT turns that legal rule into a visible public system: first by measuring awareness, then by intervening where fertilizer decisions happen, then by marking the runoff pathway."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl bg-[#f5efe3] p-6 text-[#07100d] sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#607357]">
                  Mission
                </p>

                <p className="mt-3 text-[1.4rem] font-semibold leading-tight tracking-[-0.04em]">
                  Protect manatees and seagrass by activating the fertilizer
                  ordinance through original auditing, retail reminders, drain
                  marking, and a clean county handoff.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-8 border-t border-white/10 pt-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <div>
                <Eyebrow dark>Non-negotiable sequence</Eyebrow>
                <p className="mt-4 max-w-sm text-[1.5rem] font-semibold leading-tight tracking-[-0.04em] text-[#f5efe3]">
                  The baseline comes first. Everything else follows.
                </p>
              </div>
            </Reveal>

            <div className="divide-y divide-white/10 border-y border-white/10">
              {sequence.map((item, index) => (
                <Reveal key={item} delay={index * 0.04}>
                  <div className="grid gap-3 py-5 sm:grid-cols-[3rem_1fr] sm:gap-5">
                    <p className="font-mono text-xs text-[#a8b98c]">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <p className="text-sm leading-7 text-white/62">{item}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </DarkSection>

        <LightSection id="scope">
          <SectionHeading
            eyebrow="Project scope"
            title="A focused field system, not a generic campaign."
            body="The project works because each activity has a specific measurement. Survey responses show what residents know. Store tags show retail reach. Drain markers create a physical infrastructure record. The handoff package keeps the work from disappearing when the field season ends."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {projectScope.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.05}>
                <div className="h-full rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
                    {item.label}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[#5e665d]">
                    {item.value}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </LightSection>

        <DarkSection id="problem">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
            <SectionHeading
              dark
              eyebrow="Why it matters"
              title="The lagoon crisis is ecological, but the first intervention is behavioral."
              body="Excess nitrogen and phosphorus do not begin in the lagoon. They begin on land, often as ordinary lawn decisions made without awareness of the blackout window. BLACKOUT targets that first decision point before nutrients enter the stormwater system."
            />

            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10">
                {problemStats.map((item) => (
                  <div key={item.label} className="bg-white/[0.035] p-5 sm:p-6">
                    <p className="text-[1.8rem] font-semibold leading-none tracking-[-0.06em] text-[#f5efe3] tabular-nums sm:text-[2.2rem]">
                      {item.figure}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/56">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-8 border-t border-white/10 pt-10 lg:grid-cols-[0.55fr_1fr] lg:gap-16">
            <Reveal>
              <div>
                <Eyebrow dark>Causal chain</Eyebrow>
                <p className="mt-4 max-w-sm text-[1.5rem] font-semibold leading-tight tracking-[-0.04em] text-[#f5efe3]">
                  BLACKOUT attacks the chain before the nutrient leaves the lawn.
                </p>
              </div>
            </Reveal>

            <div className="divide-y divide-white/10 border-y border-white/10">
              {causalChain.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.05}>
                  <div className="grid gap-4 py-6 sm:grid-cols-[3rem_1fr] sm:gap-6">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#a8b98c]/12 text-sm font-semibold text-[#a8b98c]">
                      {index + 1}
                    </div>

                    <div>
                      <h3 className="text-[1.12rem] font-semibold tracking-[-0.025em] text-[#f5efe3]">
                        {item.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-white/58">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </DarkSection>

        <LightSection id="model">
          <SectionHeading
            eyebrow="Field model"
            title="Three contacts. One ordinance. One neighborhood system."
            body="The three prongs target different failure points in the same behavior chain. The survey identifies the knowledge gap. The shelf tag appears at the purchase decision. The drain marker makes runoff visible at the physical pathway."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {prongs.map((item, index) => (
              <Reveal key={item.number} delay={index * 0.06}>
                <div className="h-full rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] p-6 transition hover:-translate-y-0.5 hover:border-[#b7c5aa] hover:bg-white">
                  <p className="font-mono text-xs text-[#6f8167]">
                    {item.number}
                  </p>

                  <h3 className="mt-5 text-[1.25rem] font-semibold tracking-[-0.035em] text-[#173027]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#5e665d]">
                    {item.body}
                  </p>

                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#6f8167]">
                    {item.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </LightSection>

        <DarkSection id="team">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <SectionHeading
              dark
              eyebrow="Team structure"
              title="A small team with clear ownership."
              body="The project is divided by deliverable, not by vague titles. Each role owns a part of the system and produces records that can be checked later: surveys, partnerships, drain logs, photos, files, and handoff materials."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:p-7">
                <div className="border-b border-white/10 pb-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a8b98c]">
                    Role map
                  </p>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-white/56">
                    Five roles, each tied to a concrete field or documentation output.
                  </p>
                </div>

                <div>
                  {roles.map((role, index) => (
                    <div
                      key={role.title}
                      className="grid gap-3 border-b border-white/10 py-5 last:border-b-0 sm:grid-cols-[3rem_10rem_1fr] sm:gap-5"
                    >
                      <p className="font-mono text-xs text-[#a8b98c]">
                        {String(index + 1).padStart(2, '0')}
                      </p>

                      <p className="text-sm font-semibold text-[#f5efe3]">
                        {role.title}
                      </p>

                      <p className="max-w-2xl text-sm leading-7 text-white/58">
                        {role.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.18}>
            <div className="mt-12 border-t border-white/10 pt-8">
              <p className="max-w-3xl text-[clamp(1.35rem,3vw,2rem)] font-semibold leading-tight tracking-[-0.04em] text-[#f5efe3]">
                The structure is intentionally simple: assign ownership, document
                the work, and make every output useful beyond the student team.
              </p>
            </div>
          </Reveal>
        </DarkSection>

        <LightSection id="documentation">
          <SectionHeading
            eyebrow="Documentation"
            title="The work only matters if it survives the season."
            body="BLACKOUT is built to leave behind a record. Every field activity creates evidence: raw data, photos, coordinates, agreements, notes, and final files that someone else can actually use."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {documentation.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <div className="h-full rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
                    {item.title}
                  </p>

                  <p className="mt-4 text-sm leading-7 text-[#5e665d]">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.16}>
            <div className="mt-12 rounded-3xl bg-[#173027] p-6 text-[#f7f2e8] sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a8b98c]">
                Documentation rule
              </p>

              <p className="mt-3 max-w-3xl text-[1.45rem] font-semibold leading-tight tracking-[-0.04em]">
                Log the field record at the site, before leaving. Memory is not a
                documentation system.
              </p>
            </div>
          </Reveal>
        </LightSection>

        <DarkSection id="handoff">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start lg:gap-16">
            <SectionHeading
              dark
              eyebrow="Handoff"
              title="The finish line is not attention. It is transfer."
              body="The final product is a program Brevard County or a future student team can run again: same survey structure, same tag template, same drain logging protocol, same field sequence, and the same ordinance-centered message."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl bg-[#f5efe3] p-6 text-[#07100d] sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#607357]">
                  End state
                </p>

                <p className="mt-3 text-[1.45rem] font-semibold leading-tight tracking-[-0.04em]">
                  A documented, repeatable ordinance-awareness system that can
                  continue without the original team.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Pill>Survey instrument</Pill>
                  <Pill>Drain database</Pill>
                  <Pill>Retail tag files</Pill>
                  <Pill>Photo archive</Pill>
                  <Pill>Field protocol</Pill>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.18}>
            <div className="mt-12 border-t border-white/10 pt-8">
              <p className="max-w-3xl text-[clamp(1.35rem,3vw,2rem)] font-semibold leading-tight tracking-[-0.04em] text-[#f5efe3]">
                BLACKOUT is not asking for a new law. It is asking whether an
                existing law can become visible enough to change behavior.
              </p>
            </div>
          </Reveal>
        </DarkSection>

        <LightSection id="contact">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <SectionHeading
              eyebrow="Next step"
              title="From ordinance to everyday behavior."
              body="The project succeeds when residents encounter the blackout window before they buy, apply, or wash fertilizer into the stormwater system. That is the practical gap BLACKOUT is built to close."
            />

            <Reveal delay={0.1}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Link
                  href="#foundation"
                  className="group block rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] p-6 transition hover:-translate-y-0.5 hover:border-[#b7c5aa] hover:bg-white"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
                    Start here
                  </p>
                  <p className="mt-5 text-[1.25rem] font-semibold tracking-[-0.035em] text-[#173027]">
                    Read the foundation
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#5e665d]">
                    Understand the ordinance, sequence, and logic behind the project.
                  </p>
                  <p className="mt-6 text-sm text-[#6f8167] transition group-hover:translate-x-0.5">
                    Go to foundation →
                  </p>
                </Link>

                <Link
                  href="#model"
                  className="group block rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] p-6 transition hover:-translate-y-0.5 hover:border-[#b7c5aa] hover:bg-white"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
                    Field system
                  </p>
                  <p className="mt-5 text-[1.25rem] font-semibold tracking-[-0.035em] text-[#173027]">
                    See the three prongs
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#5e665d]">
                    Follow the survey, retail, and storm drain intervention model.
                  </p>
                  <p className="mt-6 text-sm text-[#6f8167] transition group-hover:translate-x-0.5">
                    Go to model →
                  </p>
                </Link>
              </div>
            </Reveal>
          </div>
        </LightSection>
      </main>
    </SiteLayout>
  )
}