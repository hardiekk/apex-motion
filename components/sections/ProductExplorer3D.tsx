'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei'
import * as THREE from 'three'

function ExplorerShoe() {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (!groupRef.current) return
    // Very subtle idle drift
    groupRef.current.rotation.y += 0.0008
  })

  return (
    <group ref={groupRef} scale={1.2}>
      {/* ── Sole ── */}
      <mesh position={[0, -0.32, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.14, 0.85]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.05} />
      </mesh>
      {[-0.7, -0.2, 0.3, 0.8].map((x, i) => (
        <mesh key={i} position={[x, -0.41, 0]}>
          <boxGeometry args={[0.28, 0.06, 0.9]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.8} />
        </mesh>
      ))}

      {/* ── Midsole ── */}
      <mesh position={[0, -0.18, 0]} castShadow>
        <boxGeometry args={[2.1, 0.2, 0.78]} />
        <meshStandardMaterial color="#e8e8e2" roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.19, 0.38]}>
        <boxGeometry args={[2.1, 0.18, 0.04]} />
        <meshStandardMaterial color="#c41e3a" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* ── Upper ── */}
      <mesh position={[-0.05, 0.08, 0]} castShadow>
        <boxGeometry args={[2.0, 0.52, 0.72]} />
        <meshStandardMaterial color="#f0f0eb" roughness={0.6} metalness={0.02} envMapIntensity={1} />
      </mesh>
      <mesh position={[-0.05, 0.08, 0.35]}>
        <boxGeometry args={[1.9, 0.48, 0.02]} />
        <meshStandardMaterial color="#d8d8d3" roughness={0.9} transparent opacity={0.5} wireframe />
      </mesh>

      {/* ── Heel ── */}
      <mesh position={[-0.75, 0.18, 0]} castShadow>
        <boxGeometry args={[0.5, 0.62, 0.74]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* ── Toe cap ── */}
      <mesh position={[0.92, 0.04, 0]} castShadow>
        <boxGeometry args={[0.34, 0.34, 0.70]} />
        <meshStandardMaterial color="#e8e8e2" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* ── Logo plate ── */}
      <mesh position={[0, 0.08, 0.37]}>
        <boxGeometry args={[0.6, 0.12, 0.01]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* ── Laces ── */}
      {[0.3, 0.55, 0.75].map((x, i) => (
        <mesh key={i} position={[x - 0.45, 0.28, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.65, 6]} />
          <meshStandardMaterial color="#c8c8c3" metalness={0.6} roughness={0.2} />
        </mesh>
      ))}

      {/* ── Carbon plate ── */}
      <mesh position={[0, -0.06, 0]}>
        <boxGeometry args={[1.5, 0.04, 0.7]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.05} metalness={0.9} envMapIntensity={2} />
      </mesh>

      {/* ── Ankle collar ── */}
      <mesh position={[-0.6, 0.35, 0]}>
        <cylinderGeometry args={[0.28, 0.32, 0.15, 12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.1} />
      </mesh>
    </group>
  )
}

export default function ProductExplorer3D() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 4.5], fov: 38 }}
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true }}
      style={{ background: 'var(--apex-grey-100)' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={2.5} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <directionalLight position={[-4, 3, -4]} intensity={0.6} color="#a0c0ff" />
      <pointLight position={[0, 5, 2]} intensity={0.8} color="#fff5e0" />

      <Suspense fallback={null}>
        <Environment preset="warehouse" />
        <ExplorerShoe />
        <ContactShadows position={[0, -0.48, 0]} opacity={0.4} scale={5} blur={2} color="#000000" />
      </Suspense>

      <OrbitControls
        enableZoom
        enablePan={false}
        minDistance={2.5}
        maxDistance={7}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 4}
        autoRotate={false}
        dampingFactor={0.05}
        enableDamping
      />
    </Canvas>
  )
}
