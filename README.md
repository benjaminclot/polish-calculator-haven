
# RPN Calculator with FastAPI and React

This is a Reverse Polish Notation (RPN) calculator with a Python FastAPI backend and React frontend.

## Running with Docker Compose

1. Make sure you have Docker and Docker Compose installed
2. Clone this repository
3. Run the application:

```bash
docker-compose up
```

4. Access the frontend at http://localhost:5173
5. The API will be available at http://localhost:8000

## Development Setup

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd api
pip install -r requirements.txt
uvicorn main:app --reload
```

## API Endpoints

- `GET /`: API health check
- `POST /calculate/`: Perform RPN calculation
  - Request body: `{ "stack": [numbers], "operation": "operation_symbol" }`
  - Response: `{ "stack": [updated_numbers], "error": null }`

## Technologies Used

- Backend: Python FastAPI
- Frontend: React, TypeScript, Tailwind CSS, shadcn/ui
- Containerization: Docker, Docker Compose
