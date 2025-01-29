'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VerticalNav from '../components/VerticalNav';
import NavToggleButton from '../components/NavToggleButton';
import ProjectSection from '../components/ProjectSection';
import SkillsSection from '../components/SkillsSection';
import BlogButton from '../components/BlogButton';
import ThemeToggle from '../components/ThemeToggle';
import { usePerformanceCheck } from '@/lib/hooks/usePerformanceCheck';

export default function Home() {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showScrollNav, setShowScrollNav] = useState(false);
  const { isLowEndDevice } = usePerformanceCheck();
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) > 20) {
        setShowScrollNav(true);
        setTimeout(() => setShowScrollNav(false), 1500);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <ThemeToggle />
      <VerticalNav isVisible={isNavVisible || showScrollNav} />
      <NavToggleButton
        onClick={() => setIsNavVisible(!isNavVisible)}
        isNavVisible={isNavVisible}
        showScrollNav={showScrollNav}
      />
      {isLowEndDevice ? (
        showScrollNav &&
        !isNavVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-0 z-10 h-full w-64"
          >
            <VerticalNav isVisible={true} />
          </motion.div>
        )
      ) : (
        <AnimatePresence>
          {showScrollNav && !isNavVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed left-0 top-0 z-10 h-full w-64"
            >
              <VerticalNav isVisible={true} />
            </motion.div>
          )}
        </AnimatePresence>
      )}
      <main className="px-4 pt-16 sm:px-6 lg:px-8">
        <section
          id="home"
          className="flex min-h-screen flex-col items-center justify-center text-center"
        >
          <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Mohammad K. Hussain
          </h1>
          <p className="mb-8 text-lg sm:text-xl md:text-2xl">
            Software Developer | Open Source Gardener:{' '}
            <i>planting PRs, pruning Bugs</i>
          </p>
          <BlogButton />
        </section>
        <ProjectSection />
        <SkillsSection />
      </main>
    </div>
  );
}
