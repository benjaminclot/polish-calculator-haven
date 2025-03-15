
import { formatNumber } from '@/lib/calculator';
import { cn } from '@/lib/utils';

interface StackProps {
  stack: number[];
  className?: string;
}

const Stack = ({ stack, className }: StackProps) => {
  if (stack.length === 0) {
    return (
      <div className={cn("p-4 text-center text-muted-foreground", className)}>
        Stack is empty
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden", className)}>
      <h3 className="text-sm font-medium text-muted-foreground mb-2">Stack</h3>
      <div className="space-y-1">
        {stack.map((value, index) => (
          <div 
            key={`stack-item-${index}`}
            className={cn(
              "p-2 rounded-lg bg-secondary/50 backdrop-blur-sm flex justify-between",
              "animate-fade-in"
            )}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <span className="text-xs text-muted-foreground font-mono">{index}:</span>
            <span className="font-mono">{formatNumber(value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stack;
