// components/ui/AnimatedCharacters.tsx
'use client'

import { motion } from 'framer-motion'

export default function AnimatedCharacters({ text }: { text: string }) {
  return (
    <div className="flex">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="text-7xl font-bold tracking-tighter"
        >
          {char}
        </motion.span>
      ))}
    </div>
  )
}