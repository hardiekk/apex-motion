'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const linesRef = useRef<HTMLDivElement[]>([])
  const btnRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      linesRef.current.forEach((el, i) => {
        gsap.fromTo(el,
          { yPercent: 60, opacity: 0 },
          {
            yPercent: 0, opacity: 1,
            duration: 1.2, ease: 'power4.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
            delay: i * 0.15,
          }
        )
      })

      gsap.fromTo(btnRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: btnRef.current, start: 'top 90%' },
          delay: 0.5,
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Magnetic button effect
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(e.currentTarget, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.4,
      ease: 'power3.out',
    })
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0, y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    })
  }

  return (
    <section
      id="cta"
      ref={sectionRef}
      style={{
        background: 'var(--apex-black)',
        padding: 'clamp(8rem, 15vw, 18rem) 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid overlay */}
      <div className="engineering-grid" />

      <div className="container-apex" style={{ position: 'relative', zIndex: 1 }}>
        {/* Label */}
        <div style={{ marginBottom: '3rem' }}>
          <span className="text-label">09 / EXPLORE</span>
        </div>

        {/* Display heading */}
        <div style={{ overflow: 'hidden', marginBottom: '1rem' }}>
          {['MOVE', 'WITH', 'PRECISION.'].map((line, i) => (
            <div key={line} style={{ overflow: 'hidden' }}>
              <div
                ref={(el) => { if (el) linesRef.current[i] = el }}
                style={{ opacity: 0 }}
              >
                <h2
                  className="text-display"
                  style={{
                    color: i === 2 ? 'transparent' : 'var(--apex-white)',
                    WebkitTextStroke: i === 2 ? '1px var(--apex-grey-400)' : undefined,
                  }}
                >
                  {line}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div style={{ marginTop: '5rem' }}>
          <a
            ref={btnRef}
            href="#hero"
            className="btn-apex"
            style={{
              opacity: 0,
              display: 'inline-flex',
              fontSize: '0.75rem',
              padding: '1.25rem 3rem',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <span>EXPLORE APEX R1</span>
            <ArrowRight size={14} style={{ position: 'relative', zIndex: 1 }} />
          </a>
        </div>

        {/* Bottom label */}
        <div style={{ marginTop: '6rem' }}>
          <span className="text-label">APEX MOTION / ENGINEERED 2026</span>
        </div>
      </div>
    </section>
  )
}
