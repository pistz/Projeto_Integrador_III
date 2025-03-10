from dataclasses import dataclass

@dataclass(frozen=True)
class CreateUserDTO:
    name: str
    email: str
    password: str
    
    def __post_init__(self):
        if not self.name or not self.email or not self.password:
            raise ValueError("Todos os campos são obrigatórios.")

@dataclass(frozen=True)
class UpdateUserDTO:
    name: str
    password: str