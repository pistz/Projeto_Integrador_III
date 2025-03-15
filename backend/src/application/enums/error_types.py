from enum import Enum


class ErrorTypes(Enum):
    INVALID_EMAIL = 'Invalid email'
    INVALID_PASSWORD = 'Invalid password'
    INVALID_DATA = 'Invalid data'
    INVALID_USER = 'Invalid user'
    NOT_FOUND = 'Not found'
    TOKEN_ERROR = 'Token error'
    DATABASE_ERROR = 'Database error'
    UNEXPECTED_ERROR = 'Unexpected error'

    def __str__(self):
        return str(self.value)