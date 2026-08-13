'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { ArrowDown } from 'lucide-react'

const HeroProduct = dynamic(() => import('./HeroProduct'), { ssr: false })

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const lines = headingRef.current?.querySelectorAll('.hero-line')
      if (!lines) return

      gsap.fromTo(
        lines,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.12,
          ease: 'power4.out',
          delay: 0.3,
        }
      )

      gsap.fromTo(
        [metaRef.current, taglineRef.current, scrollRef.current],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 1.0,
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        position: 'relative',
        height: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
        background: 'var(--apex-black)',
      }}
    >
      {/* 3D Canvas — full background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <HeroProduct />
      </div>

      {/* Subtle vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.7) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Hero text — bottom left */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          padding: 'clamp(1.5rem, 4vw, 5rem)',
          paddingBottom: 'clamp(2rem, 5vw, 6rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        {/* Technical label top-left */}
        <div
          ref={metaRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 'clamp(1.5rem, 4vw, 5rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
            opacity: 0,
          }}
        >
          <span className="text-label">APEX R1 / TRACK · STREET</span>
          <span className="text-label">ENGINEERED 2026 / LIMITED SERIES</span>
        </div>

        {/* Main heading */}
        <div ref={headingRef} style={{ overflow: 'hidden' }}>
          {['ENGINEERED', 'FOR THE', 'NEXT MOVE.'].map((line) => (
            <div key={line} style={{ overflow: 'hidden', lineHeight: 0.9 }}>
              <div
                className="hero-line text-display"
                style={{ opacity: 0, transform: 'translateY(110%)' }}
              >
                {line}
              </div>
            </div>
          ))}
        </div>

        {/* Tagline + scroll */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem' }}>
          <div ref={taglineRef} style={{ opacity: 0, maxWidth: '28rem' }}>
            <p className="text-body">
              Every surface has a purpose. Every material has a function.
              APEX R1 is designed around the physics of forward motion.
            </p>
          </div>

          <div ref={scrollRef} style={{ opacity: 0, flexShrink: 0 }}>
            <div className="scroll-indicator">
              <span className="text-label">SCROLL</span>
              <div className="scroll-indicator-line" />
              <ArrowDown size={10} color="var(--apex-grey-500)" />
            </div>
          </div>
        </div>
      </div>

      {/* Technical corner labels */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: 'clamp(1.5rem, 4vw, 5rem)',
          transform: 'translateY(-50%)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          textAlign: 'right',
        }}
      >
        <span className="text-label">01 / AERODYNAMIC UPPER</span>
        <span className="text-label">02 / CARBON-INFUSED MIDSOLE</span>
        <span className="text-label">03 / ENERGY RETURN SYSTEM</span>
      </div>
    </section>
  )
}
