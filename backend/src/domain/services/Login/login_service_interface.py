from abc import ABC, abstractmethod

from src.application.dtos.http_types.http_response import HttpResponse


class ILoginService(ABC):

    @abstractmethod
    def login(self, email: str, password: str) -> HttpResponse:
        pass

    @abstractmethod
    def decode_token_validity(self, token: str) -> bool:
        pass

    @abstractmethod
    def decode_token_user(self, token: str, email: str) -> bool:
        pass
