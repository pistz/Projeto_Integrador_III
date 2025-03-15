import re
from src.application.enums.status_codes import StatusCode
from src.application.exceptions.email_not_valid import EmailNotValid
from src.application.exceptions.invalid_user import InvalidUser
from src.application.exceptions.not_found import NotFound
from src.application.exceptions.password_not_valid import PasswordNotValid
from src.infra.repositories.User.user_repository_interface import IUserRepository
from src.domain.services.User.user_service_interface import IUserService
from src.application.dtos.http_types.http_response import HttpResponse
from src.application.dtos.user.user_dtos import CreateUserDTO, UpdateUserDTO, UserDTO
import bcrypt


class UserService(IUserService):
    def __init__(self, user_repository: IUserRepository):
        self.user_repository = user_repository
    
    def create_user(self, user: CreateUserDTO) -> HttpResponse:
        self.__is_valid_email(user.email)
        user_exists = self.user_repository.get_user_by_email(user.email)
        if user_exists:
            raise EmailNotValid('User already exists')
        self.__is_valid_password_len(user.password)
        hashed_password = self.__hash_password(user.password)
        user.password = hashed_password
        self.user_repository.create_user(user)
        return HttpResponse(status_code=StatusCode.CREATED.value, body={'message': 'User created successfully'})
    
    def get_user_by_email(self, email: str) -> HttpResponse:
        self.__is_valid_email(email)
        user = self.user_repository.get_user_by_email(email)
        if not user:
            raise NotFound('User not found')
        user_response = UserDTO(id=user.id, name=user.name, email=user.email)
        return HttpResponse(status_code=StatusCode.OK.value, body=user_response)
    
    def get_user_by_id(self, user_id: int) -> HttpResponse:
        user = self.user_repository.get_user_by_id(user_id)
        if not user:
            raise NotFound('User not found')
        user_response = UserDTO(id=user.id, name=user.name, email=user.email)
        return HttpResponse(status_code=StatusCode.OK.value, body=user_response)
    
    def get_all_users(self) -> list[UserDTO]:
        users = self.user_repository.get_all_users()
        users_response = [UserDTO(id=user.id, name=user.name, email=user.email) for user in users]
        return HttpResponse(status_code=StatusCode.OK.value, body=users_response)
    
    def update_user(self, user_id:int, user: UpdateUserDTO) -> HttpResponse:
        user_exists = self.user_repository.get_user_by_id(user_id=user_id)
        if not user_exists:
            raise InvalidUser('User not valid')
        if user.password:
            self.__is_valid_password_len(user.password)
            hashed_password = self.__hash_password(user.password)
            user.password = hashed_password
        if not user.name:
            user.name = user_exists.name
        self.user_repository.update_user(user_id=user_id, user=user)
        return HttpResponse(status_code=StatusCode.OK.value, body={'message': 'User updated successfully'})
    
    def delete_user(self, user_id:int) -> HttpResponse:
        user = self.user_repository.get_user_by_id(user_id)
        if not user:
            raise InvalidUser('User not valid')
        self.user_repository.delete_user(user_id)
        return HttpResponse(status_code=StatusCode.OK.value, body={'message': 'User deleted successfully'})
    
    def __hash_password(self, password: str) -> str:
        return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    def __is_valid_email(self, email:str) -> None:
        regex = r'^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+$'
        is_valid = re.search(regex, email)
        if is_valid:
            return
        raise EmailNotValid("Email is not a valid email")
    
    def __is_valid_password_len(self, password: str) -> None:
        if len(password) < 4 or len(password) > 8:
            raise PasswordNotValid('Password must be between 4 and 8 characters')
