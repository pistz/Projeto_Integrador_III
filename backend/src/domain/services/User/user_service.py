from src.infra.repositories.User.user_repository_interface import IUserRepository
from src.domain.services.User.user_service_interface import IUserService
from src.application.dtos.http_types.http_response import HttpResponse
from src.application.dtos.user.user_dtos import CreateUserDTO


class UserService(IUserService):
    def __init__(self, user_repository: IUserRepository):
        self.user_repository = user_repository
    
    def create_user(self, user: CreateUserDTO) -> HttpResponse:
        self.user_repository.create_user(user)
        return HttpResponse(status_code=201, body={'message': 'User created successfully'})
