import mysql.connector
from mysql.connector import connection
from mysql.connector import Error

# Database configuration
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "Olwen@5547880",
    "database": "mydb",
}

# Function to get a database connection
def get_connection() -> connection.MySQLConnection:
    try:
        conn = mysql.connector.connect(**db_config)
        return conn
    except Error as e:
        raise Exception(f"Database connection error: {str(e)}")