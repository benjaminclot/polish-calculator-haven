
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Union, Literal

app = FastAPI()

# Add CORS middleware to allow cross-origin requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CalculationRequest(BaseModel):
    stack: List[float]
    operation: str
    
class CalculationResponse(BaseModel):
    stack: List[float]
    error: Optional[str] = None
    
@app.get("/")
def read_root():
    return {"message": "RPN Calculator API"}

@app.post("/calculate/", response_model=CalculationResponse)
def calculate(request: CalculationRequest):
    try:
        stack = request.stack
        operation = request.operation
        
        # Ensure we have sufficient operands
        if operation in ['+', '-', '×', '÷', '^'] and len(stack) < 2:
            raise HTTPException(status_code=400, detail="Not enough operands")
        if operation == '√' and len(stack) < 1:
            raise HTTPException(status_code=400, detail="Not enough operands")
            
        # Perform the calculation
        if operation == '+':
            a, b = stack[-2], stack[-1]
            result = a + b
            stack = stack[:-2] + [result]
        elif operation == '-':
            a, b = stack[-2], stack[-1]
            result = a - b
            stack = stack[:-2] + [result]
        elif operation == '×':
            a, b = stack[-2], stack[-1]
            result = a * b
            stack = stack[:-2] + [result]
        elif operation == '÷':
            a, b = stack[-2], stack[-1]
            if b == 0:
                return CalculationResponse(stack=stack, error="Division by zero")
            result = a / b
            stack = stack[:-2] + [result]
        elif operation == '^':
            a, b = stack[-2], stack[-1]
            result = a ** b
            stack = stack[:-2] + [result]
        elif operation == '√':
            a = stack[-1]
            if a < 0:
                return CalculationResponse(stack=stack, error="Cannot take square root of negative number")
            result = a ** 0.5
            stack = stack[:-1] + [result]
        elif operation == 'C':
            stack = []
        else:
            raise HTTPException(status_code=400, detail=f"Unknown operation: {operation}")
            
        return CalculationResponse(stack=stack)
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))
