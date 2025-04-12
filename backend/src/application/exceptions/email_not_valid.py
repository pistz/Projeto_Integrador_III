from src.application.enums.error_types import ErrorTypes
from src.application.enums.status_codes import StatusCode


class EmailNotValid(Exception):
    def __init__(self, message: str = "Email is not valid"):
        self.type = ErrorTypes.INVALID_EMAIL.value
        self.message = message
        self.status_code = StatusCode.BAD_REQUEST.value
        super().__init__(self.message)
