from abc import ABC, abstractmethod

from src.application.dtos.user.user_dtos import CreateUserDTO, UpdateUserDTO
from src.model.entities.user import User

class IUserRepository(ABC):
    
    @abstractmethod
    def create_user(self, user: CreateUserDTO) -> None:pass

    @abstractmethod
    def get_user_by_email(self, email: str) -> User:pass

    @abstractmethod
    def get_user_by_id(self, user_id: int) -> User:pass

    @abstractmethod
    def get_all_users(self) -> list[User]:pass

    @abstractmethod
    def update_user(self, user_id:int, user:UpdateUserDTO) -> None:pass

    @abstractmethod
    def delete_user(self, user_id:int) -> None:pass