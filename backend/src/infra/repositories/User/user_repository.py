from typing import Optional

from src.application.dtos.user.user_dtos import CreateUserDTO, UpdateUserDTO
from src.application.exceptions.database_exception import DatabaseException
from src.infra.repositories.User.user_repository_interface import IUserRepository
from src.model.configs.connection import DbConnectionHandler
from src.model.entities.user import User


class UserRepository(IUserRepository):

    def create_user(self, user: CreateUserDTO) -> User:
        with DbConnectionHandler() as db:
            try:
                new_user = User(
                    name=user.name,
                    email=user.email,
                    password=user.password,
                    roles=user.roles,
                )

                db.session.add(new_user)
                db.session.commit()

                return new_user
            except Exception as e:
                db.session.rollback()
                raise DatabaseException(
                    message='Erro ao criar usuário', aditional=str(e)
                )

    def get_user_by_email(self, email: str) -> User | None:
        user = self.__find_user(email=email)
        return user

    def get_user_by_id(self, user_id: int) -> User | None:
        user = self.__find_user(user_id=user_id)
        return user

    def get_all_users(self) -> list[User]:
        with DbConnectionHandler() as db:
            users = db.session.query(User).all()
            return users

    def update_user(self, user_id: int, user: UpdateUserDTO) -> None:
        with DbConnectionHandler() as db:
            try:
                found_user = self.__find_user(user_id=user_id)
                if not found_user:
                    raise DatabaseException(message='Usuário não encontrado')
                found_user.name = user.name if user.name else found_user.name
                found_user.password = (
                    user.password if user.password else found_user.password
                )
                found_user.roles = user.roles if user.roles else found_user.roles

                db.session.add(found_user)
                db.session.commit()
                return
            except Exception as e:
                db.session.rollback()
                raise DatabaseException(
                    message='Erro ao atualizar usuário', aditional=str(e)
                )

    def delete_user(self, user_id: int) -> None:
        with DbConnectionHandler() as db:
            try:
                user = self.__find_user(user_id=user_id)
                db.session.delete(user)
                db.session.commit()
                return
            except Exception as e:
                db.session.rollback()
                raise DatabaseException(
                    message='Erro ao deletar usuário', aditional=str(e)
                )

    def __find_user(self, user_id: int = None, email: str = None) -> Optional[User]:
        if user_id is not None:
            with DbConnectionHandler() as db:
                user = db.session.query(User).filter(User.id == user_id).one_or_none()
                return user
        if email is not None:
            with DbConnectionHandler() as db:
                user = db.session.query(User).filter(User.email == email).one_or_none()
                return user
