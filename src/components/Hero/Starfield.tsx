import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const randomInSphere = (count: number, radius: number) => {
  const positions = new Float32Array(count * 3);
  const r = radius;
  
  for (let i = 0; i < count; i++) {
    const theta = 2 * Math.PI * Math.random();
    const phi = Math.acos(2 * Math.random() - 1);
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
    
    positions[i * 3] = x * (0.5 + Math.random() * 0.5);
    positions[i * 3 + 1] = y * (0.5 + Math.random() * 0.5);
    positions[i * 3 + 2] = z * (0.5 + Math.random() * 0.5);
  }
  
  return positions;
};

function Stars() {
  const ref = useRef<THREE.Points>(null);
  const positions = React.useMemo(() => randomInSphere(5000, 1.5), []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.05;
      ref.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.005}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

const Starfield: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ambientLight intensity={0.5} />
        <Stars />
      </Canvas>
    </div>
  );
};

export default Starfield;