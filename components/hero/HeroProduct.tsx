'use client'

import { useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, ContactShadows, Float } from '@react-three/drei'
import * as THREE from 'three'

// ─── Placeholder shoe geometry (swap with real GLB later) ────────
function ApexR1Model({ cursorX, cursorY }: { cursorX: number; cursorY: number }) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()

    // Cursor influence
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      cursorX * 0.4,
      0.05
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      cursorY * 0.15,
      0.05
    )

    // Gentle floating
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.04
  })

  return (
    <group ref={groupRef} rotation={[0, -0.4, 0]} position={[0.4, -0.2, 0]}>
      {/* ── Sole ── */}
      <mesh position={[0, -0.32, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.14, 0.85]} />
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.3}
          metalness={0.05}
        />
      </mesh>

      {/* Sole tread details */}
      {[-0.7, -0.2, 0.3, 0.8].map((x, i) => (
        <mesh key={i} position={[x, -0.41, 0]} castShadow>
          <boxGeometry args={[0.28, 0.06, 0.9]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.8} />
        </mesh>
      ))}

      {/* ── Midsole foam ── */}
      <mesh position={[0, -0.18, 0]} castShadow>
        <boxGeometry args={[2.1, 0.2, 0.78]} />
        <meshStandardMaterial color="#e8e8e2" roughness={0.5} metalness={0.0} />
      </mesh>

      {/* Midsole accent stripe */}
      <mesh position={[0, -0.19, 0.38]} castShadow>
        <boxGeometry args={[2.1, 0.18, 0.04]} />
        <meshStandardMaterial color="#c41e3a" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* ── Upper body ── */}
      <mesh position={[-0.05, 0.08, 0]} castShadow>
        <boxGeometry args={[2.0, 0.52, 0.72]} />
        <meshStandardMaterial
          color="#f0f0eb"
          roughness={0.6}
          metalness={0.02}
          envMapIntensity={0.8}
        />
      </mesh>

      {/* Upper mesh texture layer */}
      <mesh position={[-0.05, 0.08, 0.35]}>
        <boxGeometry args={[1.9, 0.48, 0.02]} />
        <meshStandardMaterial
          color="#d8d8d3"
          roughness={0.9}
          metalness={0.0}
          transparent
          opacity={0.6}
          wireframe
        />
      </mesh>

      {/* ── Heel collar ── */}
      <mesh position={[-0.75, 0.18, 0]} castShadow>
        <boxGeometry args={[0.5, 0.62, 0.74]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.15} />
      </mesh>

      {/* ── Toe cap ── */}
      <mesh position={[0.92, 0.04, 0]} castShadow>
        <boxGeometry args={[0.34, 0.34, 0.70]} />
        <meshStandardMaterial color="#e8e8e2" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* ── Side panel ── */}
      <mesh position={[0.1, 0.1, -0.36]} castShadow>
        <boxGeometry args={[1.6, 0.4, 0.04]} />
        <meshStandardMaterial color="#c8c8c3" roughness={0.5} metalness={0.05} />
      </mesh>

      {/* ── APEX logo plate ── */}
      <mesh position={[0, 0.08, 0.37]} castShadow>
        <boxGeometry args={[0.6, 0.12, 0.01]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* ── Lace cage ── */}
      {[0.3, 0.55, 0.75].map((x, i) => (
        <mesh key={i} position={[x - 0.45, 0.28, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.65, 6]} />
          <meshStandardMaterial color="#c8c8c3" metalness={0.6} roughness={0.2} />
        </mesh>
      ))}

      {/* ── Carbon fibre plate (visible edge) ── */}
      <mesh position={[0, -0.06, 0]}>
        <boxGeometry args={[1.5, 0.04, 0.7]} />
        <meshStandardMaterial
          color="#2a2a2a"
          roughness={0.05}
          metalness={0.9}
          envMapIntensity={2}
        />
      </mesh>

      {/* ── Ankle collar ── */}
      <mesh position={[-0.6, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.32, 0.15, 12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* ── Outsole edge highlight ── */}
      <mesh position={[0, -0.39, 0]}>
        <boxGeometry args={[2.22, 0.02, 0.87]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.2} metalness={0.3} />
      </mesh>
    </group>
  )
}

// ─── Scene ────────────────────────────────────────────────────────
function HeroScene({ cursor }: { cursor: { x: number; y: number } }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={2.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        color="#ffffff"
      />
      <directionalLight position={[-4, 2, -4]} intensity={0.6} color="#a0c0ff" />
      <pointLight position={[0, 4, 2]} intensity={1.0} color="#fff5e0" />
      <spotLight position={[3, 6, 3]} angle={0.4} penumbra={0.5} intensity={1.5} castShadow />

      <Suspense fallback={null}>
        <Environment preset="city" />
        <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.15}>
          <ApexR1Model cursorX={cursor.x} cursorY={cursor.y} />
        </Float>
        <ContactShadows
          position={[0.4, -0.55, 0]}
          opacity={0.5}
          scale={4}
          blur={2.5}
          far={1}
          color="#000000"
        />
      </Suspense>
    </>
  )
}

// ─── Export ───────────────────────────────────────────────────────
export default function HeroProduct() {
  const cursor = useRef({ x: 0, y: 0 })
  const cursorState = { x: cursor.current.x, y: cursor.current.y }

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursor.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      cursor.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Cursor tracker that updates canvas every frame
  function CursorTracker() {
    const { gl } = useThree()
    useFrame(() => {
      // pass through — values read directly from ref in child
    })
    return null
  }

  return (
    <Canvas
      camera={{ position: [0, 0.2, 3.8], fov: 40 }}
      shadows="soft"
      dpr={[1, 2]}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
    >
      <HeroScene cursor={cursorState} />
    </Canvas>
  )
}
