# APEX MOTION — Premium 3D Interactive Product Website

A production-ready, premium 3D interactive product website built for the fictional **APEX MOTION** brand, featuring the **APEX R1** — engineered for the next move.

---

## Overview

This is a cinematic motorsport-inspired product experience featuring:

- **Cinematic preloader** with animated counter
- **Custom cursor** with smooth follower ring
- **3D interactive product** with cursor-responsive rotation and floating animation
- **Lenis smooth scrolling** synchronized with GSAP ScrollTrigger
- **Interactive product anatomy** with clickable hotspots
- **Scroll-driven 3D storytelling** — shoe rotates and transforms as you scroll
- **Animated performance metrics** with number counters
- **Engineering technology** grid with hover reveal effects
- **Gallery** with clip-path reveal animations
- **Magnetic CTA button** with elastic effect

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| Three.js + React Three Fiber | 3D rendering |
| @react-three/drei | 3D helpers |
| GSAP + ScrollTrigger | Animations |
| Lenis | Smooth scrolling |
| Lucide React | Icons |
| Space Grotesk + Space Mono | Typography |

---

## Installation

```bash
# Navigate to the project directory
cd "apex-motion"

# Install dependencies
npm install
```

---

## Development

```bash
export PATH="/Users/kunalkakde/.openclaw/tools/node-v22.22.0/bin:$PATH"
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

> **Note:** If Node.js is installed globally, simply run `npm run dev`.

---

## Production Build

```bash
npm run build
npm run start
```

---

## Deployment on Vercel

### Option 1 — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option 2 — GitHub → Vercel Dashboard

1. Push to a GitHub repository
2. Import at [vercel.com/new](https://vercel.com/new)
3. Set framework preset to **Next.js**
4. Deploy — no environment variables required

### Important Vercel Notes

- No secret API keys required
- No custom environment variables needed
- The `public/` folder assets are automatically served
- Build command: `npm run build`
- Output directory: `.next` (auto-detected)

---

## 3D Model — How to Replace the Placeholder

The current 3D product is a **clean geometric placeholder** built from Three.js primitives. It accurately represents the shoe's silhouette but is not a real product model.

### To replace with a real GLB model:

1. **Place your model file here:**
   ```
   public/models/apex-r1.glb
   ```

2. **Update the Hero model** in [`components/hero/HeroProduct.tsx`](components/hero/HeroProduct.tsx):
   ```tsx
   // Replace the ApexR1Model function with:
   import { useGLTF } from '@react-three/drei'
   
   function ApexR1Model({ cursorX, cursorY }) {
     const { scene } = useGLTF('/models/apex-r1.glb')
     const groupRef = useRef()
     
     useFrame((state) => {
       // Keep existing cursor/floating animation logic
       groupRef.current.rotation.y = THREE.MathUtils.lerp(
         groupRef.current.rotation.y,
         cursorX * 0.4,
         0.05
       )
     })
     
     return <primitive ref={groupRef} object={scene} />
   }
   ```

3. **Repeat for the Explorer** in [`components/sections/ProductExplorer3D.tsx`](components/sections/ProductExplorer3D.tsx) and **Scroll Story** in [`components/sections/ScrollStory3D.tsx`](components/sections/ScrollStory3D.tsx)

4. **Recommended model specs:**
   - Format: GLB (preferred) or GLTF
   - Compression: Draco or Meshopt (reduces file size ~70%)
   - Polygon count: Under 50,000 triangles for performance
   - Texture resolution: Max 2048×2048
   - PBR materials recommended

5. **Compress your GLB:**
   ```bash
   npx gltf-pipeline -i apex-r1.glb -o apex-r1-compressed.glb --draco.compressionLevel 10
   ```

---

## Project Structure

```
apex-motion/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Main page composition
│   └── globals.css         # Design tokens, base styles, animations
│
├── components/
│   ├── preloader/
│   │   └── Preloader.tsx   # Cinematic loading screen
│   ├── navigation/
│   │   ├── Navbar.tsx      # Fixed navigation
│   │   └── MobileMenu.tsx  # Animated mobile menu
│   ├── hero/
│   │   ├── Hero.tsx        # Hero section
│   │   └── HeroProduct.tsx # 3D product canvas (replace model here)
│   ├── sections/
│   │   ├── ApexSection.tsx         # Brand philosophy
│   │   ├── AnatomySection.tsx      # Interactive hotspots
│   │   ├── ProductExplorer.tsx     # 3D explorer wrapper
│   │   ├── ProductExplorer3D.tsx   # 3D explorer canvas
│   │   ├── EngineeringSection.tsx  # Technology cards
│   │   ├── ScrollStory.tsx         # Scroll story wrapper
│   │   ├── ScrollStory3D.tsx       # Scroll-driven 3D canvas
│   │   ├── PerformanceSection.tsx  # Animated metrics
│   │   ├── GallerySection.tsx      # Visual showcase
│   │   └── FinalCTA.tsx            # Final call to action
│   ├── footer/
│   │   └── Footer.tsx      # Premium footer
│   └── ui/
│       ├── CustomCursor.tsx        # Custom cursor
│       └── SmoothScrollProvider.tsx # Lenis + GSAP sync
│
├── public/
│   └── models/
│       └── README.md       # Place apex-r1.glb here
│
└── next.config.ts          # Next.js configuration
```

---

## Performance Notes

- 3D canvases use `dynamic` imports to prevent SSR issues
- Device pixel ratio capped at `[1, 2]` for performance
- WebGL fallback gracefully shown if unavailable
- `prefers-reduced-motion` respected globally
- Lenis smooth scroll is disabled on reduced-motion preference
- GSAP contexts properly cleaned up on component unmount

---

## Accessibility

- Semantic HTML throughout
- All interactive elements have `aria-label` attributes
- Hotspot buttons use `aria-expanded` / `aria-pressed`
- Focus states visible
- High contrast text on dark backgrounds
- Custom cursor hidden on touch devices

---

## License

Fictional concept brand — APEX MOTION. All product specifications are design targets only and do not represent real-world validated performance claims.
