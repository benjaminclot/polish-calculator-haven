
// RPN Calculator operations

export type OperationType = 'add' | 'subtract' | 'multiply' | 'divide' | 'power' | 'sqrt' | 'clear';

export interface Operation {
  symbol: string;
  type: OperationType;
  description: string;
  execute: (stack: number[]) => number[];
  requiresOperands: number;
}

export const operations: Record<string, Operation> = {
  '+': {
    symbol: '+',
    type: 'add',
    description: 'Addition',
    requiresOperands: 2,
    execute: (stack) => {
      if (stack.length < 2) return stack;
      const newStack = [...stack];
      const b = newStack.pop() || 0;
      const a = newStack.pop() || 0;
      newStack.push(a + b);
      return newStack;
    }
  },
  '-': {
    symbol: '-',
    type: 'subtract',
    description: 'Subtraction',
    requiresOperands: 2,
    execute: (stack) => {
      if (stack.length < 2) return stack;
      const newStack = [...stack];
      const b = newStack.pop() || 0;
      const a = newStack.pop() || 0;
      newStack.push(a - b);
      return newStack;
    }
  },
  '×': {
    symbol: '×',
    type: 'multiply',
    description: 'Multiplication',
    requiresOperands: 2,
    execute: (stack) => {
      if (stack.length < 2) return stack;
      const newStack = [...stack];
      const b = newStack.pop() || 0;
      const a = newStack.pop() || 0;
      newStack.push(a * b);
      return newStack;
    }
  },
  '÷': {
    symbol: '÷',
    type: 'divide',
    description: 'Division',
    requiresOperands: 2,
    execute: (stack) => {
      if (stack.length < 2) return stack;
      const newStack = [...stack];
      const b = newStack.pop() || 0;
      if (b === 0) {
        // Handle division by zero
        newStack.push(NaN);
        return newStack;
      }
      const a = newStack.pop() || 0;
      newStack.push(a / b);
      return newStack;
    }
  },
  '^': {
    symbol: '^',
    type: 'power',
    description: 'Power',
    requiresOperands: 2,
    execute: (stack) => {
      if (stack.length < 2) return stack;
      const newStack = [...stack];
      const b = newStack.pop() || 0;
      const a = newStack.pop() || 0;
      newStack.push(Math.pow(a, b));
      return newStack;
    }
  },
  '√': {
    symbol: '√',
    type: 'sqrt',
    description: 'Square Root',
    requiresOperands: 1,
    execute: (stack) => {
      if (stack.length < 1) return stack;
      const newStack = [...stack];
      const a = newStack.pop() || 0;
      if (a < 0) {
        // Handle negative square root
        newStack.push(NaN);
        return newStack;
      }
      newStack.push(Math.sqrt(a));
      return newStack;
    }
  },
  'C': {
    symbol: 'C',
    type: 'clear',
    description: 'Clear',
    requiresOperands: 0,
    execute: () => {
      return [];
    }
  }
};

// Format number for display
export const formatNumber = (num: number): string => {
  if (isNaN(num)) return 'Error';
  
  // Handle special cases
  if (!isFinite(num)) return num > 0 ? 'Infinity' : '-Infinity';
  
  // Convert to string with appropriate precision
  const absNum = Math.abs(num);
  
  if (absNum >= 1e10 || (absNum < 1e-6 && absNum > 0)) {
    // Use exponential notation for very large or very small numbers
    return num.toExponential(6);
  }
  
  // For regular numbers, limit to 10 significant digits total
  const str = num.toString();
  if (str.length > 10) {
    if (str.includes('.')) {
      // Determine how many decimal places we can show
      const intPart = Math.floor(Math.abs(num)).toString().length;
      const maxDecimals = Math.max(0, 10 - intPart - (num < 0 ? 1 : 0));
      return num.toFixed(maxDecimals);
    } else {
      // It's a large integer without decimals
      return num.toPrecision(10);
    }
  }
  
  return str;
};

// Determine if an operation can be performed on the stack
export const canPerformOperation = (operation: Operation, stack: number[]): boolean => {
  return stack.length >= operation.requiresOperands;
};
