from src.application.enums.error_types import ErrorTypes
from src.application.enums.status_codes import StatusCode


class DatabaseException(Exception):
    def __init__(self, message: str):
        self.type = ErrorTypes.DATABASE_ERROR
        self.message = message
        self.status_code = StatusCode.INTERNAL_SERVER_ERROR
        super().__init__(self.message)