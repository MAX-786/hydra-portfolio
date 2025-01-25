// components/sections/SocialSection.tsx
'use client'

import { motion } from 'framer-motion'

const socialLinks = [
  { name: 'GitHub', url: '#', icon: '🐙' },
  { name: 'LinkedIn', url: '#', icon: '💼' },
  { name: 'Twitter', url: '#', icon: '🐦' },
  { name: 'Email', url: '#', icon: '📧' }
]

export default function SocialSection() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {socialLinks.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.url}
            className="text-4xl p-6 rounded-2xl bg-slate-800 hover:bg-emerald-500 transition-colors"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {link.icon}
          </motion.a>
        ))}
      </div>
    </div>
  )
}