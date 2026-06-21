'use client'

import Link from 'next/link'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { SiteLayout } from '@/components/site-layout'

const heroImages = [
  {
    src: '/heroes/about-1.webp',
    label: 'Seagrass research',
  },
  {
    src: '/heroes/about-2.webp',
    label: 'Florida seagrass',
  },
  {
    src: '/heroes/about-3.webp',
    label: 'Neighborhood street',
  },
  {
    src: '/heroes/about-4.webp',
    label: 'Stormwater basin',
  },
]

const snapshot = [
  {
    value: 'Defined',
    label: 'student role ownership',
  },
  {
    value: '100 - 150',
    label: 'households in the survey zone',
  },
  {
    value: '30 - 40',
    label: 'storm drains approved for marking',
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
    value: 'City-approved storm drain markers being planned in the same campaign zone.',
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
  'The final handoff package is planned to give the County a repeatable system.',
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
    body: 'Nitrogen and phosphorus can be placed on lawns during the rainy season.',
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
    body: 'Measure what residents know before outreach begins, then measure again after the campaign sequence. The survey makes the awareness gap visible instead of assumed.',
    detail: 'Two-wave neighborhood audit',
  },
  {
    number: '02',
    title: 'Intercept',
    body: 'Prepare ordinance reminders beside fertilizer products, where residents are closest to making the decision the rule is meant to prevent.',
    detail: 'Point-of-purchase shelf tags',
  },
  {
    number: '03',
    title: 'Mark',
    body: 'Put the message at approved storm drains, where lawn behavior becomes runoff. Each marker connects the ordinance to a real local pathway.',
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
    body: 'Contacts stores, prepares partner agreements, plans shelf tag placement, and sets up reach tracking.',
  },
  {
    title: 'Field Lead',
    body: 'Selects approved drains, prepares GPS records, coordinates planned marker sessions, and maintains the drain database.',
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
    body: 'Target stores, partner agreements, planned tag counts, shelf photos, and estimated weekly reach.',
  },
  {
    title: 'Drain database',
    body: 'Drain IDs, GPS coordinates, before/after photos, planned marker dates, and site notes.',
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

        <div className="absolute inset-0 bg-gradient-to-r from-[#07100d] via-[#07100d]/80 to-[#07100d]/35" />
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
          About BLACKOUT
        </motion.p>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] as const }}
          className="max-w-5xl text-[clamp(2.8rem,8vw,5.85rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-[#f5efe3]"
        >
          What BLACKOUT is.
          <br />
          How it works.
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-6 max-w-2xl text-[clamp(1rem,2vw,1.25rem)] leading-[1.5] text-white/70"
        >
          A student-led project helping residents notice the summer fertilizer
          rule before runoff reaches the lagoon.
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
            href="#snapshot"
            className="inline-flex items-center justify-center rounded-full bg-[#f5efe3] px-6 py-3 text-sm font-semibold text-[#07100d] transition hover:bg-white"
          >
            Snapshot
          </Link>

          <Link
            href="/mission"
            className="inline-flex items-center justify-center rounded-full border border-white/18 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/35 hover:text-white"
          >
            Why it matters
          </Link>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-8 flex max-w-2xl flex-wrap gap-2"
        >
          <Pill dark>June 1 - Sept. 30</Pill>
          <Pill dark>Survey - stores - storm drains</Pill>
          <Pill dark>Planned for handoff</Pill>
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

export function AboutPageClient() {
  return (
    <SiteLayout>
      <main id="main-content" tabIndex={-1} className="overflow-hidden bg-[#f7f2e8] font-sans text-[#173027] selection:bg-[#d8d0c2] selection:text-[#07100d]">
        <Hero />

        <LightSection id="snapshot">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <SectionHeading
              eyebrow="Snapshot"
              title="BLACKOUT at a glance."
              body="BLACKOUT helps residents see Brevard County's summer fertilizer rule before they buy or apply fertilizer. This page gives the quick version of what the project is, what is being prepared, and why the sequence matters."
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
                The project is planned around a simple idea: an existing rule can
                only help if people understand it in time to act.
              </p>
            </div>
          </Reveal>
        </LightSection>

        <DarkSection id="foundation">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start lg:gap-16">
            <SectionHeading
              dark
              eyebrow="Foundation"
              title="Make the rule visible."
              body="Brevard County already restricts summer nitrogen and phosphorus fertilizer use. BLACKOUT is preparing clear reminders, records, and public contact points around that rule so residents can notice the blackout window before a lawn-care decision is made."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl bg-[#f5efe3] p-6 text-[#07100d] sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#607357]">
                  Mission
                </p>

                <p className="mt-3 text-[1.4rem] font-semibold leading-tight tracking-[-0.04em]">
                  Protect seagrass and manatees by helping residents see the
                  fertilizer blackout window before fertilizer enters the runoff
                  pathway.
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
            title="A focused system."
            body="The plan uses surveys to measure awareness, shelf tags to reach the purchase moment, drain markers to make runoff local, and a handoff to keep the work usable. Each part has a different job, so the project can stay organized instead of becoming general outreach."
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

        {/* Repeated on the dedicated Problem page.
        <DarkSection id="problem">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
            <SectionHeading
              dark
              eyebrow="Why it matters"
              title="It starts on land."
              body="Excess nutrients often begin as ordinary lawn decisions. BLACKOUT targets that first choice before fertilizer moves into stormwater."
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
                  Stop the chain before nutrients leave the lawn.
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
        */}

        {/* Repeated across the dedicated field-work pages.
        <LightSection id="model">
          <SectionHeading
            eyebrow="Field model"
            title="Three touchpoints."
            body="The survey measures awareness. The shelf tag reaches shoppers. The drain marker connects the rule to the runoff path."
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
        */}

        {/* Repeated on the Team page.
        <DarkSection id="team">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <SectionHeading
              dark
              eyebrow="Team structure"
              title="Clear ownership."
            body="Each role owns a concrete output: survey data, store outreach, approved drain records, photos, files, or the final handoff."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:p-7">
                <div className="border-b border-white/10 pb-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a8b98c]">
                    Role map
                  </p>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-white/56">
                    Defined roles, each tied to a concrete field or documentation output.
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
                The structure is intentionally simple: assign ownership,
                document the planned work, and make every output useful beyond
                the student team.
              </p>
            </div>
          </Reveal>
        </DarkSection>
        */}

        {/* Repeated on the Impact and Resources pages.
        <LightSection id="documentation">
          <SectionHeading
            eyebrow="Documentation"
            title="Built to continue."
            body="BLACKOUT is being organized to leave usable records: data, photos, coordinates, agreements, notes, and final files."
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
        */}

        {/* Repeated on the Impact and Resources pages.
        <DarkSection id="handoff">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start lg:gap-16">
            <SectionHeading
              dark
              eyebrow="Handoff"
              title="Usable handoff."
              body="The planned final product is a repeatable program: survey structure, tag template, drain log, field sequence, and clear ordinance message."
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
                The goal is practical: make the summer fertilizer rule clear
                enough that residents can act on it before runoff starts.
              </p>
            </div>
          </Reveal>
        </DarkSection>
        */}

        <LightSection id="contact">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <SectionHeading
              eyebrow="Next step"
              title="From rule to habit."
              body="The project succeeds when residents see the blackout window before they buy, apply, or wash fertilizer into stormwater."
            />

            <Reveal delay={0.1}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Link
                  href="/mission"
                  className="group block rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] p-6 transition hover:-translate-y-0.5 hover:border-[#b7c5aa] hover:bg-white"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
                    Next page
                  </p>
                  <p className="mt-5 text-[1.25rem] font-semibold tracking-[-0.035em] text-[#173027]">
                    Understand the problem
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#5e665d]">
                    Follow the runoff chain that explains why the project exists.
                  </p>
                  <p className="mt-6 text-sm text-[#6f8167] transition group-hover:translate-x-0.5">
                    Go to mission &rarr;
                  </p>
                </Link>

                <Link
                  href="/survey"
                  className="group block rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] p-6 transition hover:-translate-y-0.5 hover:border-[#b7c5aa] hover:bg-white"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
                    First field step
                  </p>
                  <p className="mt-5 text-[1.25rem] font-semibold tracking-[-0.035em] text-[#173027]">
                    See the survey method
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#5e665d]">
                    Learn how BLACKOUT measures awareness before outreach begins.
                  </p>
                  <p className="mt-6 text-sm text-[#6f8167] transition group-hover:translate-x-0.5">
                    Go to survey &rarr;
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
