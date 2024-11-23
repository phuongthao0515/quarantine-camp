from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import employee

# Initialize the FastAPI app
app = FastAPI()

# Include the employees router
app.include_router(employee.router)

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
