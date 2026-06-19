'use client'

import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { SiteLayout } from '@/components/site-layout'

const heroImage =
  'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80'

const programTargets = [
  { label: 'Partner stores', value: '4 - 6', note: 'Signed agreements per season' },
  { label: 'Tag placement', value: 'At display', note: 'Directly on fertilizer shelving' },
  { label: 'Season duration', value: 'Jun 1 - Sep 30', note: 'Tags remain in place throughout' },
  { label: 'Reach tracking', value: 'Weekly', note: 'Customer traffic logged by partner' },
  { label: 'Tag design', value: 'Manatee Safe', note: 'Branded with ordinance dates' },
]

const partnerSteps = [
  {
    step: '01',
    label: 'Initial meeting',
    desc: 'One meeting to explain the program and review the tag design. About 20 minutes.',
  },
  {
    step: '02',
    label: 'Agreement signed',
    desc: 'A written partner agreement confirming placement location, season dates, and weekly reach logging.',
  },
  {
    step: '03',
    label: 'Tags installed',
    desc: 'The BLACKOUT team installs the tags. Store staff only provides access to the display.',
  },
  {
    step: '04',
    label: 'Weekly data log',
    desc: 'Partners note estimated customer traffic passing the display. Takes roughly two minutes per week.',
  },
  {
    step: '05',
    label: 'Season close',
    desc: 'Tags are removed on October 1. The partner receives a one-page summary of estimated season reach.',
  },
]

const retailPartners = [
  { name: 'Partner A  -  Brevard County', type: 'Hardware', status: 'Outreach pending', active: false },
  { name: 'Partner B  -  Brevard County', type: 'Garden center', status: 'Outreach pending', active: false },
  { name: 'Partner C  -  Brevard County', type: 'Hardware', status: 'Outreach pending', active: false },
  { name: 'Partner D  -  Brevard County', type: 'Nursery', status: 'Outreach pending', active: false },
  { name: 'Partner E  -  Brevard County', type: 'Garden center', status: 'Outreach pending', active: false },
  { name: 'Partner F  -  Brevard County', type: 'Hardware', status: 'Outreach pending', active: false },
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

function StatusRow({
  name,
  type,
  status,
  active,
}: {
  name: string
  type: string
  status: string
  active: boolean
}) {
  return (
    <div className="grid gap-4 border-b border-[#e2dbc9] px-5 py-5 last:border-b-0 md:grid-cols-[1.3fr_0.7fr_0.8fr] md:items-center">
      <p className="font-medium text-[#173027]">{name}</p>
      <p className="text-[13px] text-[#5a625b]">{type}</p>
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${active ? 'bg-emerald-500' : 'bg-[#c7c0b0]'}`} />
        <span className={`text-[13px] ${active ? 'text-emerald-800' : 'text-[#7c8576]'}`}>{status}</span>
      </div>
    </div>
  )
}

export function RetailPartnersPageClient() {
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
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${heroImage})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(163,177,138,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_22%),linear-gradient(180deg,#0a0f0d_0%,#050706_100%)]" />
          <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060807] via-[#060807]/82 to-[#060807]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060807] via-transparent to-transparent" />

          <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <Fade y={10}>
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#8f978a]">04B / Retail Partners</p>
            </Fade>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
              <div className="max-w-3xl">
                <Fade delay={0.05}>
                  <h1 className="max-w-5xl font-sans text-[clamp(3.25rem,6vw,6.25rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-[#f4efe5]">
                    The shelf is the{' '}
                    <span className="text-[#a3b18a]">
                      decision point.
                    </span>
                  </h1>
                </Fade>

                <Fade delay={0.12}>
                  <p className="mt-6 max-w-xl text-[1.05rem] leading-8 text-[#c1c8ba]">
                    BLACKOUT places the ordinance where the choice happens: at the fertilizer display, before the purchase becomes an application.
                  </p>
                </Fade>

                <Fade delay={0.18}>
                  <p className="mt-4 max-w-xl text-base leading-7 text-[#9fa79a]">
                    The page stays calm and structured: one image-led hero, one program snapshot, one sequence, and one partner list.
                  </p>
                </Fade>

                <Fade delay={0.24}>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href="#how-it-works"
                      className="group inline-flex items-center gap-2 rounded-full bg-[#efe8d6] px-5 py-3 text-sm font-medium text-[#111814] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
                    >
                      How it works
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                        →
                      </span>
                    </Link>
                    <Link
                      href="#partners"
                      className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                    >
                      Partner list
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
                    style={{ backgroundImage: `url(${heroImage})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050706] via-transparent to-transparent" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />
                </div>
                <div className="border-t border-white/10 px-6 py-5">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f978a]">Point of purchase</p>
                  <p className="mt-2 text-sm leading-7 text-[#f3efe5]">
                    A nursery or hardware aisle is where the ordinance can be seen at the exact moment it matters.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Snapshot */}
        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="01 / Snapshot" />
            <SectionTitle eyebrow="Program summary" title={<>A small, repeatable shelf tag program with a clear season and a clear log.</>} />

            <div className="mt-8 border-t border-[#e2dbc9]">
              {programTargets.map((item, index) => (
                <Fade key={item.label} delay={index * 0.04}>
                  <Row
                    left={item.label}
                    right={
                      <>
                        <span className="block text-[16px] font-medium text-[#173027]">{item.value}</span>
                        <span className="mt-1 block text-[13px] text-[#5a625b]">{item.note}</span>
                      </>
                    }
                  />
                </Fade>
              ))}
            </div>
          </div>
        </LightBand>

        {/* How it works */}
        <DarkBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="02 / How it works" />
            <SectionTitle
              eyebrow="The intervention"
              title={
                <>
                  Shelf tags meet the buyer <Accent>at the display</Accent> and turn a retail decision into a compliance moment.
                </>
              }
              dark
            />

            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <div className="space-y-6 text-[15px] leading-[1.9] text-[#b8afa1]">
                <Fade>
                  <p>
                    BLACKOUT partners with local garden centers, nurseries, and hardware stores that sell fertilizer in Brevard County. Each partner receives a simple shelf tag placed directly at the fertilizer display.
                  </p>
                </Fade>
                <Fade delay={0.06}>
                  <p>
                    The tag carries the ordinance window, the Manatee Safe message, and the blackout dates. It is meant to interrupt the purchase decision before the product leaves the shelf.
                  </p>
                </Fade>
                <Fade delay={0.12}>
                  <p>
                    Partners also log weekly customer reach. That estimate becomes part of the county handoff package and the project’s final evidence set.
                  </p>
                </Fade>
              </div>

              <Fade delay={0.1}>
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f978a]">Partner sequence</p>
                  <div className="mt-5 border-t border-white/10">
                    {partnerSteps.map((item) => (
                      <div key={item.step} className="grid gap-4 border-b border-white/10 py-6 last:border-b-0 lg:grid-cols-[72px_1fr]">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.18em] text-[#8f978a]">Step {item.step}</p>
                        </div>
                        <div>
                          <h3 className="font-sans text-xl font-semibold tracking-[-0.03em] text-[#f3efe5]">
                            {item.label}
                          </h3>
                          <p className="mt-2 text-[14px] leading-[1.85] text-[#a6ad9f]">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Fade>
            </div>
          </div>
        </DarkBand>

        {/* Partner status */}
        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="03 / Current partner status" />
            <SectionTitle
              eyebrow="Outreach list"
              title={<>A simple live list keeps the project organized without turning the page into a dashboard.</>}
            />

            <div id="partners" className="mt-8 overflow-hidden rounded-[2rem] border border-[#e2dbc9] bg-white/75">
              <div className="grid gap-4 border-b border-[#e2dbc9] bg-[#efe8da] px-5 py-4 md:grid-cols-[1.3fr_0.7fr_0.8fr]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7c8576]">Retail outlet</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7c8576]">Classification</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7c8576]">Status</p>
              </div>

              <div>
                {retailPartners.map((partner) => (
                  <StatusRow
                    key={partner.name}
                    name={partner.name}
                    type={partner.type}
                    status={partner.status}
                    active={partner.active}
                  />
                ))}
              </div>
            </div>

            <p className="mt-5 max-w-3xl rounded-[1.25rem] border border-[#e2dbc9] bg-white/60 px-4 py-3 text-[12px] leading-[1.65] text-[#7c8576]">
              Partner outreach begins before the June 1 blackout window. Store names update once outreach is finalized.
            </p>
          </div>
        </LightBand>

        {/* What partners agree to */}
        <DarkBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="04 / What partners agree to" />
            <SectionTitle
              eyebrow="The ask"
              title={<>The agreement is intentionally small: access, placement, and a weekly log.</>}
              dark
            />

            <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
              <div className="space-y-6 text-[15px] leading-[1.9] text-[#b8afa1]">
                <p>
                  Partners do not need to change their inventory or their pricing. They only need to allow shelf tags near the fertilizer display and confirm the placement during the season.
                </p>
                <p>
                  BLACKOUT handles the print materials, installation, and the seasonal closeout summary. The partner’s role is light and repeatable.
                </p>
              </div>

              <Fade delay={0.1}>
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f978a]">Program targets</p>
                  <div className="mt-5 border-t border-white/10">
                    {programTargets.map((item) => (
                      <div key={item.label} className="grid gap-3 border-b border-white/10 py-5 last:border-b-0 lg:grid-cols-[1fr_auto]">
                        <div>
                          <p className="text-[13px] uppercase tracking-[0.18em] text-[#8f978a]">{item.label}</p>
                          <p className="mt-1 text-[14px] text-[#a6ad9f]">{item.note}</p>
                        </div>
                        <p className="text-[15px] font-medium text-[#f3efe5] lg:text-right">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Fade>
            </div>
          </div>
        </DarkBand>

        {/* CTA */}
        <LightBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="05 / Partner with BLACKOUT" />
            <SectionTitle
              eyebrow="Next step"
              title={<>A short conversation is enough to start the season.</>}
            />

            <div className="rounded-[2rem] border border-[#e2dbc9] bg-white/70 p-6 lg:p-8">
              <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
                <div>
                  <h3 className="font-sans text-[clamp(1.4rem,2.8vw,2.2rem)] font-semibold tracking-[-0.03em] text-[#173027]">
                    One meeting. One tag placement. One clearer decision point.
                  </h3>
                  <p className="mt-4 max-w-2xl text-[15px] leading-[1.9] text-[#5a625b]">
                    The best retail partner is a store that wants customers to have the right information in front of them before they buy fertilizer. BLACKOUT makes that easy to do.
                  </p>
                </div>

                <div className="lg:text-right">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-[#173027] px-6 py-3 text-sm font-medium text-[#faf7f0] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#223a2e]"
                  >
                    Become a partner
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </LightBand>

        {/* Closing */}
        <DarkBand>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <DividerLabel label="06 / Closing" />
            <SectionTitle
              eyebrow="Closing"
              title={<>The shelf is where the ordinance becomes visible in everyday life.</>}
              dark
            />

            <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
              <div className="space-y-3 text-[14px] leading-[1.85] text-[#a6ad9f]">
                <p>The shelf tag makes the rule visible.</p>
                <p>The weekly log makes the reach measurable.</p>
                <p>The season summary turns retail work into evidence.</p>
              </div>

              <div>
                <h3 className="font-sans text-2xl font-semibold tracking-[-0.03em] text-white">
                  BLACKOUT keeps the design calm so the message can do the work.
                </h3>
                <p className="mt-4 text-[14px] leading-[1.9] text-[#a6ad9f]">
                  This version stays consistent with the other pages: dark hero, light bands, soft motion, rounded corners, and no oversized cards or harsh tables.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="#how-it-works"
                    className="inline-flex items-center gap-2 rounded-full bg-[#efe8d6] px-5 py-3 text-sm font-medium text-[#111814] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                  >
                    Back to how it works
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