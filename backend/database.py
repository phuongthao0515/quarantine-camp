import mysql.connector
from mysql.connector import connection
from mysql.connector import Error
from typing import Optional

db_config = {
    "host": "localhost",
    "user": "Manager",
    "password": "Manager123",
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