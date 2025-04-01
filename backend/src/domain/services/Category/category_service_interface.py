from abc import ABC, abstractmethod

from src.application.dtos.category.category_dto import CategoryDTO
from src.application.dtos.http_types.http_response import HttpResponse


class ICategoryService(ABC):

    @abstractmethod
    def create_category(self, name: str) -> HttpResponse:
        pass

    @abstractmethod
    def get_category_by_name(self, name: str) -> HttpResponse:
        pass

    @abstractmethod
    def get_category_by_id(self, category_id: int) -> HttpResponse:
        pass

    @abstractmethod
    def get_all_categories(self) -> HttpResponse:
        pass

    @abstractmethod
    def update_category(self, category_id: int, name: str) -> HttpResponse:
        pass

    @abstractmethod
    def delete_category(self, category_id: int) -> HttpResponse:
        pass
