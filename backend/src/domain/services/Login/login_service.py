import datetime
import bcrypt
import jwt
from src.application.dtos.http_types.http_response import HttpResponse
from src.application.dtos.jwt.jwt_token_dto import JWTTokenDTO
from src.application.exceptions.not_found import NotFound
from src.application.exceptions.token_error import TokenError
from src.infra.repositories.User.user_repository_interface import IUserRepository
from src.model.configs.env import load_secret_key

JWT_SECRET_KEY=load_secret_key()

class LoginService:
    def __init__(self, user_repository: IUserRepository):
        self.user_repository = user_repository
        self.now = datetime.datetime.now(tz=datetime.timezone.utc)
    
    def login(self, email: str, password: str) -> HttpResponse:
        user = self.user_repository.get_user_by_email(email)
        if not user:
            raise NotFound("Incorrect email or password")
        if not self.__dehash_password(password, user.password):
            raise NotFound("Incorrect email or password")
        token = self.__generate_token(email)
        return HttpResponse(body=JWTTokenDTO(token), status_code=200)

    def decode_token_validity(self, token: str) -> bool:
        decoded = jwt.decode(token, JWT_SECRET_KEY, algorithms=["HS256"])
        if not decoded:
            raise TokenError(jwt.InvalidTokenError)
        if decoded['exp'] < self.now.timestamp():
            raise TokenError(jwt.ExpiredSignatureError)
        return True
    
    def decode_token_user(self, token: str, email:str) -> bool:
        decoded = jwt.decode(token, JWT_SECRET_KEY, algorithms=["HS256"])
        if not decoded:
            raise TokenError(jwt.InvalidTokenError)
        if decoded['user'] != email:
            raise TokenError(jwt.InvalidTokenError)
        return True
    
    def __generate_token(self, email:str) -> str:
        token = jwt.encode(
            {
                "user": email, "exp":(self.now + datetime.timedelta(minutes=30)).timestamp()
            },
            JWT_SECRET_KEY,
            algorithm="HS256")
        return token
    
    def __dehash_password(self, password: str, user_password:str) -> bool:
        return bcrypt.checkpw(password.encode('utf-8'), user_password.encode('utf-8'))
    