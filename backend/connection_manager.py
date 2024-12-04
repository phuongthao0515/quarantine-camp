import mysql.connector
from mysql.connector import MySQLConnection
from typing import Optional


class ConnectionManager:
    """
    Singleton class to manage database connections.
    """
    _instance = None
    _connection: Optional[MySQLConnection] = None

    @staticmethod
    def get_instance():
        if ConnectionManager._instance is None:
            ConnectionManager()
        return ConnectionManager._instance

    def __init__(self):
        if ConnectionManager._instance is not None:
            raise Exception("This class is a singleton!")
        ConnectionManager._instance = self

    def set_connection(self, connection: MySQLConnection):
        self._connection = connection

    def get_connection(self) -> Optional[MySQLConnection]:
        if self._connection and self._connection.is_connected():
            return self._connection
        return None

    def close_connection(self):
        if self._connection and self._connection.is_connected():
            self._connection.close()
            self._connection = None
