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
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Indian%20River%20Lagoon%20Area.jpg',
    label: 'Indian River Lagoon',
  },
  {
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Indian%20River%20Lagoon%20National%20Scenic%20Byway%20-%20Underwater%20Manatee%20-%20NARA%20-%207719534.jpg',
    label: 'Manatee habitat',
  },
  {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Storm%20Drain.JPG',
    label: 'Storm drain pathway',
  },
  {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Floridian%20seagrass%20bed.jpg',
    label: 'Seagrass beds',
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
    title: 'Project submissions',
    body: 'Documented quantitative outcomes need a clear before/after comparison. The wave gap provides that verified evidence.',
  },
  {
    title: 'County handoff package',
    body: 'Brevard County environmental management receives the raw survey dataset, methodology settings, and a validated baseline for future municipal use.',
  },
  {
    title: 'Replication guide',
    body: 'The survey instrument and field protocol are documented so external teams can repeat the work without rebuilding the process from scratch.',
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
          Community survey
        </motion.p>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl text-[clamp(2.8rem,8vw,5.85rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-[#f5efe3]"
        >
          Measure awareness.
          <br />
          Reveal real change.
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-[clamp(1rem,2vw,1.25rem)] leading-[1.5] text-white/70"
        >
          The survey framework turns outreach into defensible data. Wave 1
          establishes the baseline before any BLACKOUT activity begins; Wave 2
          measures what changed.
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
            href="#survey"
            className="inline-flex items-center justify-center rounded-full bg-[#f5efe3] px-6 py-3 text-sm font-semibold text-[#07100d] transition hover:bg-white"
          >
            Open the survey
          </Link>

          <Link
            href="#method"
            className="inline-flex items-center justify-center rounded-full border border-white/18 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/35 hover:text-white"
          >
            Read the method
          </Link>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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

export function SurveyPageClient() {
  return (
    <SiteLayout>
      <main className="overflow-hidden bg-[#f7f2e8] font-sans text-[#173027] selection:bg-[#d8d0c2] selection:text-[#07100d]">
        <Hero />

        <LightSection id="snapshot">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <SectionHeader
              eyebrow="Snapshot"
              title="The audit in one view."
              body="The survey page is the project’s field instrument. It keeps the focus on the two-wave structure, the sampling method, and the evidence generated by the gap between baseline and follow-up."
            />

            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-[#ded6c8] bg-[#ded6c8]">
                {stats.map((item) => (
                  <div key={item.k} className="bg-[#fbf8f1] p-5 sm:p-6">
                    <p className="text-[1.6rem] font-semibold leading-none tracking-[-0.055em] text-[#173027] sm:text-[2rem]">
                      {item.k}
                    </p>

                    <p className="mt-3 max-w-[12rem] text-sm leading-6 text-[#657064]">
                      {item.v}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <div className="mt-12 border-t border-[#ded6c8] pt-8">
              <p className="max-w-3xl text-[clamp(1.3rem,3vw,1.95rem)] font-semibold leading-tight tracking-[-0.04em]">
                The survey exists to separate assumption from evidence: what
                residents knew before BLACKOUT, and what changed after.
              </p>
            </div>
          </Reveal>
        </LightSection>

        <DarkSection id="survey">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
            <SectionHeader
              dark
              eyebrow="Live instrument"
              title="The field form captures the baseline."
              body="This standardized instrument is deployed across the campaign zone before any outreach, tagging, or drain marking begins. The form mirrors the questions used at residential access points."
            />

            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-sm">
                <div className="border-b border-white/10 px-6 py-5">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#a8b98c]">
                    BLK-SRV-2026A
                  </p>

                  <h3 className="mt-2 text-[1.45rem] font-semibold tracking-[-0.04em] text-[#f5efe3]">
                    Fertilizer Ordinance Awareness Verification
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-white/56">
                    Brevard County residential sampling protocol
                  </p>
                </div>

                <div className="bg-[#f7f2e8] p-5 text-[#173027] sm:p-6">
                  <SurveyForm />
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-[#f5efe3] p-6 text-[#07100d]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#607357]">
                  Wave 1
                </p>

                <p className="mt-3 text-[1.35rem] font-semibold leading-tight tracking-[-0.04em]">
                  Live baseline before intervention.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a8b98c]">
                  Wave 2
                </p>

                <p className="mt-3 text-[1.35rem] font-semibold leading-tight tracking-[-0.04em] text-[#f5efe3]">
                  Post-intervention follow-up.
                </p>
              </div>
            </div>
          </Reveal>
        </DarkSection>

        <LightSection id="method">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
            <SectionHeader
              eyebrow="Method"
              title="The baseline must finish before the intervention starts."
              body="Wave 1 anchors the pre-intervention dataset. It is collected before BLACKOUT awareness collateral, storm drain markers, or retail shelf tags are placed in the field."
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
                  Wave 2 runs only after the intervention sequence is complete.
                  The comparison between the two waves becomes the project’s
                  primary empirical outcome.
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
            title="A small set of numbers keeps the fieldwork consistent."
            body="The survey has to be simple enough to run door-to-door, but structured enough to produce a clean before/after comparison."
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
              title="The survey delta is reused wherever the project needs proof."
              body="Door-to-door collection becomes the clean baseline dataset. That baseline is compared against the post-intervention wave, and the result becomes the evidence behind the rest of the project."
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

        <DarkSection id="outputs">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <SectionHeader
              dark
              eyebrow="Outputs"
              title="One instrument, multiple destinations."
              body="The survey does more than collect responses. It feeds the county handoff, the replication guide, and the quantitative story behind the project."
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

        <LightSection id="closing">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <SectionHeader
              eyebrow="Closing"
              title="The survey should feel like a field instrument, not a dashboard."
              body="The layout stays restrained because the point is not visual noise. The point is clarity: what was measured, when it was measured, and how the result proves whether the project changed something real."
            />

            <Reveal delay={0.1}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Link
                  href="#survey"
                  className="group block rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] p-6 transition hover:-translate-y-0.5 hover:border-[#b7c5aa] hover:bg-white"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
                    Instrument
                  </p>

                  <p className="mt-5 text-[1.25rem] font-semibold tracking-[-0.035em]">
                    Open the survey
                  </p>

                  <p className="mt-3 text-sm leading-7 text-[#5e665d]">
                    Use the live field form for baseline awareness capture.
                  </p>

                  <p className="mt-6 text-sm text-[#6f8167] transition group-hover:translate-x-0.5">
                    Go to survey →
                  </p>
                </Link>

                <Link
                  href="#top"
                  className="group block rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] p-6 transition hover:-translate-y-0.5 hover:border-[#b7c5aa] hover:bg-white"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
                    Navigation
                  </p>

                  <p className="mt-5 text-[1.25rem] font-semibold tracking-[-0.035em]">
                    Back to top
                  </p>

                  <p className="mt-3 text-sm leading-7 text-[#5e665d]">
                    Return to the hero and overview of the survey structure.
                  </p>

                  <p className="mt-6 text-sm text-[#6f8167] transition group-hover:translate-x-0.5">
                    Go back →
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