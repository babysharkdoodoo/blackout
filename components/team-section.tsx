'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

const teamMembers = [
  {
    name: 'Project Lead',
    title: 'Overall coordination',
    summary:
      'Coordinates the full BLACKOUT timeline and keeps the team aligned across surveys, field work, partner outreach, and final handoff.',
    owns: 'Timeline, county communication, meeting notes, and team coordination.',
    outputs: [
      'Master timeline',
      'Meeting notes',
      'County communication log',
    ],
  },
  {
    name: 'Survey Lead',
    title: 'Awareness measurement',
    summary:
      'Designs the awareness survey process and manages the before-and-after data that shows whether the campaign changed public understanding.',
    owns: 'Survey design, field logistics, and pre/post awareness analysis.',
    outputs: [
      'Wave 1 survey',
      'Wave 2 survey',
      'Awareness analysis',
    ],
  },
  {
    name: 'Retail Lead',
    title: 'Store partnerships',
    summary:
      'Builds relationships with stores and helps place ordinance reminders where fertilizer purchasing decisions actually happen.',
    owns: 'Store outreach, shelf-tag planning, and partner documentation.',
    outputs: [
      'Partner list',
      'Shelf tag plan',
      'Store documentation',
    ],
  },
  {
    name: 'Field Lead',
    title: 'Storm drain records',
    summary:
      'Manages the storm drain fieldwork process, including location selection, site documentation, and approved marker sessions.',
    owns: 'Drain selection, GPS logging, site notes, and approved marker sessions.',
    outputs: [
      'Drain map',
      'GPS records',
      'Field notes',
    ],
  },
  {
    name: 'Documentation Lead',
    title: 'Archive and handoff',
    summary:
      'Keeps the project organized by maintaining the archive, updating the website, and preparing materials for the final handoff.',
    owns: 'Photo archive, field files, website updates, and handoff package.',
    outputs: [
      'Photo archive',
      'Website updates',
      'Handoff package',
    ],
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
      initial={reduceMotion ? false : { opacity: 0, y: 18, filter: 'blur(10px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
      transition={{
        duration: 0.72,
        delay,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
    >
      {children}
    </motion.div>
  )
}

function TeamCard({
  member,
  index,
}: {
  member: (typeof teamMembers)[number]
  index: number
}) {
  const initials = member.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  return (
    <article className="group flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.055] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-[#f5efe3] text-sm font-semibold tracking-[-0.03em] text-[#07100d]">
            {initials || 'NM'}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-[1.15rem] font-semibold leading-tight tracking-[-0.04em] text-[#f5efe3]">
              {member.name}
            </h3>

            <p className="mt-1 text-sm font-medium text-[#a8b98c]">
              {member.title}
            </p>
          </div>
        </div>

        <p className="font-mono text-xs text-white/34">
          {String(index + 1).padStart(2, '0')}
        </p>
      </div>

      <p className="mt-5 text-sm leading-7 text-white/62">
        {member.summary}
      </p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a8b98c]">
          Owns
        </p>

        <p className="mt-2 text-sm leading-7 text-white/58">
          {member.owns}
        </p>
      </div>

      <div className="mt-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a8b98c]">
          Key outputs
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {member.outputs.map((output) => (
            <span
              key={output}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/64"
            >
              {output}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export function TeamSection() {
  return (
    <section
      id="team"
      className="bg-[#07100d] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a8b98c]">
                Leadership
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-4 max-w-4xl text-[clamp(2.25rem,5vw,4.35rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-[#f5efe3]">
                Meet the team behind BLACKOUT.
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/64 sm:text-[1.05rem]">
                Each role owns a defined part of the project, so the work is
                easier to coordinate, document, and hand off after the field
                season.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <div className="rounded-[1.75rem] bg-[#f5efe3] p-5 text-[#07100d] sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#607357]">
                Institution
              </p>

              <p className="mt-3 text-[1.35rem] font-semibold leading-tight tracking-[-0.04em] sm:text-[1.55rem]">
                West Shore Jr./Sr. High School
              </p>

              <p className="mt-2 text-sm leading-7 text-[#526052]">
                Melbourne, Brevard County, Florida
              </p>

              <div className="mt-5 grid gap-3 border-t border-[#d8d0c2] pt-5 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#607357]">
                    Field season
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#173027]">
                    Summer 2026
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#607357]">
                    Blackout window
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#173027]">
                    June 1 - September 30
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {teamMembers.map((member, index) => (
            <Reveal key={`${member.title}-${index}`} delay={index * 0.05}>
              <TeamCard member={member} index={index} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.24}>
          <div className="mt-12 rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6 sm:p-7">
            <p className="max-w-4xl text-[clamp(1.3rem,3vw,2rem)] font-semibold leading-tight tracking-[-0.04em] text-[#f5efe3]">
              The structure is simple: assign ownership, document each planned
              step, and leave the County with something it can continue.
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/56">
              This team model makes the project easier to explain to partners,
              easier to manage during fieldwork, and easier for future students
              to replicate.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
