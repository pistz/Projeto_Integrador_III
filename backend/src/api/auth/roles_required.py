from functools import wraps

from flask import g

from src.application.exceptions.unauthorized import Unauthorized


def roles_required(*allowed_roles):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            user = getattr(g, 'user', None)
            if not user:
                raise Unauthorized("Usuário não autenticado")

            user_roles = user.get("roles", [])
            if not any(role in user_roles for role in allowed_roles):
                raise Unauthorized("Permissão negada para este recurso")

            return f(*args, **kwargs)

        return wrapper

    return decorator
