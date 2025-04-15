from functools import wraps

from flask import request, g

from src.application.exceptions.token_error import TokenError
from src.domain.containers.service_container import ServiceContainer

auth_service = ServiceContainer.login_service()


def jwt_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            raise TokenError("Token inválido")

        token = auth_header.split(" ")[1]

        try:
            user_data = auth_service.decode_token_validity(token)
            g.user = user_data

        except Exception as e:
            raise TokenError(str(e))

        return f(*args, **kwargs)

    return decorated_function
