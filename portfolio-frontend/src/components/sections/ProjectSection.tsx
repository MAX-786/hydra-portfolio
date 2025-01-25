
'use client'

import { motion } from 'framer-motion'

export default function ProjectsSection({ }: { projects: unknown[] }) {
  return (
    <motion.div 
      className="max-w-4xl mx-auto"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h2 className="text-4xl font-bold mb-12 text-emerald-500">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Project cards will go here */}
      </div>
    </motion.div>
  )
}