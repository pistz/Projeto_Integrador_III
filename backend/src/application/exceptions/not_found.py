from src.application.enums.error_types import ErrorTypes
from src.application.enums.status_codes import StatusCode


class NotFound(Exception):
    def __init__(self, message: str):
        self.type = ErrorTypes.NOT_FOUND.value
        self.message = message
        self.status_code = StatusCode.NOT_FOUND.value
        super().__init__(self.message)
