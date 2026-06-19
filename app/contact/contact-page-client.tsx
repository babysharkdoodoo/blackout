'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { SiteLayout } from '@/components/site-layout'
import { ContactForm } from '@/components/contact-form'

/* ── DATA ── */

const directory = [
  { type: 'General & Media', desc: 'Press inquiries, project documentation requests, and general questions.', contact: 'blackout.irl@westshore.edu', note: null },
  { type: 'Retail Partnerships', desc: 'Hardware stores, garden centers, and nurseries interested in shelf tag participation.', contact: 'blackout.irl@westshore.edu', note: 'Partnership Inquiry' },
  { type: 'County Coordination', desc: 'Brevard County Natural Resources, stormwater management, or official correspondence.', contact: 'blackout.irl@westshore.edu', note: 'County' },
  { type: 'Academic / Replication', desc: 'Schools or organizations interested in replicating the BLACKOUT model.', contact: 'blackout.irl@westshore.edu', note: 'Replication' },
]

const quickLinks = [
  { head: 'Take the survey', body: 'Brevard County residents can participate in the community compliance audit.', href: '/survey', cta: 'Open survey' },
  { head: 'Retail partnership', body: 'Hardware and garden retailers can host a shelf tag in the fertilizer section.', href: '/retail-partners', cta: 'Learn more' },
  { head: 'Follow the project', body: 'The website is updated as field activities progress through the 2026 season.', href: '/impact', cta: 'View impact' },
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

export function ContactPageClient() {
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

          {/* Unique character orb for Contact (White/Amber) */}
          <motion.div aria-hidden="true" className="absolute inset-0" initial={false}>
            <div className="absolute left-1/3 top-1/4 h-[24rem] w-[24rem] rounded-full bg-white/5 blur-[100px] sm:h-[30rem] sm:w-[30rem]" />
            <div className="absolute right-1/4 bottom-1/4 h-[22rem] w-[22rem] rounded-full bg-amber-500/10 blur-[110px] sm:h-[28rem] sm:w-[28rem]" />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#060807] via-[#060807]/50 to-[#060807]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060807]/40 via-transparent to-[#060807]/40" />
          <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />

          <div className="relative z-10 mx-auto flex flex-1 w-full max-w-6xl flex-col justify-center px-6 pt-32 pb-16 sm:px-10 sm:justify-end sm:pb-20 lg:px-12 lg:pb-24">
            <motion.h1 initial={reduceMotion ? {} : { opacity: 0, y: 20, filter: 'blur(8px)' }} animate={loaded ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="max-w-4xl text-[clamp(2.6rem,7vw,5.2rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-[#f4efe5]">
              Reach the team.{' '}<br className="hidden sm:block" /><Accent>One inbox.</Accent>{' '}<br className="hidden sm:block" />One response path.
            </motion.h1>
            <motion.p initial={reduceMotion ? {} : { opacity: 0, y: 16 }} animate={loaded ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.24 }} className="mt-5 max-w-xl text-[clamp(1rem,2vw,1.3rem)] font-medium leading-[1.3] tracking-[-0.01em] text-white/30 sm:mt-6">
              Media inquiries, partnership questions, county coordination, or general interest all go to the same place.
            </motion.p>
            <motion.div initial={reduceMotion ? {} : { opacity: 0, y: 12 }} animate={loaded ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.5 }} className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
              <Link href="#directory" className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#f3efe6] px-7 py-3.5 text-sm font-medium tracking-wide text-[#0a0f0d] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white sm:w-auto">Contact directory <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span></Link>
              <Link href="#form" className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-[#e6decf] transition-colors hover:bg-white/[0.07] hover:text-white sm:w-auto">Send a message</Link>
            </motion.div>
          </div>
        </section>

        {/* DIRECTORY */}
        <section id="directory" className="bg-[#faf7f0] py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
            <Fade><h2 className="max-w-4xl text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-[#173027]">Every inquiry type <Accent>has a clear path</Accent>.</h2></Fade>
            <div className="mt-14 border-t border-[#e2dbc9]">
              {directory.map((item, i) => (
                <Fade key={item.type} delay={i * 0.04}>
                  <div className="grid gap-4 border-b border-[#e2dbc9] py-6 lg:grid-cols-[1.15fr_1fr_auto] lg:items-center">
                    <div>
                      <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#173027]">{item.type}</h3>
                      <p className="mt-2 text-[14px] leading-[1.85] text-[#5a625b]">{item.desc}</p>
                    </div>
                    <a href={`mailto:${item.contact}${item.note ? `?subject=${encodeURIComponent(item.note)}` : ''}`} className="inline-flex items-center gap-1 text-[14px] font-medium text-[#173027] transition-colors hover:text-[#2d6a2d]">{item.contact} <span className="text-[#6f8167]">↗</span></a>
                    <div className="lg:text-right">
                      {item.note ? (
                        <span className="inline-flex rounded-full border border-[#e2dbc9] bg-white/70 px-3 py-1 text-[11px] font-medium text-[#7c8576]">{item.note}</span>
                      ) : (
                        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#8f978a]">Direct inbox</span>
                      )}
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
            <Fade delay={0.2}>
              <div className="mt-8 border-t border-[#e2dbc9] pt-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6f8167]">Status notice</p>
                <p className="mt-3 max-w-4xl text-[14px] leading-[1.9] text-[#5a625b]">BLACKOUT is a student initiative at West Shore Jr./Sr. High School, Melbourne, Florida. Response times may vary with the academic calendar. All partnership and county inquiries are forwarded directly to the Project Lead.</p>
              </div>
            </Fade>
          </div>
        </section>

        {/* FORM */}
        <section id="form" className="bg-[#060807] py-20 text-[#f3efe5] sm:py-24 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
            <Fade><h2 className="max-w-4xl text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-[#f3efe5]">Questions, partnerships, or feedback <Accent>all belong here</Accent>.</h2></Fade>
            <div className="mt-12 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div className="space-y-6 text-[15px] leading-[1.9] text-[#b8afa1]">
                <Fade><p>The form is the simplest way to reach the team. It keeps the contact page clear while still giving visitors a direct path to the right inbox.</p></Fade>
                <Fade delay={0.06}><p>Messages are routed through a single channel so the team can respond clearly and consistently.</p></Fade>
              </div>
              <Fade delay={0.1}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 lg:p-5">
                  <ContactForm />
                </div>
              </Fade>
            </div>
          </div>
        </section>

        {/* GET INVOLVED */}
        <section className="bg-[#faf7f0] py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
            <Fade><h2 className="max-w-4xl text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-[#173027]">Common ways people <Accent>engage with the project</Accent>.</h2></Fade>
            <div className="mt-14 border-t border-[#e2dbc9]">
              {quickLinks.map((item, i) => (
                <Fade key={item.head} delay={i * 0.06}>
                  <div className="grid gap-4 border-b border-[#e2dbc9] py-7 lg:grid-cols-[1.2fr_1fr] lg:items-center">
                    <div>
                      <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#173027]">{item.head}</h3>
                      <p className="mt-2 text-[14px] leading-[1.85] text-[#5a625b]">{item.body}</p>
                    </div>
                    <div className="lg:text-right">
                      <Link href={item.href} className="group inline-flex items-center gap-2 rounded-full bg-[#173027] px-5 py-3 text-sm font-medium text-[#f3efe5] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1d3d31]">{item.cta} <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span></Link>
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING */}
        <section className="bg-[#060807] py-20 text-[#f3efe5] sm:py-24 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
            <Fade><h2 className="max-w-4xl text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-[#f3efe5]">One inbox. One response path. <Accent>No confusion.</Accent></h2></Fade>
            <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
              <Fade><div className="space-y-4 text-[15px] leading-[1.85] text-[#b8afa1]"><p>Media inquiries.</p><p>Retail partnerships.</p><p>County coordination.</p><p>General questions.</p></div></Fade>
              <Fade delay={0.08}>
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#f3efe5]">The contact page is direct, calm, and easy to trust.</h3>
                  <p className="mt-5 text-[15px] leading-[1.9] text-[#b8afa1]">Every message reaches the same team. The Project Lead routes it from there.</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="#directory" className="group inline-flex items-center gap-2 rounded-full bg-[#f3efe6] px-6 py-3 text-sm font-medium text-[#0a0f0d] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white">Contact directory <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span></Link>
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