'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { SiteLayout } from '@/components/site-layout'

/* ── DATA ── */

const primarySources = [
  { name: 'Marine Mammal Mortality Reports (2019 - 2023)', org: 'FWC', use: 'Mortality event locations', href: 'https://myfwc.com/research/manatee/rescue-mortality-response/statistics/mortality/' },
  { name: 'Indian River Lagoon Seagrass Surveys', org: 'SJRWMD', use: 'Seagrass loss data', href: 'https://www.sjrwmd.com/programs/environmental-information/irl/' },
  { name: 'Brevard County Code of Ordinances', org: 'Brevard County', use: 'Ordinance text § 62-3601', href: 'https://library.municode.com/fl/brevard_county' },
  { name: 'National Estuary Program Reports', org: 'EPA', use: 'Species diversity data', href: 'https://www.epa.gov/nep' },
  { name: 'Indian River Lagoon Economic Value Study', org: 'Brevard County', use: '$2.2B economic impact figure', href: 'https://www.brevardcounty.us' },
  { name: 'FDEP Fertilizer Application Guidance', org: 'FDEP', use: 'Application window estimates', href: 'https://floridadep.gov' },
  { name: 'West Indian Manatee ESA Status', org: 'USFWS', use: 'Threatened species classification', href: 'https://www.fws.gov/species/west-indian-manatee-trichechus-manatus' },
]

const fieldMaterials = [
  { title: 'Wave 1 Survey Instrument', desc: 'The door-to-door questionnaire used to establish the pre-intervention baseline.', status: 'Available', href: '/survey' },
  { title: 'Manatee Safe Shelf Tag Design', desc: 'Print-ready retail tag layout for fertilizer aisles and point-of-purchase placement.', status: 'In development', href: null },
  { title: 'Storm Drain Marker Spec Sheet', desc: 'Hardware specifications, installation steps, and distance-calculation notes for each drain marker.', status: 'In development', href: null },
  { title: 'Retail Partner Agreement Template', desc: 'Standard placement, season timing, and weekly reach logging terms for store partners.', status: 'In development', href: null },
  { title: 'County Handoff Package Template', desc: 'Documentation structure for transferring the program to Brevard County after the season ends.', status: 'Post-season', href: null },
  { title: 'Wave 2 Survey Instrument', desc: 'Matched follow-up instrument used to measure post-intervention awareness changes.', status: 'Pending close', href: null },
]

const furtherReading = [
  { title: 'The Indian River Lagoon: A National Treasure in Crisis', org: 'Indian River Lagoon National Estuary Program', type: 'Overview report' },
  { title: 'Unusual Mortality Event  -  Florida Manatee (2021)', org: 'FWC Wildlife Research Institute', type: 'Mortality investigation' },
  { title: 'Best Management Practices for Florida-Friendly Fertilization', org: 'University of Florida IFAS Extension', type: 'Applied guidance' },
  { title: 'Voluntary Environmental Compliance: What Works', org: 'EPA Office of Enforcement', type: 'Policy research' },
  { title: 'Seagrass Loss and Turbidity in the IRL: 2011 - 2023', org: 'SJRWMD Research Division', type: 'Longitudinal study' },
  { title: 'Florida Model Ordinance for Fertilizer Management', org: 'FDEP', type: 'Policy model' },
]

/* ── UTILITIES ── */

function Fade({ children, delay = 0, y = 14, className = '' }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const reduceMotion = useReducedMotion()
  return (<motion.div ref={ref} initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y, filter: 'blur(6px)' }} animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>)
}

function Accent({ children }: { children: ReactNode }) {
  return <span className="text-[#a3b18a]">{children}</span>
}

/* ── PAGE ── */

export function ResourcesPageClient() {
  const [loaded, setLoaded] = useState(false)
  const reduceMotion = useReducedMotion()
  useEffect(() => { setLoaded(true) }, [])

  return (
    <SiteLayout>
      <main className="overflow-hidden font-sans">

        {/* HERO */}
        <section id="top" className="relative isolate min-h-[100svh] overflow-hidden bg-[#060807] text-white flex flex-col">
          <motion.div aria-hidden="true" initial={{ opacity: 0, scale: 1.04 }} animate={loaded ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0">
            <Image src="/lagoon-hero.png" alt="" fill priority sizes="100vw" className="object-cover object-center opacity-22" />
          </motion.div>

          {/* Unique character orb for Resources (Slate/Indigo) */}
          <motion.div aria-hidden="true" className="absolute inset-0" initial={false}>
            <div className="absolute right-1/3 top-10 h-[24rem] w-[24rem] rounded-full bg-slate-400/10 blur-[100px] sm:h-[30rem] sm:w-[30rem]" />
            <div className="absolute left-1/3 bottom-1/4 h-[28rem] w-[28rem] rounded-full bg-indigo-500/10 blur-[120px] sm:h-[36rem] sm:w-[36rem]" />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#060807] via-[#060807]/50 to-[#060807]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060807]/40 via-transparent to-[#060807]/40" />
          <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />

          <div className="relative z-10 mx-auto flex flex-1 w-full max-w-6xl flex-col justify-center px-6 pt-32 pb-16 sm:px-10 sm:justify-end sm:pb-20 lg:px-12 lg:pb-24">
            <motion.h1 initial={reduceMotion ? {} : { opacity: 0, y: 20, filter: 'blur(8px)' }} animate={loaded ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="max-w-4xl text-[clamp(2.6rem,7vw,5.2rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-[#f4efe5]">
              Primary sources.{' '}<br className="hidden sm:block" /><Accent>Field materials.</Accent>{' '}<br className="hidden sm:block" />Documentation that lasts.
            </motion.h1>
            <motion.p initial={reduceMotion ? {} : { opacity: 0, y: 16 }} animate={loaded ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.24 }} className="mt-5 max-w-xl text-[clamp(1rem,2vw,1.3rem)] font-medium leading-[1.3] tracking-[-0.01em] text-white/30 sm:mt-6">
              Ordinance references, research sources, and working materials collected so the project stays transparent and verifiable.
            </motion.p>
            <motion.div initial={reduceMotion ? {} : { opacity: 0, y: 12 }} animate={loaded ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.5 }} className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
              <Link href="#sources" className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#f3efe6] px-7 py-3.5 text-sm font-medium tracking-wide text-[#0a0f0d] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white sm:w-auto">Primary sources <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span></Link>
              <Link href="#materials" className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-[#e6decf] transition-colors hover:bg-white/[0.07] hover:text-white sm:w-auto">Field materials</Link>
            </motion.div>
          </div>
        </section>

        {/* PRIMARY SOURCES */}
        <section id="sources" className="bg-[#faf7f0] py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
            <Fade><h2 className="max-w-4xl text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-[#173027]">Public data, ordinance text, and regional research <Accent>that can be checked</Accent>.</h2></Fade>
            <div className="mt-14 border-t border-[#e2dbc9]">
              {primarySources.map((item, i) => (
                <Fade key={item.name} delay={i * 0.04}>
                  <div className="grid gap-4 border-b border-[#e2dbc9] py-5 lg:grid-cols-[1fr_180px_240px] lg:items-center">
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-[#173027] transition-colors hover:text-[#2d6a2d]">{item.name} <span className="text-[#6f8167]">↗</span></a>
                    <p className="text-[13px] text-[#5a625b]">{item.org}</p>
                    <p className="text-[13px] text-[#5a625b]">{item.use}</p>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </section>

        {/* FIELD MATERIALS */}
        <section id="materials" className="bg-[#060807] py-20 text-[#f3efe5] sm:py-24 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
            <Fade><h2 className="max-w-4xl text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-[#f3efe5]">Working documents that keep the <Accent>campaign organized</Accent>.</h2></Fade>
            <div className="mt-14 border-t border-white/10">
              {fieldMaterials.map((item, i) => (
                <Fade key={item.title} delay={i * 0.04}>
                  <div className="grid gap-4 border-b border-white/10 py-6 lg:grid-cols-[1fr_auto] lg:gap-8">
                    <div>
                      <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#f3efe5]">{item.title}</h3>
                      <p className="mt-2 text-[14px] leading-[1.85] text-[#b8afa1]">{item.desc}</p>
                    </div>
                    <div className="lg:text-right">
                      {item.href ? (
                        <Link href={item.href} className="inline-flex items-center rounded-full bg-[#f3efe6] px-4 py-2 text-[11px] font-medium text-[#0a0f0d] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white">Access →</Link>
                      ) : (
                        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-medium text-[#8f978a]">{item.status}</span>
                      )}
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </section>

        {/* FURTHER READING */}
        <section className="bg-[#faf7f0] py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
            <Fade><h2 className="max-w-4xl text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-[#173027]">Background reading keeps the project <Accent>grounded in science</Accent>.</h2></Fade>
            <div className="mt-14 border-t border-[#e2dbc9]">
              {furtherReading.map((item, i) => (
                <Fade key={item.title} delay={i * 0.04}>
                  <div className="grid gap-3 border-b border-[#e2dbc9] py-6 lg:grid-cols-[1fr_240px] lg:items-start">
                    <div>
                      <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#173027]">{item.title}</h3>
                      <p className="mt-2 text-[14px] leading-[1.85] text-[#5a625b]">{item.org}</p>
                    </div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#7c8576] lg:text-right">{item.type}</p>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING */}
        <section className="bg-[#060807] py-20 text-[#f3efe5] sm:py-24 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
            <Fade><h2 className="max-w-4xl text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-[#f3efe5]">Every source is traceable. <Accent>Every document is ready.</Accent></h2></Fade>
            <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
              <Fade><div className="space-y-4 text-[15px] leading-[1.85] text-[#b8afa1]"><p>Every source is traceable.</p><p>Every working file has a purpose.</p><p>Every document is ready to hand off.</p></div></Fade>
              <Fade delay={0.08}>
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#f3efe5]">BLACKOUT keeps the evidence visible.</h3>
                  <p className="mt-5 text-[15px] leading-[1.9] text-[#b8afa1]">Sources, field files, and references are organized so the project can be checked and reused without reconstruction.</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/about" className="group inline-flex items-center gap-2 rounded-full bg-[#f3efe6] px-6 py-3 text-sm font-medium text-[#0a0f0d] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white">About BLACKOUT <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span></Link>
                    <Link href="#top" className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-[#e6decf] transition-colors hover:bg-white/[0.07] hover:text-white">Back to top <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">↑</span></Link>
                  </div>
                </div>
              </Fade>
            </div>
          </div>
        </section>

      </main>
    </SiteLayout>
  )
}