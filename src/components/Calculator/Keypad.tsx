
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
  operations
}: KeypadProps) => {
  return (
    <div className="grid grid-cols-4 gap-3 p-4 rounded-2xl bg-calculator-keypad glass-panel calculator-panel-shadow">
      {/* First row */}
      <CalculatorButton variant="function" onClick={onClearEntryClick}>CE</CalculatorButton>
      <CalculatorButton variant="function" onClick={() => onOperationClick(operations['C'])}>C</CalculatorButton>
      <CalculatorButton variant="function" onClick={onBackspaceClick}>⌫</CalculatorButton>
      <CalculatorButton 
        variant="operation" 
        onClick={() => onOperationClick(operations['÷'])}
        disabled={!canPerformOperation(operations['÷'], stack)}
      >
        ÷
      </CalculatorButton>
      
      {/* Second row */}
      <CalculatorButton onClick={() => onNumberClick(7)}>7</CalculatorButton>
      <CalculatorButton onClick={() => onNumberClick(8)}>8</CalculatorButton>
      <CalculatorButton onClick={() => onNumberClick(9)}>9</CalculatorButton>
      <CalculatorButton 
        variant="operation" 
        onClick={() => onOperationClick(operations['×'])}
        disabled={!canPerformOperation(operations['×'], stack)}
      >
        ×
      </CalculatorButton>
      
      {/* Third row */}
      <CalculatorButton onClick={() => onNumberClick(4)}>4</CalculatorButton>
      <CalculatorButton onClick={() => onNumberClick(5)}>5</CalculatorButton>
      <CalculatorButton onClick={() => onNumberClick(6)}>6</CalculatorButton>
      <CalculatorButton 
        variant="operation" 
        onClick={() => onOperationClick(operations['-'])}
        disabled={!canPerformOperation(operations['-'], stack)}
      >
        −
      </CalculatorButton>
      
      {/* Fourth row */}
      <CalculatorButton onClick={() => onNumberClick(1)}>1</CalculatorButton>
      <CalculatorButton onClick={() => onNumberClick(2)}>2</CalculatorButton>
      <CalculatorButton onClick={() => onNumberClick(3)}>3</CalculatorButton>
      <CalculatorButton 
        variant="operation" 
        onClick={() => onOperationClick(operations['+'])}
        disabled={!canPerformOperation(operations['+'], stack)}
      >
        +
      </CalculatorButton>
      
      {/* Fifth row */}
      <CalculatorButton onClick={() => onNumberClick(0)}>0</CalculatorButton>
      <CalculatorButton 
        onClick={onDecimalClick} 
        disabled={hasDecimal}
      >
        .
      </CalculatorButton>
      <CalculatorButton 
        variant="function" 
        onClick={() => onOperationClick(operations['√'])}
        disabled={!canPerformOperation(operations['√'], stack)}
      >
        √
      </CalculatorButton>
      <CalculatorButton variant="enter" onClick={onEnterClick}>
        ↵
      </CalculatorButton>
    </div>
  );
};

export default Keypad;
