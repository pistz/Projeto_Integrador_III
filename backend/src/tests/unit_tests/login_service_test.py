import pytest
import bcrypt
import jwt
import datetime
from unittest.mock import patch


from src.application.exceptions.not_found import NotFound
from src.domain.services.User.login_service import LoginService
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

def test_login_success(login_service):
    response = login_service.login("john@example.com", "password")

    assert response.status_code == 200
    assert response.body.token is not None
    decoded = jwt.decode(response.body.token, JWT_SECRET_KEY, algorithms=["HS256"], options={"verify_exp": False})
    assert decoded["user"] == "john@example.com"

def test_login_user_not_found():
    user_repo = get_mock_user_repository()
    user_repo.get_user_by_email.return_value = None
    service = LoginService(user_repo)

    with pytest.raises(NotFound):
        service.login("nonexistent@example.com", "password")

def test_login_invalid_password():
    user_repo = get_mock_user_repository()
    user_repo.get_user_by_email.return_value.password = bcrypt.hashpw("correct_password".encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    service = LoginService(user_repo)

    with pytest.raises(NotFound):
        service.login("john@example.com", "wrong_password")

def test_decode_token_valid():
    token = jwt.encode({
        "user": "john@example.com",
        "exp": datetime.datetime.now() + datetime.timedelta(minutes=30)
    }, JWT_SECRET_KEY, algorithm="HS256")

    is_valid = jwt.decode(token, JWT_SECRET_KEY, algorithms=["HS256"], options={"verify_exp": False}) is not None
    assert is_valid is True

def test_decode_token_expired():
    service = LoginService(get_mock_user_repository())
    token = jwt.encode({
        "user": "john@example.com",
        "exp": datetime.datetime.now() - datetime.timedelta(minutes=1)
    }, JWT_SECRET_KEY, algorithm="HS256")

    with pytest.raises(jwt.ExpiredSignatureError):
        service.decode_token_validity(token)
