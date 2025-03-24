import datetime
import bcrypt
from jwt import decode, ExpiredSignatureError, InvalidTokenError, encode
from src.application.dtos.http_types.http_response import HttpResponse
from src.application.dtos.jwt.jwt_token_dto import JWTTokenDTO
from src.application.enums.status_codes import StatusCode
from src.application.exceptions.invalid_user import InvalidUser
from src.application.exceptions.not_found import NotFound
from src.application.exceptions.token_error import TokenError
from src.domain.services.Login.login_service_interface import ILoginService
from src.infra.repositories.User.user_repository_interface import IUserRepository
from src.model.configs.env import load_secret_key
from src.model.entities.user import User

JWT_SECRET_KEY=load_secret_key()

class LoginService(ILoginService):
    def __init__(self, user_repository: IUserRepository):
        self.user_repository = user_repository
        self.now = datetime.datetime.now(tz=datetime.timezone.utc)
    
    def login(self, email: str, password: str) -> HttpResponse:
        user = self.user_repository.get_user_by_email(email)
        if not user:
            raise InvalidUser("Email ou password incorretos")
        if not self.__dehash_password(password, user.password):
            raise InvalidUser("Email ou password incorretos")
        token = self.__generate_token(user)
        return HttpResponse(body=JWTTokenDTO(token), status_code=StatusCode.OK.value)

    def decode_token_validity(self, token: str) -> bool:
        try:
            decode(token, JWT_SECRET_KEY, algorithms=["HS256"])
        except ExpiredSignatureError:
            raise TokenError("Token expirado.")
        except InvalidTokenError:
            raise TokenError("Token inválido.")

        return True
    
    def decode_token_user(self, token: str, email: str) -> bool:
        try:
            decoded = decode(token, JWT_SECRET_KEY, algorithms=["HS256"])
        except ExpiredSignatureError:
            raise TokenError("Token expirado.")
        except InvalidTokenError:
            raise TokenError("Token inválido.")

        if decoded.get('user') != email:
            raise TokenError("Token não pertence a este usuário.")

        return True
    
    def __generate_token(self, user:User) -> str:
        token = encode(
            {   "name": user.name,
                "user": user.email, 
                "exp":(self.now + datetime.timedelta(hours=12)).timestamp()
            },
            JWT_SECRET_KEY,
            algorithm="HS256")
        return token
    
    def __dehash_password(self, password: str, user_password:str) -> bool:
        return bcrypt.checkpw(password.encode('utf-8'), user_password.encode('utf-8'))
    