
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Optional, Union, Literal
import sqlite3
import io
import csv
import pandas as pd
from datetime import datetime
import os

app = FastAPI()

# Add CORS middleware to allow cross-origin requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define path to database file in the data directory
DB_PATH = os.path.join('data', 'calculator.db')

# Create data directory if it doesn't exist
os.makedirs('data', exist_ok=True)

# Create SQLite database and table if they don't exist
def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS calculations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT,
        stack_before TEXT,
        operation TEXT,
        stack_after TEXT,
        error TEXT
    )
    ''')
    conn.commit()
    conn.close()

# Initialize the database on startup
init_db()

class CalculationRequest(BaseModel):
    stack: List[float]
    operation: str
    
class CalculationResponse(BaseModel):
    stack: List[float]
    error: Optional[str] = None

def log_calculation(stack_before, operation, stack_after, error=None):
    """Log calculation to SQLite database"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO calculations (timestamp, stack_before, operation, stack_after, error) VALUES (?, ?, ?, ?, ?)",
        (
            datetime.now().isoformat(),
            str(stack_before),
            operation,
            str(stack_after),
            error
        )
    )
    conn.commit()
    conn.close()
    
@app.get("/")
def read_root():
    return {"message": "RPN Calculator API"}

@app.post("/calculate/", response_model=CalculationResponse)
def calculate(request: CalculationRequest):
    try:
        stack = request.stack
        operation = request.operation
        stack_before = stack.copy()  # Store the initial stack for logging
        
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
                error = "Division by zero"
                log_calculation(stack_before, operation, stack, error)
                return CalculationResponse(stack=stack, error=error)
            result = a / b
            stack = stack[:-2] + [result]
        elif operation == '^':
            a, b = stack[-2], stack[-1]
            result = a ** b
            stack = stack[:-2] + [result]
        elif operation == '√':
            a = stack[-1]
            if a < 0:
                error = "Cannot take square root of negative number"
                log_calculation(stack_before, operation, stack, error)
                return CalculationResponse(stack=stack, error=error)
            result = a ** 0.5
            stack = stack[:-1] + [result]
        elif operation == 'C':
            stack = []
        else:
            raise HTTPException(status_code=400, detail=f"Unknown operation: {operation}")
        
        # Log the calculation to the database
        log_calculation(stack_before, operation, stack)
            
        return CalculationResponse(stack=stack)
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/calculations/csv")
def get_calculations_csv():
    """Return all calculations as a CSV file"""
    try:
        # Connect to the database and get all calculations
        conn = sqlite3.connect(DB_PATH)
        df = pd.read_sql_query("SELECT * FROM calculations", conn)
        conn.close()
        
        # Create a CSV file in memory
        output = io.StringIO()
        df.to_csv(output, index=False)
        output.seek(0)
        
        # Return as a downloadable response
        return StreamingResponse(
            iter([output.getvalue()]),
            media_type="text/csv",
            headers={"Content-Disposition": "attachment; filename=calculations.csv"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
