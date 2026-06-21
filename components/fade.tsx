'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

export function Fade({
  children,
  delay = 0,
  y = 12,
  className = '',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-120px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
