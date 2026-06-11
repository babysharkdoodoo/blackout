'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

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

const evidenceStreams = [
  {
    label: 'Survey Data',
    description: 'Pre/post compliance gap with sample size and methodology notes',
  },
  {
    label: 'Retail Agreements',
    description: 'Signed partner letters documenting store names, tag placement, and weekly reach',
  },
  {
    label: 'Drain Database',
    description: 'GPS coordinates, mortality distances, installation photos for marked drains',
  },
  {
    label: 'Photo Archive',
    description: 'Timestamped documentation of field activity, site work, and community interactions',
  },
  {
    label: 'County Handoff Package',
    description: 'Program documentation that lets Brevard County run the work independently',
  },
  {
    label: 'Formal Handoff Meeting',
    description: 'Recorded meeting with county representatives confirming transfer of ownership',
  },
]

const communityChanges = [
  'Residents learn the ordinance exists before June 1',
  'Hardware stores display the blackout window at point of sale',
  'Storm drains connect lawn behavior to specific mortality events',
  'A GPS database makes the problem geographically legible',
]

const countyChanges = [
  'First measurable baseline of ordinance awareness',
  'Documented retail partnerships to inherit and expand',
  'Physical infrastructure already installed',
  'A replication model for other Florida jurisdictions',
]

export function ImpactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative overflow-hidden bg-[#060807] py-20 text-white font-[family-name:var(--font-archivo)] lg:py-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#a3b18a]/10 to-transparent" />
        <div className="absolute left-[-8%] top-[8%] h-72 w-72 rounded-full bg-[#a3b18a]/8 blur-3xl" />
        <div className="absolute right-[-10%] bottom-[10%] h-80 w-80 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal delay={0.02}>
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-12 bg-[#a3b18a]/35" />
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a3b18a]">
              04 / Outcomes
            </span>
          </div>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <Reveal delay={0.08}>
              <h2 className="max-w-4xl text-[clamp(2.3rem,5vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-[#f4efe5]">
                Every field activity produces a document.
                <span className="text-[#a3b18a]"> Every document survives the project.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-2xl text-[1rem] leading-[1.9] text-[#b8afa1]">
                BLACKOUT is designed to leave behind a complete record: awareness data,
                partner documentation, mapped infrastructure, and a handoff package the County
                can keep using after the project ends.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-8 flex flex-wrap gap-3">
                {['Evidence-based', 'Transferable system', 'County-ready'].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a3b18a]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-12 max-w-2xl border-t border-white/10 pt-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a3b18a]">
                  What gets left behind
                </p>
                <p className="mt-4 text-[clamp(1.45rem,3vw,2.1rem)] font-medium leading-[1.22] tracking-[-0.03em] text-[#f4efe5]">
                  A documented program, not a temporary campaign.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.34}>
              <div className="mt-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a3b18a]">
                  Evidence streams
                </p>

                <div className="mt-5 divide-y divide-white/10 border-t border-white/10">
                  {evidenceStreams.map((item, i) => (
                    <div key={item.label} className="grid gap-2 py-4 sm:grid-cols-[160px_1fr] sm:gap-6">
                      <p className="text-sm font-medium text-[#f4efe5]">
                        <span className="mr-3 font-mono text-xs text-[#a3b18a]">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {item.label}
                      </p>
                      <p className="text-sm leading-[1.8] text-[#b8afa1]">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="space-y-10">
            <Reveal delay={0.12}>
              <div className="border-t border-white/10 pt-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a3b18a]">
                  Outcome statement
                </p>
                <p className="mt-4 max-w-xl text-[clamp(1.3rem,2.4vw,1.9rem)] font-medium leading-[1.35] tracking-[-0.03em] text-[#f4efe5]">
                  The goal is not permanent student involvement. The goal is a complete,
                  documented program that Brevard County can operate without us.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a3b18a]">
                  What changes in the community
                </p>
                <ul className="mt-5 space-y-4 border-t border-white/10 pt-5">
                  {communityChanges.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-[1.8] text-[#b8afa1]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a3b18a]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a3b18a]">
                  What changes for the County
                </p>
                <ul className="mt-5 space-y-4 border-t border-white/10 pt-5">
                  {countyChanges.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-[1.8] text-[#b8afa1]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a3b18a]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.34}>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#6f8167]">
                Built to hand off cleanly, not to stay forever
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}