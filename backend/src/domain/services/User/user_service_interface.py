from abc import ABC, abstractmethod

from src.application.dtos.user.user_dtos import CreateUserDTO
from src.model.entities.user import User

class IUserService(ABC):

    @abstractmethod
    def create_user(self, user: CreateUserDTO) -> User:pass
