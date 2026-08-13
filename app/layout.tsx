import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'APEX MOTION — Engineered for the Next Move',
  description: 'A premium interactive product experience exploring the APEX R1 through 3D engineering, design and motion.',
  keywords: ['APEX MOTION', 'APEX R1', 'premium footwear', 'motorsport design', 'interactive 3D'],
  authors: [{ name: 'APEX MOTION' }],
  openGraph: {
    title: 'APEX MOTION — Engineered for the Next Move',
    description: 'A premium interactive product experience exploring the APEX R1 through 3D engineering, design and motion.',
    type: 'website',
    siteName: 'APEX MOTION',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'APEX MOTION — Engineered for the Next Move',
    description: 'A premium interactive product experience exploring the APEX R1 through 3D engineering, design and motion.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
