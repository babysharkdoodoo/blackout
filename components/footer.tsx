'use client';

import Link from 'next/link';

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
};

export function Footer() {
  return (
    <footer className="relative bg-[#060a08] border-t border-white/5 pt-16 pb-12 lg:pt-20">
      <div className="absolute inset-0 grain pointer-events-none opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-14">
          {/* Brand & Info */}
          <div className="md:col-span-5 lg:col-span-6">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold tracking-[0.08em] text-white">BLACKOUT</span>
            </Link>

            <p className="text-[15px] text-[#8a8578] leading-relaxed max-w-md">
              A student-led civic initiative activating Brevard County’s Summer Fertilizer Blackout
              Ordinance to protect the Indian River Lagoon, its seagrass, and manatees.
            </p>

            <div className="mt-8 pt-8 border-t border-white/10 space-y-2 text-sm">
              <p className="text-[#5a564e]">West Shore Jr./Sr. High School</p>
              <p className="text-[#5a564e]">Melbourne, Florida</p>
              <p className="text-[#5a564e] text-xs pt-1">Established 2026</p>
              <p className="text-[#5a564e] text-xs pt-1">Made by Faizan Ahmed</p>
            </div>
          </div>

          {/* Initiative Links */}
          <div className="md:col-span-3 lg:col-span-3">
            <p className="text-xs tracking-[0.125em] text-[#a3b18a] uppercase font-medium mb-6">Initiative</p>
            <ul className="space-y-3">
              {footerLinks.initiative.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="block text-[15px] text-[#8a8578] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Field Work Links */}
          <div className="md:col-span-4 lg:col-span-3">
            <p className="text-xs tracking-[0.125em] text-[#a3b18a] uppercase font-medium mb-6">Field Work</p>
            <ul className="space-y-3">
              {footerLinks.fieldwork.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="block text-[15px] text-[#8a8578] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-4 sm:items-center justify-between text-xs text-[#5a564e]">
          <div className="flex flex-col sm:flex-row gap-x-6 gap-y-1">
            <p>Brevard County Ord. § 62-3601</p>
            <p>Summer Fertilizer Blackout</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-x-6 gap-y-1 text-right sm:text-left">
            <p>Field Season: June 1 – September 30, 2026</p>
            <p>© {new Date().getFullYear()} BLACKOUT Initiative</p>
          </div>
        </div>
      </div>
    </footer>
  );
}