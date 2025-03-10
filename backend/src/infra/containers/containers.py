

from src.infra.repositories.User.user_repository import UserRepository
from src.domain.services.User.user_service import UserService

class ServiceContainer:
    @staticmethod
    def user_service():
        user_repository = UserRepository()
        return UserService(user_repository)
