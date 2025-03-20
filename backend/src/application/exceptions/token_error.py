from jwt import PyJWT

from src.application.enums.error_types import ErrorTypes
from src.application.enums.status_codes import StatusCode


class TokenError(Exception):
    def __init__(self, message: str):
        self.type = ErrorTypes.TOKEN_ERROR
        self.message = message
        self.status_code = StatusCode.TOKEN_ERROR
        super().__init__(message)
