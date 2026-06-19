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

const ordinanceFacts = [
  {
    label: 'Code section',
    value: '§ 62-3601 et seq.',
  },
  {
    label: 'Blackout window',
    value: 'June 1–September 30',
  },
  {
    label: 'Restricted nutrients',
    value: 'Nitrogen and phosphorus',
  },
  {
    label: 'Project role',
    value: 'Activation, not new legislation',
  },
]

const plainLanguage = [
  {
    title: 'What the rule does',
    body: 'During the blackout window, nitrogen and phosphorus fertilizer should not be applied to lawns, landscapes, or turf. The rule already exists in Brevard County code.',
  },
  {
    title: 'Why people miss it',
    body: 'Most residents do not read county code before buying fertilizer. If the rule is invisible at the moment of decision, compliance depends on luck.',
  },
  {
    title: 'What BLACKOUT changes',
    body: 'BLACKOUT moves the ordinance out of the codebook and into the places where residents actually make lawn-care decisions.',
  },
]

const timing = [
  {
    label: 'Rainy season',
    body: 'The blackout window overlaps with the months when runoff risk is highest.',
  },
  {
    label: 'Fast pathway',
    body: 'Stormwater can move nutrients from lawns and pavement into drains, canals, and connected waterways.',
  },
  {
    label: 'Lagoon impact',
    body: 'Excess nutrients can fuel algal growth, reduce light penetration, and weaken seagrass habitat.',
  },
  {
    label: 'Manatee connection',
    body: 'When seagrass disappears, manatees lose access to a primary food source.',
  },
]

const activation = [
  {
    number: '01',
    title: 'Measure first',
    body: 'Wave 1 surveys residents before public outreach begins, creating a clean baseline for ordinance awareness.',
  },
  {
    number: '02',
    title: 'Reach the shelf',
    body: 'Retail tags place the blackout dates beside fertilizer products, where the rule can still change behavior.',
  },
  {
    number: '03',
    title: 'Mark the drain',
    body: 'Storm drain markers make the runoff pathway visible in the same neighborhood where fertilizer decisions begin.',
  },
  {
    number: '04',
    title: 'Return and compare',
    body: 'Wave 2 surveys the same streets after the campaign to test whether awareness changed.',
  },
]

const evidence = [
  {
    title: 'Survey record',
    body: 'Wave 1 and Wave 2 response totals, street coverage, question results, and awareness-change analysis.',
  },
  {
    title: 'Retail record',
    body: 'Partner stores, shelf-tag placement photos, tag counts, and estimated customer reach.',
  },
  {
    title: 'Drain record',
    body: 'Drain IDs, GPS coordinates, before/after photos, installation dates, and site notes.',
  },
  {
    title: 'Photo archive',
    body: 'Timestamped field documentation from survey sessions, store placements, and drain marking.',
  },
]

const handoff = [
  'Survey instruments and response summaries',
  'Shelf tag design files and retail placement notes',
  'GPS-logged storm drain database',
  'Before/after installation photo archive',
  'Field protocol for repeating the project',
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

        <div className="absolute inset-0 bg-gradient-to-r from-[#07100d] via-[#07100d]/82 to-[#07100d]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07100d] via-transparent to-[#07100d]/20" />
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl items-center px-6 sm:px-10 lg:px-12">
        <div className="grid w-full gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.09, delayChildren: 0.12 }}
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#b9c89c]"
            >
              Brevard County ordinance
            </motion.p>

            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-5xl text-[clamp(2.8rem,8vw,5.85rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-[#f5efe3]"
            >
              The rule is clear.
              <br />
              The visibility is not.
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-2xl text-[clamp(1rem,2vw,1.25rem)] leading-[1.5] text-white/70"
            >
              Brevard County already restricts summer nitrogen and phosphorus
              fertilizer use. BLACKOUT makes that rule visible before fertilizer
              enters the runoff pathway.
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
                href="#brief"
                className="inline-flex items-center justify-center rounded-full bg-[#f5efe3] px-6 py-3 text-sm font-semibold text-[#07100d] transition hover:bg-white"
              >
                Ordinance brief
              </Link>

              <Link
                href="#activation"
                className="inline-flex items-center justify-center rounded-full border border-white/18 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/35 hover:text-white"
              >
                How BLACKOUT activates it
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="hidden rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-sm lg:block"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a8b98c]">
              Ordinance snapshot
            </p>

            <div className="mt-5 divide-y divide-white/10">
              {ordinanceFacts.map((item) => (
                <div key={item.label} className="py-4 first:pt-0 last:pb-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/36">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#f5efe3]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

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

export default function OrdinancePage() {
  return (
    <SiteLayout>
      <main className="overflow-hidden bg-[#f7f2e8] font-sans text-[#173027] selection:bg-[#d8d0c2] selection:text-[#07100d]">
        <Hero />

        <DarkSection id="brief">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <SectionHeader
              dark
              eyebrow="Ordinance brief"
              title="The county already wrote the rule."
              body="The summer fertilizer blackout is not a suggestion created by BLACKOUT. It is an existing county ordinance. The project starts from that fact and asks a narrower question: how do residents encounter the rule before they make a fertilizer decision?"
            />

            <Reveal delay={0.1}>
              <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2">
                {ordinanceFacts.map((item) => (
                  <div key={item.label} className="bg-white/[0.035] p-5 sm:p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a8b98c]">
                      {item.label}
                    </p>

                    <p className="mt-3 text-[1.2rem] font-semibold leading-tight tracking-[-0.035em] text-[#f5efe3]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <div className="mt-12 rounded-3xl bg-[#f5efe3] p-6 text-[#07100d] sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#607357]">
                Core idea
              </p>

              <p className="mt-3 max-w-3xl text-[1.45rem] font-semibold leading-tight tracking-[-0.04em]">
                The ordinance cannot protect the lagoon if residents only discover
                it after the fertilizer has already been bought, applied, and
                washed toward the stormwater system.
              </p>
            </div>
          </Reveal>
        </DarkSection>

        <LightSection id="plain-language">
          <SectionHeader
            eyebrow="Plain language"
            title="What the ordinance means in practice."
            body="This page should not read like legal code. The point is to make the rule understandable: what it restricts, why the timing matters, and why BLACKOUT focuses on visibility instead of rewriting policy."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {plainLanguage.map((item, index) => (
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

        <DarkSection id="timing">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-start lg:gap-16">
            <SectionHeader
              dark
              eyebrow="Why the dates matter"
              title="The blackout window is timed around runoff risk."
              body="June through September is not an arbitrary window. It overlaps with the period when heavy rain can move nutrients quickly from lawns into the drainage system and toward the Indian River Lagoon."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a8b98c]">
                  The practical issue
                </p>

                <p className="mt-3 text-[1.4rem] font-semibold leading-tight tracking-[-0.04em] text-[#f5efe3]">
                  The most useful time to communicate the rule is before the
                  fertilizer leaves the shelf, the bag, or the lawn.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
            {timing.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.04}>
                <div className="grid gap-4 py-6 sm:grid-cols-[3rem_10rem_1fr] sm:gap-6">
                  <p className="font-mono text-xs text-[#a8b98c]">
                    {String(index + 1).padStart(2, '0')}
                  </p>

                  <h3 className="text-sm font-semibold text-[#f5efe3]">
                    {item.label}
                  </h3>

                  <p className="max-w-3xl text-sm leading-7 text-white/58">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </DarkSection>

        <LightSection id="activation">
          <SectionHeader
            eyebrow="Activation plan"
            title="BLACKOUT turns a legal rule into a public sequence."
            body="The order matters. The project does not start with posters or social media. It starts by measuring the gap, then places the ordinance where it can affect behavior."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {activation.map((item, index) => (
              <Reveal key={item.number} delay={index * 0.05}>
                <div className="group h-full rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] p-6 transition hover:-translate-y-0.5 hover:border-[#b7c5aa] hover:bg-white">
                  <p className="font-mono text-xs text-[#6f8167]">
                    {item.number}
                  </p>

                  <h3 className="mt-5 text-[1.2rem] font-semibold tracking-[-0.035em]">
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

        <DarkSection id="evidence">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <SectionHeader
              dark
              eyebrow="Evidence system"
              title="The ordinance page should feel civic. The project still has to feel field-tested."
              body="BLACKOUT documents the ordinance activation through data and field records, not just claims. The evidence system shows what happened, where it happened, and what can be repeated."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a8b98c]">
                  What gets recorded
                </p>

                <div className="mt-5 divide-y divide-white/10">
                  {evidence.map((item, index) => (
                    <div
                      key={item.title}
                      className="grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[3rem_1fr]"
                    >
                      <p className="font-mono text-xs text-[#a8b98c]">
                        {String(index + 1).padStart(2, '0')}
                      </p>

                      <div>
                        <p className="text-sm font-semibold text-[#f5efe3]">
                          {item.title}
                        </p>

                        <p className="mt-1 text-sm leading-6 text-white/56">
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
                The strongest proof is specific: survey results, store photos,
                GPS coordinates, before/after images, and a handoff package
                someone else can actually use.
              </p>
            </div>
          </Reveal>
        </DarkSection>

        <LightSection id="handoff">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start lg:gap-16">
            <SectionHeader
              eyebrow="Handoff"
              title="The goal is not to keep explaining the ordinance forever."
              body="The final version of BLACKOUT should be transferable. Brevard County or a future student team should be able to pick up the same tools and run the awareness system again."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl bg-[#173027] p-6 text-[#f7f2e8] sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a8b98c]">
                  Handoff contents
                </p>

                <div className="mt-5 divide-y divide-white/10">
                  {handoff.map((item, index) => (
                    <div
                      key={item}
                      className="grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[3rem_1fr]"
                    >
                      <p className="font-mono text-xs text-[#a8b98c]">
                        {String(index + 1).padStart(2, '0')}
                      </p>

                      <p className="text-sm leading-7 text-white/68">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <div className="mt-12 border-t border-[#ded6c8] pt-8">
              <p className="max-w-3xl text-[clamp(1.3rem,3vw,1.95rem)] font-semibold leading-tight tracking-[-0.04em]">
                The ordinance is the legal foundation. BLACKOUT is the public
                infrastructure around it.
              </p>
            </div>
          </Reveal>
        </LightSection>

        <DarkSection id="next">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <SectionHeader
              dark
              eyebrow="Next"
              title="From code text to visible behavior."
              body="The ordinance works only when residents see it early enough to act differently. That is why BLACKOUT moves the message into stores, neighborhoods, and stormwater pathways."
            />

            <Reveal delay={0.1}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Link
                  href="/mission"
                  className="group block rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-0.5 hover:bg-white/[0.055]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a8b98c]">
                    Mission
                  </p>

                  <p className="mt-5 text-[1.25rem] font-semibold tracking-[-0.035em] text-[#f5efe3]">
                    See the field system
                  </p>

                  <p className="mt-3 text-sm leading-7 text-white/58">
                    Follow how survey, retail, and storm drain work turn the
                    ordinance into a public sequence.
                  </p>

                  <p className="mt-6 text-sm text-[#a8b98c] transition group-hover:translate-x-0.5">
                    Go to mission →
                  </p>
                </Link>

                <Link
                  href="/about"
                  className="group block rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-0.5 hover:bg-white/[0.055]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a8b98c]">
                    About
                  </p>

                  <p className="mt-5 text-[1.25rem] font-semibold tracking-[-0.035em] text-[#f5efe3]">
                    Understand BLACKOUT
                  </p>

                  <p className="mt-3 text-sm leading-7 text-white/58">
                    Read the project foundation, documentation logic, and handoff
                    model.
                  </p>

                  <p className="mt-6 text-sm text-[#a8b98c] transition group-hover:translate-x-0.5">
                    Go to about →
                  </p>
                </Link>
              </div>
            </Reveal>
          </div>
        </DarkSection>
      </main>
    </SiteLayout>
  )
}