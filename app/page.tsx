'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'

// Preloader
import Preloader from '@/components/preloader/Preloader'

// Navigation
import Navbar from '@/components/navigation/Navbar'

// Sections (dynamic imports for 3D-heavy ones)
import Hero from '@/components/hero/Hero'
import ApexSection from '@/components/sections/ApexSection'
import AnatomySection from '@/components/sections/AnatomySection'
import EngineeringSection from '@/components/sections/EngineeringSection'
import PerformanceSection from '@/components/sections/PerformanceSection'
import GallerySection from '@/components/sections/GallerySection'
import FinalCTA from '@/components/sections/FinalCTA'
import Footer from '@/components/footer/Footer'

const ProductExplorer = dynamic(() => import('@/components/sections/ProductExplorer'), { ssr: false })
const ScrollStory = dynamic(() => import('@/components/sections/ScrollStory'), { ssr: false })

// UI
import CustomCursor from '@/components/ui/CustomCursor'
import SmoothScrollProvider from '@/components/ui/SmoothScrollProvider'

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false)

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true)
  }, [])

  return (
    <>
      {/* Preloader */}
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Main site */}
      <SmoothScrollProvider>
        <CustomCursor />
        <Navbar />

        <main>
          {/* 01 — Hero */}
          <Hero />

          {/* 02 — The Apex */}
          <ApexSection />

          {/* 03 — Anatomy */}
          <AnatomySection />

          {/* 04 — Product Explorer */}
          <ProductExplorer />

          {/* 05 — Engineering */}
          <EngineeringSection />

          {/* 06 — Scroll Story */}
          <ScrollStory />

          {/* 07 — Performance */}
          <PerformanceSection />

          {/* 08 — Gallery */}
          <GallerySection />

          {/* 09 — Final CTA */}
          <FinalCTA />
        </main>

        <Footer />
      </SmoothScrollProvider>
    </>
  )
}
