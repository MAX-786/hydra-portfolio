'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, Code } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Projects', href: '#projects', icon: Briefcase },
  { name: 'Skills', href: '#skills', icon: Code },
];

interface VerticalNavProps {
  isVisible: boolean;
}

export default function VerticalNav({ isVisible }: VerticalNavProps) {
  const [activeSection, setActiveSection] = useState('Home');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.7,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={isMobile ? { y: '-100%' } : { x: '-100%' }}
          animate={isMobile ? { y: 0 } : { x: 0 }}
          exit={isMobile ? { y: '-100%' } : { x: '-100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={`fixed ${
            isMobile ? 'top-0 left-0 w-full h-auto' : 'left-0 top-0 h-full w-64'
          } bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 shadow-lg z-50 transition-colors duration-200`}
        >
          <ul
            className={`flex ${
              isMobile
                ? 'flex-row justify-around py-4'
                : 'h-full flex-col items-start justify-center space-y-16 pl-8'
            }`}
          >
            {navItems.map((item, index) => (
              <li
                key={item.name}
                className={`relative ${isMobile ? 'mx-2' : ''}`}
              >
                {!isMobile && (
                  <motion.div
                    key={`branch-${activeSection}-${item.name}`}
                    className="absolute left-0 top-[1.125rem] h-0.5 w-8 bg-gray-300"
                    initial={{ width: 0 }}
                    animate={{ width: 32 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  />
                )}
                <motion.div
                  key={`node-${activeSection}-${item.name}`}
                  className={`${
                    isMobile
                      ? 'inline-block mr-2'
                      : 'absolute left-8 top-[0.875rem]'
                  } h-8 w-8 rounded-full border-2 transition-all duration-300 ${
                    activeSection === item.name.toLowerCase()
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-gray-300 bg-white text-gray-600'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                    delay: index * 0.1 + 0.2,
                  }}
                >
                  <item.icon className="h-full w-full p-1" />
                </motion.div>
                <Link
                  href={item.href}
                  className={`${
                    isMobile ? 'text-sm' : 'pl-16 text-2xl leading-9'
                  } font-semibold transition-all duration-300 ${
                    activeSection === item.name.toLowerCase()
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  <motion.span
                    key={`text-${activeSection}-${item.name}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
                  >
                    {isMobile ? '' : item.name}
                  </motion.span>
                </Link>
                {!isMobile && index < navItems.length - 1 && (
                  <motion.div
                    key={`vertical-${activeSection}-${item.name}`}
                    className="absolute left-[2.4375rem] top-7 h-16 w-0.5 bg-gray-300"
                    initial={{ height: 0 }}
                    animate={{ height: 64 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.6 }}
                  />
                )}
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
