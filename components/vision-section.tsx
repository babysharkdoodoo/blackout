'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

const frame = [
  {
    label: 'Focus',
    value: 'Activate the existing fertilizer ordinance, not create a new policy ask.',
  },
  {
    label: 'Gap',
    value: 'Residents often do not encounter the rule before buying or applying fertilizer.',
  },
  {
    label: 'Method',
    value: 'Use surveys, retail reminders, drain markers, and documentation.',
  },
  {
    label: 'Finish line',
    value: 'Leave Brevard County with a program it can operate without the student team.',
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

export function VisionSection() {
  return (
    <section
      id="vision"
      className="bg-[#f7f2e8] px-6 py-16 text-[#173027] sm:px-10 sm:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-start lg:gap-16">
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f8167]">
                Vision
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-4 max-w-4xl text-[clamp(2.35rem,5vw,4.45rem)] font-semibold leading-[0.98] tracking-[-0.06em]">
                The law exists. The system around it does not.
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#5e665d] sm:text-[1.05rem]">
                BLACKOUT treats the fertilizer blackout as an implementation
                problem. The ordinance is already written; the missing work is
                public contact, behavior timing, evidence, and handoff.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 rounded-3xl bg-[#173027] p-6 text-[#f7f2e8] sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a8b98c]">
                  Core idea
                </p>

                <p className="mt-3 max-w-2xl text-[1.45rem] font-semibold leading-tight tracking-[-0.04em]">
                  A policy does not change behavior until people encounter it at
                  the moment their behavior matters.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] p-6 shadow-[0_18px_50px_rgba(23,48,39,0.05)] sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6f8167]">
                Operating frame
              </p>

              <div className="mt-5 divide-y divide-[#ded6c8]">
                {frame.map((item) => (
                  <div
                    key={item.label}
                    className="grid gap-2 py-4 first:pt-0 last:pb-0 sm:grid-cols-[7rem_1fr] sm:gap-5"
                  >
                    <p className="text-sm font-semibold text-[#173027]">
                      {item.label}
                    </p>

                    <p className="text-sm leading-7 text-[#5e665d]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <div className="mt-12 border-t border-[#ded6c8] pt-8">
            <p className="max-w-3xl text-[clamp(1.35rem,3vw,2rem)] font-semibold leading-tight tracking-[-0.04em]">
              The goal is not to keep students involved forever. The goal is to
              build something clear enough for the County to inherit.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}