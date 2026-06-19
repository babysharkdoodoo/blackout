'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

const roles = [
  {
    title: 'Project Lead',
    owns: 'Timeline, CmPS proposal, county communication, and team coordination.',
  },
  {
    title: 'Survey Lead',
    owns: 'Survey design, field logistics, and pre/post awareness analysis.',
  },
  {
    title: 'Retail Lead',
    owns: 'Store outreach, shelf-tag placement, and partner documentation.',
  },
  {
    title: 'Field Lead',
    owns: 'Drain selection, GPS logging, site notes, and marker installation.',
  },
  {
    title: 'Documentation Lead',
    owns: 'Photo archive, portfolio materials, website, and handoff package.',
  },
]

const competitions = [
  'CmPS',
  'HOSA',
  'Earth Prize',
  'EPA PEYA',
  'GENIUS Olympiad',
  'Roots & Shoots',
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

function RoleRow({
  title,
  owns,
  index,
}: {
  title: string
  owns: string
  index: number
}) {
  return (
    <div className="grid gap-3 border-b border-white/10 py-5 last:border-b-0 sm:grid-cols-[3rem_10rem_1fr] sm:gap-5">
      <p className="font-mono text-xs text-[#a8b98c]">
        {String(index + 1).padStart(2, '0')}
      </p>

      <p className="text-sm font-semibold text-[#f5efe3]">
        {title}
      </p>

      <p className="max-w-2xl text-sm leading-7 text-white/58">
        {owns}
      </p>
    </div>
  )
}

export function TeamSection() {
  return (
    <section
      id="team"
      className="bg-[#07100d] px-6 py-16 text-white sm:px-10 sm:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a8b98c]">
                Leadership
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-4 max-w-4xl text-[clamp(2.35rem,5vw,4.45rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-[#f5efe3]">
                A small team with clear ownership.
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/62 sm:text-[1.05rem]">
                BLACKOUT is organized around defined deliverables. Each role owns
                a specific part of the field system, from survey design to county
                handoff.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 rounded-3xl bg-[#f5efe3] p-6 text-[#07100d] sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#607357]">
                  Institution
                </p>

                <p className="mt-3 text-[1.45rem] font-semibold leading-tight tracking-[-0.04em]">
                  West Shore Jr./Sr. High School
                </p>

                <p className="mt-2 text-sm leading-7 text-[#526052]">
                  Melbourne, Brevard County, Florida
                </p>

                <p className="mt-5 border-t border-[#d8d0c2] pt-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#607357]">
                  Summer 2026 field season · June 1 - September 30
                </p>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:p-7">
                <div className="border-b border-white/10 pb-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a8b98c]">
                    Team structure
                  </p>

                  <p className="mt-3 max-w-xl text-sm leading-7 text-white/56">
                    Five roles, each tied to a concrete output.
                  </p>
                </div>

                <div>
                  {roles.map((role, index) => (
                    <RoleRow
                      key={role.title}
                      title={role.title}
                      owns={role.owns}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </Reveal>

            {/* <Reveal delay={0.18}>
              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a8b98c]">
                  Portfolio targets
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {competitions.map((competition, index) => (
                    <span
                      key={competition}
                      className="rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/72"
                    >
                      {competition}
                      {index === 0 ? (
                        <span className="ml-2 text-[#a8b98c] normal-case tracking-normal">
                          Primary
                        </span>
                      ) : null}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal> */}
          </div>
        </div>

        <Reveal delay={0.22}>
          <div className="mt-12 border-t border-white/10 pt-8">
            <p className="max-w-3xl text-[clamp(1.35rem,3vw,2rem)] font-semibold leading-tight tracking-[-0.04em] text-[#f5efe3]">
              The structure is simple: assign ownership, document the work, and
              leave the County with something it can continue.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}