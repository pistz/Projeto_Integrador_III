from dataclasses import dataclass


@dataclass
class CategoryDTO:
    id: int
    name: str

    def to_dict(self):
        return {"id": self.id, "name": self.name}
