'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface NavLink {
  label: string
  href: string
}

interface MobileMenuProps {
  links: NavLink[]
  isOpen: boolean
  onClose: () => void
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void
}

export default function MobileMenu({ links, isOpen, onClose, onNavClick }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLLIElement[]>([])

  useEffect(() => {
    if (!menuRef.current) return
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      gsap.fromTo(
        linksRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.07,
          ease: 'power3.out',
          delay: 0.2,
        }
      )
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <div
      ref={menuRef}
      className={`mobile-menu ${isOpen ? 'open' : ''}`}
      aria-hidden={!isOpen}
      role="dialog"
      aria-label="Mobile navigation"
    >
      <ul className="mobile-menu-links" role="list">
        {links.map((link, i) => (
          <li
            key={link.href}
            ref={(el) => { if (el) linksRef.current[i] = el }}
            style={{ opacity: 0 }}
          >
            <a
              href={link.href}
              className="mobile-menu-link"
              onClick={(e) => onNavClick(e, link.href)}
              tabIndex={isOpen ? 0 : -1}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 'auto', paddingBottom: '2rem' }}>
        <p className="text-label">ENGINEERED FOR THE NEXT MOVE.</p>
      </div>
    </div>
  )
}
