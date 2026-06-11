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

export function VisionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative overflow-hidden bg-[#f6f1e7] py-20 text-[#173027] font-[family-name:var(--font-archivo)] lg:py-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#7a8d73]/10 via-transparent to-transparent" />
        <div className="absolute left-[-12%] top-[8%] h-72 w-72 rounded-full bg-[#7a8d73]/10 blur-3xl" />
        <div className="absolute right-[-10%] top-[26%] h-80 w-80 rounded-full bg-[#173027]/5 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(23,48,39,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(23,48,39,0.06)_1px,transparent_1px)] [background-size:84px_84px]" />
      </div>

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal delay={0.02}>
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-12 bg-[#7a8d73]/35" />
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6f8167]">
              05 / The Vision
            </span>
          </div>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1.06fr_0.94fr] lg:items-start">
          <div className="space-y-6">
            <Reveal delay={0.08}>
              <h2 className="max-w-4xl text-[clamp(2.35rem,5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-[#173027]">
                The project is not about asking for a new law.
                <span className="text-[#6f8167]"> It is about making the existing one work.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="max-w-2xl text-[1rem] leading-[1.9] text-[#5e665d]">
                BLACKOUT starts with a simple shift in framing: the ordinance already exists, but
                awareness, compliance, and handoff systems do not. The vision is to close that gap
                with something measurable, durable, and easy for the County to inherit.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="flex flex-wrap gap-3">
                {['Existing law', 'Measurable outcome', 'County handoff'].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#d9d1c1] bg-white/60 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f8167]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-10 max-w-2xl border-t border-[#e7e0d3] pt-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6f8167]">
                  Why the distinction matters
                </p>
                <p className="mt-4 text-[clamp(1.45rem,3vw,2.15rem)] font-medium leading-[1.22] tracking-[-0.03em] text-[#173027]">
                  It turns a general environmental campaign into a concrete public system with a
                  clear finish line.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="space-y-10">
            <Reveal delay={0.12}>
              <div className="border-t border-[#e7e0d3] pt-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6f8167]">
                  Core question
                </p>
                <p className="mt-4 max-w-xl text-[clamp(1.35rem,2.5vw,1.95rem)] font-medium leading-[1.35] tracking-[-0.03em] text-[#173027]">
                  Why isn&apos;t what was already legislated actually working?
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6f8167]">
                  What this means
                </p>
                <div className="mt-5 divide-y divide-[#e7e0d3] border-t border-[#e7e0d3]">
                  <div className="grid gap-2 py-4 sm:grid-cols-[140px_1fr] sm:gap-6">
                    <p className="text-sm font-medium text-[#173027]">Focus</p>
                    <p className="text-sm leading-[1.8] text-[#5e665d]">
                      Existing ordinance, not a new policy ask.
                    </p>
                  </div>

                  <div className="grid gap-2 py-4 sm:grid-cols-[140px_1fr] sm:gap-6">
                    <p className="text-sm font-medium text-[#173027]">Outcome</p>
                    <p className="text-sm leading-[1.8] text-[#5e665d]">
                      A program the County can actually inherit.
                    </p>
                  </div>

                  <div className="grid gap-2 py-4 sm:grid-cols-[140px_1fr] sm:gap-6">
                    <p className="text-sm font-medium text-[#173027]">Method</p>
                    <p className="text-sm leading-[1.8] text-[#5e665d]">
                      Awareness, evidence, documentation, and handoff.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#8c9289]">
                Existing ordinance · measurable outcome · real handoff
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}