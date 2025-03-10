from src.model.configs.connection import DbConnectionHandler
from src.model.entities.user import User
from src.infra.repositories.User.user_repository_interface import IUserRepository
from src.application.dtos.user.user_dtos import CreateUserDTO, UpdateUserDTO
from src.application.exceptions.user_not_created import UserNotCreated



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
    
    def get_user_by_email(self, email: str) -> User:pass

    def get_user_by_id(self, user_id: int) -> User:pass

    def update_user(self, user_id:int, props:UpdateUserDTO) -> None:pass

    def delete_user(self, user_id:int) -> None:pass