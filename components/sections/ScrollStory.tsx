'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import dynamic from 'next/dynamic'

gsap.registerPlugin(ScrollTrigger)

const ScrollStory3D = dynamic(() => import('./ScrollStory3D'), { ssr: false })

const STORY_STEPS = [
  { pct: '0%', label: '01 / CENTERED', desc: 'APEX R1. Ready for the next move.' },
  { pct: '25%', label: '02 / LATERAL VIEW', desc: 'A profile engineered for drag reduction.' },
  { pct: '50%', label: '03 / MIDSOLE DETAIL', desc: 'Carbon-infused propulsion plate exposed.' },
  { pct: '75%', label: '04 / SOLE INSPECTION', desc: 'Asymmetric traction pattern revealed.' },
  { pct: '100%', label: '05 / BACK TO ORIGIN', desc: 'Form follows function, always.' },
]

export default function ScrollStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      stepsRef.current.forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => {
            gsap.to(el, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' })
          },
          onLeave: () => {
            gsap.to(el, { opacity: 0.2, duration: 0.5 })
          },
          onEnterBack: () => {
            gsap.to(el, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' })
          },
          onLeaveBack: () => {
            gsap.to(el, { opacity: 0.2, duration: 0.5 })
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="story"
      ref={sectionRef}
      style={{
        background: 'var(--apex-grey-100)',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: '500vh',
        }}
      >
        {/* Left: Sticky 3D canvas */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          {/* Label */}
          <div style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 10 }}>
            <span className="text-label">06 / 3D STORY</span>
          </div>
          <ScrollStory3D />
        </div>

        {/* Right: scroll steps */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0 clamp(2rem, 4vw, 5rem)',
          }}
        >
          {STORY_STEPS.map((step, i) => (
            <div
              key={step.label}
              ref={(el) => { if (el) stepsRef.current[i] = el }}
              style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                opacity: i === 0 ? 1 : 0.2,
                transform: 'translateX(20px)',
              }}
            >
              <div style={{ marginBottom: '1.5rem' }}>
                <span className="text-label">{step.label}</span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  textTransform: 'uppercase',
                  color: 'var(--apex-white)',
                  lineHeight: 1.1,
                  marginBottom: '1.5rem',
                }}
              >
                {step.desc}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '3rem', height: '1px', background: 'var(--apex-grey-400)' }} />
                <span className="text-label">{step.pct}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
