'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const images = [
  {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Indian%20River%20Lagoon%20Area.jpg',
    label: 'Indian River Lagoon',
  },
  {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Floridian%20seagrass%20bed.jpg',
    label: 'Seagrass beds',
  },
  {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Manatee%20photo.jpg',
    label: 'Manatee habitat',
  },
  {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Storm%20Drain.JPG',
    label: 'Storm drain pathway',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export function Hero() {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduceMotion) return

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [reduceMotion])

  const activeImage = images[index]

  return (
    <section
      id="top"
      className="relative isolate h-[100svh] overflow-hidden bg-[#07110d] text-white"
    >
      <div aria-hidden="true" className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage.src}
            src={activeImage.src}
            alt=""
            draggable={false}
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{
              opacity: 0.34,
              scale: reduceMotion ? 1 : 1.07,
            }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1 },
              scale: { duration: 5.2, ease: 'easeOut' },
            }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-r from-[#07110d] via-[#07110d]/78 to-[#07110d]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07110d] via-transparent to-[#07110d]/20" />
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.09, delayChildren: 0.12 }}
        className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-6 sm:px-10 lg:px-12"
      >
        <motion.p
          variants={fadeUp}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#b9c89c]"
        >
          Brevard County fertilizer blackout
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="max-w-4xl text-[clamp(2.8rem,8vw,5.7rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-[#f5efe3]"
        >
          The rule exists.
          <br />
          Awareness does not.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-2xl text-[clamp(1rem,2vw,1.25rem)] leading-[1.5] text-white/70"
        >
          Brevard County restricts summer nitrogen and phosphorus fertilizer use to
          reduce runoff into storm drains and the Indian River Lagoon.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href="#ordinance"
            className="inline-flex items-center justify-center rounded-full bg-[#f5efe3] px-6 py-3 text-sm font-semibold text-[#07110d] transition hover:bg-white"
          >
            Read the ordinance
          </Link>

          <Link
            href="#mission"
            className="inline-flex items-center justify-center rounded-full border border-white/18 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/35 hover:text-white"
          >
            See the project
          </Link>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex max-w-2xl flex-wrap gap-2 text-xs text-white/58"
        >
          <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
            June 1 - Sept. 30
          </span>
          <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
            Nitrogen + phosphorus
          </span>
          <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
            Survey → stores → storm drains
          </span>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-6 left-6 right-6 z-10 mx-auto flex max-w-6xl items-center justify-between text-xs text-white/42 sm:left-10 sm:right-10 lg:left-12 lg:right-12">
        <AnimatePresence mode="wait">
          <motion.span
            key={activeImage.label}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
          >
            {activeImage.label}
          </motion.span>
        </AnimatePresence>

        <div className="flex gap-2">
          {images.map((image, imageIndex) => (
            <button
              key={image.src}
              type="button"
              aria-label={`Show ${image.label}`}
              onClick={() => setIndex(imageIndex)}
              className={`h-1.5 rounded-full transition-all duration-300 ${imageIndex === index
                  ? 'w-8 bg-[#f5efe3]'
                  : 'w-3 bg-white/25 hover:bg-white/45'
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}