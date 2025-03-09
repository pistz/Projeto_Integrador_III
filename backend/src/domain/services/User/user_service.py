from application.exceptions.user_not_created import UserNotCreated
from domain.services.User.user_service_interface import IUserService
from application.dtos.http_types.http_response import HttpResponse
from application.dtos.user.user_dtos import CreateUserDTO
from model.repositories.User.user_repository_interface import IUserRepository


class UserService(IUserService):
    def __init__(self, user_repository: IUserRepository):
        self.user_repository = user_repository
    
    def create_user(self, user: CreateUserDTO) -> HttpResponse:
        self.user_repository.create_user(user)
        return HttpResponse(status_code=201, body={'message': 'User created successfully'})
