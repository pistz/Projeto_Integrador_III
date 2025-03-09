from backend.src.dtos.user.user_dtos import CreateUserDTO
from backend.src.model.configs.connection import DbConnectionHandler
from backend.src.model.entities.user import User
from backend.src.model.repositories.User.user_repository_interface import UserRepositoryInterface


class UserRepository(UserRepositoryInterface):

    def create_user(self, user:CreateUserDTO) -> User:
        with DbConnectionHandler() as db:
            try:
                new_user = User(name=user.name, email=user.email, password=user.password)

                db.session.add(new_user)
                db.session.commit()

                return new_user
            except Exception as e:
                
                db.session.rollback()
                raise Exception(f'Error creating user: {e}')