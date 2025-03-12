import datetime
import bcrypt
import jwt
from src.application.dtos.http_types.http_response import HttpResponse
from src.application.dtos.jwt.jwt_token_dto import JWTTokenDTO
from src.application.exceptions.not_found import NotFound
from src.application.exceptions.password_not_valid import PasswordNotValid
from src.infra.repositories.User.user_repository_interface import IUserRepository
from src.model.configs.env import load_secret_key

JWT_SECRET_KEY=load_secret_key()

class LoginService:
    def __init__(self, user_repository: IUserRepository):
        self.user_repository = user_repository
    
    def login(self, email: str, password: str) -> HttpResponse:
        user = self.user_repository.get_user_by_email(email)
        if not user:
            raise NotFound("User not found")
        if not self.__dehash_password(password, user.password):
            raise PasswordNotValid("Password not valid")
        token = self.__generate_token(email)
        return HttpResponse(body=JWTTokenDTO(token), status_code=200)

    def decode_token_validity(self, token: str) -> bool:
        decoded = jwt.decode(token, JWT_SECRET_KEY, algorithms=["HS256"])
        if not decoded:
            raise jwt.InvalidTokenError
        if decoded['exp'] < datetime.datetime.now():
            raise jwt.ExpiredSignatureError
        return True
    
    def __generate_token(self, email:str) -> str:
        token = jwt.encode(
            {"user": email, "exp": datetime.datetime.now() + datetime.timedelta(minutes=30)},
            JWT_SECRET_KEY,
            algorithm="HS256")
        return token
    
    def __dehash_password(self, password: str, user_password:str) -> bool:
        return bcrypt.checkpw(password.encode('utf-8'), user_password.encode('utf-8'))
    