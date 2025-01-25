// components/ui/SectionWrapper.tsx
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function SectionWrapper({ children }: { children: React.ReactNode }) {
  const [ref, inView] = useInView({ threshold: 0.1 })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="min-h-screen py-20 px-8"
    >
      {children}
    </motion.section>
  )
}