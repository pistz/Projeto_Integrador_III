from src.application.enums.error_types import ErrorTypes
from src.application.enums.status_codes import StatusCode


class PasswordNotValid(Exception):
    def __init__(self, message: str = "Password not valid"):
        self.type = ErrorTypes.INVALID_PASSWORD
        self.message = message
        self.status_code = StatusCode.BAD_REQUEST
        super().__init__(self.message)