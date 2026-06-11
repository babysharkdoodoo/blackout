'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'blackout-announcement-dismissed-v1'

export function AnnouncementBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const dismissed = window.localStorage.getItem(STORAGE_KEY) === '1'
      setVisible(!dismissed)
    } catch {
      setVisible(true)
    }
  }, [])

  function dismiss() {
    try {
      window.localStorage.setItem(STORAGE_KEY, '1')
    } catch {}
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="Site announcement"
      className="border-b border-border/40 bg-gradient-to-r from-emerald-50 via-background to-cyan-50 text-foreground dark:from-emerald-950/40 dark:via-background dark:to-cyan-950/40"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="text-sm leading-6 text-foreground/90">
          <span className="font-semibold">BLACKOUT update:</span> new campaign materials, action steps, and school-ready resources are now live.
        </p>

        <div className="flex items-center gap-2">
          <Link
            href="#get-involved"
            className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Get involved
          </Link>
          <button
            type="button"
            onClick={dismiss}
            className="rounded-full border border-border/60 bg-background px-4 py-2 text-sm font-medium transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Dismiss announcement"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  )
}