from abc import ABC, abstractmethod

from src.application.dtos.http_types.http_response import HttpResponse
from src.application.dtos.user.user_dtos import UserResetPasswordDTO


class ILoginService(ABC):

    @abstractmethod
    def login(self, email: str, password: str) -> HttpResponse:
        pass

    @abstractmethod
    def reset_user_password(self, user_reset: UserResetPasswordDTO) -> HttpResponse:
        pass

    @abstractmethod
    def decode_token_validity(self, token: str) -> dict:
        pass

    @abstractmethod
    def decode_token_user(self, token: str, email: str) -> bool:
        pass
