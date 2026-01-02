import { memo, useEffect, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  delay?: number;
  className?: string;
  isName?: boolean;
  onComplete?: () => void;
}

const AnimatedText = memo(({ text, delay = 0, className = '', isName = false, onComplete }: AnimatedTextProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      if (onComplete) {
        setTimeout(onComplete, 1200);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, onComplete]);

  if (!isVisible) return null;

  return (
    <span
      className={`inline-block ${className} ${isName ? 'name-glow' : ''}`}
      style={{
        animation: isName 
          ? 'textReveal 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards'
          : 'textReveal 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      }}
    >
      {text}
    </span>
  );
});

AnimatedText.displayName = 'AnimatedText';

export default AnimatedText;
