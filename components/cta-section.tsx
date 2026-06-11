'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import Link from 'next/link'

function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

const actions = [
  {
    who: 'Residents',
    what: 'Learn the ordinance before June 1. Check your fertilizer. Share it with neighbors who own lawns.',
    href: '/mission',
    cta: 'Read the problem',
  },
  {
    who: 'Retailers',
    what: 'Let us place a shelf tag at your fertilizer display. We handle the materials and the setup.',
    href: '/retail-partners',
    cta: 'Partner with us',
  },
  {
    who: 'Educators & Orgs',
    what: 'Connect your students or members with outreach materials. Share the data. Host a drain marking.',
    href: '/survey',
    cta: 'Get materials',
  },
  {
    who: 'County Officials',
    what: 'We are building a documented program the County can inherit at the end of the season.',
    href: '/ordinance',
    cta: 'View deliverables',
  },
]

export function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#f6f1e7] py-20 text-[#173027] font-[family-name:var(--font-archivo)] lg:py-28"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#7a8d73]/10 via-transparent to-transparent" />
        <div className="absolute left-[-12%] top-[8%] h-72 w-72 rounded-full bg-[#7a8d73]/10 blur-3xl" />
        <div className="absolute right-[-10%] bottom-[8%] h-80 w-80 rounded-full bg-[#173027]/5 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(23,48,39,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(23,48,39,0.06)_1px,transparent_1px)] [background-size:84px_84px]" />
      </div>

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal delay={0.02}>
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-12 bg-[#7a8d73]/35" />
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6f8167]">
              06 / Get Involved
            </span>
          </div>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <Reveal delay={0.08}>
              <h2 className="max-w-4xl text-[clamp(2.35rem,5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-[#173027]">
                The ordinance exists.
                <span className="text-[#6f8167]"> We are activating it. You can help.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-2xl text-[1rem] leading-[1.9] text-[#5e665d]">
                Whether you are a Brevard County resident, a local retailer, an educator, or a
                county official, there is a specific role for you in making this work.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-10 max-w-2xl border-t border-[#e7e0d3] pt-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6f8167]">
                  Project context
                </p>

                <div className="mt-5 grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#8c9289]">
                      Watershed
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#173027]">
                      Indian River Lagoon
                    </p>
                    <p className="mt-1 text-sm leading-[1.8] text-[#5e665d]">
                      156-mile National Estuary
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#8c9289]">
                      Field season
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#173027]">
                      June – September 2026
                    </p>
                    <p className="mt-1 text-sm leading-[1.8] text-[#5e665d]">
                      Brevard County, Florida
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="space-y-6">
            <Reveal delay={0.12}>
              <div className="border-t border-[#e7e0d3] pt-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6f8167]">
                  Ways to help
                </p>

                <div className="mt-5 divide-y divide-[#e7e0d3]">
                  {actions.map((item, i) => (
                    <div key={item.who} className="grid gap-4 py-5 sm:grid-cols-[1fr_auto] sm:gap-8">
                      <div>
                        <p className="text-sm font-medium text-[#173027]">
                          <span className="mr-3 font-mono text-xs text-[#6f8167]">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          {item.who}
                        </p>
                        <p className="mt-2 max-w-xl text-sm leading-[1.8] text-[#5e665d]">
                          {item.what}
                        </p>
                      </div>

                      <Link
                        href={item.href}
                        className="self-start text-[10px] font-semibold uppercase tracking-[0.18em] text-[#173027] transition-colors hover:text-[#6f8167]"
                      >
                        {item.cta}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#8c9289]">
                Resident outreach · retail placement · school partnerships · county handoff
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}