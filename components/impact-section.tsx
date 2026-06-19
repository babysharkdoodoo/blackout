'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

const evidenceStreams = [
  {
    label: 'Survey data',
    description: 'Baseline and follow-up awareness results with methods notes.',
  },
  {
    label: 'Retail documentation',
    description: 'Partner stores, shelf-tag placement, and estimated weekly reach.',
  },
  {
    label: 'Drain map',
    description: 'GPS-logged storm drains with installation photos and site notes.',
  },
  {
    label: 'Field archive',
    description: 'Timestamped photos from surveys, store outreach, and drain marking.',
  },
  {
    label: 'County handoff',
    description: 'A package Brevard County can reuse, revise, and expand.',
  },
]

const communityOutcomes = [
  'Residents see the blackout window before applying fertilizer.',
  'Stores display the rule where fertilizer decisions happen.',
  'Drain markers connect lawn care to lagoon runoff.',
]

const countyOutcomes = [
  'A measurable baseline for ordinance awareness.',
  'Documented partnerships the County can inherit.',
  'A repeatable model for other neighborhoods or cities.',
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

function OutcomeList({
  title,
  items,
}: {
  title: string
  items: string[]
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a8b98c]">
        {title}
      </p>

      <ul className="mt-5 space-y-4 border-t border-white/10 pt-5">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-sm leading-7 text-white/62"
          >
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a8b98c]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ImpactSection() {
  return (
    <section
      id="impact"
      className="bg-[#07100d] px-6 py-16 text-white sm:px-10 sm:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a8b98c]">
                Outcomes
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-4 max-w-4xl text-[clamp(2.35rem,5vw,4.45rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-[#f5efe3]">
                Built to leave evidence, not just impressions.
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/62 sm:text-[1.05rem]">
                BLACKOUT is designed to produce a record Brevard County can use:
                awareness data, retail documentation, mapped drain markers, and a
                clean handoff package.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 rounded-3xl bg-[#f5efe3] p-6 text-[#07100d] sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#607357]">
                  End state
                </p>

                <p className="mt-3 max-w-2xl text-[1.45rem] font-semibold leading-tight tracking-[-0.04em]">
                  A documented program the County can operate after the student
                  team steps away.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a8b98c]">
                Evidence streams
              </p>

              <div className="mt-5 divide-y divide-white/10">
                {evidenceStreams.map((item, index) => (
                  <div
                    key={item.label}
                    className="grid gap-2 py-4 first:pt-0 last:pb-0 sm:grid-cols-[2.5rem_1fr]"
                  >
                    <p className="font-mono text-xs text-[#a8b98c]">
                      {String(index + 1).padStart(2, '0')}
                    </p>

                    <div>
                      <p className="text-sm font-semibold text-[#f5efe3]">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-white/56">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 border-t border-white/10 pt-10 lg:grid-cols-2 lg:gap-16">
          <Reveal delay={0.06}>
            <OutcomeList
              title="Community change"
              items={communityOutcomes}
            />
          </Reveal>

          <Reveal delay={0.12}>
            <OutcomeList
              title="County value"
              items={countyOutcomes}
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}