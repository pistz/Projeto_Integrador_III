from abc import ABC, abstractmethod

from src.application.dtos.brand.brand_dto import BrandDTO
from src.application.dtos.http_types.http_response import HttpResponse


class IBrandService(ABC):

    @abstractmethod
    def create_brand(self, name: str) -> HttpResponse:
        pass

    @abstractmethod
    def get_brand_by_name(self, name: str) -> HttpResponse:
        pass

    @abstractmethod
    def get_brand_by_id(self, brand_id: int) -> HttpResponse:
        pass

    @abstractmethod
    def get_all_brands(self) -> HttpResponse:
        pass

    @abstractmethod
    def update_brand(self, brand_id: int, name: str) -> HttpResponse:
        pass

    @abstractmethod
    def delete_brand(self, brand_id: int) -> HttpResponse:
        pass
