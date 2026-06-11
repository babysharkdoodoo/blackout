'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const facts = [
  { value: '1,101', label: 'manatee deaths in 2021' },
  { value: '58%', label: 'seagrass lost' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#060807] font-sans text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(163,177,138,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_22%),linear-gradient(180deg,#0a0f0d_0%,#050706_100%)]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={loaded ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
        style={
          shouldReduceMotion
            ? undefined
            : {
              transform: 'translate3d(0,0,0)',
            }
        }
      >
        <Image
          src="/lagoon-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-24"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#060807] via-[#060807]/82 to-[#060807]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060807] via-transparent to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl items-center px-6 py-12 sm:px-8 lg:px-10">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] xl:gap-16">
          <div className="max-w-3xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={loaded ? 'show' : 'hidden'}
              custom={0}
              className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.24em] text-[#b7b0a0] uppercase"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#a3b18a]" />
              Blackout ordinance
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate={loaded ? 'show' : 'hidden'}
              custom={0.08}
              className="mt-6 max-w-2xl text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.92] tracking-[-0.075em] text-[#f4efe5]"
            >
              A law to protect
              <br />
              manatees already exists.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={loaded ? 'show' : 'hidden'}
              custom={0.18}
              className="mt-5 max-w-xl text-[clamp(1.08rem,2.2vw,1.55rem)] font-medium leading-[1.2] tracking-[-0.02em] text-white/30"
            >
              The ordinance exists. Awareness does not.
            </motion.p>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={loaded ? 'show' : 'hidden'}
              custom={0.28}
              className="mt-6 max-w-xl text-[15px] leading-[1.85] text-[#b8afa1] sm:text-[16px]"
            >
              Brevard County already passed the Summer Fertilizer Blackout Ordinance.
              BLACKOUT activates it through community awareness, retail partnerships,
              and visible reminders that help residents comply.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={loaded ? 'show' : 'hidden'}
              custom={0.38}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                href="#approach"
                className="group inline-flex items-center gap-2 rounded-full bg-[#f3efe6] px-6 py-3 text-sm font-medium tracking-wide text-[#0a0f0d] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
              >
                See our approach
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Link>

              <Link
                href="#mission"
                className="text-sm text-[#a79e90] underline decoration-white/15 underline-offset-4 transition-colors hover:text-[#f3efe6] hover:decoration-white/45"
              >
                Why the lagoon is collapsing
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={loaded ? 'show' : 'hidden'}
              custom={0.48}
              className="mt-10 flex flex-wrap items-end gap-x-10 gap-y-4"
            >
              {facts.map((fact, i) => (
                <div key={fact.label} className="min-w-[150px]">
                  <div className="text-3xl font-semibold tracking-[-0.05em] text-[#f4efe5] tabular-nums">
                    {fact.value}
                  </div>
                  <div className="mt-1 max-w-[14rem] text-sm leading-6 text-[#d7d0c4]">
                    {fact.label}
                  </div>
                  {i === 0 ? (
                    <div className="mt-4 h-px w-16 bg-white/10 sm:hidden" />
                  ) : null}
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.99 }}
            animate={loaded ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <div className="relative mx-auto w-full max-w-[560px]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.25rem] bg-white/[0.03]">
                <Image
                  src="/manatee-underwater.png"
                  alt="West Indian manatee underwater"
                  fill
                  priority
                  sizes="(min-width: 1024px) 560px, 0px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050706] via-transparent to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}