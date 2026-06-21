'use client'

import Link from 'next/link'

const footerLinks = {
    initiative: [
        { label: 'About', href: '/about' },
        { label: 'The Problem', href: '/mission' },
        { label: 'The Ordinance', href: '/ordinance' },
        { label: 'Impact & Results', href: '/impact' },
        { label: 'The Team', href: '/team' },
    ],
    fieldwork: [
        { label: 'Community Survey', href: '/survey' },
        { label: 'Retail Partners', href: '/retail-partners' },
        { label: 'Storm Drain Marking', href: '/storm-drains' },
        { label: 'Resources', href: '/resources' },
        { label: 'Contact', href: '/contact' },
    ],
}

export function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[#060a08] pt-16 pb-10 font-sans text-[#f4efe5] lg:pt-20">
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#a3b18a]/35 to-transparent" />
                <div className="absolute left-[-12rem] top-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[#a3b18a]/8 blur-3xl" />
                <div className="absolute right-[-14rem] bottom-[-10rem] h-[30rem] w-[30rem] rounded-full bg-white/[0.035] blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid gap-y-14 md:grid-cols-12 md:gap-x-10">
                    <div className="md:col-span-6">
                        <Link href="/" aria-label="BLACKOUT home" className="inline-block">
                            <span className="block font-serif text-[1.75rem] font-semibold leading-none tracking-[0.18em] text-[#f4efe5]">
                                BLACKOUT
                            </span>
                            <span className="mt-2 block text-[10px] font-medium uppercase tracking-[0.28em] text-[#a3b18a]">
                                Brevard County
                            </span>
                        </Link>

                        <p className="mt-7 max-w-md text-[15px] leading-[1.85] text-[#9d9686]">
                            A student-led civic initiative activating Brevard County&apos;s Summer Fertilizer
                            Blackout Ordinance to protect the Indian River Lagoon, seagrass habitat, and
                            manatees.
                        </p>

                        <div className="mt-8 max-w-md border-t border-white/10 pt-6">
                            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#6f6a60]">
                                <span>West Shore Jr./Sr. High School</span>
                                <span>Melbourne, Florida</span>
                                <span>Established 2026</span>
                            </div>

                            <p className="mt-4 text-xs text-[#5d584f]">Built by Faizan Ahmed.</p>
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a3b18a]">
                            Initiative
                        </p>
                        <ul className="space-y-3.5">
                            {footerLinks.initiative.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-[15px] text-[#8f8878] transition-colors duration-200 hover:text-[#f4efe5]"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-3">
                        <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a3b18a]">
                            Field Work
                        </p>
                        <ul className="space-y-3.5">
                            {footerLinks.fieldwork.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-[15px] text-[#8f8878] transition-colors duration-200 hover:text-[#f4efe5]"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-16 border-t border-white/[0.07] pt-8">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a3b18a]">
                                Ordinance window
                            </p>

                            <p className="mt-3 max-w-xl text-[1.35rem] font-medium leading-[1.25] tracking-[-0.03em] text-[#f4efe5]">
                                June 1 to September 30
                                <span className="text-[#a3b18a]"> &middot; Summer Fertilizer Blackout</span>
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 text-sm text-[#6f6a60] sm:flex-row sm:gap-6 lg:text-right">
                            <p>Brevard County Ord. &sect; 62-3601</p>
                            <p>&copy; {new Date().getFullYear()} BLACKOUT Initiative</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
