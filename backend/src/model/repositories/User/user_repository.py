from application.dtos.user.user_dtos import CreateUserDTO
from application.exceptions.user_not_created import UserNotCreated
from backend.src.model.configs.connection import DbConnectionHandler
from backend.src.model.entities.user import User
from backend.src.model.repositories.User.user_repository_interface import IUserRepository


class UserRepository(IUserRepository):

    def create_user(self, user:CreateUserDTO) -> User:
        with DbConnectionHandler() as db:
            try:
                new_user = User(name=user.name, email=user.email, password=user.password)

                db.session.add(new_user)
                db.session.commit()

                return new_user
            except Exception as e:
                db.session.rollback()
                raise UserNotCreated(f'Error creating user: {e}')