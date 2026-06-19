'use client'

import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

const actions = [
  {
    audience: 'Residents',
    text: 'Learn the blackout window before applying fertilizer.',
    href: '/mission',
    cta: 'Read more',
  },
  {
    audience: 'Retailers',
    text: 'Place a shelf tag beside fertilizer displays.',
    href: '/retail-partners',
    cta: 'Partner with us',
  },
  {
    audience: 'Educators',
    text: 'Use BLACKOUT materials with students or community groups.',
    href: '/survey',
    cta: 'Get materials',
  },
  {
    audience: 'County officials',
    text: 'Review the handoff package and field documentation.',
    href: '/ordinance',
    cta: 'View deliverables',
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

function ActionCard({
  audience,
  text,
  href,
  cta,
  index,
}: {
  audience: string
  text: string
  href: string
  cta: string
  index: number
}) {
  return (
    <Link
      href={href}
      className="group block rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] p-5 transition hover:-translate-y-0.5 hover:border-[#b7c5aa] hover:bg-white"
    >
      <div className="flex items-start justify-between gap-5">
        <p className="font-mono text-xs text-[#6f8167]">
          {String(index + 1).padStart(2, '0')}
        </p>

        <span className="text-sm text-[#6f8167] transition group-hover:translate-x-0.5">
          →
        </span>
      </div>

      <h3 className="mt-5 text-[1.2rem] font-semibold tracking-[-0.035em] text-[#173027]">
        {audience}
      </h3>

      <p className="mt-2 min-h-14 text-sm leading-7 text-[#5e665d]">
        {text}
      </p>

      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#6f8167]">
        {cta}
      </p>
    </Link>
  )
}

export function CTASection() {
  return (
    <section
      id="contact"
      className="bg-[#f7f2e8] px-6 py-16 text-[#173027] sm:px-10 sm:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f8167]">
                Get involved
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-4 max-w-4xl text-[clamp(2.35rem,5vw,4.45rem)] font-semibold leading-[0.98] tracking-[-0.06em]">
                The ordinance exists. Help make it visible.
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#5e665d] sm:text-[1.05rem]">
                BLACKOUT works when the rule shows up before the decision:
                at homes, in stores, in classrooms, and beside storm drains.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 rounded-3xl bg-[#173027] p-6 text-[#f7f2e8] sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a8b98c]">
                  Field season
                </p>

                <p className="mt-3 text-[1.45rem] font-semibold leading-tight tracking-[-0.04em]">
                  June - September 2026
                </p>

                <p className="mt-2 text-sm leading-7 text-white/62">
                  Brevard County, Florida · Indian River Lagoon watershed
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-2">
              {actions.map((action, index) => (
                <ActionCard
                  key={action.audience}
                  {...action}
                  index={index}
                />
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.18}>
          <div className="mt-12 border-t border-[#ded6c8] pt-8">
            <p className="max-w-3xl text-[clamp(1.3rem,3vw,1.95rem)] font-semibold leading-tight tracking-[-0.04em]">
              Resident outreach, retail placement, school partnerships, and
              county handoff all point to the same goal: getting the rule seen
              before runoff starts.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}