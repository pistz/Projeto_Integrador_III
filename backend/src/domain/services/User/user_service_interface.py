from abc import ABC, abstractmethod

from src.application.dtos.user.user_dtos import CreateUserDTO, UpdateUserDTO, UserDTO

class IUserService(ABC):

    @abstractmethod
    def create_user(self, user: CreateUserDTO) -> None:pass

    @abstractmethod
    def get_user_by_email(self, email: str) -> UserDTO:pass

    @abstractmethod
    def get_user_by_id(self, id: int) -> UserDTO:pass

    @abstractmethod
    def update_user(self, user_id:int, user: UpdateUserDTO) -> None:pass

    @abstractmethod
    def delete_user(self, user_id:int) -> None:pass
