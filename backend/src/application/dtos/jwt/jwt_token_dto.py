from dataclasses import dataclass


@dataclass
class JWTTokenDTO:
    token:str

    def to_dict(self):
        return {'token': self.token}