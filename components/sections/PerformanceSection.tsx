'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const METRICS = [
  { value: 94, unit: '%', label: 'ENERGY RETURN', desc: 'Foam matrix return coefficient (design target)' },
  { value: 8.5, unit: '/10', label: 'STABILITY RATING', desc: 'Lateral support at high speed (concept spec)' },
  { value: 0.82, unit: '', label: 'TRACTION INDEX', desc: 'Grip coefficient on dry surface (design target)' },
  { value: 240, unit: 'g', label: 'PRODUCT WEIGHT', desc: 'Full shoe, size EU 42 (design target)' },
]

function CounterItem({ value, unit, label, desc, index }: {
  value: number; unit: string; label: string; desc: string; index: number
}) {
  const numRef = useRef<HTMLSpanElement>(null)
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rowRef.current,
        { yPercent: 30, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: rowRef.current, start: 'top 85%' },
          delay: index * 0.1,
        }
      )

      // Counter animation
      const obj = { val: 0 }
      gsap.to(obj, {
        val: value,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: rowRef.current, start: 'top 85%' },
        delay: index * 0.1,
        onUpdate: () => {
          if (!numRef.current) return
          numRef.current.textContent =
            value % 1 !== 0
              ? obj.val.toFixed(2)
              : Math.round(obj.val).toString()
        },
      })
    })

    return () => ctx.revert()
  }, [value, index])

  return (
    <div
      ref={rowRef}
      style={{
        opacity: 0,
        padding: '3rem 0',
        borderBottom: '1px solid var(--apex-grey-200)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '2rem',
        alignItems: 'end',
      }}
    >
      {/* Big number */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
        <span ref={numRef} className="perf-number">0</span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(1rem, 2vw, 1.75rem)',
            color: 'var(--apex-grey-500)',
            fontWeight: 400,
          }}
        >
          {unit}
        </span>
      </div>

      {/* Label */}
      <div>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            color: 'var(--apex-white)',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}
        >
          {label}
        </p>
        <p className="text-body" style={{ fontSize: '0.8125rem' }}>{desc}</p>
      </div>

      {/* Progress bar */}
      <div style={{ position: 'relative' }}>
        <div style={{ height: '1px', background: 'var(--apex-grey-200)', width: '100%' }} />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '1px',
            background: 'var(--apex-white)',
            width: `${Math.min(value, 100)}%`,
            transition: 'width 1.6s ease-out',
          }}
        />
      </div>
    </div>
  )
}

export default function PerformanceSection() {
  return (
    <section
      id="performance"
      className="section-padding"
      style={{ background: 'var(--apex-black)' }}
    >
      <div className="container-apex">
        {/* Header */}
        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <span className="text-label">07 / PERFORMANCE DATA</span>
            <h2 className="text-heading" style={{ marginTop: '1.5rem' }}>
              CONCEPT<br />
              <span style={{ WebkitTextStroke: '1px var(--apex-grey-400)', color: 'transparent' }}>SPECIFICATION.</span>
            </h2>
          </div>
          <div style={{ maxWidth: '24rem', textAlign: 'right' }}>
            <p className="text-body">
              All figures are design targets based on conceptual engineering simulations.
              They do not represent validated real-world performance data.
            </p>
          </div>
        </div>

        {/* Metrics */}
        <div style={{ marginTop: '4rem' }}>
          {METRICS.map((m, i) => (
            <CounterItem key={m.label} {...m} index={i} />
          ))}
        </div>

        {/* Disclaimer */}
        <div style={{ marginTop: '2rem' }}>
          <span className="text-label" style={{ color: 'var(--apex-grey-400)' }}>
            CONCEPT SPECIFICATION / DESIGN TARGET — NOT SCIENTIFICALLY VALIDATED
          </span>
        </div>
      </div>
    </section>
  )
}
