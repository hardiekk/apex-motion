'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PHILOSOPHY = [
  {
    num: '01',
    title: 'FORWARD PROPULSION',
    body: 'Every geometry is resolved around a single axis: forward. The APEX R1 transfers energy with minimal loss, accelerating your natural biomechanics.',
  },
  {
    num: '02',
    title: 'MATERIALS ENGINEERING',
    body: 'Aerospace-grade composites meet technical textiles. Each layer is selected for weight, stiffness, and thermal response — not aesthetics alone.',
  },
  {
    num: '03',
    title: 'DATA-DRIVEN FORM',
    body: 'Proportions, flex zones, and traction patterns are derived from motion data, not assumption. Form follows function — rigorously.',
  },
]

export default function ApexSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      // Heading split reveal
      gsap.fromTo(
        headingRef.current,
        { yPercent: 15, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
          },
        }
      )

      // Items stagger
      itemsRef.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
            },
            delay: i * 0.1,
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="apex" ref={sectionRef} className="section-padding" style={{ background: 'var(--apex-black)' }}>
      <div className="container-apex">
        {/* Top line */}
        <div className="line-horizontal" style={{ marginBottom: '4rem' }} />

        {/* Section label */}
        <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span className="text-label">02 / THE APEX</span>
          <span className="text-label" style={{ maxWidth: '20rem', textAlign: 'right' }}>
            A PRODUCT PHILOSOPHY BUILT ON PRECISION ENGINEERING
          </span>
        </div>

        {/* Massive heading */}
        <div ref={headingRef} style={{ opacity: 0, marginBottom: '6rem' }}>
          <h2 className="text-display" style={{ lineHeight: 0.88 }}>
            THE<br />
            APEX<br />
            <span style={{ WebkitTextStroke: '1px var(--apex-grey-300)', color: 'transparent' }}>STANDARD.</span>
          </h2>
        </div>

        {/* Philosophy items */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '0',
            borderTop: '1px solid var(--apex-grey-200)',
          }}
        >
          {PHILOSOPHY.map((item, i) => (
            <div
              key={item.num}
              ref={(el) => { if (el) itemsRef.current[i] = el }}
              style={{
                opacity: 0,
                padding: '3rem 2.5rem 3rem 0',
                borderRight: i < PHILOSOPHY.length - 1 ? '1px solid var(--apex-grey-200)' : 'none',
                paddingRight: i < PHILOSOPHY.length - 1 ? '2.5rem' : '0',
                paddingLeft: i > 0 ? '2.5rem' : '0',
              }}
            >
              <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                <span className="text-label" style={{ color: 'var(--apex-grey-400)' }}>{item.num}</span>
                <div className="line-accent" />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  color: 'var(--apex-white)',
                  marginBottom: '1.25rem',
                  textTransform: 'uppercase',
                }}
              >
                {item.title}
              </h3>
              <p className="text-body">{item.body}</p>
            </div>
          ))}
        </div>

        {/* Large pull-quote */}
        <div
          style={{
            marginTop: '8rem',
            paddingTop: '4rem',
            borderTop: '1px solid var(--apex-grey-200)',
          }}
        >
          <blockquote
            className="text-subheading"
            style={{
              maxWidth: '50rem',
              color: 'var(--apex-grey-600)',
              fontStyle: 'normal',
              fontWeight: 300,
              letterSpacing: '-0.02em',
            }}
          >
            &ldquo;Not designed to look fast.
            <br />
            <span style={{ color: 'var(--apex-white)', fontWeight: 600 }}>Designed to be fast.&rdquo;</span>
          </blockquote>
          <div style={{ marginTop: '1.5rem' }}>
            <span className="text-label">— APEX MOTION DESIGN BRIEF, 2026</span>
          </div>
        </div>
      </div>
    </section>
  )
}
