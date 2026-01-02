import { memo, useEffect, useState } from 'react';

interface BirthdayCakeProps {
  isActive: boolean;
  delay?: number;
}

const BirthdayCake = memo(({ isActive, delay = 0 }: BirthdayCakeProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isActive, delay]);

  if (!isVisible) return null;

  return (
    <div 
      className="relative flex justify-center items-center mt-8"
      style={{
        animation: 'scaleIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      }}
    >
      {/* Glow behind cake */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div 
          className="w-32 h-32 rounded-full bg-primary/20 blur-3xl"
          style={{ animation: 'pulseGlow 3s ease-in-out infinite' }}
        />
      </div>
      
      {/* Cake SVG */}
      <svg 
        width="120" 
        height="120" 
        viewBox="0 0 120 120" 
        fill="none"
        className="relative z-10"
      >
        {/* Cake base */}
        <rect x="20" y="60" width="80" height="50" rx="8" fill="hsl(350, 60%, 55%)" />
        <rect x="25" y="60" width="70" height="8" fill="hsl(350, 70%, 65%)" />
        
        {/* Frosting drips */}
        <path d="M25 60 Q28 70 25 68 L25 60" fill="hsl(45, 90%, 75%)" />
        <path d="M45 60 Q48 75 45 72 L45 60" fill="hsl(45, 90%, 75%)" />
        <path d="M65 60 Q68 68 65 65 L65 60" fill="hsl(45, 90%, 75%)" />
        <path d="M85 60 Q88 73 85 70 L85 60" fill="hsl(45, 90%, 75%)" />
        
        {/* Middle layer */}
        <rect x="28" y="45" width="64" height="18" rx="6" fill="hsl(32, 80%, 55%)" />
        <rect x="32" y="45" width="56" height="5" fill="hsl(32, 90%, 65%)" />
        
        {/* Top layer */}
        <rect x="35" y="30" width="50" height="18" rx="5" fill="hsl(350, 65%, 60%)" />
        <rect x="38" y="30" width="44" height="5" fill="hsl(350, 75%, 70%)" />
        
        {/* Candles */}
        <rect x="45" y="15" width="4" height="18" rx="2" fill="hsl(180, 60%, 70%)" />
        <rect x="58" y="15" width="4" height="18" rx="2" fill="hsl(280, 60%, 70%)" />
        <rect x="71" y="15" width="4" height="18" rx="2" fill="hsl(38, 90%, 65%)" />
        
        {/* Flames */}
        <ellipse cx="47" cy="10" rx="4" ry="6" fill="hsl(38, 100%, 60%)">
          <animate attributeName="ry" values="6;7;5;6" dur="0.5s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="47" cy="9" rx="2" ry="3" fill="hsl(45, 100%, 80%)">
          <animate attributeName="ry" values="3;4;2;3" dur="0.4s" repeatCount="indefinite" />
        </ellipse>
        
        <ellipse cx="60" cy="10" rx="4" ry="6" fill="hsl(38, 100%, 60%)">
          <animate attributeName="ry" values="5;6;7;5" dur="0.6s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="60" cy="9" rx="2" ry="3" fill="hsl(45, 100%, 80%)">
          <animate attributeName="ry" values="2;3;4;2" dur="0.5s" repeatCount="indefinite" />
        </ellipse>
        
        <ellipse cx="73" cy="10" rx="4" ry="6" fill="hsl(38, 100%, 60%)">
          <animate attributeName="ry" values="7;5;6;7" dur="0.45s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="73" cy="9" rx="2" ry="3" fill="hsl(45, 100%, 80%)">
          <animate attributeName="ry" values="4;2;3;4" dur="0.35s" repeatCount="indefinite" />
        </ellipse>
        
        {/* Decorations */}
        <circle cx="35" cy="75" r="3" fill="hsl(45, 90%, 70%)" />
        <circle cx="50" cy="85" r="2" fill="hsl(180, 60%, 65%)" />
        <circle cx="70" cy="80" r="2.5" fill="hsl(280, 60%, 65%)" />
        <circle cx="85" cy="70" r="3" fill="hsl(45, 90%, 70%)" />
      </svg>
    </div>
  );
});

BirthdayCake.displayName = 'BirthdayCake';

export default BirthdayCake;
