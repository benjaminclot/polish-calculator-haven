
import { Operation, canPerformOperation } from '@/lib/calculator';
import CalculatorButton from './CalculatorButton';

interface KeypadProps {
  onNumberClick: (num: number) => void;
  onDecimalClick: () => void;
  onOperationClick: (operation: Operation) => void;
  onEnterClick: () => void;
  onBackspaceClick: () => void;
  onClearEntryClick: () => void;
  hasDecimal: boolean;
  stack: number[];
  operations: Record<string, Operation>;
  disabled?: boolean;
}

const Keypad = ({
  onNumberClick,
  onDecimalClick,
  onOperationClick,
  onEnterClick,
  onBackspaceClick,
  onClearEntryClick,
  hasDecimal,
  stack,
  operations,
  disabled = false
}: KeypadProps) => {
  return (
    <div className="grid grid-cols-4 gap-3 p-4 rounded-2xl bg-calculator-keypad glass-panel calculator-panel-shadow">
      {/* First row */}
      <CalculatorButton variant="function" onClick={onClearEntryClick} disabled={disabled}>CE</CalculatorButton>
      <CalculatorButton variant="function" onClick={() => onOperationClick(operations['C'])} disabled={disabled}>C</CalculatorButton>
      <CalculatorButton variant="function" onClick={onBackspaceClick} disabled={disabled}>⌫</CalculatorButton>
      <CalculatorButton 
        variant="operation" 
        onClick={() => onOperationClick(operations['÷'])}
        disabled={disabled || !canPerformOperation(operations['÷'], stack)}
      >
        ÷
      </CalculatorButton>
      
      {/* Second row */}
      <CalculatorButton onClick={() => onNumberClick(7)} disabled={disabled}>7</CalculatorButton>
      <CalculatorButton onClick={() => onNumberClick(8)} disabled={disabled}>8</CalculatorButton>
      <CalculatorButton onClick={() => onNumberClick(9)} disabled={disabled}>9</CalculatorButton>
      <CalculatorButton 
        variant="operation" 
        onClick={() => onOperationClick(operations['×'])}
        disabled={disabled || !canPerformOperation(operations['×'], stack)}
      >
        ×
      </CalculatorButton>
      
      {/* Third row */}
      <CalculatorButton onClick={() => onNumberClick(4)} disabled={disabled}>4</CalculatorButton>
      <CalculatorButton onClick={() => onNumberClick(5)} disabled={disabled}>5</CalculatorButton>
      <CalculatorButton onClick={() => onNumberClick(6)} disabled={disabled}>6</CalculatorButton>
      <CalculatorButton 
        variant="operation" 
        onClick={() => onOperationClick(operations['-'])}
        disabled={disabled || !canPerformOperation(operations['-'], stack)}
      >
        −
      </CalculatorButton>
      
      {/* Fourth row */}
      <CalculatorButton onClick={() => onNumberClick(1)} disabled={disabled}>1</CalculatorButton>
      <CalculatorButton onClick={() => onNumberClick(2)} disabled={disabled}>2</CalculatorButton>
      <CalculatorButton onClick={() => onNumberClick(3)} disabled={disabled}>3</CalculatorButton>
      <CalculatorButton 
        variant="operation" 
        onClick={() => onOperationClick(operations['+'])}
        disabled={disabled || !canPerformOperation(operations['+'], stack)}
      >
        +
      </CalculatorButton>
      
      {/* Fifth row */}
      <CalculatorButton onClick={() => onNumberClick(0)} disabled={disabled}>0</CalculatorButton>
      <CalculatorButton 
        onClick={onDecimalClick} 
        disabled={disabled || hasDecimal}
      >
        .
      </CalculatorButton>
      <CalculatorButton 
        variant="function" 
        onClick={() => onOperationClick(operations['√'])}
        disabled={disabled || !canPerformOperation(operations['√'], stack)}
      >
        √
      </CalculatorButton>
      <CalculatorButton variant="enter" onClick={onEnterClick} disabled={disabled}>
        ↵
      </CalculatorButton>
    </div>
  );
};

export default Keypad;
