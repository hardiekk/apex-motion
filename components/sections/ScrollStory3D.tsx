'use client'

import { useRef, Suspense, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Shoe model reused from hero — same geometry
function StoryShoe() {
  const groupRef = useRef<THREE.Group>(null!)

  useEffect(() => {
    const el = groupRef.current
    if (!el) return

    const state = { rotY: -0.4, rotX: 0, posX: 0, posY: 0, scale: 1 }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#story',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      },
    })

    // Step 1: center → rotate lateral
    tl.to(state, { rotY: -Math.PI * 0.5, duration: 1 })
    // Step 2: move left
    tl.to(state, { posX: -0.8, posY: -0.1, duration: 1 })
    // Step 3: closer (scale), look at midsole
    tl.to(state, { scale: 1.4, rotX: 0.3, duration: 1 })
    // Step 4: rotate to bottom/sole
    tl.to(state, { rotX: Math.PI * 0.45, rotY: -Math.PI, duration: 1 })
    // Step 5: return to hero pose
    tl.to(state, { rotY: -0.4, rotX: 0, posX: 0, posY: 0, scale: 1, duration: 1 })

    const animate = () => {
      if (!groupRef.current) return
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.rotY, 0.08)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, state.rotX, 0.08)
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, state.posX, 0.06)
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, state.posY, 0.06)
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, state.scale, 0.06))
    }

    // Run on every RAF via GSAP ticker
    gsap.ticker.add(animate)
    return () => {
      gsap.ticker.remove(animate)
      tl.kill()
    }
  }, [])

  return (
    <group ref={groupRef} rotation={[0, -0.4, 0]} position={[0, -0.2, 0]}>
      {/* Sole */}
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
      {/* Midsole */}
      <mesh position={[0, -0.18, 0]} castShadow>
        <boxGeometry args={[2.1, 0.2, 0.78]} />
        <meshStandardMaterial color="#e8e8e2" roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.19, 0.38]}>
        <boxGeometry args={[2.1, 0.18, 0.04]} />
        <meshStandardMaterial color="#c41e3a" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Upper */}
      <mesh position={[-0.05, 0.08, 0]} castShadow>
        <boxGeometry args={[2.0, 0.52, 0.72]} />
        <meshStandardMaterial color="#f0f0eb" roughness={0.6} metalness={0.02} />
      </mesh>
      {/* Heel */}
      <mesh position={[-0.75, 0.18, 0]} castShadow>
        <boxGeometry args={[0.5, 0.62, 0.74]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Toe cap */}
      <mesh position={[0.92, 0.04, 0]} castShadow>
        <boxGeometry args={[0.34, 0.34, 0.70]} />
        <meshStandardMaterial color="#e8e8e2" roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Carbon plate */}
      <mesh position={[0, -0.06, 0]}>
        <boxGeometry args={[1.5, 0.04, 0.7]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.05} metalness={0.9} envMapIntensity={2} />
      </mesh>
      {/* Logo */}
      <mesh position={[0, 0.08, 0.37]}>
        <boxGeometry args={[0.6, 0.12, 0.01]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.9} />
      </mesh>
    </group>
  )
}

export default function ScrollStory3D() {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 4.2], fov: 42 }}
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
      style={{ background: 'var(--apex-grey-100)' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={2.2} castShadow />
      <directionalLight position={[-4, 2, -4]} intensity={0.5} color="#a0c0ff" />
      <pointLight position={[0, 4, 2]} intensity={0.8} color="#fff5e0" />
      <Suspense fallback={null}>
        <Environment preset="city" />
        <StoryShoe />
      </Suspense>
    </Canvas>
  )
}
