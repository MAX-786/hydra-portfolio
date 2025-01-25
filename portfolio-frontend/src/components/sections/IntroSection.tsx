// components/sections/IntroSection.tsx
'use client'

import { motion } from 'framer-motion'
import AnimatedCharacters from '../ui/AnimatedCharacters'
import Typewriter from '../ui/Typewriter'

export default function IntroSection() {
  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-6">
      <AnimatedCharacters text="Mohammad" />
      <Typewriter words={['Software Developer', 'Full Stack Engineer', 'Tech Enthusiast']} />
      
      <motion.div
        className="mt-12 flex space-x-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {/* Add any intro section decorations */}
      </motion.div>
    </div>
  )
}