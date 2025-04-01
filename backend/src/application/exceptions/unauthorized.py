from src.application.enums.error_types import ErrorTypes
from src.application.enums.status_codes import StatusCode


class Unauthorized(Exception):
    def __init__(self, message: str):
        self.type = ErrorTypes.INVALID_DATA
        self.message = message
        self.status_code = StatusCode.UNAUTHORIZED
        super().__init__(message)
