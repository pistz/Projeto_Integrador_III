from dataclasses import dataclass


@dataclass
class CreateProductDTO:
    name: str
    description: str
    brand_id: int
    has_pack: bool
    pack_value: int
    category_id: int

    def to_dict(self):
        return {
            "name": self.name,
            "description": self.description,
            "brand_id": self.brand_id,
            "has_pack": self.has_pack,
            "pack_value": self.pack_value,
            "category_id": self.category_id,
        }


@dataclass
class UpdateProductDTO:
    name: str
    description: str

    def to_dict(self):
        return {
            "name": self.name,
            "description": self.description,
        }


@dataclass
class ProductDTO:
    id: int
    name: str
    description: str
    brand_id: int
    has_pack: bool
    pack_value: int
    category_id: int

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "brand_id": self.brand_id,
            "has_pack": self.has_pack,
            "pack_value": self.pack_value,
            "category_id": self.category_id,
        }
