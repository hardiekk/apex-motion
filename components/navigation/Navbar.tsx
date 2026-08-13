'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Search, ShoppingBag, Menu, X } from 'lucide-react'
import MobileMenu from './MobileMenu'

const NAV_LINKS = [
  { label: 'THE APEX', href: '#apex' },
  { label: 'ANATOMY', href: '#anatomy' },
  { label: 'ENGINEERING', href: '#engineering' },
  { label: 'PERFORMANCE', href: '#performance' },
  { label: 'STORY', href: '#story' },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  return (
    <>
      <nav ref={navRef} className={`nav-root ${scrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" className="nav-logo" aria-label="APEX MOTION home">
          APEX MOTION
        </Link>

        {/* Desktop links */}
        <ul className="nav-links" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-link"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="nav-actions">
          <button className="nav-icon-btn" aria-label="Search">
            <Search size={16} />
          </button>
          <button className="nav-icon-btn" aria-label="Shopping bag">
            <ShoppingBag size={16} />
          </button>
          <button
            className="nav-icon-btn nav-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <MobileMenu
        links={NAV_LINKS}
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavClick={handleNavClick}
      />
    </>
  )
}
