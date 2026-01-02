import { memo, useEffect, useState } from 'react';
import ritiPhoto1 from '@/assets/riti-photo-1.jpg';
import ritiPhoto2 from '@/assets/riti-photo-2.jpg';

interface PhotoRevealProps {
  isActive: boolean;
  delay?: number;
}

const PhotoReveal = memo(({ isActive, delay = 0 }: PhotoRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isActive, delay]);

  if (!isVisible) return null;

  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
      {/* First photo */}
      <div 
        className="relative group"
        style={{
          animation: 'scaleIn 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        }}
      >
        <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity" />
        <div className="relative overflow-hidden rounded-xl photo-glow">
          <img
            src={ritiPhoto1}
            alt="Riti"
            className="w-40 h-52 sm:w-48 sm:h-64 object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        </div>
      </div>

      {/* Second photo */}
      <div 
        className="relative group"
        style={{
          animation: 'scaleIn 1.5s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards',
          opacity: 0,
        }}
      >
        <div className="absolute -inset-2 bg-gradient-to-r from-secondary/30 via-primary/30 to-secondary/30 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity" />
        <div className="relative overflow-hidden rounded-xl photo-glow">
          <img
            src={ritiPhoto2}
            alt="Riti"
            className="w-40 h-52 sm:w-48 sm:h-64 object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        </div>
      </div>
    </div>
  );
});

PhotoReveal.displayName = 'PhotoReveal';

export default PhotoReveal;
