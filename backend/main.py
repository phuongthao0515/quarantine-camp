from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from routers import employee,patient
from connection_manager import ConnectionManager
import mysql.connector
import bcrypt
from database import login_db_config, app_db_config

# Initialize FastAPI app
app = FastAPI()

# Middleware for CORS
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/login")
async def login(username: str, password: str):
    """
    Login endpoint to authenticate the user.
    If successful, establish the app database connection.
    """
    try:
        login_connection = mysql.connector.connect(**login_db_config)
        cursor = login_connection.cursor()

        # Query for hashed password
        query = "SELECT Password FROM USERNAME WHERE Username = %s"
        cursor.execute(query, (username,))
        result = cursor.fetchone()

        if result:
            hashed_password = result[0]
            if bcrypt.checkpw(password.encode("utf-8"), hashed_password.encode("utf-8")):
                # Close login connection
                cursor.close()
                login_connection.close()

                # Establish app database connection
                app_connection = mysql.connector.connect(**app_db_config)
                if app_connection.is_connected():
                    ConnectionManager.get_instance().set_connection(app_connection)
                    return {"message": "Login successful. Connected to app database."}
                else:
                    raise HTTPException(status_code=500, detail="Failed to connect to app database")

        raise HTTPException(status_code=401, detail="Invalid username or password")

    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

    finally:
        if login_connection.is_connected():
            login_connection.close()


@app.post("/logout")
async def logout():
    """
    Logout endpoint to disconnect the app database connection.
    """
    try:
        # Get the connection instance from ConnectionManager
        app_connection = ConnectionManager.get_instance().get_connection()

        # Check if the connection exists and is active
        if app_connection and app_connection.is_connected():
            app_connection.close()  # Close the connection
            ConnectionManager.get_instance().set_connection(None)  # Reset the connection
            return {"message": "Logout successful. Disconnected from app database."}

        raise HTTPException(status_code=400, detail="No active database connection to logout.")

    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error during logout: {e}")

@app.get("/")
async def root():
    """
    Root endpoint to check API status.
    """
    return {"message": "Welcome to the Employee Management API"}


# Include the employee router
app.include_router(employee.router)
app.include_router(patient.router)

