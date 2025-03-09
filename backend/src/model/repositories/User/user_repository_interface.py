from abc import ABC, abstractmethod

from backend.src.dtos.user.user_dtos import CreateUserDTO, UpdateUserDTO
from backend.src.model.entities.user import User

class UserRepositoryInterface(ABC):
    
    @abstractmethod
    def create_user(self, user: CreateUserDTO) -> User:pass

    @abstractmethod
    def get_user_by_email(self, email: str) -> User:pass

    @abstractmethod
    def get_user_by_id(self, user_id: int) -> User:pass

    @abstractmethod
    def update_user(self, user_id:int, props:UpdateUserDTO) -> User:pass

    @abstractmethod
    def delete_user(self, user_id:int) -> None:pass