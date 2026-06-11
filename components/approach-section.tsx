'use client'

import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

const approaches = [
  {
    n: '01',
    title: 'Survey',
    body: 'We measure what people actually know before any outreach starts, then measure it again after the campaign.',
    detail: 'Two-wave door-to-door audit · original primary data · before/after knowledge change',
  },
  {
    n: '02',
    title: 'Intercept',
    body: 'We place ordinance information where the decision happens, next to fertilizer at the point of purchase.',
    detail: 'Shelf tags at local stores · decision-moment intervention · measurable reach',
  },
  {
    n: '03',
    title: 'Mark',
    body: 'We put the message at the drain, where lawn care becomes runoff and runoff becomes lagoon harm.',
    detail: 'GPS-logged drain markers · permanent reminder · sustainability without the team present',
  },
]

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Step({
  n,
  title,
  body,
  detail,
}: {
  n: string
  title: string
  body: string
  detail: string
}) {
  return (
    <div className="py-7">
      <div className="flex items-start gap-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#edf2ea] text-[11px] font-semibold tracking-[0.18em] text-[#6f8167]">
          {n}
        </div>

        <div className="min-w-0">
          <p className="text-[1.15rem] font-semibold tracking-[-0.03em] text-[#163127]">
            {title}
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-[1.85] text-[#5f675f]">
            {body}
          </p>
          <p className="mt-4 max-w-2xl text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
            {detail}
          </p>
        </div>
      </div>
    </div>
  )
}

export function ApproachSection() {
  return (
    <section
      id="approach"
      className="relative overflow-hidden bg-[#faf7f0] py-20 text-[#163127] sm:py-24 lg:py-28"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#e9efe4] to-transparent" />
        <div className="absolute left-[-10%] top-[12%] h-72 w-72 rounded-full bg-[#7a8d73]/8 blur-3xl" />
        <div className="absolute right-[-8%] top-[30%] h-80 w-80 rounded-full bg-[#163127]/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal delay={0.02}>
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-10 bg-[#7a8d73]/35" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f8167]">
              03 / Our approach
            </span>
          </div>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <Reveal delay={0.08}>
              <h2 className="max-w-4xl text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-[#163127]">
                We do not invent solutions. <span className="text-[#6f8167]">We activate them.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-6 max-w-2xl text-[1rem] leading-[1.9] text-[#5f675f]">
                BLACKOUT activates the Summer Fertilizer Blackout Ordinance through three coordinated interventions: measuring awareness, reaching residents at the point of purchase, and placing reminders where runoff enters the lagoon.
              </p>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-12 border-t border-[#e6e0d4] pt-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6f8167]">
                  Why this works
                </p>
                <p className="mt-4 max-w-2xl text-[1.4rem] leading-[1.3] tracking-[-0.03em] text-[#163127]">
                  One contact changes awareness. Three contacts change behavior.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="rounded-[1.75rem] border border-[#e6e0d4] bg-white shadow-[0_18px_50px_rgba(0,0,0,0.05)]">
              <div className="px-6 pt-6 sm:px-8 sm:pt-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6f8167]">
                  The three prongs
                </p>
              </div>

              <div className="mt-2 divide-y divide-[#e6e0d4] px-6 sm:px-8">
                {approaches.map((item) => (
                  <Step key={item.n} {...item} />
                ))}
              </div>

              <div className="border-t border-[#e6e0d4] px-6 py-6 sm:px-8">
                <p className="text-sm leading-[1.85] text-[#5f675f]">
                  The survey proves the gap, the shelf tags meet people at the purchase moment, and
                  the drain markers keep the ordinance present long after the team leaves.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.24}>
          <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-[#e6e0d4] pt-8">
            <Link
              href="/mission"
              className="rounded-full bg-[#163127] px-6 py-3 text-sm font-medium text-[#faf7f0] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#223a2e]"
            >
              Why the lagoon collapses
            </Link>
            <Link
              href="/ordinance"
              className="text-sm text-[#6f8167] underline decoration-[#6f8167]/25 underline-offset-4 transition-colors hover:text-[#163127] hover:decoration-[#163127]/35"
            >
              Read the ordinance details
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}