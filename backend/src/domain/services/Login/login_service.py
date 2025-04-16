import datetime

import bcrypt
from jwt import ExpiredSignatureError, InvalidTokenError, decode, encode

from src.application.dtos.http_types.http_response import HttpResponse
from src.application.dtos.jwt.jwt_token_dto import JWTTokenDTO
from src.application.dtos.user.user_dtos import UserResetPasswordDTO
from src.application.enums.status_codes import StatusCode
from src.application.exceptions.invalid_user import InvalidUser
from src.application.exceptions.password_not_valid import PasswordNotValid
from src.application.exceptions.token_error import TokenError
from src.application.exceptions.unauthorized import Unauthorized
from src.domain.services.Login.login_service_interface import ILoginService
from src.infra.repositories.User.user_repository_interface import IUserRepository
from src.model.configs.env import load_secret_key
from src.model.entities.user import User

JWT_SECRET_KEY = load_secret_key()


class LoginService(ILoginService):
    def __init__(self, user_repository: IUserRepository):
        self.user_repository = user_repository

    def login(self, email: str, password: str) -> HttpResponse:
        user = self.user_repository.get_user_by_email(email)
        if not user:
            raise InvalidUser("Email ou password incorretos")
        if not self.__dehash_password(password, user.password):
            raise InvalidUser("Email ou password incorretos")
        token = self.__generate_token(user)
        return HttpResponse(
            body=JWTTokenDTO(token).to_dict(), status_code=StatusCode.OK.value
        )

    def reset_user_password(self, user_reset: UserResetPasswordDTO) -> HttpResponse:
        email_user = self.user_repository.get_user_by_email(user_reset.email)
        if not email_user:
            raise InvalidUser("Usuário não encontrado.")

        if not self.__dehash_password(user_reset.password, email_user.password):
            raise InvalidUser("Dados incorretos.")
        self.__is_valid_password_len(user_reset.new_password)
        hashed_password = self.__hash_password(user_reset.new_password)
        user_reset.new_password = hashed_password
        self.user_repository.reset_user_password(user_reset=user_reset)
        return HttpResponse(
            status_code=StatusCode.CREATED.value,
            body={"message": "Senha alterada com sucesso"},
        )

    def decode_token_validity(self, token: str) -> dict:
        try:
            payload = decode(token, JWT_SECRET_KEY, algorithms=["HS256"])
            return payload
        except ExpiredSignatureError:
            raise Unauthorized("Token expirado.")
        except InvalidTokenError:
            raise Unauthorized("Token inválido.")

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

    def __generate_token(self, user: User) -> str:
        now = datetime.datetime.now(tz=datetime.timezone.utc)

        token = encode(
            {
                "name": user.name,
                "user": user.email,
                "roles": user.roles,
                "exp": (now + datetime.timedelta(hours=12)).timestamp(),
            },
            JWT_SECRET_KEY,
            algorithm="HS256",
        )
        return token

    def __dehash_password(self, password: str, user_password: str) -> bool:
        return bcrypt.checkpw(password.encode('utf-8'), user_password.encode('utf-8'))

    def __is_valid_password_len(self, password: str) -> None:
        if len(password) < 4 or len(password) > 8:
            raise PasswordNotValid('Password deve ter entre 4 e 8 caracteres')

    def __hash_password(self, password: str) -> str:
        return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
