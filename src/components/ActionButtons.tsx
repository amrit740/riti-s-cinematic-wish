import { memo } from 'react';
import { Heart, RotateCcw } from 'lucide-react';

interface ActionButtonsProps {
  isActive: boolean;
  onReplay: () => void;
}

const ActionButtons = memo(({ isActive, onReplay }: ActionButtonsProps) => {
  if (!isActive) return null;

  return (
    <div 
      className="flex flex-wrap gap-4 justify-center items-center mt-12"
      style={{
        animation: 'fadeIn 1s ease-out 1s forwards',
        opacity: 0,
      }}
    >
      <button
        onClick={onReplay}
        className="group flex items-center gap-2 px-6 py-3 rounded-full
                   bg-muted/50 border border-border/50 text-foreground/80
                   hover:bg-muted hover:border-border hover:text-foreground
                   transition-all duration-300"
      >
        <RotateCcw className="w-4 h-4 group-hover:rotate-[-360deg] transition-transform duration-700" />
        <span className="font-display text-sm tracking-wide">Replay Experience</span>
      </button>

      <button
        className="group flex items-center gap-2 px-6 py-3 rounded-full
                   bg-secondary/20 border border-secondary/40 text-secondary
                   hover:bg-secondary/30 hover:border-secondary/60
                   transition-all duration-300"
      >
        <Heart className="w-4 h-4 group-hover:scale-110 transition-transform fill-secondary/50" />
        <span className="font-display text-sm tracking-wide">Send Love</span>
      </button>
    </div>
  );
});

ActionButtons.displayName = 'ActionButtons';

export default ActionButtons;
