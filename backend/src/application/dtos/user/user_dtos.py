from dataclasses import dataclass

from src.application.exceptions.invalid_data import InvalidData


@dataclass()
class CreateUserDTO:
    name: str
    email: str
    password: str
    roles: str

    def __post_init__(self):
        if not self.name or not self.email or not self.password:
            raise InvalidData("Todos os campos são obrigatórios.")


@dataclass()
class UpdateUserDTO:
    name: str
    roles: str


@dataclass
class UserDTO:
    id: int
    name: str
    email: str
    roles: str

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "roles": self.roles,
        }


@dataclass
class UserLoginDTO:
    email: str
    password: str


@dataclass
class UserResetPasswordDTO:
    email: str
    password: str
    new_password: str
