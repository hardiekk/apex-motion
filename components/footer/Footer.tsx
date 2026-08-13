'use client'

import Link from 'next/link'

const FOOTER_LINKS = {
  product: ['The Apex', 'Engineering', 'Technology', 'Performance', '3D Explorer'],
  company: ['About', 'Story', 'Press', 'Careers', 'Contact'],
  legal: ['Privacy Policy', 'Terms of Use', 'Cookie Settings'],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        background: 'var(--apex-grey-100)',
        borderTop: '1px solid var(--apex-grey-200)',
      }}
    >
      {/* Main footer */}
      <div className="container-apex" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '4rem',
            marginBottom: '6rem',
          }}
        >
          {/* Brand */}
          <div>
            <Link href="/" className="nav-logo" style={{ fontSize: '1rem', letterSpacing: '0.2em', display: 'block', marginBottom: '1.5rem' }}>
              APEX MOTION
            </Link>
            <p className="text-body" style={{ maxWidth: '22rem', marginBottom: '2rem' }}>
              A fictional premium product concept. Engineered for forward motion.
              All specifications are design targets only.
            </p>
            {/* Social links */}
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['TW', 'IG', 'LI', 'YT'].map((s) => (
                <button
                  key={s}
                  className="nav-icon-btn"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.625rem',
                    letterSpacing: '0.1em',
                    padding: 0,
                    background: 'none',
                    border: 'none',
                  }}
                  aria-label={`Social: ${s}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Product links */}
          <div>
            <p className="text-label" style={{ color: 'var(--apex-white)', marginBottom: '1.5rem' }}>PRODUCT</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {FOOTER_LINKS.product.map((l) => (
                <li key={l}>
                  <a href="#hero" className="text-body" style={{ textDecoration: 'none', transition: 'color 0.3s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--apex-white)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <p className="text-label" style={{ color: 'var(--apex-white)', marginBottom: '1.5rem' }}>COMPANY</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {FOOTER_LINKS.company.map((l) => (
                <li key={l}>
                  <a href="#hero" className="text-body" style={{ textDecoration: 'none', transition: 'color 0.3s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--apex-white)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <p className="text-label" style={{ color: 'var(--apex-white)', marginBottom: '1.5rem' }}>LEGAL</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {FOOTER_LINKS.legal.map((l) => (
                <li key={l}>
                  <a href="#hero" className="text-body" style={{ textDecoration: 'none', transition: 'color 0.3s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--apex-white)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Large brand mark */}
        <div
          style={{
            paddingTop: '4rem',
            borderTop: '1px solid var(--apex-grey-200)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 'clamp(3rem, 10vw, 9rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                color: 'var(--apex-grey-200)',
                lineHeight: 0.9,
                userSelect: 'none',
              }}
            >
              APEX<br />MOTION
            </div>
          </div>

          <div style={{ textAlign: 'right', paddingBottom: '0.5rem' }}>
            <p className="text-label">© {year} APEX MOTION</p>
            <p className="text-label" style={{ marginTop: '0.5rem' }}>FICTIONAL CONCEPT BRAND</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
