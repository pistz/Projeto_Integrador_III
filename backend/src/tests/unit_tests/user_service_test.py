from unittest.mock import MagicMock
import pytest
from src.application.dtos.user.user_dtos import CreateUserDTO, UpdateUserDTO, UserDTO
from src.application.exceptions.email_not_valid import EmailNotValid
from src.application.exceptions.invalid_user import InvalidUser
from src.application.exceptions.password_not_valid import PasswordNotValid
from src.domain.services.User.user_service import UserService
from src.tests.mocks.mock_user_repository import get_mock_user_repository


def test_create_user_success():
    repo = get_mock_user_repository()
    repo.get_user_by_email.return_value = None  # Corrigido: simula que o e-mail ainda não está cadastrado
    repo.create_user.return_value = None  # Opcional, apenas para clareza

    service = UserService(repo)

    dto = CreateUserDTO(name="Jane Doe", email="jane@example.com", password="123456")
    response = service.create_user(dto)

    assert response.status_code == StatusCode.CREATED.value
    assert response.body['message'] == 'User created successfully'
    repo.get_user_by_email.assert_called_once_with("jane@example.com")
    repo.create_user.assert_called_once()


def test_create_user_invalid_email():
    repo = get_mock_user_repository()
    service = UserService(repo)

    dto = CreateUserDTO(name="Jane Doe", email="invalid-email", password="123456")

    with pytest.raises(EmailNotValid):
        service.create_user(dto)


def test_create_user_short_password():
    repo = get_mock_user_repository()
    repo.get_user_by_email.return_value = None
    service = UserService(repo)

    dto = CreateUserDTO(name="Jane Doe", email="jane@example.com", password="123")

    with pytest.raises(PasswordNotValid):
        service.create_user(dto)


def test_get_user_by_email_success():
    repo = get_mock_user_repository()
    service = UserService(repo)

    response = service.get_user_by_email("john@example.com")

    assert response.status_code == StatusCode.OK.value
    assert isinstance(response.body, UserDTO)
    assert response.body.email == "john@example.com"
    assert response.body.name == "John Doe"
    assert response.body.id == 1
    repo.get_user_by_email.assert_called_once_with("john@example.com")


def test_update_user_success():
    repo = get_mock_user_repository()
    service = UserService(repo)

    dto = UpdateUserDTO(name="New Name", password="654321")
    response = service.update_user(1, dto)

    assert response.status_code == StatusCode.OK.value
    assert response.body['message'] == 'User updated successfully'
    repo.update_user.assert_called_once()


def test_update_user_not_found():
    repo = get_mock_user_repository()
    repo.get_user_by_id.return_value = None
    service = UserService(repo)

    dto = UpdateUserDTO(name="New Name", password="654321")

    with pytest.raises(InvalidUser):
        service.update_user(99, dto)


def test_delete_user_success():
    repo = get_mock_user_repository()
    service = UserService(repo)

    response = service.delete_user(1)

    assert response.status_code == StatusCode.OK.value
    assert response.body['message'] == 'User deleted successfully'
    repo.delete_user.assert_called_once_with(1)


def test_delete_user_not_found():
    repo = get_mock_user_repository()
    repo.get_user_by_id.return_value = None
    service = UserService(repo)

    with pytest.raises(InvalidUser):
        service.delete_user(99)