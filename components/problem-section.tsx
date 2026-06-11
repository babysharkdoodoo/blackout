'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'

const stats = [
  {
    figure: '1,101',
    label: 'manatee deaths in 2021',
  },
  {
    figure: '58%',
    label: 'seagrass lost in the lagoon',
  },
  {
    figure: '4,300+',
    label: 'species supported by the estuary',
  },
  {
    figure: '$2.2B',
    label: 'annual economic value',
  },
]

const steps = [
  {
    n: '1',
    head: 'Fertilizer applied',
    body: 'During the rainy season, fertilizer often goes down just before the heaviest runoff.',
  },
  {
    n: '2',
    head: 'Runoff reaches the lagoon',
    body: 'Stormwater carries nitrogen into drains and straight into the water.',
  },
  {
    n: '3',
    head: 'Blooms block sunlight',
    body: 'Extra nutrients fuel algal growth, which shades out seagrass beds.',
  },
  {
    n: '4',
    head: 'Manatees starve',
    body: 'Without healthy seagrass beds, manatees lose access to their primary food source.'
  }
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

function StatItem({
  figure,
  label,
  index,
}: {
  figure: string
  label: string
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="py-2"
    >
      <div className="text-3xl font-semibold tracking-[-0.05em] text-[#163127] tabular-nums sm:text-[2.4rem]">
        {figure}
      </div>
      <div className="mt-1 max-w-[12rem] text-sm leading-6 text-[#5f675f]">{label}</div>
    </motion.div>
  )
}

function StepRow({
  n,
  head,
  body,
  index,
}: {
  n: string
  head: string
  body: string
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-4 py-5"
    >
      <div className="flex shrink-0 flex-col items-center">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#edf2ea] text-sm font-medium text-[#6f8167]">
          {n}
        </div>
        {n !== '4' ? <div className="mt-3 h-full w-px bg-[#e6e0d4]" /> : null}
      </div>

      <div className="pt-0.5">
        <p className="font-sans text-[1.05rem] leading-tight tracking-[-0.02em] text-[#163127]">
          {head}
        </p>
        <p className="mt-2 max-w-2xl text-sm leading-[1.8] text-[#5f675f]">{body}</p>
      </div>
    </motion.div>
  )
}

export function ProblemSection() {
  return (
    <section
      id="problem"
      className="relative overflow-hidden bg-[#faf7f0] py-20 text-[#163127] font-sans sm:py-24 lg:py-28"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#e9efe4] to-transparent" />
        <div className="absolute left-[-10%] top-[10%] h-72 w-72 rounded-full bg-[#7a8d73]/8 blur-3xl" />
        <div className="absolute right-[-10%] top-[30%] h-80 w-80 rounded-full bg-[#163127]/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal delay={0.02}>
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-10 bg-[#7a8d73]/35" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f8167]">
              01 / The crisis
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="max-w-4xl font-sans text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-[#163127]">
            North America&apos;s most biodiverse estuary is slipping away.
            <span className="text-[#6f8167]"> The solution already exists.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-6 max-w-2xl text-[1rem] leading-[1.9] text-[#5f675f]">
            Brevard County prohibits nitrogen and phosphorus fertilizer application from June 1 through September 30. The ordinance was created to reduce nutrient pollution before it reaches the lagoon, but its impact depends on residents knowing it exists and following it.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap gap-3">
            {['Student-led', 'Ordinance activation', 'Community '].map((item) => (
              <span
                key={item}
                className="rounded-full bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f8167] shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
              >
                {item}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <Reveal delay={0.18}>
            <div className="space-y-10">
              <div className="border-t border-[#e6e0d4] pt-8">
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
                  {stats.map((stat, i) => (
                    <StatItem key={stat.label} {...stat} index={i} />
                  ))}
                </div>
              </div>

              <div className="border-t border-[#e6e0d4] pt-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6f8167]">
                  Why this matters
                </p>

                <blockquote className="mt-4 max-w-xl font-sans text-[1.5rem] leading-[1.25] tracking-[-0.02em] text-[#163127]">
                  The ordinance is the solution.
                  The gap is activation.
                </blockquote>

                <p className="mt-4 text-sm leading-[1.85] text-[#5f675f]">
                  The fertilizer blackout ordinance addresses one of the largest controllable
                  sources of excess nitrogen entering the lagoon during the rainy season.
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal delay={0.16}>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f8167]">
                The causal chain
              </p>
            </Reveal>

            <div className="mt-4 border-t border-[#e6e0d4]">
              {steps.map((step, i) => (
                <div key={step.n} className="border-b border-[#e6e0d4] last:border-b-0">
                  <StepRow {...step} index={i} />
                </div>
              ))}
            </div>

            <Reveal delay={0.22}>
              <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-[#e6e0d4] pt-8">
                <Link
                  href="#approach"
                  className="rounded-full bg-[#163127] px-6 py-3 text-sm font-medium text-[#faf7f0] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#223a2e]"
                >
                  Learn how BLACKOUT works
                </Link>
                <Link
                  href="/ordinance"
                  className="text-sm text-[#6f8167] underline decoration-[#6f8167]/25 underline-offset-4 transition-colors hover:text-[#163127] hover:decoration-[#163127]/35"
                >
                  View the ordinance
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}