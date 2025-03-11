from src.application.exceptions.invalid_user import InvalidUser
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
    
    def get_user_by_email(self, email: str) -> User:
        with DbConnectionHandler() as db:
            try:
                user = db.session.query(User).filter(User.email == email).one_or_none()
                return user
            except Exception as e:
                raise InvalidUser(f'User not found: {e}')

    def get_user_by_id(self, user_id: int) -> User:
        with DbConnectionHandler() as db:
            try:
                user = db.session.query(User).filter(User.id == user_id).one_or_none()
                return user
            except Exception as e:
                raise InvalidUser(f'User not found: {e}')

    def update_user(self, user_id:int, user:UpdateUserDTO) -> None:
        with DbConnectionHandler() as db:
            try:
                found_user = db.session.query(User).filter(User.id == user_id).one_or_none()
                if found_user:
                    found_user.name = user.name
                    found_user.password = user.password

                    db.session.add(found_user)
                    db.session.commit()
                    return
                else:
                    raise InvalidUser('User not found')
            except Exception as e:
                db.session.rollback()
                raise InvalidUser(f'Error updating user: {e}')


    def delete_user(self, user_id:int) -> None:pass