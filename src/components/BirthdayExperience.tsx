import { useState, useCallback, useEffect, useRef } from 'react';
import ParticleField from '@/components/ParticleField';
import StartButton from '@/components/StartButton';
import AnimatedText from '@/components/AnimatedText';
import ConfettiExplosion from '@/components/ConfettiExplosion';
import SparkleEffect from '@/components/SparkleEffect';
import PhotoReveal from '@/components/PhotoReveal';
import BirthdayCake from '@/components/BirthdayCake';
import ActionButtons from '@/components/ActionButtons';

type Scene = 'idle' | 'awakening' | 'reveal' | 'celebration' | 'closure';

const BirthdayExperience = () => {
  const [scene, setScene] = useState<Scene>('idle');
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Scene timing
  const AWAKENING_DURATION = 3000;
  const REVEAL_DURATION = 6000;
  const CELEBRATION_DURATION = 5000;

  const startExperience = useCallback(() => {
    setScene('awakening');
    
    // Start ambient audio
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().catch(() => {});
      // Fade in audio
      let vol = 0;
      const fadeIn = setInterval(() => {
        vol += 0.02;
        if (audioRef.current && vol <= 0.5) {
          audioRef.current.volume = vol;
        } else {
          clearInterval(fadeIn);
        }
      }, 100);
    }

    // Progress through scenes
    setTimeout(() => {
      setScene('reveal');
    }, AWAKENING_DURATION);

    setTimeout(() => {
      setScene('celebration');
    }, AWAKENING_DURATION + REVEAL_DURATION);

    setTimeout(() => {
      setScene('closure');
    }, AWAKENING_DURATION + REVEAL_DURATION + CELEBRATION_DURATION);
  }, []);

  const handleReplay = useCallback(() => {
    setScene('idle');
    setBackgroundOpacity(0);
    setTimeout(() => startExperience(), 500);
  }, [startExperience]);

  // Animate background based on scene
  useEffect(() => {
    if (scene === 'awakening') {
      setBackgroundOpacity(0.3);
    } else if (scene === 'reveal') {
      setBackgroundOpacity(0.5);
    } else if (scene === 'celebration' || scene === 'closure') {
      setBackgroundOpacity(0.7);
    }
  }, [scene]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Ambient audio */}
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/music/preview/mixkit-a-very-happy-birthday-party-594.mp3"
        loop
        preload="auto"
      />

      {/* Base gradient background */}
      <div 
        className="fixed inset-0 transition-all duration-[3000ms] ease-out"
        style={{
          background: scene === 'idle' 
            ? 'linear-gradient(180deg, hsl(230 40% 5%) 0%, hsl(250 35% 8%) 100%)'
            : scene === 'awakening'
            ? 'linear-gradient(180deg, hsl(230 35% 8%) 0%, hsl(250 30% 12%) 50%, hsl(32 25% 10%) 100%)'
            : 'radial-gradient(ellipse at 50% 30%, hsl(38 40% 15%) 0%, hsl(250 30% 10%) 50%, hsl(230 35% 7%) 100%)',
        }}
      />

      {/* Center glow */}
      <div 
        className="fixed inset-0 pointer-events-none transition-opacity duration-[3000ms]"
        style={{
          opacity: backgroundOpacity,
          background: 'radial-gradient(ellipse at 50% 40%, hsl(38 80% 50% / 0.15) 0%, transparent 60%)',
        }}
      />

      {/* Particle field */}
      <ParticleField 
        isActive={scene !== 'idle'} 
        intensity={scene === 'celebration' ? 'high' : 'medium'}
        variant={scene === 'celebration' ? 'celebration' : 'ambient'}
      />

      {/* Sparkle effects */}
      <SparkleEffect isActive={scene === 'celebration' || scene === 'closure'} />

      {/* Confetti */}
      <ConfettiExplosion isActive={scene === 'celebration'} />

      {/* Main content */}
      <div className="relative z-40 min-h-screen flex flex-col items-center justify-center px-6 py-12">
        
        {/* IDLE STATE - Start Button */}
        {scene === 'idle' && (
          <div className="text-center animate-fade-up">
            <p className="text-muted-foreground/60 text-sm tracking-[0.3em] uppercase mb-8 font-sans">
              A Special Moment Awaits
            </p>
            <StartButton onClick={startExperience} />
          </div>
        )}

        {/* AWAKENING SCENE */}
        {scene === 'awakening' && (
          <div className="text-center">
            <p 
              className="text-muted-foreground/70 text-lg tracking-[0.2em] font-display"
              style={{
                animation: 'blur-in 2s ease-out forwards',
              }}
            >
              Close your eyes for a moment...
            </p>
          </div>
        )}

        {/* REVEAL & CELEBRATION & CLOSURE SCENES */}
        {(scene === 'reveal' || scene === 'celebration' || scene === 'closure') && (
          <div className="text-center max-w-2xl mx-auto">
            {/* Opening line */}
            <AnimatedText 
              text="On this beautiful day,"
              delay={0}
              className="block text-xl sm:text-2xl text-foreground/70 font-display tracking-wide mb-4"
            />

            {/* Second line */}
            <AnimatedText 
              text="the stars aligned to celebrate"
              delay={800}
              className="block text-xl sm:text-2xl text-foreground/70 font-display tracking-wide mb-6"
            />

            {/* THE NAME - Special treatment */}
            <AnimatedText 
              text="Riti"
              delay={1800}
              isName
              className="block text-6xl sm:text-8xl font-display font-semibold text-primary tracking-wider my-8"
            />

            {/* Birthday cake */}
            <BirthdayCake isActive={scene === 'celebration' || scene === 'closure'} delay={500} />

            {/* Birthday message */}
            {(scene === 'celebration' || scene === 'closure') && (
              <div 
                className="mt-8 space-y-4"
                style={{
                  animation: 'fadeIn 1.5s ease-out 1s forwards',
                  opacity: 0,
                }}
              >
                <h1 className="text-3xl sm:text-4xl font-display font-semibold text-foreground tracking-wide">
                  Happy Birthday! 🎂
                </h1>
                <p className="text-lg text-foreground/70 font-display leading-relaxed max-w-lg mx-auto">
                  May this year bring you endless joy, beautiful surprises, 
                  and all the love your heart can hold.
                </p>
              </div>
            )}

            {/* Photo reveal */}
            <PhotoReveal 
              isActive={scene === 'closure'} 
              delay={500}
            />

            {/* Closing message */}
            {scene === 'closure' && (
              <div 
                className="mt-10"
                style={{
                  animation: 'fadeIn 1.5s ease-out 2s forwards',
                  opacity: 0,
                }}
              >
                <p className="text-xl text-secondary font-display italic">
                  "Here's to another year of beautiful memories"
                </p>
                <p className="text-foreground/50 text-sm mt-4 font-sans tracking-wider">
                  With all my love ❤️
                </p>
              </div>
            )}

            {/* Action buttons */}
            <ActionButtons 
              isActive={scene === 'closure'} 
              onReplay={handleReplay}
            />
          </div>
        )}
      </div>

      {/* Vignette overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, hsl(230 40% 3% / 0.6) 100%)',
        }}
      />
    </div>
  );
};

export default BirthdayExperience;
