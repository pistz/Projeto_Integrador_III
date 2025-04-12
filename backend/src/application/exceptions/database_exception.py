from src.application.enums.error_types import ErrorTypes
from src.application.enums.status_codes import StatusCode


class DatabaseException(Exception):
    def __init__(self, message: str, aditional: str = None):
        self.type = ErrorTypes.DATABASE_ERROR.value
        self.message = message
        self.status_code = StatusCode.INTERNAL_SERVER_ERROR.value
        self.aditional = aditional if aditional else None
        super().__init__(self.message)
