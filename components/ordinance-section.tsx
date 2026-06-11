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

const details = [
  { label: 'Section', value: '§ 62-3601 et seq.' },
  { label: 'Blackout period', value: 'Jun 01 to Sep 30' },
  {
    label: 'Prohibited',
    value: 'Nitrogen and phosphorus fertilizer on lawns, landscapes, and turf',
  },
  { label: 'Enforcement', value: 'Voluntary compliance' },
]

export function OrdinanceSection() {
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
              02 / The Ordinance
            </span>
          </div>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <Reveal delay={0.08}>
              <h2 className="max-w-4xl text-[clamp(2.3rem,5vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-[#f4efe5]">
                The ordinance already exists.
                <span className="text-[#a3b18a]"> The gap is activation.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-2xl text-[1rem] leading-[1.9] text-[#b8afa1]">
                Brevard County&apos;s Blackout Ordinance restricts nitrogen and phosphorus fertilizer from June 1 through September 30. BLACKOUT activates the ordinance through awareness, retail partnerships, and visible reminders that help residents comply.
              </p>
            </Reveal>

            {/* <Reveal delay={0.22}>
              <div className="mt-8 flex flex-wrap gap-3">
                {['Existing ordinance', 'Rainy season window', 'Student-led awareness'].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a3b18a]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal> */}

            <Reveal delay={0.28}>
              <div className="mt-12 max-w-2xl border-t border-white/10 pt-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a3b18a]">
                  Why it matters
                </p>
                <p className="mt-4 text-[clamp(1.45rem,3vw,2.1rem)] font-medium leading-[1.22] tracking-[-0.03em] text-[#f4efe5]">
The ordinance is the solution.

BLACKOUT helps people see it, understand it, and follow it.
                </p>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal delay={0.12}>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-md lg:p-8">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-white/[0.06]" />
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a3b18a]">
                    Ordinance reference
                  </p>
                </div>

                <div className="mt-6 divide-y divide-white/10">
                  {details.map((item) => (
                    <div key={item.label} className="py-4 first:pt-0 last:pb-0">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[#8d9488]">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm leading-[1.75] text-[#f4efe5]">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#8d9488]">
                    Core issue
                  </p>
                  <p className="mt-2 text-sm leading-[1.8] text-[#b8afa1]">
                   The ordinance exists.

Most residents simply do not know about it.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-[#6f8167]">
                Brevard County Code of Ordinances · Chapter 62 · Article IX
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}