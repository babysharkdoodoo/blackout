'use client'

import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

const approaches = [
  {
    number: '01',
    title: 'Measure awareness',
    body: 'Survey residents before and after outreach to quantify what changed.',
    detail: 'Baseline + follow-up survey',
  },
  {
    number: '02',
    title: 'Reach the purchase moment',
    body: 'Place ordinance reminders beside fertilizer, where the decision actually happens.',
    detail: 'Retail shelf tags',
  },
  {
    number: '03',
    title: 'Mark the runoff pathway',
    body: 'Label storm drains so residents connect lawn care with lagoon impact.',
    detail: 'GPS-logged drain markers',
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

function ApproachCard({
  number,
  title,
  body,
  detail,
}: {
  number: string
  title: string
  body: string
  detail: string
}) {
  return (
    <div className="group border-b border-[#ded6c8] py-6 last:border-b-0">
      <div className="grid gap-4 sm:grid-cols-[3.5rem_1fr] sm:gap-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e7ebdf] text-[11px] font-semibold tracking-[0.16em] text-[#64775c] transition group-hover:bg-[#163127] group-hover:text-[#faf7f0]">
          {number}
        </div>

        <div>
          <h3 className="text-[1.15rem] font-semibold tracking-[-0.03em] text-[#163127]">
            {title}
          </h3>

          <p className="mt-2 max-w-xl text-sm leading-7 text-[#5f675f]">
            {body}
          </p>

          <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
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
      className="bg-[#faf7f0] px-6 py-16 text-[#163127] sm:px-10 sm:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f8167]">
                Our approach
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-4 max-w-3xl text-[clamp(2.3rem,5vw,4.35rem)] font-semibold leading-[0.98] tracking-[-0.06em]">
                Make the ordinance visible where it matters.
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#5f675f] sm:text-[1.05rem]">
                BLACKOUT is a three-part field intervention: measure the awareness
                gap, interrupt the purchase decision, and mark the runoff pathway.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 rounded-3xl border border-[#ded6c8] bg-white/55 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
                  Core idea
                </p>

                <p className="mt-3 text-[1.35rem] font-semibold leading-tight tracking-[-0.04em] text-[#163127]">
                  The policy already exists. The missing layer is public contact:
                  survey, store, storm drain.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#problem"
                  className="inline-flex items-center justify-center rounded-full bg-[#163127] px-6 py-3 text-sm font-semibold text-[#faf7f0] transition hover:bg-[#223a2e]"
                >
                  Review the problem
                </Link>

                <Link
                  href="#top"
                  className="inline-flex items-center justify-center rounded-full border border-[#d8d0c2] px-6 py-3 text-sm font-semibold text-[#53634f] transition hover:border-[#163127]/30 hover:text-[#163127]"
                >
                  Back to top
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-[#ded6c8] bg-[#fbf8f1] p-6 shadow-[0_18px_50px_rgba(22,49,39,0.05)] sm:p-8">
              <div className="border-b border-[#ded6c8] pb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6f8167]">
                  Field system
                </p>

                <p className="mt-3 max-w-md text-sm leading-7 text-[#5f675f]">
                  Each step targets a different failure point in the awareness-to-action chain.
                </p>
              </div>

              <div>
                {approaches.map((item) => (
                  <ApproachCard key={item.number} {...item} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}