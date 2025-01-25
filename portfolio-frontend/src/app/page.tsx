'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import LoadingScreen from '@/components/LoadingScreen'

const AnimatedCharacters = ({ text }: { text: string }) => (
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

const Typewriter = ({ words }: { words: string[] }) => {
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

const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
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

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <LoadingScreen isLoading={isLoading} />
      
      <SectionWrapper>
        <div className="h-screen flex flex-col items-center justify-center space-y-6">
          <AnimatedCharacters text="Mohammad" />
          <Typewriter words={['Software Developer', 'Full Stack Engineer', 'Tech Enthusiast']} />
        </div>
      </SectionWrapper>

      <SectionWrapper>
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
      </SectionWrapper>

      <motion.div
        className="fixed bottom-8 right-8 w-12 h-12 bg-emerald-500 rounded-full cursor-pointer"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
    </main>
  )
}