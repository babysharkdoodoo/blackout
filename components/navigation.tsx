'use client'

import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

type ChildLink = {
  href: string
  label: string
}

type NavLink =
  | { href: string; label: string }
  | { label: string; children: ChildLink[] }

const navLinks: NavLink[] = [
  { href: '/about', label: 'About' },
  { href: '/mission', label: 'The Problem' },
  { href: '/ordinance', label: 'Ordinance' },
  {
    label: 'Field Work',
    children: [
      { href: '/survey', label: 'Survey' },
      { href: '/retail-partners', label: 'Retail Partners' },
      { href: '/storm-drains', label: 'Storm Drains' },
    ],
  },
  { href: '/impact', label: 'Impact' },
  { href: '/resources', label: 'Resources' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }

  useEffect(() => {
    setIsOpen(false)
    setOpenDropdown(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        setOpenDropdown(false)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const isActive = (href: string) => pathname === href

  const isParentActive = (children: ChildLink[]) => {
    return children.some((child) => child.href === pathname)
  }

  const navItem =
    'relative rounded-full px-3.5 py-2 text-[13px] font-medium tracking-[0.01em] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c8c0aa]/40'

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <motion.nav
          initial={false}
          animate={{
            backgroundColor: scrolled
              ? 'rgba(12, 18, 13, 0.66)'
              : 'rgba(12, 18, 13, 0.46)',
            borderColor: scrolled
              ? 'rgba(201, 193, 171, 0.24)'
              : 'rgba(201, 193, 171, 0.16)',
            boxShadow: scrolled
              ? '0 20px 70px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.08)'
              : '0 14px 50px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
          transition={transition}
          className="
            mx-auto
            flex
            max-w-7xl
            items-center
            justify-between
            gap-4
            rounded-full
            border
            px-4
            py-3
            text-[#c8c0aa]
            backdrop-blur-2xl
            backdrop-saturate-150
            supports-[backdrop-filter]:bg-[#0c120d]/50
          "
        >
          <Link
            href="/"
            aria-label="Blackout Project home"
            className="
              group
              flex
              min-w-fit
              items-center
              gap-3
              rounded-full
              pr-2
              transition-opacity
              hover:opacity-95
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#c8c0aa]/40
            "
          >
            <span
              className="
                relative
                grid
                h-9
                w-9
                place-items-center
                overflow-hidden
                rounded-full
                border
                border-[#c8c0aa]/20
                bg-white/[0.055]
                shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
              "
            >
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.16),transparent_42%)]" />
              <span className="relative h-3.5 w-3.5 rounded-full bg-[#789262] shadow-[0_0_18px_rgba(120,146,98,0.42)]" />
            </span>

            <span className="leading-none">
              <span className="block font-serif text-[15px] font-semibold tracking-[0.24em] text-[#f4ecd8]">
                BLACKOUT
              </span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.22em] text-[#9d9686]">
                Brevard County
              </span>
            </span>
          </Link>

          <div ref={dropdownRef} className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              if ('children' in link) {
                const active = isParentActive(link.children)

                return (
                  <div key={link.label} className="relative">
                    <button
                      type="button"
                      onClick={() => setOpenDropdown((prev) => !prev)}
                      aria-expanded={openDropdown}
                      aria-haspopup="menu"
                      className={`${navItem} flex items-center gap-1.5 ${active
                          ? 'bg-white/[0.07] text-[#f4ecd8] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
                          : 'text-[#b9b19f] hover:bg-white/[0.055] hover:text-[#f4ecd8]'
                        }`}
                    >
                      {link.label}

                      <motion.svg
                        animate={{ rotate: openDropdown ? 180 : 0 }}
                        transition={transition}
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.1"
                        viewBox="0 0 24 24"
                        aria-hidden
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                      </motion.svg>
                    </button>

                    <AnimatePresence>
                      {openDropdown ? (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={transition}
                          role="menu"
                          className="
                            absolute
                            left-0
                            top-full
                            mt-3
                            w-60
                            overflow-hidden
                            rounded-3xl
                            border
                            border-[#c8c0aa]/18
                            bg-[#0b110c]/72
                            p-2
                            shadow-[0_24px_80px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.07)]
                            backdrop-blur-2xl
                            backdrop-saturate-150
                          "
                        >
                          {link.children.map((child) => {
                            const childActive = isActive(child.href)

                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                role="menuitem"
                                aria-current={childActive ? 'page' : undefined}
                                className={`group block rounded-2xl px-4 py-3 text-[13px] transition-all duration-300 ${childActive
                                    ? 'bg-white/[0.08] text-[#f4ecd8]'
                                    : 'text-[#b9b19f] hover:bg-white/[0.06] hover:text-[#f4ecd8]'
                                  }`}
                              >
                                <span className="flex items-center justify-between gap-4">
                                  {child.label}
                                  <span className="text-[#789262] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    →
                                  </span>
                                </span>
                              </Link>
                            )
                          })}
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                )
              }

              const active = isActive(link.href)

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`${navItem} ${active
                      ? 'bg-white/[0.07] text-[#f4ecd8] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
                      : 'text-[#b9b19f] hover:bg-white/[0.055] hover:text-[#f4ecd8]'
                    }`}
                >
                  {link.label}
                </Link>
              )
            })}

            <Link
              href="/team"
              aria-current={isActive('/team') ? 'page' : undefined}
              className={`${navItem} ${isActive('/team')
                  ? 'bg-white/[0.07] text-[#f4ecd8] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
                  : 'text-[#b9b19f] hover:bg-white/[0.055] hover:text-[#f4ecd8]'
                }`}
            >
              Team
            </Link>

            <Link
              href="/contact"
              className="
                ml-2
                rounded-full
                border
                border-[#c8c0aa]/20
                bg-[#f4ecd8]/[0.08]
                px-4.5
                py-2.5
                text-[13px]
                font-semibold
                text-[#f4ecd8]
                shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
                transition-all
                duration-300
                hover:border-[#789262]/55
                hover:bg-[#789262]/20
                hover:text-white
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#c8c0aa]/40
              "
            >
              Get Involved
            </Link>
          </div>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            className="
              grid
              h-10
              w-10
              place-items-center
              rounded-full
              border
              border-[#c8c0aa]/18
              bg-white/[0.055]
              text-[#f4ecd8]
              shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
              backdrop-blur-xl
              transition-all
              duration-300
              hover:bg-white/[0.08]
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#c8c0aa]/40
              lg:hidden
            "
          >
            <span className="relative h-4 w-5">
              <motion.span
                animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={transition}
                className="absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current"
              />
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={transition}
                className="absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={transition}
                className="absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-current"
              />
            </span>
          </button>
        </motion.nav>
      </header>

      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
              className="fixed inset-0 z-40 bg-black/45 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.aside
              initial={{ opacity: 0, x: 24, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 24, scale: 0.98 }}
              transition={transition}
              className="
                fixed
                right-4
                top-4
                z-50
                h-[calc(100dvh-2rem)]
                w-[min(88vw,25rem)]
                overflow-hidden
                rounded-[2rem]
                border
                border-[#c8c0aa]/20
                bg-[#0b110c]/74
                px-5
                py-5
                text-[#c8c0aa]
                shadow-[0_30px_90px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,255,255,0.08)]
                backdrop-blur-2xl
                backdrop-saturate-150
                lg:hidden
              "
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-[#c8c0aa]/12 pb-5">
                  <div>
                    <p className="font-serif text-[15px] font-semibold tracking-[0.24em] text-[#f4ecd8]">
                      BLACKOUT
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[#9d9686]">
                      Navigation
                    </p>
                  </div>

                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close navigation menu"
                    className="
                      grid
                      h-10
                      w-10
                      place-items-center
                      rounded-full
                      border
                      border-[#c8c0aa]/18
                      bg-white/[0.055]
                      text-xl
                      leading-none
                      text-[#f4ecd8]
                      transition-colors
                      hover:bg-white/[0.08]
                    "
                  >
                    ×
                  </button>
                </div>

                <div className="mt-6 flex-1 overflow-y-auto pr-1">
                  <div className="space-y-1">
                    {navLinks.map((link) => {
                      if ('children' in link) {
                        return (
                          <div key={link.label} className="py-3">
                            <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#789262]">
                              {link.label}
                            </p>

                            <div className="space-y-1">
                              {link.children.map((child) => {
                                const active = isActive(child.href)

                                return (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    aria-current={active ? 'page' : undefined}
                                    className={`block rounded-2xl px-4 py-3 text-[17px] transition-all duration-300 ${active
                                        ? 'bg-white/[0.08] text-[#f4ecd8]'
                                        : 'text-[#b9b19f] hover:bg-white/[0.055] hover:text-[#f4ecd8]'
                                      }`}
                                  >
                                    {child.label}
                                  </Link>
                                )
                              })}
                            </div>
                          </div>
                        )
                      }

                      const active = isActive(link.href)

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          aria-current={active ? 'page' : undefined}
                          className={`block rounded-2xl px-4 py-3 text-[17px] transition-all duration-300 ${active
                              ? 'bg-white/[0.08] text-[#f4ecd8]'
                              : 'text-[#b9b19f] hover:bg-white/[0.055] hover:text-[#f4ecd8]'
                            }`}
                        >
                          {link.label}
                        </Link>
                      )
                    })}

                    <Link
                      href="/team"
                      aria-current={isActive('/team') ? 'page' : undefined}
                      className={`block rounded-2xl px-4 py-3 text-[17px] transition-all duration-300 ${isActive('/team')
                          ? 'bg-white/[0.08] text-[#f4ecd8]'
                          : 'text-[#b9b19f] hover:bg-white/[0.055] hover:text-[#f4ecd8]'
                        }`}
                    >
                      Team
                    </Link>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="
                    mt-6
                    block
                    rounded-2xl
                    border
                    border-[#c8c0aa]/20
                    bg-[#f4ecd8]/[0.08]
                    px-5
                    py-4
                    text-center
                    text-sm
                    font-semibold
                    text-[#f4ecd8]
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
                    transition-all
                    duration-300
                    hover:border-[#789262]/55
                    hover:bg-[#789262]/20
                    hover:text-white
                  "
                >
                  Get Involved
                </Link>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  )
}