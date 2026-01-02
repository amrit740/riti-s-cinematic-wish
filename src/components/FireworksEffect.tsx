import { memo, useEffect, useState } from 'react';

interface Firework {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  delay: number;
}

interface Spark {
  id: number;
  angle: number;
  distance: number;
  color: string;
  size: number;
}

interface FireworksEffectProps {
  isActive: boolean;
}

const colors = [
  'hsl(38, 95%, 60%)',   // Gold
  'hsl(350, 80%, 65%)',  // Rose
  'hsl(45, 90%, 70%)',   // Yellow
  'hsl(280, 60%, 65%)',  // Purple
  'hsl(180, 50%, 60%)',  // Teal
  'hsl(15, 85%, 60%)',   // Orange
  'hsl(200, 80%, 60%)',  // Blue
];

const FireworkBurst = memo(({ firework }: { firework: Firework }) => {
  const sparks: Spark[] = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (360 / 12) * i,
    distance: 40 + Math.random() * 30,
    color: firework.color,
    size: 3 + Math.random() * 3,
  }));

  return (
    <div
      className="absolute"
      style={{
        left: `${firework.x}%`,
        top: `${firework.y}%`,
        animation: `fireworkAppear 0.1s ease-out ${firework.delay}s forwards`,
        opacity: 0,
      }}
    >
      {/* Center flash */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: firework.size * 2,
          height: firework.size * 2,
          backgroundColor: firework.color,
          boxShadow: `0 0 ${firework.size * 4}px ${firework.color}, 0 0 ${firework.size * 8}px ${firework.color}`,
          animation: `fireworkFlash 0.8s ease-out ${firework.delay}s forwards`,
        }}
      />
      
      {/* Sparks */}
      {sparks.map((spark) => (
        <div
          key={spark.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: spark.size,
            height: spark.size,
            backgroundColor: spark.color,
            boxShadow: `0 0 ${spark.size * 2}px ${spark.color}`,
            animation: `fireworkSpark 1.2s ease-out ${firework.delay}s forwards`,
            '--spark-x': `${Math.cos((spark.angle * Math.PI) / 180) * spark.distance}px`,
            '--spark-y': `${Math.sin((spark.angle * Math.PI) / 180) * spark.distance}px`,
          } as React.CSSProperties}
        />
      ))}

      {/* Trail particles */}
      {sparks.map((spark) => (
        <div
          key={`trail-${spark.id}`}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: spark.size * 0.5,
            height: spark.size * 0.5,
            backgroundColor: spark.color,
            opacity: 0.6,
            animation: `fireworkSpark 1s ease-out ${firework.delay + 0.1}s forwards`,
            '--spark-x': `${Math.cos((spark.angle * Math.PI) / 180) * spark.distance * 0.6}px`,
            '--spark-y': `${Math.sin((spark.angle * Math.PI) / 180) * spark.distance * 0.6}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
});

FireworkBurst.displayName = 'FireworkBurst';

const FireworksEffect = memo(({ isActive }: FireworksEffectProps) => {
  const [fireworks, setFireworks] = useState<Firework[]>([]);

  useEffect(() => {
    if (isActive) {
      // Initial burst
      const initialFireworks: Firework[] = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: 10 + Math.random() * 80,
        y: 15 + Math.random() * 40,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 8 + Math.random() * 8,
        delay: Math.random() * 0.8,
      }));
      setFireworks(initialFireworks);

      // Continuous fireworks
      const interval = setInterval(() => {
        const newFirework: Firework = {
          id: Date.now() + Math.random(),
          x: 10 + Math.random() * 80,
          y: 10 + Math.random() * 50,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 8 + Math.random() * 8,
          delay: 0,
        };
        setFireworks((prev) => [...prev.slice(-15), newFirework]);
      }, 600);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-25">
      {fireworks.map((firework) => (
        <FireworkBurst key={firework.id} firework={firework} />
      ))}
    </div>
  );
});

FireworksEffect.displayName = 'FireworksEffect';

export default FireworksEffect;
