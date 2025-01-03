'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Github, ExternalLink, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'

export default function WelcomePage() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  return (
    <div className="min-h-[200vh] text-white dynamic-bg font-sans">
      {/* Hero Section */}
      <motion.div
        ref={targetRef}
        style={{ opacity, scale }}
        className="w-full h-screen flex flex-col items-center justify-center p-6 relative z-10"
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.6 }}
            className="mb-6"
          >
            <span className="text-8xl md:text-9xl">🚀</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
          >
            30 Days of Next.js Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl mx-auto"
          >
            Join me on a journey of building 30 exciting projects in 30 days using the latest tech stack!
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          <Link href="/projects">
            <Button
              size="lg"
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-600/50 text-white rounded-lg font-semibold"
            >
              View All Projects
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="https://github.com/Tahasaif3/30-days-30-projects-showcase" target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 border-gray-500 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg font-semibold"
            >
              GitHub Repository
              <Github className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="text-gray-400"
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.div>

      {/* Highlights Section */}
      <div className="container mx-auto px-6 py-16 relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold text-center mb-16 text-gray-100"
        >
          Project Highlights
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: '⚡', title: 'Modern Stack', description: 'Built with Next.js, TypeScript, and TailwindCSS' },
            { icon: '🎨', title: 'Beautiful UI', description: 'Crafted with shadcn/ui components' },
            { icon: '📱', title: 'Responsive', description: 'Works perfectly on all devices' },
            { icon: '🚀', title: 'Performance', description: 'Optimized for speed and efficiency' },
            { icon: '🔒', title: 'Secure', description: 'Implements best security practices' },
            { icon: '🌐', title: 'Scalable', description: 'Ready for growth and expansion' },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:bg-gray-700 transition-all"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-100">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-20 text-center text-gray-400"
        >
          <p>Built with ❤️ using Next.js, TypeScript, and TailwindCSS</p>
        </motion.footer>
      </div>
    </div>
  )
}
