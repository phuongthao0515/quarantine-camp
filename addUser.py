import mysql.connector
from mysql.connector import connection
from mysql.connector import Error
from typing import Optional
import bcrypt



# Database configuration
db_config = {
    "host": "localhost",
    "user": "Manager",
    "password": "Manager123",
    "database": "login",
}


# Function to hash password using bcrypt
def hash_password(password):
    # Generate bcrypt hash
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return hashed.decode('utf-8')  # Convert bytes to string for storage

# Insert data into the USERNAME table
def insert_user(employee_id, username, password):
    try:
        # Connect to the database
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        
        # Hash the password
        hashed_password = hash_password(password)
        
        # SQL Insert Query
        query = """
        INSERT INTO USERNAME ( Username, Password )
        VALUES ( %s, %s)
        """
        data = ( username, hashed_password)
        
        # Execute and commit
        cursor.execute(query, data)
        connection.commit()
        print(f"User '{username}' added successfully!")
    
    except mysql.connector.Error as err:
        print(f"Error: {err}")
    
    finally:
        # Close the connection
        if connection.is_connected():
            cursor.close()
            connection.close()


insert_user('0031', 'tarominhhieu', 'Hieu@742004')
insert_user('0032', 'PhuongThao', '123456')
insert_user('0033', 'AnhQuang', '123456')
insert_user('0033', 'ThuyTien', '123456')
insert_user('0033', 'NgocVan', '123456')
insert_user('0005', 'TrongNhan', '654321')
