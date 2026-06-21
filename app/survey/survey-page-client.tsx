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
import { SurveyForm } from '@/components/survey-form'

const heroImages = [
  {
    src: '/heroes/survey-1.webp',
    label: 'Field survey work',
  },
  {
    src: '/heroes/survey-2.webp',
    label: 'Door-to-door route',
  },
  {
    src: '/heroes/survey-3.webp',
    label: 'Survey instrument',
  },
  {
    src: '/heroes/survey-4.webp',
    label: 'Neighborhood sample',
  },
]

const stats = [
  { k: 'Wave 1', v: 'Pre-intervention baseline' },
  { k: 'Wave 2', v: 'Post-intervention follow-up' },
  { k: 'Sample', v: '100 - 150 households' },
  { k: 'Method', v: 'Door-to-door' },
]

const auditMetrics = [
  {
    label: 'Target households per wave',
    value: '100 - 150',
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
    note: 'Planned after the outreach sequence in the same zone.',
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
    title: 'Project record',
    body: 'The before/after comparison is planned to show whether awareness changed.',
  },
  {
    title: 'County handoff package',
    body: 'The handoff is planned to include the raw dataset, method notes, and baseline results.',
  },
  {
    title: 'Replication guide',
    body: 'The survey instrument and field protocol are documented so external teams can repeat the work without rebuilding the process from scratch.',
  },
]

const wavePoints = [
  'Wave 1 is the baseline. It closes before any BLACKOUT collateral appears in the field.',
  'Wave 2 is planned for the same streets after outreach, tagging, and drain marking.',
  'The difference between the two waves is the evidence: awareness, understanding, and intent should move.',
]

const dataFlow = [
  'Door-to-door collection becomes a clean baseline dataset.',
  'Baseline data is compared against the post-intervention wave.',
  'The resulting delta is reused for county handoff and project documentation.',
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

function MetricRow({
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
      className={`grid gap-3 border-b py-5 last:border-b-0 sm:grid-cols-[12rem_1fr] sm:gap-6 ${dark ? 'border-white/10' : 'border-[#ded6c8]'
        }`}
    >
      <p
        className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${dark ? 'text-[#a8b98c]' : 'text-[#6f8167]'
          }`}
      >
        {label}
      </p>

      <div>
        <p
          className={`text-sm font-semibold leading-6 ${dark ? 'text-[#f5efe3]' : 'text-[#173027]'
            }`}
        >
          {value}
        </p>

        <p
          className={`mt-1 text-sm leading-7 ${dark ? 'text-white/56' : 'text-[#5e665d]'
            }`}
        >
          {note}
        </p>
      </div>
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
          Community survey
        </motion.p>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] as const }}
          className="max-w-5xl text-[clamp(2.8rem,8vw,5.85rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-[#f5efe3]"
        >
          Ask first.
          <br />
          Measure later.
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-6 max-w-2xl text-[clamp(1rem,2vw,1.25rem)] leading-[1.5] text-white/70"
        >
          Wave 1 captures awareness before outreach. Wave 2 checks the same
          area after the planned sequence.
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
            href="#survey"
            className="inline-flex items-center justify-center rounded-full bg-[#f5efe3] px-6 py-3 text-sm font-semibold text-[#07100d] transition hover:bg-white"
          >
            Open survey
          </Link>

          <Link
            href="/impact"
            className="inline-flex items-center justify-center rounded-full border border-white/18 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/35 hover:text-white"
          >
            Result plan
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
            Wave 1 baseline
          </span>
          <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
            Wave 2 follow-up
          </span>
          <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
            Door-to-door method
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

export function SurveyPageClient() {
  return (
    <SiteLayout>
      <main id="main-content" tabIndex={-1} className="overflow-hidden bg-[#f7f2e8] font-sans text-[#173027] selection:bg-[#d8d0c2] selection:text-[#07100d]">
        <Hero />

        <LightSection id="survey">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start lg:gap-16">
            <SectionHeader
              eyebrow="Live instrument"
              title="The field form protects the baseline."
              body="Wave 1 is planned before outreach, shelf tags, or drain markers. Wave 2 asks the same core questions after the campaign sequence so the team can compare awareness, timing, and information sources without mixing before-and-after data."
            />

            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] shadow-[0_24px_70px_rgba(7,16,13,0.1)]">
                <div className="border-b border-[#ded6c8] px-6 py-5 sm:px-7">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#6f8167]">
                    BLK-SRV-2026A
                  </p>

                  <h3 className="mt-2 text-[1.45rem] font-semibold tracking-[-0.04em] text-[#173027]">
                    Fertilizer Ordinance Awareness Verification
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-[#5e665d]">
                    Brevard County residential sampling protocol
                  </p>
                </div>

                <div className="bg-[#f7f2e8] p-4 text-[#173027] sm:p-6">
                  <SurveyForm />
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-[#173027] p-6 text-[#f5efe3]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a8b98c]">
                  Wave 1
                </p>

                <p className="mt-3 text-[1.35rem] font-semibold leading-tight tracking-[-0.04em]">
                  Planned baseline before intervention.
                </p>
              </div>

              <div className="rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
                  Wave 2
                </p>

                <p className="mt-3 text-[1.35rem] font-semibold leading-tight tracking-[-0.04em] text-[#173027]">
                  Planned follow-up in the same zone.
                </p>
              </div>
            </div>
          </Reveal>
        </LightSection>

        {/* Repeated by the live survey intro.
        <DarkSection id="snapshot">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <SectionHeader
              dark
              eyebrow="Snapshot"
              title="One before-and-after view."
              body="The survey is designed to measure what residents know before and after the campaign instead of relying on guesses."
            />

            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10">
                {stats.map((item) => (
                  <div key={item.k} className="bg-white/[0.035] p-5 sm:p-6">
                    <p className="text-[1.6rem] font-semibold leading-none tracking-[-0.055em] text-[#f5efe3] sm:text-[2rem]">
                      {item.k}
                    </p>

                    <p className="mt-3 max-w-[12rem] text-sm leading-6 text-white/56">
                      {item.v}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <div className="mt-12 border-t border-white/10 pt-8">
              <p className="max-w-3xl text-[clamp(1.3rem,3vw,1.95rem)] font-semibold leading-tight tracking-[-0.04em] text-[#f5efe3]">
                The point is simple: do not assume awareness changed. Measure it
                before and after the campaign.
              </p>
            </div>
          </Reveal>
        </DarkSection>
        */}

        <LightSection id="method">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
            <SectionHeader
              eyebrow="Method"
              title="Baseline first."
              body="Wave 1 has to close first so the results show what residents knew before BLACKOUT appears in the neighborhood. That protects the comparison and keeps the final awareness result from being inflated by early outreach."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
                  Why the split matters
                </p>

                <p className="mt-3 text-[1.45rem] font-semibold leading-tight tracking-[-0.04em]">
                  The data needs to show change, not a blurred mix of before and
                  after.
                </p>

                <p className="mt-4 text-sm leading-7 text-[#5e665d]">
                  Wave 2 is planned only after the intervention sequence. The
                  comparison between the two waves becomes the project's primary
                  empirical outcome.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-12 divide-y divide-[#ded6c8] border-y border-[#ded6c8]">
            {wavePoints.map((item, index) => (
              <Reveal key={item} delay={index * 0.05}>
                <div className="grid gap-4 py-6 sm:grid-cols-[3rem_1fr] sm:gap-6">
                  <p className="font-mono text-xs text-[#6f8167]">
                    {String(index + 1).padStart(2, '0')}
                  </p>

                  <p className="max-w-3xl text-sm leading-7 text-[#5e665d]">
                    {item}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </LightSection>

        <DarkSection id="specifications">
          <SectionHeader
            dark
            eyebrow="Technical parameters"
            title="A small set of numbers keeps the survey consistent."
            body="The survey is short enough for door-to-door use and structured enough to compare the two waves clearly. The same core questions, area, and response format make the final dataset easier to read and explain."
          />

          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {auditMetrics.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.04}>
                <MetricRow
                  label={item.label}
                  value={item.value}
                  note={item.note}
                  dark
                />
              </Reveal>
            ))}
          </div>
        </DarkSection>

        <LightSection id="data-flow">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
            <SectionHeader
              eyebrow="Data flow"
              title="Compare the waves."
              body="The baseline is compared with the follow-up wave. That difference becomes the evidence for what changed, while the raw responses stay organized for review, charts, and the final handoff."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
                  Data path
                </p>

                <div className="mt-5 divide-y divide-[#ded6c8]">
                  {dataFlow.map((item, index) => (
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
        </LightSection>

        {/* Repeated on the Impact page.
        <DarkSection id="outputs">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <SectionHeader
              dark
              eyebrow="Outputs"
              title="One survey, many uses."
              body="The survey is planned to feed the county handoff, the replication guide, and the quantitative project record."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-7">
                <div className="divide-y divide-white/10">
                  {pipelines.map((item, index) => (
                    <div
                      key={item.title}
                      className="grid gap-3 py-5 first:pt-0 last:pb-0 sm:grid-cols-[3rem_1fr]"
                    >
                      <p className="font-mono text-xs text-[#a8b98c]">
                        {String(index + 1).padStart(2, '0')}
                      </p>

                      <div>
                        <p className="text-sm font-semibold text-[#f5efe3]">
                          {item.title}
                        </p>

                        <p className="mt-2 text-sm leading-7 text-white/56">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <div className="mt-12 border-t border-white/10 pt-8">
              <p className="max-w-3xl text-[clamp(1.35rem,3vw,2rem)] font-semibold leading-tight tracking-[-0.04em] text-[#f5efe3]">
                Wave 1 establishes the baseline. Wave 2 tests whether BLACKOUT
                moved the numbers. The difference becomes the evidence.
              </p>
            </div>
          </Reveal>
        </DarkSection>
        */}

        {/* Cross-page summary removed to keep the survey page focused.
        <LightSection id="closing">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <SectionHeader
              eyebrow="Closing"
              title="The survey keeps the project honest."
              body="It shows what was measured, when it was measured, and whether awareness moved after the campaign."
            />

            <Reveal delay={0.1}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Link
                  href="/retail-partners"
                  className="group block rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] p-6 transition hover:-translate-y-0.5 hover:border-[#b7c5aa] hover:bg-white"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
                    Next field step
                  </p>

                  <p className="mt-5 text-[1.25rem] font-semibold tracking-[-0.035em]">
                    Go to retail reminders
                  </p>

                  <p className="mt-3 text-sm leading-7 text-[#5e665d]">
                    See how the rule appears at the fertilizer purchase point.
                  </p>

                  <p className="mt-6 text-sm text-[#6f8167] transition group-hover:translate-x-0.5">
                    Go to retail partners &rarr;
                  </p>
                </Link>

                <Link
                  href="/impact"
                  className="group block rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] p-6 transition hover:-translate-y-0.5 hover:border-[#b7c5aa] hover:bg-white"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
                    Results
                  </p>

                  <p className="mt-5 text-[1.25rem] font-semibold tracking-[-0.035em]">
                    See the impact record
                  </p>

                  <p className="mt-3 text-sm leading-7 text-[#5e665d]">
                    Learn how survey data connects to store, drain, and handoff records.
                  </p>

                  <p className="mt-6 text-sm text-[#6f8167] transition group-hover:translate-x-0.5">
                    Go to impact &rarr;
                  </p>
                </Link>
              </div>
            </Reveal>
          </div>
        </LightSection>
        */}
      </main>
    </SiteLayout>
  )
}

export default SurveyPageClient
