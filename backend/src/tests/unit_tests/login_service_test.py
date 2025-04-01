import datetime
from unittest.mock import patch

import bcrypt
import jwt
import pytest

from src.application.enums.status_codes import StatusCode
from src.application.exceptions.invalid_user import InvalidUser
from src.application.exceptions.token_error import TokenError
from src.domain.services.Login.login_service import LoginService
from src.model.configs.env import load_secret_key
from src.tests.mocks.mock_user_repository import get_mock_user_repository

JWT_SECRET_KEY = load_secret_key()


@pytest.fixture
def login_service():
    user_repo = get_mock_user_repository()

    # Simulando a senha correta já hashada
    password = "password"
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    user_repo.get_user_by_email.return_value.password = hashed.decode('utf-8')

    return LoginService(user_repo)


@pytest.mark.skip("Not a test, just a helper function")
def generate_token(email: str) -> str:
    token = jwt.encode(
        {
            "user": email,
            "exp": (
                datetime.datetime.now() + datetime.timedelta(minutes=30)
            ).timestamp(),
        },
        JWT_SECRET_KEY,
        algorithm="HS256",
    )
    return token


def test_login_success(login_service):
    response = login_service.login("john@example.com", "password")

    assert response.status_code == StatusCode.OK.value
    assert response.body.token is not None
    decoded = jwt.decode(
        response.body.token,
        JWT_SECRET_KEY,
        algorithms=["HS256"],
        options={"verify_exp": False},
    )
    assert decoded["user"] == "john@example.com"


def test_login_user_not_found():
    user_repo = get_mock_user_repository()
    user_repo.get_user_by_email.return_value = None
    service = LoginService(user_repo)

    with pytest.raises(InvalidUser):
        service.login("nonexistent@example.com", "password")


def test_login_invalid_password():
    user_repo = get_mock_user_repository()
    user_repo.get_user_by_email.return_value.password = bcrypt.hashpw(
        "correct_password".encode('utf-8'), bcrypt.gensalt()
    ).decode('utf-8')
    service = LoginService(user_repo)

    with pytest.raises(InvalidUser):
        service.login("john@example.com", "wrong_password")


def test_decode_token_valid():
    token = jwt.encode(
        {
            "user": "john@example.com",
            "exp": datetime.datetime.now() + datetime.timedelta(minutes=30),
        },
        JWT_SECRET_KEY,
        algorithm="HS256",
    )

    is_valid = (
        jwt.decode(
            token, JWT_SECRET_KEY, algorithms=["HS256"], options={"verify_exp": False}
        )
        is not None
    )
    assert is_valid is True


def test_decode_token_expired():
    service = LoginService(get_mock_user_repository())
    token = jwt.encode(
        {
            "user": "john@example.com",
            "exp": (
                datetime.datetime.now() - datetime.timedelta(minutes=1)
            ).timestamp(),
        },
        JWT_SECRET_KEY,
        algorithm="HS256",
    )

    with pytest.raises(TokenError):
        service.decode_token_validity(token)


def test_decode_token_user_success():
    service = LoginService(get_mock_user_repository())
    email = "john@example.com"
    token = generate_token(email=email)

    assert service.decode_token_user(token, email) is True


def test_decode_token_user_wrong_email():
    service = LoginService(get_mock_user_repository())
    token = generate_token(email="john@example.com")

    with pytest.raises(Exception):
        service.decode_token_user(token, "wrong@example.com")


def test_decode_token_user_invalid_token():
    service = LoginService(get_mock_user_repository())
    invalid_token = "invalid.token.value"

    with pytest.raises(TokenError):
        service.decode_token_user(invalid_token, "john@example.com")
