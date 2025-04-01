import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL")


class DbConnectionHandler:
    def __init__(self):
        self.__connection_string = DATABASE_URL
        self.__engine = self.__create_database_engine()
        self.session = None

    def __create_database_engine(self):
        return create_engine(self.__connection_string)

    def __enter__(self):
        session_make = sessionmaker(bind=self.__engine)
        self.session = session_make()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.session.close()
