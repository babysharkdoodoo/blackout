'use client'

import { useEffect, useMemo, useState } from 'react'

type ThemeMode = 'light' | 'dark'
type TextSize = 'small' | 'normal' | 'large'
type ContrastMode = 'default' | 'high' | 'soft'
type MotionMode = 'full' | 'reduced'
type FocusMode = 'default' | 'strong'

type Settings = {
  theme: ThemeMode
  textSize: TextSize
  contrast: ContrastMode
  motion: MotionMode
  focus: FocusMode
}

const STORAGE_KEY = 'blackout-accessibility-settings-v1'

const DEFAULT_SETTINGS: Settings = {
  theme: 'dark',
  textSize: 'normal',
  contrast: 'default',
  motion: 'full',
  focus: 'default',
}

function applySettings(settings: Settings) {
  const root = document.documentElement

  root.classList.toggle('dark', settings.theme === 'dark')
  root.dataset.textSize = settings.textSize
  root.dataset.contrast = settings.contrast
  root.dataset.motion = settings.motion
  root.dataset.focus = settings.focus
  root.style.colorScheme = settings.theme
}

export function AccessibilityDock() {
  const [open, setOpen] = useState(false)
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      const parsed = saved ? (JSON.parse(saved) as Partial<Settings>) : {}
      const next = { ...DEFAULT_SETTINGS, ...parsed }
      setSettings(next)
      applySettings(next)
    } catch {
      applySettings(DEFAULT_SETTINGS)
    }
  }, [])

  function updateSetting<K extends keyof Settings>(key: K, value: Settings[K]) {
    const next = { ...settings, [key]: value }
    setSettings(next)

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {}

    applySettings(next)
  }

  function resetSettings() {
    setSettings(DEFAULT_SETTINGS)
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {}
    applySettings(DEFAULT_SETTINGS)
  }

  const buttonBase =
    'rounded-xl border border-border/60 bg-background px-3 py-2 text-sm transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background'

  const activeButton = 'border-foreground bg-foreground text-background'

  const themeButtons = useMemo(
    () => [
      { label: 'Light', value: 'light' as const },
      { label: 'Dark', value: 'dark' as const },
    ],
    []
  )

  return (
    <aside className="fixed bottom-4 right-4 z-[1000] w-[min(92vw,24rem)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="ml-auto mb-3 flex items-center gap-2 rounded-full bg-foreground px-4 py-3 text-sm font-medium text-background shadow-lg shadow-black/10 transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-expanded={open}
        aria-controls="accessibility-panel"
      >
        <span aria-hidden="true">⚙</span>
        Accessibility
      </button>

      {open && (
        <div
          id="accessibility-panel"
          className="rounded-2xl bg-background/96 shadow-2xl shadow-black/10 ring-1 ring-border/40 backdrop-blur-xl"
          role="dialog"
          aria-label="Accessibility settings"
        >
          <div className="flex items-center justify-between gap-3 border-b border-border/40 px-4 py-3">
            <div>
              <p className="text-sm font-semibold">Accessibility</p>
              <p className="text-xs text-muted-foreground">Adjust how the site looks and feels</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full border border-border/50 px-3 py-1.5 text-sm transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Close accessibility settings"
            >
              Close
            </button>
          </div>

          <div className="max-h-[70vh] space-y-4 overflow-auto p-4">
            <section className="space-y-2" aria-labelledby="a11y-theme">
              <h2 id="a11y-theme" className="text-xs font-semibold uppercase tracking-[0.18em]">
                Theme
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {themeButtons.map((item) => {
                  const active = settings.theme === item.value
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => updateSetting('theme', item.value)}
                      className={`${buttonBase} ${active ? activeButton : ''}`}
                      aria-pressed={active}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </section>

            <section className="space-y-2" aria-labelledby="a11y-text">
              <h2 id="a11y-text" className="text-xs font-semibold uppercase tracking-[0.18em]">
                Text size
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'A−', value: 'small' as const },
                  { label: 'A', value: 'normal' as const },
                  { label: 'A+', value: 'large' as const },
                ].map((item) => {
                  const active = settings.textSize === item.value
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => updateSetting('textSize', item.value)}
                      className={`${buttonBase} ${active ? activeButton : ''}`}
                      aria-pressed={active}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </section>

            <section className="space-y-2" aria-labelledby="a11y-contrast">
              <h2 id="a11y-contrast" className="text-xs font-semibold uppercase tracking-[0.18em]">
                Contrast
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Default', value: 'default' as const },
                  { label: 'High', value: 'high' as const },
                  { label: 'Soft', value: 'soft' as const },
                ].map((item) => {
                  const active = settings.contrast === item.value
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => updateSetting('contrast', item.value)}
                      className={`${buttonBase} ${active ? activeButton : ''}`}
                      aria-pressed={active}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </section>

            <section className="space-y-2" aria-labelledby="a11y-motion">
              <h2 id="a11y-motion" className="text-xs font-semibold uppercase tracking-[0.18em]">
                Motion
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Full', value: 'full' as const },
                  { label: 'Reduced', value: 'reduced' as const },
                ].map((item) => {
                  const active = settings.motion === item.value
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => updateSetting('motion', item.value)}
                      className={`${buttonBase} ${active ? activeButton : ''}`}
                      aria-pressed={active}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </section>

            <section className="space-y-2" aria-labelledby="a11y-focus">
              <h2 id="a11y-focus" className="text-xs font-semibold uppercase tracking-[0.18em]">
                Focus
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Default', value: 'default' as const },
                  { label: 'Strong rings', value: 'strong' as const },
                ].map((item) => {
                  const active = settings.focus === item.value
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => updateSetting('focus', item.value)}
                      className={`${buttonBase} ${active ? activeButton : ''}`}
                      aria-pressed={active}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </section>

            <button
              type="button"
              onClick={resetSettings}
              className="w-full rounded-xl bg-foreground px-4 py-2.5 text-sm font-medium text-background transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Reset settings
            </button>
          </div>

          <style jsx global>{`
            html[data-text-size='small'] {
              font-size: 93.75%;
            }

            html[data-text-size='normal'] {
              font-size: 100%;
            }

            html[data-text-size='large'] {
              font-size: 112.5%;
            }

            html[data-contrast='high'] {
              --background: 0 0% 100%;
              --foreground: 0 0% 0%;
              --card: 0 0% 100%;
              --card-foreground: 0 0% 0%;
              --popover: 0 0% 100%;
              --popover-foreground: 0 0% 0%;
              --muted: 0 0% 96%;
              --muted-foreground: 0 0% 20%;
              --border: 0 0% 18%;
              --input: 0 0% 18%;
              --ring: 0 0% 0%;
            }

            html[data-contrast='soft'] {
              --background: 195 35% 98%;
              --foreground: 195 28% 10%;
              --card: 195 35% 99%;
              --card-foreground: 195 28% 10%;
              --popover: 195 35% 99%;
              --popover-foreground: 195 28% 10%;
              --muted: 195 20% 94%;
              --muted-foreground: 195 12% 35%;
              --border: 195 18% 84%;
              --input: 195 18% 84%;
              --ring: 195 28% 20%;
            }

            html[data-focus='strong'] :where(a, button, summary, input, textarea, select, [tabindex]):focus-visible {
              outline: 3px solid hsl(var(--ring));
              outline-offset: 4px;
            }

            html[data-motion='reduced'] {
              scroll-behavior: auto;
            }

            html[data-motion='reduced'] *,
            html[data-motion='reduced'] *::before,
            html[data-motion='reduced'] *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
          `}</style>
        </div>
      )}
    </aside>
  )
}