
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ButtonType = 'number' | 'function' | 'operation' | 'enter';

interface CalculatorButtonProps {
  onClick: () => void;
  children: ReactNode;
  variant?: ButtonType;
  className?: string;
  disabled?: boolean;
}

const CalculatorButton = ({
  onClick,
  children,
  variant = 'number',
  className,
  disabled = false
}: CalculatorButtonProps) => {
  const baseStyles = "relative flex items-center justify-center text-xl font-medium rounded-2xl transition-all duration-200 calculator-button-shadow active:shadow-none active:translate-y-[1px] select-none";
  
  const variantStyles = {
    number: "bg-calculator-button hover:bg-calculator-button-hover active:bg-calculator-button-active text-foreground",
    function: "bg-calculator-function hover:bg-calculator-function-hover active:bg-calculator-function-active text-foreground",
    operation: "bg-calculator-operation hover:bg-calculator-operation-hover active:bg-calculator-operation-active text-white",
    enter: "bg-calculator-operation hover:bg-calculator-operation-hover active:bg-calculator-operation-active text-white font-semibold"
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        baseStyles,
        variantStyles[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={disabled}
    >
      <span className="transform group-active:scale-95 transition-transform duration-100">
        {children}
      </span>
      <span className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 transition-opacity duration-200 hover:opacity-100" />
    </button>
  );
};

export default CalculatorButton;
