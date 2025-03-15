from src.application.enums.error_types import ErrorTypes
from src.application.enums.status_codes import StatusCode


class InvalidUser(Exception):
    def __init__(self, message: str):
        self.type = ErrorTypes.INVALID_USER
        self.message = message
        self.status_code = StatusCode.BAD_REQUEST
        super().__init__(self.message)