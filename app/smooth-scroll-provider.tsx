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

    start()

    return () => {
      active = false
      cleanup?.()
    }
  }, [])

  return <>{children}</>
}
