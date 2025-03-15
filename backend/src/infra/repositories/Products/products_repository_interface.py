from abc import ABC, abstractmethod

from src.application.dtos.product.product_dtos import UpdateProductDTO, CreateProductDTO
from src.model.entities.product import Product


class IProductsRepository(ABC):

    @abstractmethod
    def get_all_products(self) -> list[Product]:pass
    
    @abstractmethod
    def get_product_by_id(self, product_id: int) -> Product:pass

    @abstractmethod
    def get_product_by_name(self, product_name: str) -> list[Product]:pass

    @abstractmethod
    def get_all_products_by_category_id(self, category_id: int) -> list[Product]:pass

    @abstractmethod
    def get_all_products_by_brand_id(self, brand_id: int) -> list[Product]:pass
        
    @abstractmethod
    def create_product(self, product: CreateProductDTO) -> None:pass
        
    @abstractmethod
    def update_product(self, product_id: int, product: UpdateProductDTO) -> None:pass

    @abstractmethod
    def delete_product(self, product_id: int) -> None:pass