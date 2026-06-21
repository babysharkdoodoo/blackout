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
import { ContactForm } from '@/components/contact-form'

const PROJECT_EMAIL = 'blackoutprojectirl@gmail.com'

const heroImages = [
  {
    src: '/heroes/contact-1.webp',
    label: 'Community meeting',
  },
  {
    src: '/heroes/contact-2.webp',
    label: 'Contact desk',
  },
  {
    src: '/heroes/contact-3.webp',
    label: 'Public meeting',
  },
  {
    src: '/heroes/contact-4.webp',
    label: 'Business conversation',
  },
]

const directory = [
  {
    type: 'General & Media',
    desc: 'Press inquiries, project documentation requests, and general questions.',
    contact: PROJECT_EMAIL,
    note: 'Direct inbox',
  },
  {
    type: 'Retail Partnerships',
    desc: 'Hardware stores, garden centers, and nurseries interested in shelf tag participation.',
    contact: PROJECT_EMAIL,
    note: 'Partnership Inquiry',
  },
  {
    type: 'County Coordination',
    desc: 'Brevard County Natural Resources, stormwater management, or official correspondence.',
    contact: PROJECT_EMAIL,
    note: 'County',
  },
  {
    type: 'Academic / Replication',
    desc: 'Schools or organizations interested in replicating the BLACKOUT model.',
    contact: PROJECT_EMAIL,
    note: 'Replication',
  },
]

const quickLinks = [
  {
    head: 'Take the survey',
    body: 'Brevard County residents can review the awareness questions and help shape the baseline.',
    href: '/survey',
    cta: 'Open survey',
  },
  {
    head: 'Retail partnership',
    body: 'Hardware and garden retailers can ask about planned shelf tags for the fertilizer section.',
    href: '/retail-partners',
    cta: 'Learn more',
  },
  {
    head: 'Follow the project',
    body: 'See the records BLACKOUT is preparing for survey, retail, drain, and handoff work.',
    href: '/impact',
    cta: 'View impact',
  },
]

const contactSnapshot = [
  {
    label: 'Primary inbox',
    value: 'One channel',
    note: 'All inquiries route through the same project address.',
  },
  {
    label: 'Project base',
    value: 'West Shore',
    note: 'West Shore Jr./Sr. High School in Melbourne, Florida.',
  },
  {
    label: 'Field season',
    value: 'Summer 2026',
    note: 'Aligned with the June 1 - September 30 blackout window.',
  },
  {
    label: 'Routing',
    value: 'Project Lead',
    note: 'Partnership and county inquiries are forwarded directly.',
  },
]

const contactNotes = [
  'Media questions and documentation requests go through the general inbox.',
  'Retail partners can request a shelf tag packet and placement details.',
  'County or stormwater-related messages are routed to the Project Lead.',
  'Schools and organizations can ask for replication materials after field documentation is assembled.',
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
          Contact
        </motion.p>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] as const }}
          className="max-w-5xl text-[clamp(2.8rem,8vw,5.85rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-[#f5efe3]"
        >
          One inbox.
          <br />
          Clear routing.
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-6 max-w-2xl text-[clamp(1rem,2vw,1.25rem)] leading-[1.5] text-white/70"
        >
          Use one contact path for media, retail, county, school, or general
          questions.
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
            href="#directory"
            className="inline-flex items-center justify-center rounded-full bg-[#f5efe3] px-6 py-3 text-sm font-semibold text-[#07100d] transition hover:bg-white"
          >
            Directory
          </Link>

          <Link
            href="#form"
            className="inline-flex items-center justify-center rounded-full border border-white/18 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/35 hover:text-white"
          >
            Message form
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
            Media
          </span>
          <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
            Retail partners
          </span>
          <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
            County coordination
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

function mailto(contact: string, subject?: string) {
  return `mailto:${contact}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`
}

export function ContactPageClient() {
  return (
    <SiteLayout>
      <main id="main-content" tabIndex={-1} className="overflow-hidden bg-[#f7f2e8] font-sans text-[#173027] selection:bg-[#d8d0c2] selection:text-[#07100d]">
        <Hero />

        <LightSection id="overview">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <SectionHeader
              eyebrow="Contact overview"
              title="One contact path."
              body="BLACKOUT uses one inbox so messages stay organized and can be routed by topic."
            />

            <Reveal delay={0.1}>
              <div className="grid gap-px overflow-hidden rounded-3xl border border-[#ded6c8] bg-[#ded6c8] sm:grid-cols-2">
                {contactSnapshot.map((item) => (
                  <div key={item.label} className="bg-[#fbf8f1] p-5 sm:p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
                      {item.label}
                    </p>

                    <p className="mt-3 text-[1.35rem] font-semibold leading-tight tracking-[-0.04em] text-[#173027]">
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
            <div className="mt-12 border-t border-[#ded6c8] pt-8">
              <p className="max-w-3xl text-[clamp(1.3rem,3vw,1.95rem)] font-semibold leading-tight tracking-[-0.04em]">
                The point is simple: every message reaches the same team, and
                the right person responds from there.
              </p>
            </div>
          </Reveal>
        </LightSection>

        <DarkSection id="directory">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
            <SectionHeader
              dark
              eyebrow="Directory"
              title="Clear routing."
              body="Use the same inbox for all messages. Include the relevant topic in the subject line so the team can route it quickly."
            />

            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035]">
                <div className="hidden border-b border-white/10 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a8b98c] md:grid md:grid-cols-[1fr_0.8fr_0.45fr]">
                  <p>Inquiry</p>
                  <p>Contact</p>
                  <p>Subject</p>
                </div>

                {directory.map((item, index) => (
                  <Reveal key={item.type} delay={index * 0.04}>
                    <div className="grid gap-4 border-b border-white/10 px-5 py-5 last:border-b-0 md:grid-cols-[1fr_0.8fr_0.45fr] md:items-center md:px-6">
                      <div>
                        <h3 className="text-[1.12rem] font-semibold tracking-[-0.035em] text-[#f5efe3]">
                          {item.type}
                        </h3>

                        <p className="mt-2 max-w-xl text-sm leading-7 text-white/56">
                          {item.desc}
                        </p>
                      </div>

                      <a
                        href={mailto(
                          item.contact,
                          item.note === 'Direct inbox' ? undefined : item.note,
                        )}
                        className="text-sm font-semibold text-[#f5efe3] transition hover:text-[#a8b98c]"
                      >
                        {item.contact} <span className="text-[#a8b98c]">&nearr;</span>
                      </a>

                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a8b98c] md:text-right">
                        {item.note}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <div className="mt-12 rounded-3xl bg-[#f5efe3] p-6 text-[#07100d] sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#607357]">
                Status notice
              </p>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#526052]">
                BLACKOUT is a student initiative at West Shore Jr./Sr. High
                School in Melbourne, Florida. Response times may vary with the
                academic calendar. Partnership and county inquiries are routed to
                the Project Lead.
              </p>
            </div>
          </Reveal>
        </DarkSection>

        <LightSection id="form">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
            <SectionHeader
              eyebrow="Send a message"
              title="Send a message."
              body="Use the directory for direct email delivery. The form keeps the message topics clear while inbox routing is being prepared."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] p-4 shadow-[0_24px_70px_rgba(40,30,15,0.08)] sm:p-5">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </LightSection>

        <DarkSection id="engage">
          <SectionHeader
            dark
            eyebrow="Get involved"
            title="Ways to engage."
            body="Most visitors are here to take the survey, explore retail partnership, or follow field progress."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {quickLinks.map((item, index) => (
              <Reveal key={item.head} delay={index * 0.05}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-0.5 hover:bg-white/[0.055]"
                >
                  <div className="flex-1">
                    <p className="font-mono text-xs text-[#a8b98c]">
                      {String(index + 1).padStart(2, '0')}
                    </p>

                    <h3 className="mt-5 text-[1.2rem] font-semibold tracking-[-0.035em] text-[#f5efe3]">
                      {item.head}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-white/58">
                      {item.body}
                    </p>
                  </div>

                  <p className="mt-6 text-sm font-semibold text-[#a8b98c] transition group-hover:translate-x-0.5">
                    {item.cta} &rarr;
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </DarkSection>

        <LightSection id="routing">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
            <SectionHeader
              eyebrow="Routing"
              title="Traceable communication."
              body="A single response path keeps project questions, partner messages, and county coordination easier to track."
            />

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
                  Routing logic
                </p>

                <div className="mt-5 divide-y divide-[#ded6c8]">
                  {contactNotes.map((note, index) => (
                    <div
                      key={note}
                      className="grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[3rem_1fr]"
                    >
                      <p className="font-mono text-xs text-[#6f8167]">
                        {String(index + 1).padStart(2, '0')}
                      </p>

                      <p className="text-sm leading-7 text-[#5e665d]">
                        {note}
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
                href="/retail-partners"
                className="inline-flex items-center justify-center rounded-full bg-[#173027] px-6 py-3 text-sm font-semibold text-[#f7f2e8] transition hover:bg-[#223a2e]"
              >
                Retail partnership details
              </Link>

              <Link
                href="/impact"
                className="inline-flex items-center justify-center rounded-full border border-[#d8d0c2] px-6 py-3 text-sm font-semibold text-[#53634f] transition hover:border-[#173027]/30 hover:text-[#173027]"
              >
                Review impact first
              </Link>
            </div>
          </Reveal>
        </LightSection>
      </main>
    </SiteLayout>
  )
}

export default ContactPageClient
