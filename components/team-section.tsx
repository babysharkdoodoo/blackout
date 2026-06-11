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

const team = [
  {
    role: 'Project Lead',
    owns: 'Timeline, CmPS proposal, county correspondence, and team coordination',
  },
  {
    role: 'Survey Lead',
    owns: 'Survey design, door-to-door logistics, and pre/post data analysis',
  },
  {
    role: 'Retail Partnership Lead',
    owns: 'Store outreach, shelf tag production, and partner agreement management',
  },
  {
    role: 'Field Operations Lead',
    owns: 'Drain selection, GPS logging, mortality distance calculations, and installation',
  },
  {
    role: 'Documentation Lead',
    owns: 'Photo archives, competition portfolios, website, and county handoff package',
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

export function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="team"
      className="relative overflow-hidden bg-[#060807] py-20 text-white font-[family-name:var(--font-archivo)] lg:py-28"
    >
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
              05 / Leadership
            </span>
          </div>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1.06fr_0.94fr] lg:items-start">
          <div>
            <Reveal delay={0.08}>
              <h2 className="max-w-4xl text-[clamp(2.35rem,5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-[#f4efe5]">
                Five students. Defined roles.
                <span className="text-[#a3b18a]"> No ambiguity about who owns what.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-2xl text-[1rem] leading-[1.9] text-[#b8afa1]">
                BLACKOUT runs on a clear accountability structure. Every team member owns specific
                deliverables, and every deliverable is tied to a non-negotiable sequence.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <p className="mt-4 max-w-2xl text-[1rem] leading-[1.9] text-[#b8afa1]">
                This is a student project. It is also a serious one.
              </p>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-10 max-w-2xl border-t border-white/10 pt-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a3b18a]">
                  Institution
                </p>
                <p className="mt-4 text-[clamp(1.4rem,2.8vw,1.9rem)] font-medium leading-[1.28] tracking-[-0.03em] text-[#f4efe5]">
                  West Shore Jr./Sr. High School
                </p>
                <p className="mt-2 text-sm leading-[1.8] text-[#b8afa1]">
                  Melbourne, Brevard County, Florida
                </p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-[#8d9488]">
                  Summer 2026 field season · Active June 1 through September 30
                </p>
              </div>
            </Reveal>
          </div>

          <div className="space-y-10">
            <Reveal delay={0.12}>
              <div className="border-t border-white/10 pt-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a3b18a]">
                  Team structure
                </p>

                <div className="mt-5 divide-y divide-white/10">
                  {team.map((member, i) => (
                    <div
                      key={member.role}
                      className="grid gap-2 py-4 sm:grid-cols-[160px_1fr] sm:gap-6"
                    >
                      <p className="text-sm font-medium text-[#f4efe5]">
                        <span className="mr-3 font-mono text-xs text-[#a3b18a]">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {member.role}
                      </p>
                      <p className="text-sm leading-[1.8] text-[#b8afa1]">{member.owns}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a3b18a]">
                  Competition portfolio
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {competitions.map((comp, i) => (
                    <span
                      key={comp}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#e8e3d8]"
                    >
                      {comp}
                      {i === 0 && (
                        <span className="ml-2 text-[#a3b18a] normal-case tracking-normal">
                          Primary
                        </span>
                      )}
                      {i === 1 && (
                        <span className="ml-2 text-[#a3b18a] normal-case tracking-normal">
                          Secondary
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#6f8167]">
                Clear ownership · defined deadlines · shared accountability
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}