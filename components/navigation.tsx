'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const primaryLinks = [
  { href: '/about', label: 'About' },
  { href: '/mission', label: 'Problem' },
  { href: '/ordinance', label: 'Ordinance' },
  { href: '/impact', label: 'Impact' },
]

const secondaryLinks = [
  { href: '/resources', label: 'Resources' },
  { href: '/team', label: 'Team' },
]

const fieldLinks = [
  { href: '/survey', label: 'Survey' },
  { href: '/retail-partners', label: 'Retail Partners' },
  { href: '/storm-drains', label: 'Storm Drains' },
]

export function Navigation() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [fieldOpen, setFieldOpen] = useState(false)
  const fieldRef = useRef<HTMLDivElement | null>(null)

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)

  const fieldActive = fieldLinks.some((link) => isActive(link.href))

  useEffect(() => {
    setMenuOpen(false)
    setFieldOpen(false)
  }, [pathname])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setFieldOpen(false)
      }
    }

    const onPointerDown = (event: PointerEvent) => {
      if (
        fieldRef.current &&
        !fieldRef.current.contains(event.target as Node)
      ) {
        setFieldOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointerdown', onPointerDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        aria-label="Primary navigation"
        className="pointer-events-auto mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/12 bg-[#07100d]/75 px-4 py-3 text-[#f5efe3] shadow-[0_18px_60px_rgba(0,0,0,0.35)] ring-1 ring-black/10 backdrop-blur-2xl"
      >
        <Link
          href="/"
          aria-label="BLACKOUT home"
          className="group flex items-center gap-3 rounded-full pr-2"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#f5efe3] text-sm font-black text-[#07100d]">
            B
          </span>

          <span className="font-serif text-lg font-semibold tracking-[0.2em] text-white transition group-hover:text-[#f5efe3] sm:text-xl">
            BLACKOUT
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {primaryLinks.map((link) => (
            <DesktopLink
              key={link.href}
              href={link.href}
              active={isActive(link.href)}
            >
              {link.label}
            </DesktopLink>
          ))}

          <div ref={fieldRef} className="relative">
            <button
              type="button"
              onClick={() => setFieldOpen((open) => !open)}
              aria-expanded={fieldOpen}
              aria-controls="field-work-menu"
              aria-haspopup="true"
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${fieldActive || fieldOpen
                  ? 'bg-white text-[#07100d]'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
            >
              Field Work
              <span className="ml-1.5 text-xs opacity-70">&darr;</span>
            </button>

            {fieldOpen && (
              <div
                id="field-work-menu"
                className="absolute left-1/2 top-full mt-4 w-60 -translate-x-1/2 overflow-hidden rounded-3xl border border-white/12 bg-[#07100d]/95 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
              >
                <div className="px-3 pb-2 pt-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                  Field Work
                </div>

                {fieldLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={`block rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive(link.href)
                        ? 'bg-[#f5efe3] text-[#07100d]'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {secondaryLinks.map((link) => (
            <DesktopLink
              key={link.href}
              href={link.href}
              active={isActive(link.href)}
            >
              {link.label}
            </DesktopLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/contact"
            aria-current={isActive('/contact') ? 'page' : undefined}
            className="rounded-full bg-[#f5efe3] px-5 py-2.5 text-sm font-semibold text-[#07100d] shadow-sm transition hover:bg-white"
          >
            Contact
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/85 transition hover:border-white/30 hover:bg-white/10 hover:text-white lg:hidden"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="pointer-events-auto mx-auto mt-3 max-w-6xl overflow-hidden rounded-3xl border border-white/12 bg-[#07100d]/95 p-3 text-[#f5efe3] shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:hidden"
        >
          <div className="grid gap-1">
            {[...primaryLinks, ...secondaryLinks].map((link) => (
              <MobileLink
                key={link.href}
                href={link.href}
                active={isActive(link.href)}
              >
                {link.label}
              </MobileLink>
            ))}

            <div className="my-2 rounded-3xl border border-white/10 bg-white/[0.03] p-2">
              <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                Field Work
              </p>

              {fieldLinks.map((link) => (
                <MobileLink
                  key={link.href}
                  href={link.href}
                  active={isActive(link.href)}
                >
                  {link.label}
                </MobileLink>
              ))}
            </div>

            <Link
              href="/contact"
              aria-current={isActive('/contact') ? 'page' : undefined}
              className="mt-2 rounded-full bg-[#f5efe3] px-5 py-3 text-center text-sm font-semibold text-[#07100d] transition hover:bg-white"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

function DesktopLink({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${active
          ? 'bg-white text-[#07100d]'
          : 'text-white/70 hover:bg-white/10 hover:text-white'
        }`}
    >
      {children}
    </Link>
  )
}

function MobileLink({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`rounded-2xl px-4 py-3 text-base font-medium transition ${active
          ? 'bg-[#f5efe3] text-[#07100d]'
          : 'text-white/70 hover:bg-white/10 hover:text-white'
        }`}
    >
      {children}
    </Link>
  )
}
