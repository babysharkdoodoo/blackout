'use client'

import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

const stats = [
  {
    figure: '1,100+',
    label: 'Manatee deaths in the 2021 IRL event',
  },
  {
    figure: '60%+',
    label: 'IRL seagrass loss since 2011',
  },
  {
    figure: '4,300+',
    label: 'Species supported by the estuary',
  },
  {
    figure: '$430M',
    label: 'Estimated yearly economic impact of IRL decline',
  },
]

const steps = [
  {
    title: 'Fertilizer goes down',
    body: 'Summer lawn treatments add nitrogen and phosphorus during the wettest part of the year.',
  },
  {
    title: 'Rain moves it',
    body: 'Stormwater carries excess nutrients into drains, canals, and connected waterways.',
  },
  {
    title: 'Blooms take over',
    body: 'Nutrient loading fuels algae, reducing the light seagrass needs to survive.',
  },
  {
    title: 'The food web breaks',
    body: 'As seagrass disappears, manatees lose one of their primary food sources.',
  },
]

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 18, filter: 'blur(10px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
      transition={{
        duration: 0.72,
        delay,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function ProblemSection() {
  return (
    <section
      id="problem"
      className="bg-[#f7f2e8] px-6 py-16 text-[#12291f] sm:px-10 sm:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f7f62]">
                The problem
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-4 max-w-3xl text-[clamp(2.25rem,5vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.06em]">
                Lawn choices move downstream.
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#5d675d] sm:text-[1.05rem]">
                Fertilizer used during the rainy season can wash into storm
                drains and feed algae blooms. BLACKOUT focuses on the first
                preventable decision: whether fertilizer is bought or applied
                during the blackout window.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/mission"
                  className="inline-flex items-center justify-center rounded-full bg-[#12291f] px-6 py-3 text-sm font-semibold text-[#f7f2e8] transition hover:bg-[#1e3a2d]"
                >
                  Follow the runoff chain
                </Link>

                <Link
                  href="/ordinance"
                  className="inline-flex items-center justify-center rounded-full border border-[#d8d0c2] px-6 py-3 text-sm font-semibold text-[#475746] transition hover:border-[#12291f]/30 hover:text-[#12291f]"
                >
                  Understand the rule
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-[#ded6c8] bg-[#ded6c8]">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-[#fbf8f1] p-5 sm:p-6">
                  <div className="text-[2rem] font-semibold leading-none tracking-[-0.06em] tabular-nums sm:text-[2.45rem]">
                    {stat.figure}
                  </div>
                  <p className="mt-3 max-w-[11rem] text-sm leading-6 text-[#657064]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 border-t border-[#ded6c8] pt-10 lg:grid-cols-[0.55fr_1fr] lg:gap-16">
          <Reveal>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f7f62]">
                Causal chain
              </p>

              <p className="mt-4 max-w-sm text-[1.55rem] font-semibold leading-tight tracking-[-0.04em]">
                The best time to prevent runoff is before fertilizer leaves the
                shelf or the lawn.
              </p>
            </div>
          </Reveal>

          <div className="divide-y divide-[#ded6c8] border-y border-[#ded6c8]">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.05}>
                <div className="grid gap-4 py-6 sm:grid-cols-[3rem_1fr] sm:gap-6">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8eadf] text-sm font-semibold text-[#586b52]">
                    {index + 1}
                  </div>

                  <div>
                    <h3 className="text-[1.12rem] font-semibold tracking-[-0.025em]">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-[#657064]">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
