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

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],  # React frontend URL
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

origins = [
    "http://localhost:3000",  # Your frontend URL
    "http://127.0.0.1:3000", # Optional, in case you're using a different URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows requests from specific origins
    allow_credentials=True,  # Allow cookies to be sent with requests
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers (e.g., Content-Type, Authorization)
)

@app.get("/")
async def root():
    return {"message": "Welcome to the Employee Management API"}
