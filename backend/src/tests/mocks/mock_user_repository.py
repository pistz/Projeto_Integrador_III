from unittest.mock import MagicMock


def get_mock_user_repository():
    repo = MagicMock()

    fake_user = MagicMock()
    fake_user.id = 1
    fake_user.name = "John Doe"
    fake_user.email = "john@example.com"
    fake_user.password = "password"
    fake_user.roles = "admin"

    repo.get_user_by_email.return_value = fake_user
    repo.get_user_by_id.return_value = fake_user
    repo.create_user.return_value = None
    repo.update_user.return_value = None
    repo.delete_user.return_value = None

    return repo
