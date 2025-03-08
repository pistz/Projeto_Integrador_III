from abc import ABC, abstractmethod

from backend.src.model.entities.user import User

class UserRepositoryInterface(ABC):
    
    @abstractmethod
    def create_user(self, user: dict) -> User:pass