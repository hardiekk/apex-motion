'use client'

import { Suspense, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

const ProductExplorer3D = dynamic(() => import('./ProductExplorer3D'), { ssr: false })

export default function ProductExplorer() {
  const [webglSupported] = useState(() => {
    if (typeof window === 'undefined') return true
    try {
      const canvas = document.createElement('canvas')
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      )
    } catch {
      return false
    }
  })

  return (
    <section
      id="explorer"
      className="section-padding"
      style={{
        background: 'var(--apex-black)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container-apex">
        {/* Header */}
        <div style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <span className="text-label">04 / 3D PRODUCT EXPLORER</span>
            <h2 className="text-heading" style={{ marginTop: '1.5rem' }}>
              EXPLORE
              <br />
              EVERY ANGLE.
            </h2>
          </div>
          <div className="drag-hint" style={{ alignSelf: 'flex-end' }}>
            <div className="drag-hint-line" />
            DRAG TO EXPLORE
            <div className="drag-hint-line" />
          </div>
        </div>
      </div>

      {/* 3D viewer */}
      <div
        style={{
          height: '75vh',
          background: 'var(--apex-grey-100)',
          border: '1px solid var(--apex-grey-200)',
          position: 'relative',
          overflow: 'hidden',
          margin: '0 clamp(1.5rem, 4vw, 5rem)',
        }}
      >
        {webglSupported ? (
          <Suspense
            fallback={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <span className="text-label">LOADING PRODUCT...</span>
              </div>
            }
          >
            <ProductExplorer3D />
          </Suspense>
        ) : (
          /* Fallback for no-WebGL */
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column', gap: '1rem' }}>
            <span className="text-label">INTERACTIVE 3D NOT AVAILABLE</span>
            <p className="text-body" style={{ textAlign: 'center', maxWidth: '24rem' }}>
              Your browser does not support WebGL. View the APEX R1 through our editorial photography below.
            </p>
          </div>
        )}

        {/* Corner labels */}
        <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem' }}>
          <span className="text-label">APEX R1 — INTERACTIVE VIEW</span>
        </div>
        <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem' }}>
          <span className="text-label">CONCEPT DESIGN / NOT FINAL PRODUCT</span>
        </div>
      </div>

      {/* Spec strip */}
      <div className="container-apex">
        <div
          style={{
            marginTop: '4rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '0',
            borderTop: '1px solid var(--apex-grey-200)',
            borderBottom: '1px solid var(--apex-grey-200)',
          }}
        >
          {[
            { label: 'WEIGHT', value: '240g' },
            { label: 'UPPER', value: 'AIR MESH' },
            { label: 'MIDSOLE', value: 'CARBON R-FOAM' },
            { label: 'OUTSOLE', value: 'VULC-GRIP' },
            { label: 'DROP', value: '6mm' },
          ].map((spec, i, arr) => (
            <div
              key={spec.label}
              style={{
                padding: '1.75rem 0',
                borderRight: i < arr.length - 1 ? '1px solid var(--apex-grey-200)' : 'none',
                paddingLeft: i > 0 ? '2rem' : '0',
                paddingRight: i < arr.length - 1 ? '2rem' : '0',
              }}
            >
              <div className="text-label" style={{ marginBottom: '0.5rem' }}>{spec.label}</div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.125rem',
                  color: 'var(--apex-white)',
                  letterSpacing: '0.05em',
                }}
              >
                {spec.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
