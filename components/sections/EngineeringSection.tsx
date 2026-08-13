'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TECHNOLOGIES = [
  {
    id: '01',
    title: 'AERODYNAMIC TEXTILE',
    short: 'Upper Material System',
    detail: 'Engineered for airflow and structural support. Directional weave channels turbulent air away from the foot-strike zone, reducing drag by up to 12% in controlled testing scenarios.',
    spec: 'DENSITY: 120g/m²',
  },
  {
    id: '02',
    title: 'ENERGY RETURN',
    short: 'Cushioning Matrix',
    detail: 'Responsive foam matrix designed around forward motion. Dual-density zones load under strike and release stored energy at maximum stride extension.',
    spec: 'RETURN: 94% TARGET',
  },
  {
    id: '03',
    title: 'CARBON-INFUSED CORE',
    short: 'Propulsion Plate',
    detail: 'A rigid, lightweight structure for controlled propulsion. Carbon composite plate flexes at the metatarsal break point, storing and releasing energy like a spring.',
    spec: 'WEIGHT: 14g / PLATE',
  },
  {
    id: '04',
    title: 'PRECISION TRACTION',
    short: 'Outsole System',
    detail: 'A grip system designed around acceleration and cornering. Asymmetric lug geometry distributes contact pressure across the forefoot and heel independently.',
    spec: 'TRACTION INDEX: 0.82',
  },
]

export default function EngineeringSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.eng-heading',
        { yPercent: 20, opacity: 0 },
        {
          yPercent: 0, opacity: 1, duration: 1.1, ease: 'power4.out',
          scrollTrigger: { trigger: '.eng-heading', start: 'top 82%' },
        }
      )

      itemRefs.current.forEach((el, i) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
            delay: i * 0.08,
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="engineering"
      ref={sectionRef}
      className="section-padding"
      style={{ background: 'var(--apex-black)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Subtle grid */}
      <div className="engineering-grid" />

      <div className="container-apex" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            marginBottom: '6rem',
            alignItems: 'end',
          }}
        >
          <div>
            <span className="text-label">05 / INNOVATION IN MOTION</span>
            <h2
              className="text-heading eng-heading"
              style={{ opacity: 0, marginTop: '2rem' }}
            >
              INNOVATION<br />
              <span style={{ WebkitTextStroke: '1px var(--apex-grey-400)', color: 'transparent' }}>IN MOTION.</span>
            </h2>
          </div>
          <p className="text-body" style={{ alignSelf: 'flex-end' }}>
            Four core technology systems, each engineered to solve a specific biomechanical challenge.
            Together they create a product designed around the physics of movement — not convention.
          </p>
        </div>

        {/* Technology grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1px',
            background: 'var(--apex-grey-200)',
            border: '1px solid var(--apex-grey-200)',
          }}
        >
          {TECHNOLOGIES.map((tech, i) => (
            <div
              key={tech.id}
              ref={(el) => { if (el) itemRefs.current[i] = el }}
              className="tech-card"
              style={{
                opacity: 0,
                background: 'var(--apex-black)',
              }}
            >
              {/* Number */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '3rem',
                    fontWeight: 700,
                    color: 'var(--apex-grey-200)',
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                  }}
                >
                  {tech.id}
                </span>
                <span className="text-label">{tech.short}</span>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  letterSpacing: '0.15em',
                  color: 'var(--apex-white)',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem',
                }}
              >
                {tech.title}
              </h3>

              {/* Detail */}
              <p className="text-body" style={{ marginBottom: '2rem' }}>
                {tech.detail}
              </p>

              {/* Spec */}
              <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--apex-grey-200)' }}>
                <span className="text-label">{tech.spec}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: '4rem',
            padding: '1.5rem 0',
            borderTop: '1px solid var(--apex-grey-200)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span className="text-label">ALL SPECIFICATIONS ARE CONCEPT TARGETS — NOT VALIDATED PERFORMANCE CLAIMS</span>
          <span className="text-label">APEX MOTION / 2026</span>
        </div>
      </div>
    </section>
  )
}
