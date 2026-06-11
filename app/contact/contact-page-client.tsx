// app/contact/contact-page-client.tsx
'use client'

import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { SiteLayout } from '@/components/site-layout'
import { ContactForm } from '@/components/contact-form'

const heroBg =
  'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80'

const directory = [
  {
    type: 'General & Media',
    desc: 'Press inquiries, project documentation requests, and general questions.',
    contact: 'blackout.irl@westshore.edu',
    note: null,
  },
  {
    type: 'Retail Partnerships',
    desc: 'Hardware stores, garden centers, and nurseries interested in shelf tag participation.',
    contact: 'blackout.irl@westshore.edu',
    note: 'Partnership Inquiry',
  },
  {
    type: 'County Coordination',
    desc: 'Brevard County Natural Resources, stormwater management, or official correspondence.',
    contact: 'blackout.irl@westshore.edu',
    note: 'County',
  },
  {
    type: 'Academic / Replication',
    desc: 'Schools or organizations interested in replicating the BLACKOUT model.',
    contact: 'blackout.irl@westshore.edu',
    note: 'Replication',
  },
]

const quickLinks = [
  {
    head: 'Take the survey',
    body: 'Brevard County residents can participate in the community compliance audit.',
    href: '/survey',
    cta: 'Open survey',
  },
  {
    head: 'Retail partnership',
    body: 'Hardware and garden retailers can host a shelf tag in the fertilizer section.',
    href: '/retail-partners',
    cta: 'Learn more',
  },
  {
    head: 'Follow the project',
    body: 'The website is updated as field activities progress through the 2026 season.',
    href: '/impact',
    cta: 'View impact',
  },
]

function Fade({
  children,
  delay = 0,
  y = 14,
  className = '',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-120px' })
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y, filter: 'blur(8px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function Accent({ children }: { children: ReactNode }) {
  return <span className="text-[#a3b18a]">{children}</span>
}

function SectionTitle({
  eyebrow,
  title,
  dark = false,
}: {
  eyebrow: string
  title: ReactNode
  dark?: boolean
}) {
  return (
    <div className="mb-10">
      <p
        className={`text-[10px] uppercase tracking-[0.3em] ${
          dark ? 'text-[#8f978a]' : 'text-[#6f8167]'
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 max-w-4xl font-sans text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.045em] ${
          dark ? 'text-[#f3efe5]' : 'text-[#173027]'
        }`}
      >
        {title}
      </h2>
    </div>
  )
}

function DividerLabel({ label }: { label: string }) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <span className="h-px w-10 bg-[#7a8d73]/35" />
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f8167]">
        {label}
      </span>
    </div>
  )
}

function LightBand({ children }: { children: ReactNode }) {
  return <section className="bg-[#faf7f0] py-16 sm:py-20 lg:py-24">{children}</section>
}

function DarkBand({ children }: { children: ReactNode }) {
  return <section className="bg-[#060807] py-16 text-[#f3efe5] sm:py-20 lg:py-24">{children}</section>
}

function Row({
  left,
  right,
  dark = false,
}: {
  left: string
  right: ReactNode
  dark?: boolean
}) {
  return (
    <div
      className={`grid gap-3 border-b py-6 last:border-b-0 lg:grid-cols-[260px_1fr] ${
        dark ? 'border-white/10' : 'border-[#e2dbc9]'
      }`}
    >
      <p
        className={`text-[11px] uppercase tracking-[0.18em] ${
          dark ? 'text-[#8f978a]' : 'text-[#7c8576]'
        }`}
      >
        {left}
      </p>
      <div className={`text-[14px] leading-[1.9] ${dark ? 'text-[#b8afa1]' : 'text-[#5a625b]'}`}>
        {right}
      </div>
    </div>
  )
}

function LinkRow({
  head,
  body,
  href,
  cta,
}: {
  head: string
  body: string
  href: string
  cta: string
}) {
  return (
    <div className="grid gap-4 border-b border-white/10 py-6 last:border-b-0 lg:grid-cols-[1.2fr_1fr] lg:items-center">
      <div>
        <h3 className="font-sans text-xl font-semibold tracking-[-0.03em] text-[#f3efe5]">
          {head}
        </h3>
        <p className="mt-2 text-[14px] leading-[1.85] text-[#a6ad9f]">{body}</p>
      </div>
      <div className="lg:text-right">
        <Link
          href={href}
          className="inline-flex items-center gap-2 rounded-full bg-[#efe8d6] px-5 py-3 text-sm font-medium text-[#111814] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
        >
          {cta}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  )
}

export function ContactPageClient() {
  const [loaded, setLoaded] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <SiteLayout>
      <main className="overflow-hidden bg-[#f6f1e7] text-[#111814] selection:bg-[#d9cfb6] selection:text-[#111814] font-sans">
        {/* Hero */}
        <section id="top" className="relative isolate overflow-hidden bg-[#060807] text-white">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-18"
            style={{ backgroundImage: `url(${heroBg})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(163,177,138,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_22%),linear-gradient(180deg,#0a0f0d_0%,#050706_100%)]" />
          <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060807] via-[#060807]/82 to-[#060807]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060807] via-transparent to-transparent" />

          <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <Fade y={10}>
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#8f978a]">
                08 / Contact
              </p>
            </Fade>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
              <div className="max-w-3xl">
                <Fade delay={0.05}>
                  <h1 className="max-w-5xl font-sans text-[clamp(3.25rem,6vw,6.25rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-[#f4efe5]">
                    Reach the team.
                    <br />
                    <Accent>One inbox.</Accent>
                    <br />
                    One response path.
                  </h1>
                </Fade>

                <Fade delay={0.12}>
                  <p className="mt-6 max-w-xl text-[1.05rem] leading-8 text-[#c1c8ba]">
                    Media inquiries, partnership questions, county coordination, or general interest all go to the same place.
                  </p>
                </Fade>

                <Fade delay={0.18}>
                  <p className="mt-4 max-w-xl text-base leading-7 text-[#9fa79a]">
                    The page is kept simple and calm so the contact information stays clear and easy to use.
                  </p>
                </Fade>

                <Fade delay={0.24}>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href="#directory"
                      className="group inline-flex items-center gap-2 rounded-full bg-[#efe8d6] px-5 py-3 text-sm font-medium text-[#111814] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
                    >
                      Contact directory
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                        →
                      </span>
                    </Link>
                    <Link
                      href="#form"
                      className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                    >
                      Send a message
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                        →
                      </span>
                    </Link>
                  </div>
                </Fade>
              </div>

              <motion.div
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.99 }}
                animate={loaded ? { opacity: 1, y: 0, scale: 1 } : undefined}
                transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <motion.div
                    aria-hidden="true"
                    initial={reduceMotion ? { scale: 1 } : { scale: 1.05, opacity: 0.85 }}
                    animate={loaded ? { scale: 1, opacity: 1 } : undefined}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroBg})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050706] via-transparent to-transparent" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />
                </div>
                <div className="border-t border-white/10 px-6 py-5">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f978a]">Project inbox</p>
                  <p className="mt-2 text-sm leading-7 text-[#f3efe5]">
                    Messages stay routed through a single channel so the team can respond clearly and consistently.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Directory */}
        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="01 / Contact directory" />
            <SectionTitle
              eyebrow="Where messages go"
              title={
                <>
                  The directory keeps every inquiry type visible without overcomplicating the page.
                </>
              }
            />

            <div
              id="directory"
              className="mt-8 overflow-hidden rounded-[2rem] border border-[#e2dbc9] bg-white/75"
            >
              {directory.map((item) => (
                <div
                  key={item.type}
                  className="grid gap-4 border-b border-[#e2dbc9] px-5 py-6 last:border-b-0 lg:grid-cols-[1.15fr_1fr_auto] lg:items-center"
                >
                  <div>
                    <p className="font-sans text-xl font-semibold tracking-[-0.03em] text-[#173027]">
                      {item.type}
                    </p>
                    <p className="mt-2 text-[14px] leading-[1.85] text-[#5a625b]">{item.desc}</p>
                  </div>
                  <div>
                    <a
                      href={`mailto:${item.contact}${
                        item.note ? `?subject=${encodeURIComponent(item.note)}` : ''
                      }`}
                      className="inline-flex items-center gap-1 text-[14px] font-medium text-[#173027] transition-colors hover:text-[#2d6a2d]"
                    >
                      {item.contact}
                      <span className="text-[#6f8167]">↗</span>
                    </a>
                  </div>
                  <div className="lg:text-right">
                    {item.note ? (
                      <span className="inline-flex rounded-full border border-[#e2dbc9] bg-white/70 px-3 py-1 text-[11px] font-medium text-[#7c8576]">
                        {item.note}
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#8f978a]">
                        Direct inbox
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-[#e2dbc9] bg-white/70 p-6">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#6f8167]">Status notice</p>
              <p className="mt-3 max-w-4xl text-[14px] leading-[1.9] text-[#5a625b]">
                BLACKOUT is a student initiative at West Shore Jr./Sr. High School, Melbourne, Florida. Response times may vary with the academic calendar. All partnership and county inquiries are forwarded directly to the Project Lead.
              </p>
            </div>
          </div>
        </LightBand>

        {/* Form */}
        <DarkBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="02 / Send a message" />
            <SectionTitle
              eyebrow="Use the form"
              title={
                <>
                  Questions, partnership inquiries, media requests, or feedback all belong here.
                </>
              }
              dark
            />

            <div id="form" className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div className="space-y-6 text-[15px] leading-[1.9] text-[#b8afa1]">
                <Fade>
                  <p>
                    The form is the simplest way to reach the team. It keeps the contact page clear while still giving visitors a direct path to the right inbox.
                  </p>
                </Fade>
                <Fade delay={0.06}>
                  <p>
                    The design stays aligned with the rest of the site: rounded corners, subtle motion, and a calm dark-and-light contrast.
                  </p>
                </Fade>
              </div>

              <Fade delay={0.1}>
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 lg:p-5 backdrop-blur-md">
                  <ContactForm />
                </div>
              </Fade>
            </div>
          </div>
        </DarkBand>

        {/* Get involved */}
        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="03 / Get involved" />
            <SectionTitle
              eyebrow="Useful next steps"
              title={
                <>
                  A few links cover the most common ways people engage with the project.
                </>
              }
            />

            <div className="grid gap-6 sm:grid-cols-3">
              {quickLinks.map((item) => (
                <div
                  key={item.head}
                  className="rounded-[1.5rem] border border-[#e2dbc9] bg-white/70 p-6"
                >
                  <h3 className="font-sans text-xl font-semibold tracking-[-0.03em] text-[#173027]">
                    {item.head}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.85] text-[#5a625b]">{item.body}</p>
                  <Link
                    href={item.href}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#efe8d6] px-4 py-2 text-sm font-medium text-[#111814] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                  >
                    {item.cta}
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </LightBand>

        {/* Closing */}
        <DarkBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="04 / Closing" />
            <SectionTitle
              eyebrow="Closing"
              title={
                <>
                  One inbox. One response path. No confusion.
                </>
              }
              dark
            />

            <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
              <div className="space-y-3 text-[14px] leading-[1.85] text-[#a6ad9f]">
                <p>Media inquiries.</p>
                <p>Retail partnerships.</p>
                <p>County coordination.</p>
                <p>General questions.</p>
              </div>

              <div>
                <h3 className="font-sans text-2xl font-semibold tracking-[-0.03em] text-white">
                  The contact page should feel direct, calm, and easy to trust.
                </h3>
                <p className="mt-4 text-[14px] leading-[1.9] text-[#a6ad9f]">
                  This version matches the rest of the site with an image-led hero, rounded corners, simpler bands, and fewer heavy cards.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="#directory"
                    className="inline-flex items-center gap-2 rounded-full bg-[#efe8d6] px-5 py-3 text-sm font-medium text-[#111814] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                  >
                    Contact directory
                    <span aria-hidden>→</span>
                  </Link>
                  <Link
                    href="#top"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                  >
                    Back to top
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </DarkBand>
      </main>
    </SiteLayout>
  )
}