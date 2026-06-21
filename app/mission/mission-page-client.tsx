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
    src: '/heroes/mission-1.webp',
    label: 'Seagrass habitat',
  },
  {
    src: '/heroes/mission-2.webp',
    label: 'Waterway runoff',
  },
  {
    src: '/heroes/mission-3.webp',
    label: 'Algal bloom',
  },
  {
    src: '/heroes/mission-4.webp',
    label: 'Underwater field view',
  },
]

const stats = [
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

const chain = [
  {
    title: 'Fertilizer is applied',
    body: 'Nitrogen and phosphorus can be placed on lawns, landscapes, and turf during the rainy season, when runoff risk is highest.',
  },
  {
    title: 'Stormwater moves it',
    body: 'Rain carries excess nutrients across yards and pavement into storm drains, canals, and connected waterways.',
  },
  {
    title: 'Blooms expand',
    body: 'Nutrient loading fuels algal growth, which reduces the light available to seagrass beds below the surface.',
  },
  {
    title: 'Seagrass declines',
    body: 'When seagrass disappears, manatees lose one of their primary food sources and the lagoon food web weakens.',
  },
]

const model = [
  {
    number: '01',
    title: 'Survey',
    body: 'Measure what residents know before outreach begins, then return after the planned campaign sequence to measure what changed.',
    detail: 'Two-wave awareness audit',
  },
  {
    number: '02',
    title: 'Intercept',
    body: 'Prepare ordinance information beside fertilizer products, where the decision happens and where the message can still prevent runoff.',
    detail: 'Retail shelf-tag placement',
  },
  {
    number: '03',
    title: 'Mark',
    body: 'Install approved storm drain markers so residents connect lawn behavior to the pathway that carries runoff toward the lagoon.',
    detail: 'GPS-logged drain markers',
  },
]

const sequence = [
  'Wave 1 survey closes before any store tags, drain markers, or public-facing outreach.',
  'Retail tags and drain markers are planned only after the baseline awareness data is protected.',
  'Outreach is planned through the June 1 - September 30 blackout window.',
  'Wave 2 is planned for the same neighborhood zone after the intervention sequence.',
  'The final package is planned to give Brevard County tools to continue the program.',
]

const survey = [
  {
    title: 'Baseline first',
    body: 'Wave 1 asks whether residents know the ordinance exists, whether they know the blackout dates, and whether they understand where stormwater goes.',
  },
  {
    title: 'Same zone later',
    body: 'Wave 2 returns to the same streets after the campaign. The goal is not to find the exact same people, but to sample the same neighborhood context.',
  },
  {
    title: 'Primary metric',
    body: 'The strongest number is the combined correct-knowledge rate: residents who know the ordinance exists and can identify the correct dates.',
  },
]

const retail = [
  {
    title: 'Local stores first',
    body: 'BLACKOUT targets independent garden centers, nurseries, and local hardware stores where a manager can approve a shelf tag quickly.',
  },
  {
    title: 'Decision-moment contact',
    body: 'A shelf tag works because it appears beside fertilizer before the product is purchased and before the ordinance can be violated.',
  },
  {
    title: 'Simple message',
    body: 'Each tag should show the blackout window, the manatee connection, and a QR code linking to ordinance and project information.',
  },
]

const drains = [
  {
    title: 'One compact zone',
    body: 'The drain marking zone should overlap with the survey zone so the project has a clear geographic story: same streets, same residents, same runoff pathway.',
  },
  {
    title: 'Log at the drain',
    body: 'Every marker needs a drain ID, GPS coordinates, address or intersection, before photo, after photo, date, and installer initials.',
  },
  {
    title: 'Make the pathway visible',
    body: 'The marker turns an ordinary storm drain into a reminder that runoff does not disappear. It moves toward canals, outfalls, and the lagoon.',
  },
]

const documentation = [
  {
    title: 'Master project log',
    body: 'Stores survey sessions, planned drain records, retail outreach, partner letters, and raw data exports.',
  },
  {
    title: 'Photo archive',
    body: 'Keeps planned before/after drain photos, store tag photos, survey sessions, and field documentation organized by date.',
  },
  {
    title: 'Handoff folder',
    body: 'Contains tag templates, survey instruments, drain database, partner agreements, meeting notes, and final protocols.',
  },
  {
    title: 'Partner records',
    body: 'Documents store agreements, city approval, county correspondence, and confirmation of handoff.',
  },
]

const roles = [
  {
    title: 'Project Lead',
    body: 'Owns the timeline, meetings, public correspondence, and final handoff coordination.',
  },
  {
    title: 'Survey Lead',
    body: 'Builds the survey instruments, manages door-to-door logistics, and analyzes the pre/post awareness data.',
  },
  {
    title: 'Retail Lead',
    body: 'Contacts stores, prepares partner agreements, plans shelf tag placement, and tracks estimated reach.',
  },
  {
    title: 'Field Lead',
    body: 'Selects approved drains, prepares GPS records, coordinates planned marker sessions, and maintains the drain database.',
  },
  {
    title: 'Documentation Lead',
    body: 'Organizes photos, files, partner letters, website updates, meeting notes, and the final handoff archive.',
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

function Accent({ children }: { children: ReactNode }) {
  return <span className="text-[#6f8167]">{children}</span>
}

function LightSection({
  children,
  id,
}: {
  children: ReactNode
  id?: string
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
  children,
  id,
}: {
  children: ReactNode
  id?: string
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

function InfoCard({
  title,
  body,
  dark = false,
}: {
  title: string
  body: string
  dark?: boolean
}) {
  return (
    <div
      className={`h-full rounded-3xl border p-6 ${dark
          ? 'border-white/10 bg-white/[0.035]'
          : 'border-[#ded6c8] bg-[#fbf8f1]'
        }`}
    >
      <h3
        className={`text-[1.15rem] font-semibold tracking-[-0.035em] ${dark ? 'text-[#f5efe3]' : 'text-[#173027]'
          }`}
      >
        {title}
      </h3>

      <p
        className={`mt-3 text-sm leading-7 ${dark ? 'text-white/58' : 'text-[#5e665d]'
          }`}
      >
        {body}
      </p>
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
          Mission
        </motion.p>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] as const }}
          className="max-w-5xl text-[clamp(2.8rem,8vw,5.85rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-[#f5efe3]"
        >
          Stop runoff
          <br />
          before it starts.
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-6 max-w-2xl text-[clamp(1rem,2vw,1.25rem)] leading-[1.5] text-white/70"
        >
          BLACKOUT focuses on the moment before fertilizer becomes pollution:
          awareness, buying, and runoff.
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
            href="#problem"
            className="inline-flex items-center justify-center rounded-full bg-[#f5efe3] px-6 py-3 text-sm font-semibold text-[#07100d] transition hover:bg-white"
          >
            Runoff chain
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
            Survey - stores - storm drains
          </span>
          <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
            June 1 - September 30
          </span>
          <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
            Planned for handoff
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

export default function MissionPageClient() {
  return (
    <SiteLayout>
      <main id="main-content" tabIndex={-1} className="overflow-hidden bg-[#f7f2e8] font-sans text-[#173027] selection:bg-[#d8d0c2] selection:text-[#07100d]">
        <Hero />

        <LightSection id="snapshot">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <SectionHeading
              eyebrow="Snapshot"
              title={
                <>
                  Stop runoff early.
                </>
              }
              body="BLACKOUT targets one controllable gap: residents often miss the fertilizer rule before buying or applying fertilizer."
            />

            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-[#ded6c8] bg-[#ded6c8]">
                {stats.map((item) => (
                  <div key={item.label} className="bg-[#fbf8f1] p-5 sm:p-6">
                    <p className="text-[1.75rem] font-semibold leading-none tracking-[-0.06em] tabular-nums sm:text-[2.25rem]">
                      {item.figure}
                    </p>
                    <p className="mt-3 max-w-[12rem] text-sm leading-6 text-[#657064]">
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
                The ordinance is already written. The mission is to make it
                visible early enough to prevent avoidable runoff.
              </p>
            </div>
          </Reveal>
        </LightSection>

        <DarkSection id="foundation">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start lg:gap-16">
            <SectionHeading
              dark
              eyebrow="Foundation"
              title={
                <>
                  Do residents see the rule?
                </>
              }
              body="Brevard County's summer fertilizer restriction is already real. BLACKOUT focuses on whether people see it in time to act."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl bg-[#f5efe3] p-6 text-[#07100d] sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#607357]">
                  Mission statement
                </p>

                <p className="mt-3 text-[1.4rem] font-semibold leading-tight tracking-[-0.04em]">
                  Protect seagrass and manatees by helping residents recognize
                  the blackout window before fertilizer enters the stormwater
                  pathway.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-8 border-t border-white/10 pt-10 lg:grid-cols-[0.55fr_1fr] lg:gap-16">
            <Reveal>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a8b98c]">
                  Sequence
                </p>

                <p className="mt-4 max-w-sm text-[1.5rem] font-semibold leading-tight tracking-[-0.04em] text-[#f5efe3]">
                  The baseline must come before the campaign.
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
                    <p className="text-sm leading-7 text-white/62">
                      {item}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </DarkSection>

        <LightSection id="problem">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
            <SectionHeading
              eyebrow="The problem"
              title={
                <>
                  The problem starts upstream.
                </>
              }
              body="Rain can carry fertilizer through stormwater systems, feeding algae blooms and reducing the seagrass manatees depend on."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl bg-[#173027] p-6 text-[#f7f2e8] sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a8b98c]">
                  Intervention point
                </p>

                <p className="mt-3 text-[1.45rem] font-semibold leading-tight tracking-[-0.04em]">
                  BLACKOUT attacks the chain at Step 1, before nitrogen or
                  phosphorus ever leaves the lawn.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-8 border-t border-[#ded6c8] pt-10 lg:grid-cols-[0.55fr_1fr] lg:gap-16">
            <Reveal>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f8167]">
                  Causal chain
                </p>

                <p className="mt-4 max-w-sm text-[1.5rem] font-semibold leading-tight tracking-[-0.04em]">
                  From lawn care to lagoon harm.
                </p>
              </div>
            </Reveal>

            <div className="divide-y divide-[#ded6c8] border-y border-[#ded6c8]">
              {chain.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.05}>
                  <div className="grid gap-4 py-6 sm:grid-cols-[3rem_1fr] sm:gap-6">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8eadf] text-sm font-semibold text-[#586b52]">
                      {index + 1}
                    </div>

                    <div>
                      <h3 className="text-[1.12rem] font-semibold tracking-[-0.025em]">
                        {item.title}
                      </h3>

                      <p className="mt-2 max-w-2xl text-sm leading-7 text-[#657064]">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </LightSection>

        <DarkSection id="model">
          <SectionHeading
            dark
            eyebrow="Field model"
            title={
              <>
                  Three touchpoints.
              </>
            }
            body="The survey measures the gap, the shelf tag reaches shoppers, and the drain marker makes runoff visible nearby."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {model.map((item, index) => (
              <Reveal key={item.number} delay={index * 0.06}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-0.5 hover:bg-white/[0.055]">
                  <p className="font-mono text-xs text-[#a8b98c]">
                    {item.number}
                  </p>

                  <h3 className="mt-5 text-[1.25rem] font-semibold tracking-[-0.035em] text-[#f5efe3]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/58">
                    {item.body}
                  </p>

                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#a8b98c]">
                    {item.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </DarkSection>

        <LightSection id="survey">
          <SectionHeading
            eyebrow="Survey"
            title={
              <>
                Survey first.
              </>
            }
              body="Wave 1 captures what residents know before outreach. Wave 2 is planned to show whether the campaign changed that awareness."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {survey.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <InfoCard title={item.title} body={item.body} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.18}>
            <div className="mt-12 rounded-3xl bg-[#173027] p-6 text-[#f7f2e8] sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a8b98c]">
                Headline metric
              </p>

              <p className="mt-3 max-w-3xl text-[1.45rem] font-semibold leading-tight tracking-[-0.04em]">
                The key number will be the share of residents who both know the
                ordinance exists and can identify the correct blackout dates.
              </p>
            </div>
          </Reveal>
        </LightSection>

        <DarkSection id="retail">
          <SectionHeading
            dark
            eyebrow="Retail intercept"
            title={
              <>
                Reach the shelf.
              </>
            }
            body="Most fertilizer use starts with a purchase. The shelf is a practical place to show the rule before the choice is made."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {retail.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <InfoCard dark title={item.title} body={item.body} />
              </Reveal>
            ))}
          </div>
        </DarkSection>

        <LightSection id="drains">
          <SectionHeading
            eyebrow="Drain marking"
            title={
              <>
                Mark the drain.
              </>
            }
            body="Storm drains turn lawn behavior into a water-quality pathway. Markers make that connection visible."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {drains.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <InfoCard title={item.title} body={item.body} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.18}>
            <div className="mt-12 border-t border-[#ded6c8] pt-8">
              <p className="max-w-3xl text-[clamp(1.3rem,3vw,1.95rem)] font-semibold leading-tight tracking-[-0.04em]">
                The rule is simple: document at the site, before leaving. A
                field record written from memory is already weaker evidence.
              </p>
            </div>
          </Reveal>
        </LightSection>

        <DarkSection id="team">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <SectionHeading
              dark
              eyebrow="Team structure"
              title={
                <>
                  Roles own the work.
                </>
              }
              body="Each role owns a concrete part of the field system, which keeps responsibilities clear and the handoff easier to assemble."
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
        </DarkSection>

        <LightSection id="documentation">
          <SectionHeading
            eyebrow="Documentation"
            title={
              <>
                Keep clean records.
              </>
            }
            body="The field work is planned to create public impact. The records make it transferable."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {documentation.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <InfoCard title={item.title} body={item.body} />
              </Reveal>
            ))}
          </div>
        </LightSection>

        <DarkSection id="handoff">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start lg:gap-16">
            <SectionHeading
              dark
              eyebrow="Handoff"
              title={
                <>
                  Reusable program.
                </>
              }
              body="BLACKOUT is planned to leave usable tools: survey forms, drain logs, tag templates, field protocols, photos, and partner records."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl bg-[#f5efe3] p-6 text-[#07100d] sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#607357]">
                  End state
                </p>

                <p className="mt-3 text-[1.45rem] font-semibold leading-tight tracking-[-0.04em]">
                  A documented ordinance-awareness system that can continue
                  after the original student team steps away.
                </p>

                <div className="mt-6 flex flex-wrap gap-2 text-xs text-[#5e665d]">
                  {[
                    'Survey instrument',
                    'Drain database',
                    'Shelf tag files',
                    'Photo archive',
                    'Field protocol',
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#d8d0c2] bg-white/55 px-3 py-1.5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.18}>
            <div className="mt-12 border-t border-white/10 pt-8">
              <p className="max-w-3xl text-[clamp(1.35rem,3vw,2rem)] font-semibold leading-tight tracking-[-0.04em] text-[#f5efe3]">
                The mission succeeds when residents see the blackout window
                before fertilizer reaches a lawn, drain, or canal.
              </p>
            </div>
          </Reveal>
        </DarkSection>

        <LightSection id="next">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <SectionHeading
              eyebrow="Next"
              title={
                <>
                  From rule to habit.
                </>
              }
              body="The project succeeds when residents see the blackout window before they buy, apply, or wash fertilizer into stormwater."
            />

            <Reveal delay={0.1}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Link
                  href="/ordinance"
                  className="group block rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] p-6 transition hover:-translate-y-0.5 hover:border-[#b7c5aa] hover:bg-white"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
                    Next page
                  </p>

                  <p className="mt-5 text-[1.25rem] font-semibold tracking-[-0.035em] text-[#173027]">
                    Understand the ordinance
                  </p>

                  <p className="mt-3 text-sm leading-7 text-[#5e665d]">
                    See the exact summer fertilizer rule BLACKOUT is helping residents follow.
                  </p>

                  <p className="mt-6 text-sm text-[#6f8167] transition group-hover:translate-x-0.5">
                    Go to ordinance &rarr;
                  </p>
                </Link>

                <Link
                  href="/retail-partners"
                  className="group block rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] p-6 transition hover:-translate-y-0.5 hover:border-[#b7c5aa] hover:bg-white"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
                    Purchase decision
                  </p>

                  <p className="mt-5 text-[1.25rem] font-semibold tracking-[-0.035em] text-[#173027]">
                    Explore retail reminders
                  </p>

                  <p className="mt-3 text-sm leading-7 text-[#5e665d]">
                    See how shelf tags reach residents before fertilizer is applied.
                  </p>

                  <p className="mt-6 text-sm text-[#6f8167] transition group-hover:translate-x-0.5">
                    Go to retail partners &rarr;
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
