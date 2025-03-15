
import { formatNumber } from '@/lib/calculator';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface DisplayProps {
  value: string;
  stack: number[];
  className?: string;
  isLoading?: boolean;
}

const Display = ({ value, stack, className, isLoading = false }: DisplayProps) => {
  return (
    <div className={cn("p-4 rounded-2xl bg-calculator-display/80 backdrop-blur-lg", className)}>
      {/* Stack display */}
      <div className="h-24 overflow-y-auto mb-2 flex flex-col-reverse">
        {stack.map((item, index) => (
          <div 
            key={`stack-${index}`}
            className={cn(
              "text-right py-0.5 text-sm text-muted-foreground font-mono",
              "animate-slide-up"
            )}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {formatNumber(item)}
          </div>
        ))}
      </div>
      
      {/* Current input display */}
      <div className="flex justify-end items-center h-14">
        {isLoading ? (
          <Loader2 className="h-8 w-8 text-muted-foreground animate-spin mr-2" />
        ) : null}
        <div className="text-3xl font-semibold font-mono tracking-tight overflow-x-auto whitespace-nowrap">
          {value || "0"}
        </div>
      </div>
    </div>
  );
};

export default Display;
