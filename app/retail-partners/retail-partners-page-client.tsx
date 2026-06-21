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
    src: '/heroes/retail-1.webp',
    label: 'Garden center exterior',
  },
  {
    src: '/heroes/retail-2.webp',
    label: 'Garden center interior',
  },
  {
    src: '/heroes/retail-3.webp',
    label: 'Garden retail aisle',
  },
  {
    src: '/heroes/retail-4.webp',
    label: 'Garden center plants',
  },
]

const programTargets = [
  {
    label: 'Partner stores',
    value: '4 - 6',
    note: 'Signed agreements per season',
  },
  {
    label: 'Tag placement',
    value: 'At display',
    note: 'Directly on fertilizer shelving',
  },
  {
    label: 'Season duration',
    value: 'Jun 1 - Sep 30',
    note: 'Tags are planned for the full blackout window',
  },
  {
    label: 'Reach tracking',
    value: 'Weekly',
    note: 'Customer traffic logged by partner',
  },
  {
    label: 'Tag design',
    value: 'Manatee Safe',
    note: 'Branded with ordinance dates',
  },
]

const partnerSteps = [
  {
    step: '01',
    label: 'Initial meeting',
    desc: 'One meeting to explain the program and review the tag design. About 20 minutes.',
  },
  {
    step: '02',
    label: 'Agreement prepared',
    desc: 'A written partner agreement confirms placement location, season dates, and weekly reach logging before tags go up.',
  },
  {
    step: '03',
    label: 'Tags scheduled',
    desc: 'The BLACKOUT team plans the installation. Store staff only provides access to the display.',
  },
  {
    step: '04',
    label: 'Weekly data log',
    desc: 'Partners note estimated customer traffic passing the display. It takes roughly two minutes per week.',
  },
  {
    step: '05',
    label: 'Season close',
    desc: 'Tags are planned to come down on October 1. Partners receive a one-page summary of estimated season reach.',
  },
]

const retailPartners = [
  {
    name: 'Target store 01',
    type: 'Hardware',
    status: 'Outreach pending',
    active: false,
  },
  {
    name: 'Target store 02',
    type: 'Garden center',
    status: 'Outreach pending',
    active: false,
  },
  {
    name: 'Target store 03',
    type: 'Hardware',
    status: 'Outreach pending',
    active: false,
  },
  {
    name: 'Target store 04',
    type: 'Nursery',
    status: 'Outreach pending',
    active: false,
  },
  {
    name: 'Target store 05',
    type: 'Garden center',
    status: 'Outreach pending',
    active: false,
  },
  {
    name: 'Target store 06',
    type: 'Hardware',
    status: 'Outreach pending',
    active: false,
  },
]

const partnerValue = [
  {
    title: 'No cost to stores',
    body: 'BLACKOUT prepares the tags, schedules placement, and handles removal at the end of the blackout window.',
  },
  {
    title: 'Simple placement',
    body: 'Tags sit directly beside fertilizer products so customers see the ordinance before purchasing.',
  },
  {
    title: 'Community-facing role',
    body: 'Partner stores help customers avoid accidental violations while supporting the Indian River Lagoon.',
  },
]

const materials = [
  'Printed Manatee Safe shelf tags',
  'One-page partner agreement',
  'Placement photo record',
  'Weekly traffic estimate log',
  'End-of-season reach summary',
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
          Retail partners
        </motion.p>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] as const }}
          className="max-w-5xl text-[clamp(2.8rem,8vw,5.85rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-[#f5efe3]"
        >
          The shelf is
          <br />
          the decision point.
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-6 max-w-2xl text-[clamp(1rem,2vw,1.25rem)] leading-[1.5] text-white/70"
        >
          BLACKOUT is preparing shelf reminders so customers see the rule before
          buying fertilizer.
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
            href="#program"
            className="inline-flex items-center justify-center rounded-full bg-[#f5efe3] px-6 py-3 text-sm font-semibold text-[#07100d] transition hover:bg-white"
          >
            Partner plan
          </Link>

          <Link
            href="/storm-drains"
            className="inline-flex items-center justify-center rounded-full border border-white/18 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/35 hover:text-white"
          >
            Drain markers
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
            4 - 6 partner stores
          </span>
          <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
            Manatee Safe shelf tags
          </span>
          <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
            June 1 - September 30
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

export function RetailPartnersPageClient() {
  return (
    <SiteLayout>
      <main id="main-content" tabIndex={-1} className="overflow-hidden bg-[#f7f2e8] font-sans text-[#173027] selection:bg-[#d8d0c2] selection:text-[#07100d]">
        <Hero />

        <LightSection id="program">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <SectionHeader
              eyebrow="Program snapshot"
              title="One job for stores."
              body="The shelf tag gives customers the blackout dates before they buy fertilizer."
            />

            <Reveal delay={0.1}>
              <div className="grid gap-px overflow-hidden rounded-3xl border border-[#ded6c8] bg-[#ded6c8] sm:grid-cols-2">
                {programTargets.map((item) => (
                  <div key={item.label} className="bg-[#fbf8f1] p-5 sm:p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
                      {item.label}
                    </p>

                    <p className="mt-3 text-[1.4rem] font-semibold leading-tight tracking-[-0.04em] text-[#173027]">
                      {item.value}
                    </p>

                    <p className="mt-3 text-sm leading-6 text-[#657064]">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <div className="mt-12 rounded-3xl bg-[#173027] p-6 text-[#f7f2e8] sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a8b98c]">
                Core idea
              </p>

              <p className="mt-3 max-w-3xl text-[1.45rem] font-semibold leading-tight tracking-[-0.04em]">
                The purchase moment is the last clean chance to prevent a summer
                fertilizer use decision.
              </p>
            </div>
          </Reveal>
        </LightSection>

        <DarkSection id="why-retail">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start lg:gap-16">
            <SectionHeader
              dark
              eyebrow="Why retail"
              title="The shelf matters."
              body="The fertilizer display is a strong intervention point because the reminder appears before the customer acts."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl bg-[#f5efe3] p-6 text-[#07100d] sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#607357]">
                  Partner role
                </p>

                <p className="mt-3 text-[1.45rem] font-semibold leading-tight tracking-[-0.04em]">
                  Let BLACKOUT place a small ordinance reminder at the fertilizer
                  shelf during the blackout window.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {partnerValue.map((item, index) => (
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

        <LightSection id="steps">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
            <SectionHeader
              eyebrow="Partner process"
              title="Low lift for stores."
              body="BLACKOUT handles materials, planned installation, documentation, and the season summary."
            />

            <div className="divide-y divide-[#ded6c8] border-y border-[#ded6c8]">
              {partnerSteps.map((item, index) => (
                <Reveal key={item.step} delay={index * 0.05}>
                  <div className="grid gap-4 py-6 sm:grid-cols-[3rem_11rem_1fr] sm:gap-6">
                    <p className="font-mono text-xs text-[#6f8167]">
                      {item.step}
                    </p>

                    <h3 className="text-sm font-semibold text-[#173027]">
                      {item.label}
                    </h3>

                    <p className="max-w-3xl text-sm leading-7 text-[#5e665d]">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </LightSection>

        <DarkSection id="materials">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
            <SectionHeader
              dark
              eyebrow="Materials"
              title="Prepared first."
              body="A partner does not need to design anything, print anything, or manage a campaign. The store provides shelf access and a weekly reach estimate."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a8b98c]">
                  Partner kit
                </p>

                <div className="mt-5 divide-y divide-white/10">
                  {materials.map((item, index) => (
                    <div
                      key={item}
                      className="grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[3rem_1fr]"
                    >
                      <p className="font-mono text-xs text-[#a8b98c]">
                        {String(index + 1).padStart(2, '0')}
                      </p>

                      <p className="text-sm leading-7 text-white/62">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </DarkSection>

        <LightSection id="partners">
          <SectionHeader
            eyebrow="Partner list"
            title="Outreach status."
            body="The partner list tracks target stores, store type, and outreach status."
          />

          <Reveal delay={0.1}>
            <div className="mt-10 overflow-hidden rounded-3xl border border-[#ded6c8] bg-[#fbf8f1]">
              <div className="hidden border-b border-[#ded6c8] bg-white/55 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f8167] md:grid md:grid-cols-[1.3fr_0.7fr_0.8fr]">
                <p>Store</p>
                <p>Type</p>
                <p>Status</p>
              </div>

              {retailPartners.map((partner) => (
                <div
                  key={partner.name}
                  className="grid gap-4 border-b border-[#ded6c8] px-5 py-5 last:border-b-0 md:grid-cols-[1.3fr_0.7fr_0.8fr] md:items-center"
                >
                  <p className="font-medium text-[#173027]">
                    {partner.name}
                  </p>

                  <p className="text-sm text-[#5e665d]">
                    {partner.type}
                  </p>

                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${partner.active ? 'bg-[#6f8167]' : 'bg-[#c7c0b0]'
                        }`}
                    />
                    <span
                      className={`text-sm ${partner.active ? 'text-[#173027]' : 'text-[#7c8576]'
                        }`}
                    >
                      {partner.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </LightSection>

        <DarkSection id="partner">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <SectionHeader
              dark
              eyebrow="Become a partner"
              title="Become a partner."
              body="Retail partners help customers see the ordinance before they make a summer fertilizer decision."
            />

            <Reveal delay={0.1}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Link
                  href="mailto:blackoutprojectirl@gmail.com?subject=Retail%20Partnership"
                  className="group block rounded-3xl bg-[#f5efe3] p-6 text-[#07100d] transition hover:-translate-y-0.5 hover:bg-white"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#607357]">
                    Contact
                  </p>

                  <p className="mt-5 text-[1.25rem] font-semibold tracking-[-0.035em]">
                    Request a partner packet
                  </p>

                  <p className="mt-3 text-sm leading-7 text-[#526052]">
                    Ask for the one-page agreement, tag mockup, and placement
                    instructions.
                  </p>

                  <p className="mt-6 text-sm text-[#607357] transition group-hover:translate-x-0.5">
                    Email the team &rarr;
                  </p>
                </Link>

                <Link
                  href="/storm-drains"
                  className="group block rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-0.5 hover:bg-white/[0.055]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a8b98c]">
                    Next field step
                  </p>

                  <p className="mt-5 text-[1.25rem] font-semibold tracking-[-0.035em] text-[#f5efe3]">
                    See storm drain marking
                  </p>

                  <p className="mt-3 text-sm leading-7 text-white/58">
                    Learn how the message continues after the store, at the runoff pathway.
                  </p>

                  <p className="mt-6 text-sm text-[#a8b98c] transition group-hover:translate-x-0.5">
                    Go to storm drains &rarr;
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
