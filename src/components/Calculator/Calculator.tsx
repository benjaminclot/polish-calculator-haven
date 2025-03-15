
import { useState } from 'react';
import Display from './Display';
import Keypad from './Keypad';
import Stack from './Stack';
import { Operation, operations } from '@/lib/calculator';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const Calculator = () => {
  const [input, setInput] = useState<string>('');
  const [stack, setStack] = useState<number[]>([]);
  const [hasDecimal, setHasDecimal] = useState<boolean>(false);
  const [lastOperation, setLastOperation] = useState<string | null>(null);

  // Handle number input
  const handleNumberClick = (num: number) => {
    setInput(prev => prev + num.toString());
  };

  // Handle decimal point
  const handleDecimalClick = () => {
    if (!hasDecimal) {
      setInput(prev => prev === '' ? '0.' : prev + '.');
      setHasDecimal(true);
    }
  };

  // Handle enter (push to stack)
  const handleEnterClick = () => {
    if (input === '') return;
    
    const numValue = parseFloat(input);
    setStack(prev => [...prev, numValue]);
    setInput('');
    setHasDecimal(false);
    
    // Show subtle toast notification
    toast("Value added to stack", {
      duration: 1500,
    });
  };

  // Handle operation execution
  const handleOperationClick = (operation: Operation) => {
    if (operation.type === 'clear') {
      setStack([]);
      setInput('');
      setHasDecimal(false);
      return;
    }
    
    let currentStack = [...stack];
    
    // If there's input, push it to the stack first
    if (input !== '') {
      currentStack = [...currentStack, parseFloat(input)];
      setInput('');
      setHasDecimal(false);
    }
    
    // Check if we have enough operands
    if (currentStack.length < operation.requiresOperands) {
      toast.error(`Not enough values for ${operation.description} operation`, {
        duration: 2000,
      });
      return;
    }
    
    try {
      const newStack = operation.execute(currentStack);
      setStack(newStack);
      setLastOperation(operation.symbol);
      
      // Show operation toast
      toast(`${operation.description} performed`, {
        duration: 1500,
      });
    } catch (error) {
      toast.error("Operation error", {
        description: (error as Error).message,
        duration: 3000,
      });
    }
  };

  // Handle backspace
  const handleBackspaceClick = () => {
    setInput(prev => {
      const newInput = prev.slice(0, -1);
      if (prev.endsWith('.')) {
        setHasDecimal(false);
      }
      return newInput;
    });
  };

  // Handle clear entry
  const handleClearEntryClick = () => {
    setInput('');
    setHasDecimal(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="space-y-4">
        <Display 
          value={input} 
          stack={stack} 
          className="calculator-panel-shadow"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Keypad
              onNumberClick={handleNumberClick}
              onDecimalClick={handleDecimalClick}
              onOperationClick={handleOperationClick}
              onEnterClick={handleEnterClick}
              onBackspaceClick={handleBackspaceClick}
              onClearEntryClick={handleClearEntryClick}
              hasDecimal={hasDecimal}
              stack={stack}
              operations={operations}
            />
          </div>
          
          <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl calculator-panel-shadow">
            <Stack stack={stack} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
