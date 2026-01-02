import { memo } from 'react';
import { Sparkles } from 'lucide-react';

interface StartButtonProps {
  onClick: () => void;
}

const StartButton = memo(({ onClick }: StartButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="group relative px-12 py-5 rounded-full font-display text-xl tracking-wider
                 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20
                 border border-primary/40 text-foreground
                 breathing-glow transition-all duration-500
                 hover:border-primary/60 hover:from-primary/30 hover:via-primary/40 hover:to-primary/30
                 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
    >
      {/* Inner glow */}
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-primary/10 to-transparent 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <span className="relative flex items-center gap-3">
        <span className="text-foreground/90 group-hover:text-foreground transition-colors">
          Tap to Begin
        </span>
        <Sparkles className="w-5 h-5 text-primary animate-breathing-pulse" />
      </span>

      {/* Outer ring animation */}
      <span className="absolute -inset-1 rounded-full border border-primary/20 animate-glow-pulse" />
    </button>
  );
});

StartButton.displayName = 'StartButton';

export default StartButton;
