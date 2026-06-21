'use client'

import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { ContactForm } from '@/components/contact-form'

const PROJECT_EMAIL = 'blackoutprojectirl@gmail.com'

type ContactItem = {
    label: string
    description: string
    email: string
    subject?: string
    note?: string
}

const contacts: ContactItem[] = [
    {
        label: 'General and Media',
        description: 'Press inquiries, project documentation requests, and general questions.',
        email: PROJECT_EMAIL,
    },
    {
        label: 'Retail Partnerships',
        description: 'Hardware stores, garden centers, and nurseries interested in shelf tag participation.',
        email: PROJECT_EMAIL,
        subject: 'Partnership Inquiry',
        note: 'Use this subject line.',
    },
    {
        label: 'County Coordination',
        description: 'Brevard County Natural Resources, stormwater management, or official correspondence.',
        email: PROJECT_EMAIL,
        subject: 'County',
        note: 'Use this subject line.',
    },
    {
        label: 'Academic Replication',
        description: 'Schools or organizations interested in adapting the BLACKOUT model.',
        email: PROJECT_EMAIL,
        subject: 'Replication',
        note: 'Use this subject line.',
    },
]

const involvedLinks = [
    {
        head: 'Take the survey',
        body: 'Brevard County residents can participate in the community compliance audit.',
        href: '/survey',
        cta: 'Open survey',
    },
    {
        head: 'Retail partnership',
        body: 'Hardware and garden retailers can host a shelf tag in the fertilizer section.',
        href: '/retail-partners',
        cta: 'Learn more',
    },
    {
        head: 'Follow the project',
        body: 'See how the fieldwork and outreach progress through the 2026 season.',
        href: '/impact',
        cta: 'View impact tracker',
    },
]

const container: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05,
        },
    },
}

const rise: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
    },
}

const fade: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { duration: 0.55, ease: 'easeOut' },
    },
}

function SectionLabel({ title }: { title: string }) {
    return (
        <div className="flex items-start gap-6 mb-8">
            <span className="text-[10px] tracking-[0.22em] text-[#8c9289] uppercase mt-1 shrink-0">
                {title}
            </span>
            <span className="flex-1 h-px bg-black/5 mt-[0.45rem] max-w-10" />
        </div>
    )
}

function makeMailto(email: string, subject?: string) {
    return subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`
}

export function ContactPageContent() {
    return (
        <div className="relative">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.04),transparent_70%)]" />

            <section className="bg-[#f8f6f0]">
                <div className="mx-auto max-w-6xl px-5 lg:px-8 py-16 lg:py-24">
                    <motion.div
                        className="grid lg:grid-cols-[1fr_1.2fr] gap-14 lg:gap-20 items-start"
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.18 }}
                    >
                        <motion.div variants={rise} className="space-y-10">
                            <div>
                                <SectionLabel title="Contact directory" />

                                <div className="border border-black/5 bg-[#f0ede5] overflow-hidden">
                                    {contacts.map((item, i) => (
                                        <motion.div
                                            key={item.label}
                                            variants={rise}
                                            className={`px-6 py-5 ${i !== contacts.length - 1 ? 'border-b border-black/5' : ''
                                                }`}
                                            whileHover={{ x: 2 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <p className="font-medium text-[13px] text-[#151c19] mb-1">
                                                        {item.label}
                                                    </p>
                                                    <p className="text-[12px] text-[#8c9289] leading-[1.6] max-w-md">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-4 flex flex-wrap items-center gap-3">
                                                <a
                                                    href={makeMailto(item.email, item.subject)}
                                                    className="text-[12px] text-[#151c19] underline underline-offset-2 decoration-[#8c9289] hover:decoration-[#151c19] transition-colors"
                                                >
                                                    {item.email}
                                                </a>
                                                {item.note ? (
                                                    <span className="text-[11px] text-[#8c9289]">{item.note}</span>
                                                ) : null}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <motion.div variants={fade} className="border border-black/5 bg-[#f0ede5] px-6 py-5">
                                <p className="text-[11px] text-[#8c9289] leading-[1.7]">
                                    BLACKOUT is a student initiative at West Shore Jr./Sr. High School in Melbourne,
                                    Florida. Response times may vary during the academic calendar. Partnership and
                                    county inquiries are reviewed by the Project Lead.
                                </p>
                            </motion.div>
                        </motion.div>

                        <motion.div variants={rise}>
                            <SectionLabel title="Send a message" />
                            <div className="border border-black/5 bg-white shadow-[0_1px_0_rgba(0,0,0,0.02)] overflow-hidden">
                                <ContactForm />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section className="bg-[#0a0f0d]">
                <div className="mx-auto max-w-6xl px-5 lg:px-8 py-14 lg:py-20">
                    <SectionLabel title="Get involved" />

                    <motion.div
                        className="grid sm:grid-cols-3 gap-0 border border-white/5 bg-[#121a16]"
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.16 }}
                    >
                        {involvedLinks.map((item, i) => (
                            <motion.div
                                key={item.href}
                                variants={rise}
                                whileHover={{ y: -3 }}
                                transition={{ duration: 0.2 }}
                                className={`p-6 lg:p-8 border-b border-white/5 sm:border-b-0 ${i < involvedLinks.length - 1 ? 'sm:border-r border-white/5' : ''
                                    }`}
                            >
                                <h3 className="font-medium text-[14px] text-[#e0ddd5] mb-2">{item.head}</h3>
                                <p className="text-[13px] text-[#8a8578] leading-[1.65] mb-5">{item.body}</p>
                                <Link
                                    href={item.href}
                                    className="text-[12px] text-[#8a8578] hover:text-[#e0ddd5] transition-colors uppercase tracking-wide"
                                >
                                    {item.cta} &rarr;
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="bg-[#f8f6f0] border-t border-black/5">
                <div className="mx-auto max-w-6xl px-5 lg:px-8 py-10">
                    <Link href="/" className="text-[13px] text-[#5c625a] hover:text-[#151c19] transition-colors">
                        ← Back to home
                    </Link>
                </div>
            </section>
        </div>
    )
}
