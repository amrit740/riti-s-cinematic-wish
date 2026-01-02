import { useEffect, useState, useCallback, memo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  delay: number;
  duration: number;
  blur: number;
}

interface ParticleFieldProps {
  isActive: boolean;
  intensity?: 'low' | 'medium' | 'high';
  variant?: 'ambient' | 'celebration';
}

const colors = [
  'hsl(38, 90%, 70%)',   // Gold
  'hsl(350, 70%, 75%)',  // Rose
  'hsl(45, 80%, 80%)',   // Warm cream
  'hsl(32, 85%, 65%)',   // Amber
  'hsl(220, 60%, 70%)',  // Soft blue
];

const celebrationColors = [
  'hsl(38, 95%, 65%)',   // Bright gold
  'hsl(350, 80%, 70%)',  // Rose
  'hsl(280, 60%, 70%)',  // Lavender
  'hsl(180, 50%, 65%)',  // Teal
  'hsl(45, 90%, 75%)',   // Yellow
];

const ParticleField = memo(({ isActive, intensity = 'medium', variant = 'ambient' }: ParticleFieldProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  const generateParticles = useCallback(() => {
    const count = intensity === 'low' ? 20 : intensity === 'medium' ? 40 : 60;
    const colorPalette = variant === 'celebration' ? celebrationColors : colors;
    
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: variant === 'celebration' 
        ? Math.random() * 6 + 2 
        : Math.random() * 4 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 8,
      blur: Math.random() * 2,
    }));
  }, [intensity, variant]);

  useEffect(() => {
    if (isActive) {
      setParticles(generateParticles());
    }
  }, [isActive, generateParticles]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: 0,
            filter: `blur(${particle.blur}px)`,
            animation: `fadeIn 2s ease-out ${particle.delay}s forwards, floatParticle ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
        />
      ))}
    </div>
  );
});

ParticleField.displayName = 'ParticleField';

export default ParticleField;
