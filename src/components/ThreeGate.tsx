"use client";
import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Sphere, Float, Stars } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

export function ThreeGate({ onEnter, startAnimation }: { onEnter: () => void, startAnimation?: boolean }) {
  const { camera } = useThree();
  const particlesRef = useRef<THREE.Points>(null);

  // Generate thousands of floating gold dust particles
  const [positions, sizes] = useMemo(() => {
    const count = 3000;
    const pos = new Float32Array(count * 3);
    const size = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      size[i] = Math.random() * 1.5;
    }
    return [pos, size];
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      // Slow rotation for ambient feel
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  useEffect(() => {
    if (startAnimation) {
      // Camera flies forward through the particles
      gsap.to(camera.position, {
        z: -10,
        duration: 2.5,
        ease: "power3.inOut",
        onComplete: onEnter,
      });
    }
  }, [startAnimation, camera, onEnter]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#D8B77A" distance={10} />
      
      <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={sizes.length}
            array={sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#D8B77A"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
        <Sphere args={[0.5, 64, 64]} visible={false}>
          <meshBasicMaterial color="#D8B77A" wireframe />
        </Sphere>
      </Float>
    </>
  );
}
