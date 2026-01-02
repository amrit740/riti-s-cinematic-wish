import { memo, useEffect, useState } from 'react';
import ritiPhoto1 from '@/assets/riti-photo-1.jpg';
import ritiPhoto2 from '@/assets/riti-photo-2.jpg';

interface PhotoRevealProps {
  isActive: boolean;
  delay?: number;
}

const PhotoReveal = memo(({ isActive, delay = 0 }: PhotoRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isActive, delay]);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActivePhoto((prev) => (prev + 1) % 2);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const photos = [ritiPhoto1, ritiPhoto2];

  return (
    <div className="relative mt-12 mb-8">
      {/* Floating photo gallery */}
      <div 
        className="relative w-72 h-80 sm:w-80 sm:h-96 mx-auto"
        style={{
          animation: 'scaleIn 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
          perspective: '1000px',
        }}
      >
        {/* Decorative frame glow */}
        <div className="absolute -inset-6 rounded-3xl opacity-60 blur-2xl bg-gradient-to-br from-primary/40 via-secondary/30 to-accent/40" />
        
        {/* Animated border ring */}
        <div 
          className="absolute -inset-3 rounded-2xl"
          style={{
            background: 'linear-gradient(45deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)), hsl(var(--primary)))',
            backgroundSize: '300% 300%',
            animation: 'gradientShift 4s ease infinite',
          }}
        />
        
        {/* Inner shadow frame */}
        <div className="absolute -inset-2 rounded-xl bg-background/80 backdrop-blur-sm" />
        
        {/* Photo container */}
        <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-all duration-1000 ease-in-out"
              style={{
                opacity: activePhoto === index ? 1 : 0,
                transform: activePhoto === index ? 'scale(1) rotateY(0deg)' : 'scale(0.9) rotateY(10deg)',
              }}
            >
              <img
                src={photo}
                alt={`Riti ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Cinematic overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
            </div>
          ))}
          
          {/* Shine effect */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, hsl(38 80% 70% / 0.1) 45%, hsl(38 80% 70% / 0.2) 50%, hsl(38 80% 70% / 0.1) 55%, transparent 60%)',
              animation: 'shimmer 3s ease-in-out infinite',
            }}
          />
        </div>

        {/* Photo indicator dots */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setActivePhoto(index)}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                activePhoto === index 
                  ? 'bg-primary w-6 shadow-lg shadow-primary/50' 
                  : 'bg-foreground/30 hover:bg-foreground/50'
              }`}
            />
          ))}
        </div>

        {/* Floating sparkles around frame */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              top: `${10 + Math.random() * 80}%`,
              left: `${-5 + Math.random() * 110}%`,
              animation: `twinkle ${1.5 + Math.random()}s ease-in-out ${Math.random() * 2}s infinite`,
              boxShadow: '0 0 6px hsl(var(--primary))',
            }}
          />
        ))}
      </div>

      {/* Photo caption */}
      <p 
        className="text-center text-foreground/50 text-sm font-display tracking-wider mt-12"
        style={{
          animation: 'fadeIn 1s ease-out 1s forwards',
          opacity: 0,
        }}
      >
        ✨ Moments that matter ✨
      </p>
    </div>
  );
});

PhotoReveal.displayName = 'PhotoReveal';

export default PhotoReveal;
