import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import * as THREE from 'three';

function FloatingCube() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color="#ff4ec3" 
          metalness={0.5} 
          roughness={0.2}
          emissive="#ff4ec3"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
}

function AnimatedStars() {
  const starsRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Stars
      ref={starsRef}
      radius={100}
      depth={50}
      count={5000}
      factor={4}
      saturation={0}
      fade
      speed={1}
    />
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Canvas className="absolute inset-0 z-0" camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <AnimatedStars />
        <FloatingCube />
      </Canvas>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <h1 className="text-6xl md:text-7xl font-bold text-neon-pink drop-shadow-neon mb-10 animate-fade-in-up">
          EduCreator
        </h1>

        <div className="grid md:grid-cols-2 gap-6 w-full max-w-6xl">
          <Tile title="🎓 Tokenized Student Creators" desc="Empower student creators to mint ERC-20 tokens using Zora Coins SDK. Fans can buy, hold, and support their favorite creators." />
          <Tile title="📚 NFT Marketplace for Learning" desc="Upload notes, cheat sheets, project templates, and sell them as NFTs. All securely stored via IPFS." />
          <Tile title="🔒 Token-Gated Access" desc="Enable fans to unlock premium content like private lectures, live sessions, or collabs using creator tokens." />
          <Tile title="🤝 DAO & Voting" desc="Launch project funding DAOs with community votes governed by token holders. Decentralize student innovation." />
        </div>

        <div className="mt-12">
          <Button className="px-6 py-3 text-lg bg-neon-blue hover:bg-neon-green rounded-2xl shadow-xl animate-pulse">
            Launch Your Creator Journey 🚀
          </Button>
        </div>
      </main>
    </div>
  );
}

function Tile({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-zinc-900/70 border border-neon-blue p-6 rounded-2xl shadow-glow transform transition-all hover:scale-105 hover:shadow-neon hover:border-neon-pink animate-float">
      <h2 className="text-xl font-semibold text-neon-yellow mb-2 animate-glow">{title}</h2>
      <p className="text-sm text-zinc-300">{desc}</p>
    </div>
  );
}

// Tailwind additions in tailwind.config.ts (include in your setup):
// colors: {
//   'neon-pink': '#ff4ec3',
//   'neon-blue': '#00f0ff',
//   'neon-yellow': '#ffe600',
//   'neon-green': '#39ff14'
// },
// boxShadow: {
//   neon: '0 0 15px #00f0ff',
//   glow: '0 0 10px rgba(255,255,255,0.3)',
// },
// animation: {
//   'fade-in-up': 'fadeInUp 1s ease-out both'
// },
// keyframes: {
//   fadeInUp: {
//     '0%': { opacity: 0, transform: 'translateY(20px)' },
//     '100%': { opacity: 1, transform: 'translateY(0)' }
//   }
// }
