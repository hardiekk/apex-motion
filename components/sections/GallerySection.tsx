'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Gallery items using CSS-generated abstract visuals (no external images needed)
const GALLERY_ITEMS = [
  { id: 'g1', label: 'LATERAL PROFILE', size: 'full', color: '#1a1a1a', accent: '#f0f0eb' },
  { id: 'g2', label: 'MIDSOLE DETAIL', size: 'half', color: '#0a0a0a', accent: '#c41e3a' },
  { id: 'g3', label: 'SOLE TRACTION', size: 'half', color: '#2a2a2a', accent: '#e8e8e2' },
  { id: 'g4', label: 'HEEL STRUCTURE', size: 'third', color: '#111111', accent: '#9a9a9a' },
  { id: 'g5', label: 'UPPER MESH', size: 'two-thirds', color: '#0f0f0f', accent: '#f0f0eb' },
]

function AbstractShoeArt({ accent, id }: { accent: string; id: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      {/* Shoe silhouette abstraction */}
      <path
        d="M 40 220 Q 80 150 120 130 Q 160 110 220 100 Q 280 90 320 110 Q 350 125 360 160 Q 365 185 350 210 Q 330 230 280 240 Q 200 250 120 245 Q 60 240 40 220 Z"
        fill={accent}
        fillOpacity="0.07"
        stroke={accent}
        strokeWidth="1"
        strokeOpacity="0.2"
      />
      {/* Grid lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={`h${i}`}
          x1="20" y1={60 + i * 50} x2="380" y2={60 + i * 50}
          stroke={accent}
          strokeWidth="0.5"
          strokeOpacity="0.06"
        />
      ))}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line
          key={`v${i}`}
          x1={20 + i * 55} y1="20" x2={20 + i * 55} y2="280"
          stroke={accent}
          strokeWidth="0.5"
          strokeOpacity="0.06"
        />
      ))}
      {/* Technical detail lines */}
      <line x1="40" y1="220" x2="360" y2="220" stroke={accent} strokeWidth="1" strokeOpacity="0.15" />
      <circle cx="200" cy="160" r="50" stroke={accent} strokeWidth="1" strokeOpacity="0.1" fill="none" />
      <circle cx="200" cy="160" r="25" stroke={accent} strokeWidth="0.5" strokeOpacity="0.1" fill="none" />
      {/* Crosshair */}
      <line x1="190" y1="160" x2="210" y2="160" stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
      <line x1="200" y1="150" x2="200" y2="170" stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
    </svg>
  )
}

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      // Gallery items clip-path reveal
      gsap.utils.toArray<HTMLElement>('.gallery-cell').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 1.2,
            ease: 'power4.inOut',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="section-padding"
      style={{ background: 'var(--apex-grey-100)' }}
    >
      <div className="container-apex">
        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
          <span className="text-label">08 / VISUAL SHOWCASE</span>
          <h2 className="text-heading" style={{ marginTop: '1.5rem' }}>
            EVERY DETAIL<br />
            <span style={{ WebkitTextStroke: '1px var(--apex-grey-400)', color: 'transparent' }}>CONSIDERED.</span>
          </h2>
        </div>

        {/* Row 1: Full width */}
        <div
          className="gallery-cell"
          style={{
            height: '60vh',
            minHeight: '320px',
            background: GALLERY_ITEMS[0].color,
            border: '1px solid var(--apex-grey-200)',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '1px',
            clipPath: 'inset(100% 0 0 0)',
          }}
        >
          <AbstractShoeArt accent={GALLERY_ITEMS[0].accent} id={GALLERY_ITEMS[0].id} />
          <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem' }}>
            <span className="text-label">{GALLERY_ITEMS[0].label}</span>
          </div>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}
          >
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              letterSpacing: '0.2em',
              color: 'var(--apex-grey-400)',
              textTransform: 'uppercase',
            }}>
              APEX R1 / LATERAL
            </p>
          </div>
        </div>

        {/* Row 2: Two halves */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', marginBottom: '1px' }}>
          {[GALLERY_ITEMS[1], GALLERY_ITEMS[2]].map((item) => (
            <div
              key={item.id}
              className="gallery-cell"
              style={{
                height: '45vh',
                minHeight: '240px',
                background: item.color,
                border: '1px solid var(--apex-grey-200)',
                position: 'relative',
                overflow: 'hidden',
                clipPath: 'inset(100% 0 0 0)',
              }}
            >
              <AbstractShoeArt accent={item.accent} id={item.id} />
              <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem' }}>
                <span className="text-label">{item.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Row 3: Third + Two-thirds */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1px' }}>
          {[GALLERY_ITEMS[3], GALLERY_ITEMS[4]].map((item) => (
            <div
              key={item.id}
              className="gallery-cell"
              style={{
                height: '55vh',
                minHeight: '280px',
                background: item.color,
                border: '1px solid var(--apex-grey-200)',
                position: 'relative',
                overflow: 'hidden',
                clipPath: 'inset(100% 0 0 0)',
              }}
            >
              <AbstractShoeArt accent={item.accent} id={item.id} />
              <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem' }}>
                <span className="text-label">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
