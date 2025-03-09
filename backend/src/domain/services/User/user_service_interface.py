from abc import ABC, abstractmethod

from application.dtos.user.user_dtos import CreateUserDTO
from model.entities.user import User

class IUserService(ABC):

    @abstractmethod
    def create_user(self, user: CreateUserDTO) -> User:pass
