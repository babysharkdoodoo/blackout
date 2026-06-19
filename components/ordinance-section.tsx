'use client'

import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

const details = [
  {
    label: 'Code section',
    value: '§ 62-3601 et seq.',
  },
  {
    label: 'Blackout period',
    value: 'June 1 - September 30',
  },
  {
    label: 'Restricted nutrients',
    value: 'Nitrogen and phosphorus fertilizer',
  },
  {
    label: 'Compliance model',
    value: 'Education-first, voluntary compliance',
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

export function OrdinanceSection() {
  return (
    <section
      id="ordinance"
      className="bg-[#07100d] px-6 py-16 text-white sm:px-10 sm:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-start lg:gap-16">
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a8b98c]">
                The ordinance
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-4 max-w-4xl text-[clamp(2.35rem,5vw,4.45rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-[#f5efe3]">
                Brevard already has the rule. The work is getting it seen.
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/62 sm:text-[1.05rem]">
                From June 1 through September 30, Brevard County restricts
                nitrogen and phosphorus fertilizer use on lawns, landscapes, and
                turf. BLACKOUT is not a new policy proposal. It is an awareness
                system for an existing rule.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#approach"
                  className="inline-flex items-center justify-center rounded-full bg-[#f5efe3] px-6 py-3 text-sm font-semibold text-[#07100d] transition hover:bg-white"
                >
                  How BLACKOUT works
                </Link>

                <Link
                  href="/ordinance"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/78 transition hover:border-white/30 hover:text-white"
                >
                  View ordinance
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:p-7">
              <div className="flex items-center justify-between gap-6 border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a8b98c]">
                    Reference
                  </p>
                  <p className="mt-2 text-sm text-white/50">
                    Brevard County Code of Ordinances
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#a8b98c]/12 text-sm font-semibold text-[#c7d6ad]">
                  62
                </div>
              </div>

              <div className="divide-y divide-white/10">
                {details.map((item) => (
                  <div
                    key={item.label}
                    className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-5"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                      {item.label}
                    </p>
                    <p className="text-sm leading-6 text-[#f5efe3]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl bg-[#f5efe3] p-5 text-[#07100d]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5f7257]">
                  Core gap
                </p>

                <p className="mt-3 text-[1.35rem] font-semibold leading-tight tracking-[-0.04em]">
                  The ordinance only works if residents know it exists before
                  they buy or apply fertilizer.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}