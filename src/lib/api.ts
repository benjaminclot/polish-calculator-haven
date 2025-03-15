
// API client for the calculator backend

export interface CalculationResponse {
  stack: number[];
  error: string | null;
}

// Base URL for the API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Calculate using the API
export const calculateOperation = async (
  stack: number[],
  operation: string
): Promise<CalculationResponse> => {
  try {
    const response = await fetch(`${API_URL}/calculate/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        stack,
        operation,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

// Download calculations history as CSV
export const downloadCalculationsCSV = () => {
  window.open(`${API_URL}/calculations/csv`, '_blank');
};
