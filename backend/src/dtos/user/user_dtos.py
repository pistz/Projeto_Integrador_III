from dataclasses import dataclass

@dataclass(frozen=True)
class CreateUserDTO:
    name: str
    email: str
    password: str

@dataclass(frozen=True)
class UpdateUserDTO:
    name: str
    password: str