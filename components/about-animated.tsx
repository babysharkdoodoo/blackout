'use client'

import Link from 'next/link'
import { motion, useReducedMotion, type Transition } from 'framer-motion'

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
}

const stagger = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.05,
        },
    },
}

function SectionLabel({ index, title }: { index: string; title: string }) {
    return (
        <div className="flex items-center gap-4">
            <span className="text-[10px] tracking-[0.22em] uppercase text-[#8a8f86]">{index}</span>
            <span className="h-px flex-1 bg-black/10" />
            <span className="text-[10px] tracking-[0.22em] uppercase text-[#8a8f86]">{title}</span>
        </div>
    )
}

export function AboutAnimatedContent() {
    const reduceMotion = useReducedMotion()

    const transition: Transition = reduceMotion
        ? { duration: 0 }
        : { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }

    const cards = [
        {
            title: 'Not a new law',
            body: 'The ordinance already exists. The point is to make the rule visible enough that people actually follow it.',
        },
        {
            title: 'Not a theory',
            body: 'The project is built around a measurable before-and-after survey, so the outcome can be seen in data, not just in language.',
        },
        {
            title: 'Not a one-off',
            body: 'The goal is a handoff that can keep running after the student team is gone.',
        },
    ]

    return (
        <div className="bg-[#f8f6f0] text-[#151c19]">
            {/* Hero / intro */}
            <section className="relative overflow-hidden border-b border-black/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,28,25,0.06),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(20,28,25,0.04),_transparent_30%),linear-gradient(to_bottom,_rgba(255,255,255,0.5),_rgba(255,255,255,0))]" />
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute -top-24 right-[-6rem] h-72 w-72 rounded-full bg-[#b7c2b1]/20 blur-3xl"
                    animate={reduceMotion ? {} : { y: [0, 18, 0], x: [0, -12, 0] }}
                    transition={reduceMotion ? undefined : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-32 left-[-5rem] h-80 w-80 rounded-full bg-[#8c9289]/15 blur-3xl"
                    animate={reduceMotion ? {} : { y: [0, -14, 0], x: [0, 10, 0] }}
                    transition={reduceMotion ? undefined : { duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                />

                <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-24">
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16"
                    >
                        <motion.div variants={fadeUp} transition={transition} className="max-w-3xl">
                            <SectionLabel index="01" title="Origin story" />
                            <h1 className="mt-6 font-serif text-4xl leading-[1.08] tracking-[-0.03em] text-[#101614] md:text-5xl lg:text-6xl">
                                BLACKOUT started with a simple question:
                                <span className="block text-[#4f5a52]">why is the rule invisible?</span>
                            </h1>
                            <p className="mt-6 max-w-2xl text-[15px] leading-[1.85] text-[#5b6259] md:text-[16px]">
                                The Indian River Lagoon has a summer fertilizer blackout ordinance. The dates are
                                fixed. The science is clear. But public awareness is still weak, and that disconnect
                                is the whole reason this project exists.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                {['Field-based', 'Data-backed', 'Built for handoff'].map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-full border border-black/10 bg-white/60 px-4 py-2 text-[12px] tracking-[0.12em] text-[#4f5a52] shadow-sm backdrop-blur"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        <motion.aside
                            variants={fadeUp}
                            transition={transition}
                            className="rounded-[2rem] border border-black/5 bg-[#f0ede5] p-6 shadow-[0_18px_60px_rgba(20,28,25,0.08)]"
                        >
                            <div className="space-y-4">
                                <div className="border-b border-black/5 pb-4">
                                    <p className="text-[10px] tracking-[0.2em] text-[#8a8f86] uppercase">Project type</p>
                                    <p className="mt-1 text-[14px] text-[#151c19]">Civic environmental initiative</p>
                                </div>
                                <div className="border-b border-black/5 pb-4">
                                    <p className="text-[10px] tracking-[0.2em] text-[#8a8f86] uppercase">Legal basis</p>
                                    <p className="mt-1 text-[14px] text-[#151c19]">Brevard County Ord. &sect; 62-3601</p>
                                </div>
                                <div className="border-b border-black/5 pb-4">
                                    <p className="text-[10px] tracking-[0.2em] text-[#8a8f86] uppercase">Institution</p>
                                    <p className="mt-1 text-[14px] text-[#151c19]">West Shore Jr./Sr. High School</p>
                                    <p className="text-[12px] text-[#8a8f86]">Melbourne, Florida</p>
                                </div>
                                <div className="border-b border-black/5 pb-4">
                                    <p className="text-[10px] tracking-[0.2em] text-[#8a8f86] uppercase">Field season</p>
                                    <p className="mt-1 text-[14px] text-[#151c19]">June 1  -  September 30, 2026</p>
                                </div>
                                <div>
                                    <p className="text-[10px] tracking-[0.2em] text-[#8a8f86] uppercase">Status</p>
                                    <p className="mt-1 text-[14px] text-[#151c19]">Pre-deployment</p>
                                    <p className="text-[12px] text-[#8a8f86]">Wave 1 survey pending</p>
                                </div>
                            </div>
                        </motion.aside>
                    </motion.div>
                </div>
            </section>

            {/* Main story */}
            <section className="border-b border-black/5">
                <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-24">
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16"
                    >
                        <motion.div variants={fadeUp} transition={transition}>
                            <SectionLabel index="02" title="Why it matters" />
                            <div className="mt-8 space-y-5 max-w-2xl text-[15px] leading-[1.9] text-[#5b6259]">
                                <p>
                                    The problem is not that nothing exists. The problem is that a rule can be on the
                                    books and still not be part of anyone&apos;s daily behavior.
                                </p>
                                <p>
                                    BLACKOUT is designed to close that gap. It focuses on the summer window when
                                    runoff risk is highest, and it uses direct field work to find out whether a simple
                                    public-facing intervention changes what people do.
                                </p>
                                <p className="text-[#151c19]">
                                    This is a practical project. It is built to measure one thing clearly, improve
                                    that one thing, and leave behind a structure the county can use later.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            transition={transition}
                            className="grid gap-4 sm:grid-cols-2"
                        >
                            {[
                                { value: '1', label: 'existing ordinance' },
                                { value: '2', label: 'survey waves' },
                                { value: '3', label: 'public-facing outputs' },
                                { value: '4', label: 'handoff-ready sections' },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-[1.5rem] border border-black/5 bg-white/70 p-5 shadow-sm backdrop-blur"
                                >
                                    <p className="font-serif text-3xl tracking-[-0.04em] text-[#151c19]">{item.value}</p>
                                    <p className="mt-2 text-[12px] uppercase tracking-[0.16em] text-[#8a8f86]">
                                        {item.label}
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* What makes it different */}
            <section className="bg-[#0a0f0d] text-[#e8e4da]">
                <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-24">
                    <SectionLabel index="03" title="What makes it different" />

                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="mt-8 grid gap-px overflow-hidden rounded-[2rem] border border-white/8 bg-white/8 lg:grid-cols-3"
                    >
                        {cards.map((card, idx) => (
                            <motion.article
                                key={card.title}
                                variants={fadeUp}
                                transition={transition}
                                whileHover={reduceMotion ? undefined : { y: -4 }}
                                className="bg-[#121916] p-7 lg:p-9"
                            >
                                <p className="text-[11px] tracking-[0.22em] text-[#8b938a]">
                                    0{idx + 1}
                                </p>
                                <h3 className="mt-4 font-serif text-2xl tracking-[-0.02em] text-[#f0ede5]">
                                    {card.title}
                                </h3>
                                <p className="mt-3 text-[14px] leading-[1.85] text-[#9aa396]">
                                    {card.body}
                                </p>
                            </motion.article>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={transition}
                        className="mt-10 rounded-[2rem] border border-white/8 bg-white/[0.03] p-7 lg:p-10"
                    >
                        <p className="max-w-3xl text-[15px] leading-[1.9] text-[#c8cfc5]">
                            The deliverable is not a class project summary. It is a documented program with a
                            clear method, measurable change, and a structure that can be passed off to Brevard
                            County after the student team graduates.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Continuity context */}
            <section className="border-t border-black/5 bg-[#f8f6f0]">
                <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-24">
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]"
                    >
                        <motion.div variants={fadeUp} transition={transition}>
                            <SectionLabel index="04" title="How it continues" />
                            <p className="mt-6 max-w-xl text-[15px] leading-[1.9] text-[#5b6259]">
                                BLACKOUT is organized so the work does not disappear after one field season. The
                                survey, retail, drain, and handoff records are meant to be clear enough for another
                                team or county partner to continue.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeUp} transition={transition} className="flex flex-wrap gap-3">
                            {[
                                'Survey instrument',
                                'Retail tag files',
                                'Drain marker log',
                                'Photo archive',
                                'Partner records',
                                'Handoff package',
                            ].map((item) => (
                                <motion.div
                                    key={item}
                                    whileHover={reduceMotion ? undefined : { y: -3 }}
                                    transition={transition}
                                    className="rounded-2xl border border-black/5 bg-[#f0ede5] px-4 py-3 shadow-sm"
                                >
                                    <p className="text-[14px] text-[#151c19]">{item}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Navigation */}
            <section className="border-t border-black/5 bg-[#f8f6f0]">
                <div className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
                    <div className="flex flex-wrap gap-3">
                        {[
                            { href: '/mission', label: 'The Problem' },
                            { href: '/ordinance', label: 'The Ordinance' },
                            { href: '/team', label: 'The Team' },
                        ].map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-[13px] text-[#5b6259] transition-colors hover:border-black/20 hover:text-[#151c19]"
                            >
                                {item.label} &rarr;
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
