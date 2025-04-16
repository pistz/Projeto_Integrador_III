import bcrypt

from src.application.exceptions.password_not_valid import PasswordNotValid


def dehash_password(password: str, user_password: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), user_password.encode('utf-8'))


def is_valid_password_len(password: str) -> None:
    if len(password) < 4 or len(password) > 18:
        raise PasswordNotValid('Password deve ter entre 4 e 18 caracteres')


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
