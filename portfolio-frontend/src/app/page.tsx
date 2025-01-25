// app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import LoadingScreen from '@/components/LoadingScreen'
import SectionWrapper from '@/components/ui/SectionWrapper'
import IntroSection from '@/components/sections/IntroSection'
import ProjectsSection from '@/components/sections/ProjectSection'
import SocialSection from '@/components/sections/SocialSection'
import { motion } from 'framer-motion'

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
        <IntroSection />
      </SectionWrapper>

      <SectionWrapper>
        <ProjectsSection projects={[]} />
      </SectionWrapper>

      <SectionWrapper>
        <SocialSection />
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