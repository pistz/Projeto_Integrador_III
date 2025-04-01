from abc import ABC, abstractmethod

from src.model.entities.category import Category


class ICategoryRepository(ABC):

    @abstractmethod
    def create_category(self, name: str) -> None:
        pass

    @abstractmethod
    def get_category_by_name(self, name: str) -> list[Category]:
        pass

    @abstractmethod
    def get_category_by_id(self, category_id: int) -> Category:
        pass

    @abstractmethod
    def get_all_categories(self) -> list[Category]:
        pass

    @abstractmethod
    def update_category(self, category_id: int, name: str) -> None:
        pass

    @abstractmethod
    def delete_category(self, category_id: int) -> None:
        pass
