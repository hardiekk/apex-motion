'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)
  const barFillRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      onComplete()
      return
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
          onComplete: onComplete,
        })
      },
    })

    // Logo fade in
    tl.fromTo(logoRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 })

    // Bar fill + counter
    tl.to(barFillRef.current, {
      scaleX: 1,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: function () {
        const p = Math.round(this.progress() * 100)
        setCount(p)
      },
    }, 0.2)

    tl.to({}, { duration: 0.3 }) // brief pause

    return () => { tl.kill() }
  }, [onComplete])

  return (
    <div ref={containerRef} className="preloader">
      <div ref={logoRef} className="preloader-brand" style={{ opacity: 0 }}>
        APEX MOTION / R1
      </div>

      <div ref={counterRef} className="preloader-counter">
        {String(count).padStart(2, '0')}
      </div>

      <div className="preloader-bar">
        <div ref={barFillRef} className="preloader-bar-fill" style={{ transform: 'scaleX(0)' }} />
      </div>

      <div className="text-label" style={{ position: 'absolute', bottom: '2.5rem', right: 'clamp(1.5rem,4vw,5rem)' }}>
        LOADING EXPERIENCE
      </div>
    </div>
  )
}
