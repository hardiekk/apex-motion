'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HOTSPOTS = [
  {
    id: '01',
    label: 'AERODYNAMIC UPPER',
    detail: 'Directional mesh channels airflow and provides structural support without unnecessary mass. Ventilation zones mapped to heat-generation data.',
    x: '62%',
    y: '28%',
  },
  {
    id: '02',
    label: 'CARBON-INFUSED MIDSOLE',
    detail: 'A rigid carbon composite plate redirects ground-reaction force into forward propulsion. 18% lighter than conventional foam-only midsole systems.',
    x: '50%',
    y: '62%',
  },
  {
    id: '03',
    label: 'PRECISION TRACTION SYSTEM',
    detail: 'Traction node geometry derived from cornering-force distribution analysis. Asymmetric lug pattern for independent grip zones.',
    x: '20%',
    y: '72%',
  },
  {
    id: '04',
    label: 'ENERGY RETURN CORE',
    detail: 'Dual-density foam matrix compressed under load, returning stored energy at peak stride extension. Target: 94% energy return coefficient.',
    x: '76%',
    y: '55%',
  },
]

export default function AnatomySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.anatomy-heading',
        { xPercent: -5, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.anatomy-heading', start: 'top 80%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const active = HOTSPOTS.find((h) => h.id === activeHotspot)

  return (
    <section
      id="anatomy"
      ref={sectionRef}
      className="section-padding"
      style={{ background: 'var(--apex-grey-100)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Engineering grid overlay */}
      <div className="engineering-grid" />

      <div className="container-apex" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
          <span className="text-label">03 / DESIGN ANATOMY</span>
          <h2 className="text-heading anatomy-heading" style={{ opacity: 0, marginTop: '2rem' }}>
            DESIGN<br />
            <span style={{ WebkitTextStroke: '1px var(--apex-grey-400)', color: 'transparent' }}>ANATOMY.</span>
          </h2>
        </div>

        {/* Main interactive area */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center',
          }}
        >
          {/* Product with hotspots */}
          <div
            style={{
              position: 'relative',
              aspectRatio: '1.2 / 1',
              background: 'var(--apex-black)',
              border: '1px solid var(--apex-grey-200)',
              overflow: 'hidden',
            }}
          >
            {/* Placeholder product silhouette */}
            <div
              style={{
                position: 'absolute',
                inset: '10%',
                background: 'var(--apex-grey-200)',
                clipPath: 'polygon(5% 80%, 15% 40%, 20% 35%, 28% 28%, 50% 22%, 70% 24%, 85% 30%, 92% 42%, 95% 58%, 90% 75%, 80% 82%, 60% 85%, 40% 85%, 20% 83%)',
                opacity: 0.4,
              }}
            />
            {/* Silhouette fill */}
            <div
              style={{
                position: 'absolute',
                inset: '10%',
                background: 'var(--apex-off-white)',
                clipPath: 'polygon(5% 80%, 15% 40%, 20% 35%, 28% 28%, 50% 22%, 70% 24%, 85% 30%, 92% 42%, 95% 58%, 90% 75%, 80% 82%, 60% 85%, 40% 85%, 20% 83%)',
                opacity: 0.06,
              }}
            />

            {/* Hotspots */}
            {HOTSPOTS.map((h) => (
              <button
                key={h.id}
                className="hotspot"
                style={{ left: h.x, top: h.y, transform: 'translate(-50%, -50%)', background: 'none', border: 'none' }}
                onClick={() => setActiveHotspot(activeHotspot === h.id ? null : h.id)}
                aria-label={h.label}
                aria-expanded={activeHotspot === h.id}
              >
                <div
                  className="hotspot-dot"
                  style={{
                    background: activeHotspot === h.id ? 'var(--apex-red)' : 'var(--apex-white)',
                    transform: activeHotspot === h.id ? 'scale(1.5)' : 'scale(1)',
                    transition: 'transform 0.3s, background 0.3s',
                  }}
                />
                {/* Connector line + label */}
                <div
                  className="text-label"
                  style={{
                    position: 'absolute',
                    whiteSpace: 'nowrap',
                    left: '1.5rem',
                    top: '-0.25rem',
                    opacity: activeHotspot === h.id ? 1 : 0,
                    transform: activeHotspot === h.id ? 'translateX(0)' : 'translateX(-8px)',
                    transition: 'opacity 0.3s, transform 0.3s',
                    pointerEvents: 'none',
                    color: 'var(--apex-white)',
                  }}
                >
                  {h.id} — {h.label}
                </div>
              </button>
            ))}

            {/* Monospace label bottom */}
            <div
              style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
              }}
            >
              <span className="text-label">APEX R1 — LATERAL VIEW</span>
            </div>
          </div>

          {/* Info panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {active ? (
              <div
                key={active.id}
                style={{
                  padding: '2.5rem',
                  background: 'var(--apex-black)',
                  border: '1px solid var(--apex-grey-200)',
                  borderLeft: '2px solid var(--apex-white)',
                }}
              >
                <span className="text-label" style={{ display: 'block', marginBottom: '1rem' }}>
                  COMPONENT {active.id}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.875rem',
                    letterSpacing: '0.1em',
                    color: 'var(--apex-white)',
                    textTransform: 'uppercase',
                    marginBottom: '1.25rem',
                  }}
                >
                  {active.label}
                </h3>
                <p className="text-body">{active.detail}</p>
              </div>
            ) : (
              <div style={{ padding: '2.5rem', border: '1px solid var(--apex-grey-200)' }}>
                <p className="text-body" style={{ fontStyle: 'italic' }}>
                  Select a hotspot to inspect the component.
                </p>
              </div>
            )}

            {/* All hotspot list */}
            {HOTSPOTS.map((h) => (
              <button
                key={h.id}
                onClick={() => setActiveHotspot(activeHotspot === h.id ? null : h.id)}
                style={{
                  background: 'none',
                  border: '1px solid var(--apex-grey-200)',
                  borderColor: activeHotspot === h.id ? 'var(--apex-grey-500)' : 'var(--apex-grey-200)',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  textAlign: 'left',
                  cursor: 'none',
                  transition: 'border-color 0.3s',
                }}
                aria-pressed={activeHotspot === h.id}
              >
                <span className="text-label" style={{ color: 'var(--apex-grey-400)', flexShrink: 0 }}>
                  {h.id}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: activeHotspot === h.id ? 'var(--apex-white)' : 'var(--apex-grey-500)',
                    transition: 'color 0.3s',
                  }}
                >
                  {h.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile fallback cards */}
      <style>{`
        @media (max-width: 768px) {
          .anatomy-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
