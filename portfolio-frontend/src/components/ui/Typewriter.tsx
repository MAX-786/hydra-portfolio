// components/ui/Typewriter.tsx
'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0)
  
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % words.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      className="text-2xl text-gray-400"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {words[index]}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
        className="ml-1"
      >
        |
      </motion.span>
    </motion.div>
  )
}