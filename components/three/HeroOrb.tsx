'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedOrb({ securityMode }: { securityMode: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          color={securityMode ? '#ff4d6d' : '#00f5d4'}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.85}
          wireframe={false}
        />
      </Sphere>

      {/* Inner glow sphere */}
      <Sphere args={[1.2, 32, 32]}>
        <meshBasicMaterial
          color={securityMode ? '#ff4d6d' : '#00f5d4'}
          transparent
          opacity={0.05}
          wireframe
        />
      </Sphere>
    </Float>
  );
}

function ParticleField() {
  const count = 200;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  const pointsRef = useRef<THREE.Points>(null!);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#00f5d4" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

interface HeroOrbProps {
  securityMode?: boolean;
}

export default function HeroOrb({ securityMode = false }: HeroOrbProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.2} />
      <pointLight
        position={[5, 5, 5]}
        intensity={2}
        color={securityMode ? '#ff4d6d' : '#00f5d4'}
      />
      <pointLight
        position={[-5, -5, -5]}
        intensity={1}
        color={securityMode ? '#ff7096' : '#4cc9f0'}
      />
      <AnimatedOrb securityMode={securityMode} />
      <ParticleField />
    </Canvas>
  );
}
