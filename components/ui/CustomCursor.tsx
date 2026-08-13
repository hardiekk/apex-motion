'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Check for touch/mobile
    if (window.matchMedia('(pointer: coarse)').matches) return

    let dotX = 0, dotY = 0
    let ringX = 0, ringY = 0

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX
      dotY = e.clientY
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    const tick = () => {
      ringX = ringX + (dotX - ringX) * 0.12
      ringY = ringY + (dotY - ringY) * 0.12

      dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
    }

    gsap.ticker.add(tick)

    // Expand ring on interactive elements
    const onEnter = () => {
      gsap.to(ring, { width: 56, height: 56, duration: 0.3, ease: 'power3.out' })
      gsap.to(dot, { opacity: 0, duration: 0.2 })
    }
    const onLeave = () => {
      gsap.to(ring, { width: 32, height: 32, duration: 0.3, ease: 'power3.out' })
      gsap.to(dot, { opacity: 1, duration: 0.2 })
    }

    const interactives = document.querySelectorAll('a, button, [data-cursor-hover]')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      gsap.ticker.remove(tick)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <div className="custom-cursor" aria-hidden="true">
      <div ref={dotRef} className="cursor-dot" style={{ position: 'fixed' }} />
      <div ref={ringRef} className="cursor-ring" style={{ position: 'fixed' }} />
    </div>
  )
}
