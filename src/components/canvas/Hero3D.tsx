"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial, OrbitControls, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { random } from "maath";

function StarField() {
  const ref = useRef<THREE.Points>(null);
  const sphere = useMemo(
    () => random.inSphere(new Float32Array(3000), { radius: 4 }),
    []
  );

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 30;
    }
  });

  return (
    <Points
      ref={ref}
      positions={sphere as Float32Array}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#a78bfa"
        size={0.004}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

function FloatingOrb() {
  const mesh1 = useRef<THREE.Mesh>(null);
  const mesh2 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (mesh1.current) {
      mesh1.current.rotation.x = clock.getElapsedTime() * 0.15;
      mesh1.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group>
      {/* Main distorted sphere */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
        <mesh ref={mesh1}>
          <sphereGeometry args={[1.2, 64, 64]} />
          <MeshDistortMaterial
            color="#6366f1"
            attach="material"
            distort={0.5}
            speed={2}
            roughness={0.1}
            metalness={0.8}
            wireframe={false}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Outer wireframe ring */}
        <mesh ref={mesh2} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.8, 0.008, 16, 80]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.6} />
        </mesh>

        {/* Second ring */}
        <mesh rotation={[-Math.PI / 6, Math.PI / 4, 0]}>
          <torusGeometry args={[2.1, 0.005, 16, 80]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.4} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#10b981" />
      <StarField />
      <FloatingOrb />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}
