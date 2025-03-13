from abc import ABC, abstractmethod

from src.application.dtos.http_types.http_response import HttpResponse
from src.application.dtos.user.user_dtos import CreateUserDTO, UpdateUserDTO, UserDTO

class IUserService(ABC):

    @abstractmethod
    def create_user(self, user: CreateUserDTO) -> HttpResponse:pass

    @abstractmethod
    def get_user_by_email(self, email: str) -> HttpResponse:pass

    @abstractmethod
    def get_user_by_id(self, id: int) -> HttpResponse:pass

    @abstractmethod
    def get_all_users(self) -> HttpResponse:pass

    @abstractmethod
    def update_user(self, user_id:int, user: UpdateUserDTO) -> HttpResponse:pass

    @abstractmethod
    def delete_user(self, user_id:int) -> HttpResponse:pass
