from src.domain.services.User.login_service import LoginService
from src.domain.services.User.user_service import UserService
from src.infra.repositories.User.user_repository import UserRepository


class ServiceContainer:
    @staticmethod
    def user_service():
        user_repository = UserRepository()
        return UserService(user_repository)
    
    @staticmethod
    def login_service():
        user_repository = UserRepository()
        return LoginService(user_repository)
    