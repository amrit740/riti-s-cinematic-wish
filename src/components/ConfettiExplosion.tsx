import { useEffect, useState, memo } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  delay: number;
  duration: number;
  shape: 'circle' | 'square' | 'heart';
}

interface ConfettiExplosionProps {
  isActive: boolean;
}

const colors = [
  'hsl(38, 95%, 60%)',   // Gold
  'hsl(350, 80%, 65%)',  // Rose
  'hsl(45, 90%, 70%)',   // Yellow
  'hsl(280, 60%, 65%)',  // Purple
  'hsl(180, 50%, 60%)',  // Teal
  'hsl(15, 85%, 60%)',   // Orange
];

const ConfettiExplosion = memo(({ isActive }: ConfettiExplosionProps) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (isActive) {
      // Initial burst with more pieces
      const createPieces = () => Array.from({ length: 80 }, (_, i) => ({
        id: Date.now() + i,
        x: 30 + Math.random() * 40,
        y: -5 - Math.random() * 10,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 12 + 5,
        delay: Math.random() * 0.8,
        duration: Math.random() * 3 + 4,
        shape: ['circle', 'square', 'heart'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'heart',
      }));
      
      setPieces(createPieces());

      // Add more confetti waves
      const interval = setInterval(() => {
        setPieces((prev) => [...prev.slice(-60), ...createPieces().slice(0, 30)]);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-30">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.shape !== 'heart' ? piece.color : 'transparent',
            borderRadius: piece.shape === 'circle' ? '50%' : '2px',
            transform: `rotate(${piece.rotation}deg)`,
            animation: `confettiFall ${piece.duration}s ease-out ${piece.delay}s forwards`,
          }}
        >
          {piece.shape === 'heart' && (
            <svg viewBox="0 0 24 24" fill={piece.color} className="w-full h-full">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          )}
        </div>
      ))}
    </div>
  );
});

ConfettiExplosion.displayName = 'ConfettiExplosion';

export default ConfettiExplosion;
