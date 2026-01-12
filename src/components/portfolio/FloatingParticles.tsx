import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const FloatingParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate random particles
  const particles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.3 + 0.1,
  }));

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Animated grain overlay */}
      <div className="absolute inset-0 opacity-[0.015]">
        <svg className="w-full h-full">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Larger accent orbs */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-primary/5 blur-3xl"
        style={{ left: "10%", top: "20%" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-48 h-48 rounded-full bg-secondary/5 blur-3xl"
        style={{ right: "15%", bottom: "30%" }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          delay: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-primary/10 blur-2xl"
        style={{ left: "60%", top: "10%" }}
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 12,
          delay: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default FloatingParticles;
