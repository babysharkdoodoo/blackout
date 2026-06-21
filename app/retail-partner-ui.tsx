'use client'

import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

const POPUP_DISMISS_KEY = 'blackout-partner-popup-dismissed'
const SCROLL_THRESHOLD = 700
const POPUP_DELAY_MS = 4200

export function RetailPartnerUI() {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()

  const [showBackToTop, setShowBackToTop] = useState(false)
  const [showPartnerPopup, setShowPartnerPopup] = useState(false)

  const rafRef = useRef<number | null>(null)

  const shouldSuppressPopup =
    pathname === '/contact' ||
    pathname === '/retail-partners' ||
    pathname === '/partner' ||
    pathname?.startsWith('/contact#')

  const closePopup = useCallback((persist = true) => {
    setShowPartnerPopup(false)

    if (persist) {
      try {
        window.localStorage.setItem(POPUP_DISMISS_KEY, '1')
      } catch {
        // Ignore localStorage failures.
      }
    }
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }, [reduceMotion])

  useEffect(() => {
    const updateScrollState = () => {
      rafRef.current = null
      setShowBackToTop(window.scrollY > SCROLL_THRESHOLD)
    }

    const onScroll = () => {
      if (rafRef.current !== null) return
      rafRef.current = window.requestAnimationFrame(updateScrollState)
    }

    updateScrollState()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (shouldSuppressPopup) return

    let dismissed = false

    try {
      dismissed = window.localStorage.getItem(POPUP_DISMISS_KEY) === '1'
    } catch {
      dismissed = false
    }

    if (dismissed) return

    const timer = window.setTimeout(() => {
      setShowPartnerPopup(true)
    }, POPUP_DELAY_MS)

    return () => {
      window.clearTimeout(timer)
    }
  }, [shouldSuppressPopup])

  useEffect(() => {
    if (!showPartnerPopup) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePopup()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [showPartnerPopup, closePopup])

  return (
    <>
      <AnimatePresence>
        {showBackToTop ? (
          <motion.button
            type="button"
            onClick={scrollToTop}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, filter: 'blur(8px)' }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] as const }}
            className="group fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#07100d]/92 px-4 py-3 text-sm font-semibold text-[#f5efe3] shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#111814] focus:outline-none focus:ring-2 focus:ring-[#a8b98c] focus:ring-offset-2 focus:ring-offset-[#07100d]"
            aria-label="Back to top"
          >
            <span
              aria-hidden="true"
              className="grid h-6 w-6 place-items-center rounded-full bg-[#f5efe3] text-xs text-[#07100d] transition group-hover:-translate-y-0.5"
            >
              &uarr;
            </span>

            <span className="hidden sm:inline">Back to top</span>
          </motion.button>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {showPartnerPopup ? (
          <motion.aside
            role="dialog"
            aria-modal="false"
            aria-labelledby="partner-popup-title"
            aria-describedby="partner-popup-description"
            initial={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 24, scale: 0.97, filter: 'blur(12px)' }
            }
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 24, scale: 0.97, filter: 'blur(12px)' }
            }
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] as const }}
            className="fixed bottom-5 left-5 right-5 z-50 sm:right-auto sm:w-[min(92vw,430px)]"
          >
            <div className="overflow-hidden rounded-[1.75rem] border border-[#d8d0c2]/20 bg-[#f7f2e8] text-[#173027] shadow-[0_24px_80px_rgba(0,0,0,0.32)]">
              <div className="relative p-5 sm:p-6">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#6f8167]/70 to-transparent"
                />

                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6f8167]">
                      Local business invitation
                    </p>

                    <h2
                      id="partner-popup-title"
                      className="mt-3 max-w-[20rem] text-[1.7rem] font-semibold leading-[1.05] tracking-[-0.055em] text-[#173027]"
                    >
                      Help neighbors protect the lagoon.
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => closePopup()}
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#ded6c8] bg-white/45 text-lg leading-none text-[#657064] transition hover:border-[#b7c5aa] hover:bg-white hover:text-[#173027] focus:outline-none focus:ring-2 focus:ring-[#6f8167]"
                    aria-label="Close partner invite"
                  >
                    &times;
                  </button>
                </div>

                <p
                  id="partner-popup-description"
                  className="mt-4 text-sm leading-7 text-[#5e665d]"
                >
                  If your store sells fertilizer, lawn supplies, or garden
                  products, BLACKOUT can prepare simple reminder materials that
                  help customers follow Brevard County&apos;s summer fertilizer rule.
                </p>

                <div className="mt-5 rounded-2xl border border-[#ded6c8] bg-white/45 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6f8167]">
                    Partnership is simple
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#5e665d]">
                    Plan a small shelf reminder, share the blackout dates, and
                    help reduce runoff before it reaches the Indian River Lagoon.
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-[#ded6c8] bg-white/50 px-3 py-1.5 text-[11px] font-medium text-[#657064]">
                    Free materials
                  </span>
                  <span className="rounded-full border border-[#ded6c8] bg-white/50 px-3 py-1.5 text-[11px] font-medium text-[#657064]">
                    Quick setup
                  </span>
                  <span className="rounded-full border border-[#ded6c8] bg-white/50 px-3 py-1.5 text-[11px] font-medium text-[#657064]">
                    Local impact
                  </span>
                </div>
              </div>

              <div className="grid gap-3 border-t border-[#ded6c8] bg-[#fbf8f1] p-5 sm:grid-cols-[1fr_auto] sm:p-6">
                <Link
                  href="/contact"
                  onClick={() => closePopup()}
                  className="inline-flex items-center justify-center rounded-full bg-[#173027] px-5 py-3 text-sm font-semibold text-[#f5efe3] transition hover:-translate-y-0.5 hover:bg-[#07100d] focus:outline-none focus:ring-2 focus:ring-[#6f8167] focus:ring-offset-2 focus:ring-offset-[#fbf8f1]"
                >
                  Become a partner
                </Link>

                <button
                  type="button"
                  onClick={() => closePopup()}
                  className="inline-flex items-center justify-center rounded-full border border-[#ded6c8] bg-white px-5 py-3 text-sm font-semibold text-[#657064] transition hover:border-[#b7c5aa] hover:text-[#173027] focus:outline-none focus:ring-2 focus:ring-[#6f8167]"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  )
}
