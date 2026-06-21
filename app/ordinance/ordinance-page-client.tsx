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
    src: '/heroes/ordinance-1.webp',
    label: 'County landscape',
  },
  {
    src: '/heroes/ordinance-2.webp',
    label: 'Fertilizer context',
  },
  {
    src: '/heroes/ordinance-3.webp',
    label: 'Brevard County',
  },
  {
    src: '/heroes/ordinance-4.webp',
    label: 'Ordinance document',
  },
]

const stats = [
  {
    figure: 'Section 62-3601 et seq.',
    label: 'Ordinance citation',
    note: 'The fertilizer blackout is already written into Brevard County code.',
  },
  {
    figure: 'Jun 1 - Sep 30',
    label: 'Blackout window',
    note: "The restriction overlaps with Florida's highest runoff-risk season.",
  },
  {
    figure: 'All county properties',
    label: 'Where it applies',
    note: 'The rule applies broadly to lawns, landscapes, and turf.',
  },
  {
    figure: 'Voluntary compliance',
    label: 'How it is followed',
    note: 'Public awareness is the practical missing layer.',
  },
]

const ordinanceSections = [
  {
    title: 'What the ordinance says',
    body: 'No nitrogen or phosphorus fertilizer on lawns, landscapes, or turf during the blackout period. It is a real county rule, not a campaign slogan.',
  },
  {
    title: 'Why that window matters',
    body: "The June-through-September period overlaps with Florida's rainy season, when runoff risk is highest and nutrients are most likely to reach the lagoon.",
  },
  {
    title: 'What BLACKOUT is preparing',
    body: 'The project is preparing surveys, shelf tags, and drain markers so residents and shoppers can notice the rule before fertilizer is used.',
  },
]

const chain = [
  {
    n: '01',
    title: 'Fertilizer on the lawn',
    body: 'Residential fertilizer use often peaks in the same window the ordinance restricts. That is the first point where the chain can be interrupted.',
  },
  {
    n: '02',
    title: 'Rain carries nutrients to drains',
    body: 'Stormwater moves nitrogen off the ground and into the drainage system. There is no treatment step between the drain and the lagoon.',
  },
  {
    n: '03',
    title: 'The lagoon responds',
    body: 'Excess nutrients help fuel blooms, block sunlight, and weaken seagrass beds below the surface.',
  },
  {
    n: '04',
    title: 'Manatees lose food',
    body: 'When seagrass disappears, manatees lose the primary food source they depend on. The ordinance exists to interrupt that outcome earlier.',
  },
]

const principles = [
  {
    title: 'Existing law, new visibility',
    body: 'BLACKOUT does not ask the county to create a new ordinance. It makes a real rule easier to see, understand, and follow.',
  },
  {
    title: 'Evidence first',
    body: 'The project is being set up around survey data, retail reach, and drain documentation instead of vague claims or broad generalities.',
  },
  {
    title: 'Built to keep going',
    body: 'The handoff package, renewal language, and documentation structure are planned so a county or future students can continue the work.',
  },
]

const process = [
  {
    n: '01',
    title: 'Find the gap',
    body: 'The ordinance already protects the lagoon, but almost nobody in Brevard County knows it exists. That awareness gap is the problem.',
  },
  {
    n: '02',
    title: 'Make it visible',
    body: 'The team is preparing surveys, shelf tags, and drain markers for the places where people make decisions.',
  },
  {
    n: '03',
    title: 'Leave something usable',
    body: 'The planned final result is a repeatable program, a cleaner public message, and a handoff packet that can keep working without the students.',
  },
]

const roles = [
  {
    role: 'Project Lead',
    work: 'Owns the timeline, meeting minutes, public correspondence, and handoff coordination.',
  },
  {
    role: 'Survey Lead',
    work: 'Builds both survey waves, manages distribution, tracks responses, and prepares the compliance gap analysis.',
  },
  {
    role: 'Retail Partnership Lead',
    work: 'Prepares store outreach, partner agreements, and the planned Manatee Safe shelf tag rollout.',
  },
  {
    role: 'Field Operations Lead',
    work: 'Maps city-approved drains, prepares GPS data, calculates mortality distance, and coordinates planned marker sessions.',
  },
  {
    role: 'Documentation Lead',
    work: 'Keeps the drive organized, maintains the website, and prepares the photo and file archive for handoff.',
  },
]

const closingPoints = [
  'The law already exists.',
  'The awareness gap is the problem.',
  'The three-prong model is the planned activation path.',
  'The handoff package is the continuity plan.',
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
          The ordinance
        </motion.p>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] as const }}
          className="max-w-5xl text-[clamp(2.8rem,8vw,5.85rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-[#f5efe3]"
        >
          The fertilizer rule
          <br />
          explained.
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-6 max-w-2xl text-[clamp(1rem,2vw,1.25rem)] leading-[1.5] text-white/70"
        >
          From June 1 to September 30, Brevard County restricts nitrogen and
          phosphorus lawn fertilizer. BLACKOUT makes that rule easier to see.
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
            href="#plain"
            className="inline-flex items-center justify-center rounded-full bg-[#f5efe3] px-6 py-3 text-sm font-semibold text-[#07100d] transition hover:bg-white"
          >
            Read rule
          </Link>

          <Link
            href="/survey"
            className="inline-flex items-center justify-center rounded-full border border-white/18 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/35 hover:text-white"
          >
            Survey plan
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
            Section 62-3601 et seq.
          </span>
          <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
            June 1 - September 30
          </span>
          <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
            Nitrogen + phosphorus
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

export default function OrdinancePage() {
  return (
    <SiteLayout>
      <main id="main-content" tabIndex={-1} className="overflow-hidden bg-[#f7f2e8] font-sans text-[#173027] selection:bg-[#d8d0c2] selection:text-[#07100d]">
        <Hero />

        <LightSection id="plain">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <SectionHeader
              eyebrow="Plain language"
              title="The rule, simply."
              body="This page explains what is restricted, when it applies, and why the rainy season matters. It keeps the ordinance practical for residents and businesses by focusing on the dates, the fertilizer limits, and the reason those limits exist."
            />

            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-[#ded6c8] bg-[#ded6c8]">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-[#fbf8f1] p-5 sm:p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
                      {stat.label}
                    </p>

                    <p className="mt-3 text-[1.25rem] font-semibold leading-tight tracking-[-0.04em] text-[#173027]">
                      {stat.figure}
                    </p>

                    <p className="mt-3 text-sm leading-6 text-[#657064]">
                      {stat.note}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {ordinanceSections.map((item, index) => (
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

        <DarkSection id="context">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-start lg:gap-16">
            <SectionHeader
              dark
              eyebrow="Why it matters"
              title="Runoff starts here."
              body="Heavy rain can carry nutrients from lawns into storm drains before damage is visible in the lagoon. The ordinance matters because it acts before the runoff pathway begins, not after the water-quality damage is already visible."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl bg-[#f5efe3] p-6 text-[#07100d] sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#607357]">
                  Intervention point
                </p>

                <p className="mt-3 text-[1.45rem] font-semibold leading-tight tracking-[-0.04em]">
                  BLACKOUT intervenes at step one, where communication can still
                  change the outcome.
                </p>
              </div>
            </Reveal>
          </div>
        </DarkSection>

        {/* Repeated on the Problem page.
        <LightSection id="chain">
          <div className="grid gap-10 lg:grid-cols-[0.55fr_1fr] lg:items-start lg:gap-16">
            <SectionHeader
              eyebrow="Causal chain"
              title="Why it exists."
              body="The ordinance targets the first step in the chain from lawn fertilizer to lagoon harm."
            />

            <div className="divide-y divide-[#ded6c8] border-y border-[#ded6c8]">
              {chain.map((step, index) => (
                <Reveal key={step.n} delay={index * 0.05}>
                  <div className="grid gap-4 py-6 sm:grid-cols-[3rem_1fr] sm:gap-6">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8eadf] text-sm font-semibold text-[#586b52]">
                      {index + 1}
                    </div>

                    <div>
                      <h3 className="text-[1.12rem] font-semibold tracking-[-0.025em]">
                        {step.title}
                      </h3>

                      <p className="mt-2 max-w-2xl text-sm leading-7 text-[#657064]">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </LightSection>
        */}

        {/* Repeated on the About and Team pages.
        <DarkSection id="principles">
          <SectionHeader
            dark
            eyebrow="Why it works"
            title="Support the rule."
            body="The project does not replace county policy. It is being built to make the policy easier to see, measure, and continue."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {principles.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.035] p-6">
                  <h3 className="text-[1.15rem] font-semibold tracking-[-0.035em] text-[#f5efe3]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/58">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </DarkSection>
        */}

        {/* Repeated across the Survey, Retail Partners, and Storm Drains pages.
        <LightSection id="activation">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
            <SectionHeader
              eyebrow="Activation"
              title="Find the gap."
              body="The sequence keeps the work clear: measure awareness, place public reminders, and hand off files another team can use."
            />

            <div className="divide-y divide-[#ded6c8] border-y border-[#ded6c8]">
              {process.map((step, index) => (
                <Reveal key={step.n} delay={index * 0.05}>
                  <div className="grid gap-4 py-6 sm:grid-cols-[3rem_1fr] sm:gap-6">
                    <p className="font-mono text-xs text-[#6f8167]">
                      {step.n}
                    </p>

                    <div>
                      <h3 className="text-[1.12rem] font-semibold tracking-[-0.025em]">
                        {step.title}
                      </h3>

                      <p className="mt-2 max-w-2xl text-sm leading-7 text-[#5e665d]">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.18}>
            <div className="mt-12 rounded-3xl bg-[#173027] p-6 text-[#f7f2e8] sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a8b98c]">
                What BLACKOUT is preparing
              </p>

              <p className="mt-3 max-w-3xl text-[1.45rem] font-semibold leading-tight tracking-[-0.04em]">
                Surveys will measure awareness before and after. Shelf tags will
                bring the rule to the fertilizer shelf. Drain markers will make
                the runoff pathway visible.
              </p>
            </div>
          </Reveal>
        </LightSection>
        */}

        {/* Repeated on the Team page.
        <DarkSection id="team">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <SectionHeader
              dark
              eyebrow="Team structure"
              title="Clear responsibilities."
              body="Each role owns a concrete part of the field system. That keeps the work accountable and makes the final handoff easier to assemble."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:p-7">
                <div className="border-b border-white/10 pb-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a8b98c]">
                    Role map
                  </p>

                  <p className="mt-3 max-w-xl text-sm leading-7 text-white/56">
                    Defined roles, each tied to a field or documentation output.
                  </p>
                </div>

                <div>
                  {roles.map((item, index) => (
                    <div
                      key={item.role}
                      className="grid gap-3 border-b border-white/10 py-5 last:border-b-0 sm:grid-cols-[3rem_11rem_1fr] sm:gap-5"
                    >
                      <p className="font-mono text-xs text-[#a8b98c]">
                        {String(index + 1).padStart(2, '0')}
                      </p>

                      <p className="text-sm font-semibold text-[#f5efe3]">
                        {item.role}
                      </p>

                      <p className="max-w-2xl text-sm leading-7 text-white/58">
                        {item.work}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </DarkSection>
        */}

        <LightSection id="closing">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
            <SectionHeader
              eyebrow="Closing"
              title="Rules need contact."
              body="When an existing ordinance is easy to miss, the practical next step is clearer public communication. BLACKOUT is being planned around that gap: help people understand the rule at the moments when they can still change timing."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
                  Summary
                </p>

                <div className="mt-5 divide-y divide-[#ded6c8]">
                  {closingPoints.map((item, index) => (
                    <div
                      key={item}
                      className="grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[3rem_1fr]"
                    >
                      <p className="font-mono text-xs text-[#6f8167]">
                        {String(index + 1).padStart(2, '0')}
                      </p>

                      <p className="text-sm leading-7 text-[#5e665d]">
                        {item}
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
                href="/survey"
                className="inline-flex items-center justify-center rounded-full bg-[#173027] px-6 py-3 text-sm font-semibold text-[#f7f2e8] transition hover:bg-[#223a2e]"
              >
                See the survey
              </Link>

              <Link
                href="/retail-partners"
                className="inline-flex items-center justify-center rounded-full border border-[#d8d0c2] px-6 py-3 text-sm font-semibold text-[#53634f] transition hover:border-[#173027]/30 hover:text-[#173027]"
              >
                Explore retail partners
              </Link>
            </div>
          </Reveal>
        </LightSection>
      </main>
    </SiteLayout>
  )
}
