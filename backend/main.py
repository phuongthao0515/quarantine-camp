from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import employee, patient
from database import conn, get_connection
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup event: Initialize the database connection
    
    
    # Yield control back to FastAPI (the app will run as usual)
    yield

    # Shutdown event: Close the database connection
    if conn:
        conn.close()
        print("Database connection closed.")

# Initialize the FastAPI app
app = FastAPI(lifespan=lifespan)

# Include the employees router
app.include_router(employee.router)
app.include_router(patient.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to the Employee Management API"}
