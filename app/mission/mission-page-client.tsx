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
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Indian%20River%20Lagoon%20Area.jpg',
    label: 'Indian River Lagoon',
  },
  {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Florida%20Manatee%20FWS%2018.jpg',
    label: 'Florida manatee',
  },
  {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Floridian%20seagrass%20bed.jpg',
    label: 'Seagrass beds',
  },
  {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Storm%20Drain.JPG',
    label: 'Storm drain pathway',
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
    body: 'Nitrogen and phosphorus are placed on lawns, landscapes, and turf during the rainy season, when runoff risk is highest.',
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
    body: 'Measure what residents know before outreach begins, then return after the campaign to measure what changed.',
    detail: 'Two-wave awareness audit',
  },
  {
    number: '02',
    title: 'Intercept',
    body: 'Place ordinance information beside fertilizer products, where the decision happens and where the message can still prevent runoff.',
    detail: 'Retail shelf-tag placement',
  },
  {
    number: '03',
    title: 'Mark',
    body: 'Install storm drain markers so residents connect lawn behavior to the pathway that carries runoff toward the lagoon.',
    detail: 'GPS-logged drain markers',
  },
]

const sequence = [
  'Wave 1 survey closes before any store tags, drain markers, or public-facing outreach.',
  'Retail tags and drain markers go live only after the baseline awareness data is protected.',
  'Outreach runs through the June 1 - September 30 blackout window.',
  'Wave 2 surveys the same neighborhood zone after the intervention.',
  'The final package gives Brevard County the tools to continue the program.',
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
    body: 'Stores survey sessions, drain records, retail partners, partner letters, and raw data exports.',
  },
  {
    title: 'Photo archive',
    body: 'Keeps before/after drain photos, store tag photos, survey sessions, and field documentation organized by date.',
  },
  {
    title: 'Handoff folder',
    body: 'Contains tag templates, survey instruments, drain database, partner agreements, meeting notes, and final protocols.',
  },
  {
    title: 'Partner records',
    body: 'Documents store agreements, public works communication, county correspondence, and confirmation of handoff.',
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
    body: 'Contacts stores, secures partner agreements, places shelf tags, and tracks estimated reach.',
  },
  {
    title: 'Field Lead',
    body: 'Selects drains, records GPS coordinates, manages installation sessions, and maintains the drain database.',
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
          Mission
        </motion.p>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl text-[clamp(2.8rem,8vw,5.85rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-[#f5efe3]"
        >
          The law exists.
          <br />
          The system does not.
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-[clamp(1rem,2vw,1.25rem)] leading-[1.5] text-white/70"
        >
          BLACKOUT activates Brevard County’s Summer Fertilizer Blackout
          Ordinance by measuring awareness, reaching residents at the point of
          purchase, marking storm drains, and handing off a repeatable field
          system.
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
          className="mt-8 flex max-w-2xl flex-wrap gap-2 text-xs text-white/58"
        >
          <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
            Survey → stores → storm drains
          </span>
          <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
            June 1 - September 30
          </span>
          <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
            Built for handoff
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

export default function MissionPageClient() {
  return (
    <SiteLayout>
      <main className="overflow-hidden bg-[#f7f2e8] font-sans text-[#173027] selection:bg-[#d8d0c2] selection:text-[#07100d]">
        <Hero />

        <LightSection id="snapshot">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <SectionHeading
              eyebrow="Snapshot"
              title={
                <>
                  A focused mission, not a vague environmental campaign.
                </>
              }
              body="BLACKOUT targets one controllable failure point: residents often do not encounter the fertilizer ordinance before buying or applying fertilizer. The project turns that invisible rule into a visible system."
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
                The ordinance is already written. The missing work is timing,
                visibility, documentation, and transfer.
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
                  BLACKOUT starts with a simple question: why is an existing law
                  not changing behavior?
                </>
              }
              body="Brevard County’s summer fertilizer restriction is a real policy, but a policy cannot protect the lagoon if residents do not see it before the moment of action. BLACKOUT treats the issue as an implementation problem."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl bg-[#f5efe3] p-6 text-[#07100d] sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#607357]">
                  Mission statement
                </p>

                <p className="mt-3 text-[1.4rem] font-semibold leading-tight tracking-[-0.04em]">
                  Protect manatees and the seagrass they depend on by activating
                  the fertilizer ordinance through original awareness auditing,
                  retail reminders, storm drain marking, and a clean county
                  handoff.
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
                  The lagoon crisis begins upstream, with ordinary lawn decisions.
                </>
              }
              body="The causal chain is not abstract. Fertilizer applied during the rainy season can move through stormwater infrastructure, contribute to nutrient loading, fuel blooms, reduce seagrass, and weaken the habitat manatees depend on."
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
                Three contacts. One ordinance. One repeatable system.
              </>
            }
            body="The project uses three coordinated prongs because no single message is enough. The survey measures the gap. The shelf tag reaches the purchase decision. The drain marker makes the runoff pathway visible in the neighborhood."
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
                The survey turns a suspected awareness gap into evidence.
              </>
            }
            body="Wave 1 protects the baseline. Wave 2 tests whether the project changed what residents know. The point is not to guess that the ordinance is invisible; the point is to measure it clearly enough that the result can guide future work."
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
                The key number is the share of residents who both know the
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
                The store shelf is where awareness can still change the outcome.
              </>
            }
            body="A resident who applies fertilizer during the blackout window usually buys it first. That makes the fertilizer shelf one of the most important intervention points in the whole project."
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
                The drain marker makes runoff local.
              </>
            }
            body="Storm drains are where lawn behavior becomes a water-quality pathway. Marking them turns an invisible connection into a physical reminder in the exact neighborhood where runoff begins."
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
                  The work is divided by ownership, not by vague titles.
                </>
              }
              body="Each role owns a concrete part of the field system. That keeps the project organized, prevents responsibilities from drifting, and makes the final handoff easier to assemble."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:p-7">
                <div className="border-b border-white/10 pb-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a8b98c]">
                    Role map
                  </p>

                  <p className="mt-3 max-w-xl text-sm leading-7 text-white/56">
                    Five roles, each tied to a field or documentation output.
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
                The project only survives if the records are clean.
              </>
            }
            body="The field work creates the public-facing impact, but the documentation makes it transferable. Every survey session, store agreement, drain marker, photo, and meeting note needs a place in the system."
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
                  The finish line is transfer, not attention.
                </>
              }
              body="BLACKOUT is designed to leave Brevard County or a future student team with the tools to continue: survey forms, drain logs, tag templates, field protocols, photo records, and partner documentation."
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
                BLACKOUT is not asking for a new law. It is asking whether an
                existing law can become visible enough to change behavior.
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
                  From ordinance to everyday action.
                </>
              }
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
                    Understand the ordinance, the sequence, and the logic behind
                    the project.
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
                    See the model
                  </p>

                  <p className="mt-3 text-sm leading-7 text-[#5e665d]">
                    Follow the survey, retail, and storm drain intervention
                    structure.
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