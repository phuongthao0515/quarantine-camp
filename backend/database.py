import mysql.connector
from mysql.connector import connection
from mysql.connector import Error
from typing import Optional

# Database configuration
# db_config = {
#     "host": "127.0.0.1",
#     "user": "PhuongThao",
#     "password": "Thao@123",
#     "database": "ptl",
# }

db_config = {
    "host": "localhost",
    "user": "Hieu74",
    "password": "Hieu@742004",
    "database": "dbassignment",
}
# conn = get_connection()
conn: Optional[connection.MySQLConnection] = None

# Function to get a database connection
def get_connection() -> connection.MySQLConnection:
    try:
        global conn 
        conn = mysql.connector.connect(**db_config)
        return conn
    except Error as e:
        raise Exception(f"Database connection error: {str(e)}")

