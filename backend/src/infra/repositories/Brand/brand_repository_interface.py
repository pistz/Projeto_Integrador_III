from abc import ABC, abstractmethod

from src.model.entities.brand import Brand


class IBrandRepository(ABC):

    @abstractmethod
    def create_brand(self, name: str) -> None:
        pass

    @abstractmethod
    def get_brand_by_name(self, name: str) -> list[Brand]:
        pass

    @abstractmethod
    def get_brand_by_id(self, id: int) -> Brand:
        pass

    @abstractmethod
    def get_all_brands(self) -> list[Brand]:
        pass

    @abstractmethod
    def update_brand(self, id: int, name: str) -> None:
        pass

    @abstractmethod
    def delete_brand(self, id: int) -> None:
        pass
