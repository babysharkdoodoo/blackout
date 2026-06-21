// app/smooth-scroll-provider.tsx
'use client'

import { useEffect } from 'react'

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frameId = 0
    let active = true
    let cleanup: (() => void) | undefined
    let idleId: number | undefined
    let timeoutId: ReturnType<typeof setTimeout> | undefined
    const win = window as Window &
      typeof globalThis & {
        requestIdleCallback?: (callback: IdleRequestCallback) => number
        cancelIdleCallback?: (handle: number) => void
      }

    async function start() {
      const { default: Lenis } = await import('lenis')

      if (!active) return

      const lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.2,
      })

      function raf(time: number) {
        if (!document.hidden) {
          lenis.raf(time)
        }

        frameId = requestAnimationFrame(raf)
      }

      frameId = requestAnimationFrame(raf)

      cleanup = () => {
        cancelAnimationFrame(frameId)
        lenis.destroy()
      }
    }

    if (typeof win.requestIdleCallback === 'function') {
      idleId = win.requestIdleCallback(() => {
        start()
      })
    } else {
      timeoutId = setTimeout(() => {
        start()
      }, 1)
    }

    return () => {
      active = false
      if (idleId !== undefined) {
        win.cancelIdleCallback?.(idleId)
      }
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId)
      }
      cleanup?.()
    }
  }, [])

  return <>{children}</>
}
