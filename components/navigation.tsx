'use client'

import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
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
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const transition = useMemo(
    () =>
      reduceMotion
        ? { duration: 0 }
        : { type: 'spring', stiffness: 320, damping: 28, mass: 0.9 },
    [reduceMotion]
  )

  useEffect(() => {
    setIsOpen(false)
    setOpenDropdown(false)
    setHoveredKey(null)
  }, [pathname])

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

    if (openDropdown) document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [openDropdown])

  const isActive = (href: string) => pathname === href
  const isParentActive = (children: ChildLink[]) => children.some((child) => child.href === pathname)

  const navItemClass =
    'relative rounded-full px-3.5 py-2 text-[13px] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20'

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
          <motion.nav
            initial={false}
            animate={{ y: 0, scale: 1 }}
            transition={transition}
            className="
              pointer-events-auto
              mx-auto
              flex
              items-center
              justify-between
              gap-3
              rounded-full
              border
              border-white/10
              bg-[#0b1110]/72
              px-3.5
              py-2.5
              shadow-[0_22px_70px_rgba(0,0,0,0.18)]
              backdrop-blur-2xl
            "
          >
            <Link href="/" className="group flex items-center gap-3 pl-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#a39c8d]">
                Brevard Co.
              </span>
              <span className="h-4 w-px bg-white/10" />
              <span className="font-serif text-[15px] font-semibold tracking-[0.22em] text-white transition-all duration-300 group-hover:tracking-[0.28em]">
                BLACKOUT
              </span>
            </Link>

            <div ref={dropdownRef} className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => {
                if ('children' in link) {
                  const activeParent = isParentActive(link.children)
                  const isOpenItem = openDropdown

                  return (
                    <div key={link.label} className="relative">
                      <button
                        type="button"
                        onClick={() => setOpenDropdown((prev) => !prev)}
                        onMouseEnter={() => setHoveredKey(link.label)}
                        onMouseLeave={() => setHoveredKey((current) => (current === link.label ? null : current))}
                        className={`group ${navItemClass} flex items-center gap-2 ${
                          activeParent ? 'text-white' : 'text-[#b6b0a3] hover:text-white'
                        }`}
                        aria-expanded={openDropdown}
                        aria-haspopup="menu"
                      >
                        <span>{link.label}</span>
                        <motion.svg
                          animate={{ rotate: isOpenItem ? 180 : 0 }}
                          transition={transition}
                          className="h-3.5 w-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </motion.svg>

                        {(activeParent || hoveredKey === link.label) && (
                          <span className="absolute inset-x-3 bottom-1 h-px bg-white/60" />
                        )}
                      </button>

                      <AnimatePresence>
                        {openDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.985, filter: 'blur(6px)' }}
                            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: 8, scale: 0.985, filter: 'blur(4px)' }}
                            transition={transition}
                            className="
                              absolute
                              left-1/2
                              top-full
                              mt-3
                              w-60
                              -translate-x-1/2
                              overflow-hidden
                              rounded-3xl
                              border
                              border-white/10
                              bg-[#101715]/96
                              p-2
                              shadow-[0_24px_80px_rgba(0,0,0,0.34)]
                              backdrop-blur-2xl
                            "
                            role="menu"
                          >
                            {link.children.map((child, index) => {
                              const childActive = isActive(child.href)

                              return (
                                <motion.div
                                  key={child.href}
                                  initial={{ opacity: 0, x: -6 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.03, ...transition }}
                                >
                                  <Link
                                    href={child.href}
                                    className={`block rounded-2xl px-4 py-3 text-[13px] transition-colors duration-200 ${
                                      childActive
                                        ? 'bg-white/8 text-white'
                                        : 'text-[#b6b0a3] hover:bg-white/5 hover:text-white'
                                    }`}
                                  >
                                    {child.label}
                                  </Link>
                                </motion.div>
                              )
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }

                const active = isActive(link.href)

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => setHoveredKey(link.href)}
                    onMouseLeave={() => setHoveredKey((current) => (current === link.href ? null : current))}
                    className={`${navItemClass} ${
                      active ? 'text-white' : 'text-[#b6b0a3] hover:text-white'
                    }`}
                  >
                    {link.label}
                    {(active || hoveredKey === link.href) && (
<span className="absolute inset-x-3 bottom-1 h-px bg-white/60" />
                    )}
                  </Link>
                )
              })}

              <Link
                href="/team"
                onMouseEnter={() => setHoveredKey('/team')}
                onMouseLeave={() => setHoveredKey((current) => (current === '/team' ? null : current))}
                className={`${navItemClass} ${
                  isActive('/team') ? 'text-white' : 'text-[#b6b0a3] hover:text-white'
                }`}
              >
                Team
                {(isActive('/team') || hoveredKey === '/team') && (
<span className="absolute inset-x-3 bottom-1 h-px bg-white/60" />
                )}
              </Link>

              <Link
                href="/contact"
                className="
                  ml-2
                  rounded-full
                  bg-white
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  tracking-wider
                  text-black
                  transition-transform
                  duration-300
                  hover:scale-[1.02]
                  active:scale-[0.98]
                "
              >
                Get Involved
              </Link>
            </div>

            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              <div className="relative h-5 w-6">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  transition={transition}
                  className="absolute left-0 top-0 h-0.5 w-6 rounded-full bg-white"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0, scale: 0.7 } : { opacity: 1, scale: 1 }}
                  transition={transition}
                  className="absolute left-0 top-2.5 h-0.5 w-6 rounded-full bg-white"
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  transition={transition}
                  className="absolute left-0 top-5 h-0.5 w-6 rounded-full bg-white"
                />
              </div>
            </button>
          </motion.nav>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.aside
              initial={{ x: '100%', opacity: 0.98 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.98 }}
              transition={transition}
              className="
                fixed
                right-3
                top-3
                z-50
                h-[calc(100vh-1.5rem)]
                w-[min(88vw,26rem)]
                overflow-hidden
                rounded-[2rem]
                border
                border-white/10
                bg-[#0a0f0d]/96
                shadow-[0_30px_90px_rgba(0,0,0,0.45)]
                backdrop-blur-2xl
                lg:hidden
              "
            >
              <div className="flex h-full flex-col px-6 pb-7 pt-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#a39c8d]">
                      Navigation
                    </p>
                    <p className="mt-1 text-sm text-white/55">Brevard County project</p>
                  </div>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white"
                    aria-label="Close menu"
                  >
                    <span className="text-xl leading-none">×</span>
                  </button>
                </div>

                <div className="mt-8 flex-1 overflow-y-auto">
                  <div className="space-y-2">
                    {navLinks.map((link, index) => {
                      if ('children' in link) {
                        return (
                          <motion.div
                            key={link.label}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.04, ...transition }}
                            className="rounded-3xl border border-white/8 bg-white/[0.03] p-3"
                          >
                            <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a39c8d]">
                              {link.label}
                            </div>
                            <div className="space-y-1">
                              {link.children.map((child) => {
                                const childActive = isActive(child.href)

                                return (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    className={`block rounded-2xl px-3 py-3 text-lg transition-colors ${
                                      childActive
                                        ? 'bg-white/8 text-white'
                                        : 'text-[#b6b0a3] hover:bg-white/5 hover:text-white'
                                    }`}
                                  >
                                    {child.label}
                                  </Link>
                                )
                              })}
                            </div>
                          </motion.div>
                        )
                      }

                      const active = isActive(link.href)

                      return (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.04, ...transition }}
                        >
                          <Link
                            href={link.href}
                            className={`block rounded-3xl px-4 py-4 text-2xl transition-colors ${
                              active
                                ? 'bg-white/8 text-white'
                                : 'text-[#b6b0a3] hover:bg-white/5 hover:text-white'
                            }`}
                          >
                            {link.label}
                          </Link>
                        </motion.div>
                      )
                    })}

                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, ...transition }}
                    >
                      <Link
                        href="/team"
                        className={`block rounded-3xl px-4 py-4 text-2xl transition-colors ${
                          isActive('/team')
                            ? 'bg-white/8 text-white'
                            : 'text-[#b6b0a3] hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        Team
                      </Link>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.24, ...transition }}
                    className="mt-8"
                  >
                    <Link
                      href="/contact"
                      className="
                        flex
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        px-6
                        py-4
                        text-sm
                        font-semibold
                        tracking-widest
                        text-black
                        transition-transform
                        duration-300
                        hover:scale-[1.01]
                        active:scale-[0.98]
                      "
                    >
                      Get Involved
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}