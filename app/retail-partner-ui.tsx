'use client'

import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function RetailPartnerUI() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [showPartnerPopup, setShowPartnerPopup] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const dismissKey = 'blackout-partner-popup-dismissed'
    const dismissed = window.localStorage.getItem(dismissKey) === '1'

    const onScroll = () => {
      setShowBackToTop(window.scrollY > 700)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const timer = window.setTimeout(() => {
      if (!dismissed) setShowPartnerPopup(true)
    }, 3500)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(timer)
    }
  }, [])

  const closePopup = () => {
    setShowPartnerPopup(false)
    window.localStorage.setItem('blackout-partner-popup-dismissed', '1')
  }

  return (
    <>
      <AnimatePresence>
        {showBackToTop && (
          <motion.a
            href="#top"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#060807] px-4 py-3 text-sm font-medium text-[#f3efe5] shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#111814]"
            aria-label="Back to top"
          >
            <span className="text-[#a3b18a]">↑</span>
            Back to top
          </motion.a>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPartnerPopup && (
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.28 }}
            className="fixed bottom-5 left-5 z-50 w-[min(92vw,380px)]"
          >
            <div className="rounded-[1.5rem] border border-white/10 bg-[#060807] p-5 text-[#f3efe5] shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#8f978a]">
                    Business partner invite
                  </p>
                  <h3 className="mt-3 font-sans text-2xl font-semibold tracking-[-0.04em]">
                    Are you a business?
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#b8afa1]">
                    Partner with BLACKOUT and help put the ordinance where the
                    purchase happens.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closePopup}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-[#b8afa1] transition hover:bg-white/5 hover:text-white"
                  aria-label="Close popup"
                >
                  ×
                </button>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-[#efe8d6] px-4 py-2.5 text-sm font-medium text-[#111814] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                >
                  Partner with us
                </Link>
                <button
                  type="button"
                  onClick={closePopup}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/90 transition-all duration-300 hover:bg-white/10"
                >
                  Not now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
