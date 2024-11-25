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
conn: Optional[connection.MySQLConnection] = None

def get_connection() -> connection.MySQLConnection:
    global conn
    try:
        if conn is None or not conn.is_connected():
            conn = mysql.connector.connect(**db_config)
        return conn
    except Error as e:
        print(f"Database connection error: {e}")
        conn = None
        raise
conn = get_connection()
print("Initialize Connection to Database")