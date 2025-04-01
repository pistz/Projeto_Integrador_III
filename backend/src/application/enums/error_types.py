from enum import Enum


class ErrorTypes(Enum):
    INVALID_EMAIL = 'INVALID_EMAIL'
    INVALID_PASSWORD = 'INVALID_PASSWORD'
    INVALID_DATA = 'INVALID_DATA'
    INVALID_USER = 'INVALID_USER'
    NOT_FOUND = 'NOT_FOUND'
    TOKEN_ERROR = 'TOKEN_ERROR'
    DATABASE_ERROR = 'DATABASE_ERROR'
    UNEXPECTED_ERROR = 'UNEXPECTED_ERROR'

    def __str__(self):
        return str(self.value)
