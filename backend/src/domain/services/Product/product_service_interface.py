from abc import ABC, abstractmethod

from src.application.dtos.http_types.http_response import HttpResponse
from src.application.dtos.product.product_dtos import CreateProductDTO, UpdateProductDTO


class IProductService(ABC):

    @abstractmethod
    def get_product_by_id(self, product_id: int) -> HttpResponse:
        pass

    @abstractmethod
    def get_product_by_barcode(self, barcode: str) -> HttpResponse:
        pass

    @abstractmethod
    def get_all_products(self) -> HttpResponse:
        pass

    @abstractmethod
    def get_all_products_by_brand_id(self, brand_id: int) -> HttpResponse:
        pass

    @abstractmethod
    def get_all_products_by_category_id(self, category_id: int) -> HttpResponse:
        pass

    @abstractmethod
    def create_product(self, product: CreateProductDTO) -> HttpResponse:
        pass

    @abstractmethod
    def update_product(self, product_id, product: UpdateProductDTO) -> HttpResponse:
        pass

    @abstractmethod
    def delete_product(self, product_id: int) -> HttpResponse:
        pass
