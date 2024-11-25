import mysql.connector
from mysql.connector import connection
from mysql.connector import Error

# Database configuration
db_config = {
    "host": "127.0.0.1",
    "user": "PhuongThao",
    "password": "Thao@123",
    "database": "ptl",
}

# Function to get a database connection
def get_connection() -> connection.MySQLConnection:
    try:
        conn = mysql.connector.connect(**db_config)
        return conn
    except Error as e:
        raise Exception(f"Database connection error: {str(e)}")

conn = get_connection()