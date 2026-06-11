'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface PageHeaderProps {
  section?: string
  pageName?: string
  title: string
  titleAccent?: string
  cta?: {
    label: string
    href: string
  }
}

export function PageHeader({
  section = 'Nesting Survey',
  pageName = 'Sea Turtle Season',
  title,
  titleAccent,
  cta,
}: PageHeaderProps) {
  const ref = useRef<HTMLElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      aria-label={pageName}
      className="relative min-h-[320px] overflow-hidden bg-[#080f0a] px-6 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24"
    >
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9, x: 24, y: -18 }}
        animate={inView ? { opacity: 1, scale: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -right-20 -top-28 h-[400px] w-[500px] rounded-full bg-[radial-gradient(ellipse,rgba(34,90,48,0.55)_0%,transparent_70%)] blur-[60px]"
      />

      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.92, x: -24, y: 18 }}
        animate={inView ? { opacity: 1, scale: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        className="pointer-events-none absolute -bottom-16 left-[30%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(ellipse,rgba(18,60,35,0.4)_0%,transparent_70%)] blur-[80px]"
      />

      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9, x: -20, y: -10 }}
        animate={inView ? { opacity: 1, scale: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
        className="pointer-events-none absolute left-[-40px] top-10 h-[200px] w-[200px] rounded-full bg-[radial-gradient(ellipse,rgba(60,110,50,0.25)_0%,transparent_70%)] blur-[50px]"
      />

      <div className="relative z-10 mx-auto flex min-h-[240px] max-w-6xl flex-col justify-between pt-2 sm:pt-4 lg:pt-6">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 font-sans text-[10.5px] font-light uppercase tracking-[0.22em] text-[#4a7a54]"
          >
            {section}
          </motion.div>

          {/* <motion.div
            initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
            className="mb-5 font-sans text-[12px] font-medium uppercase tracking-[0.28em] text-[#7d8a70]"
          >
            {pageName}
          </motion.div> */}

          <motion.h1
            initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="max-w-4xl font-[Bebas_Neue] text-[clamp(4.5rem,10vw,6.75rem)] leading-[0.88] tracking-[0.01em] text-[#c8c0aa]"
          >
            {title.split(/\n/g).map((line, index) => {
              const isAccentLine = titleAccent && line.includes(titleAccent)
              return (
                <span key={`${line}-${index}`} className="block">
                  {titleAccent ? (
                    <>
                      {line.split(titleAccent).map((part, partIndex, arr) => (
                        <span key={`${part}-${partIndex}`}>
                          {part}
                          {partIndex < arr.length - 1 ? (
                            <span className={isAccentLine ? 'text-[#2a4a30]' : ''}>{titleAccent}</span>
                          ) : null}
                        </span>
                      ))}
                    </>
                  ) : (
                    line
                  )}
                </span>
              )
            })}
          </motion.h1>

          {cta ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="mt-8"
            >
              <Link
                href={cta.href}
                className="inline-flex items-center gap-2 rounded-full border border-[#2a4a30]/50 bg-[#0f1a12]/70 px-5 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c8c0aa] backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02] hover:border-[#4a7a54]/80 hover:bg-[#122016] active:scale-[0.98]"
              >
                {cta.label}
                <span aria-hidden className="text-xs">
                  ↗
                </span>
              </Link>
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default function SeaTurtleSeasonPage() {
  return (
    <PageHeader
      section="Nesting Survey"
      // pageName="Sea Turtle Season"
      title={`Sea
Turtle
Season`}
      titleAccent="Season"
    />
  )
}
