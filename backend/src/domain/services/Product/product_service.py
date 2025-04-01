from src.application.dtos.http_types.http_response import HttpResponse
from src.application.dtos.product.product_dtos import (
    CreateProductDTO,
    ProductDTO,
    UpdateProductDTO,
)
from src.application.dtos.stock.stock_dtos import CurrentStockDTO, ProductStockDTO
from src.application.enums.status_codes import StatusCode
from src.application.exceptions.invalid_data import InvalidData
from src.application.exceptions.not_found import NotFound
from src.domain.services.Product.product_service_interface import IProductService
from src.infra.repositories.Products.products_repository_interface import (
    IProductsRepository,
)
from src.model.entities.product import Product


class ProductService(IProductService):
    def __init__(self, product_repository: IProductsRepository):
        self.__product_repository = product_repository

    def __set_current_stock(self, current_stock: ProductStockDTO):
        from src.domain.containers.service_container import ServiceContainer

        ServiceContainer.current_stock_service().set_current_stock(current_stock)

    def get_product_by_id(self, product_id: int) -> HttpResponse:
        found_product = self.__product_repository.get_product_by_id(product_id)
        if not found_product:
            raise NotFound('Produto não existe')
        product = ProductDTO(
            id=found_product.id,
            name=found_product.name,
            description=found_product.description,
            brand_id=found_product.brand_id,
            category_id=found_product.category_id,
        )
        return HttpResponse(status_code=StatusCode.OK.value, body=product)

    def get_product_by_name(self, product_name: str) -> HttpResponse:
        found_product = self.__product_repository.get_product_by_name(product_name)
        if not found_product or len(found_product) == 0:
            raise NotFound('Produto não existe')
        product = [
            ProductDTO(
                id=product.id,
                name=product.name,
                description=product.description,
                brand_id=product.brand_id,
                category_id=product.category_id,
            )
            for product in found_product
        ]
        return HttpResponse(status_code=StatusCode.OK.value, body=product)

    def get_all_products(self) -> HttpResponse:
        products_list: list[Product] = self.__product_repository.get_all_products()
        products = [
            ProductDTO(
                id=product.id,
                name=product.name,
                description=product.description,
                brand_id=product.brand_id,
                category_id=product.category_id,
            )
            for product in products_list
        ]
        return HttpResponse(status_code=StatusCode.OK.value, body=products)

    def get_all_products_by_brand_id(self, brand_id: int) -> HttpResponse:
        products_list: list[Product] = (
            self.__product_repository.get_all_products_by_brand_id(brand_id)
        )
        products = [
            ProductDTO(
                id=product.id,
                name=product.name,
                description=product.description,
                brand_id=product.brand_id,
                category_id=product.category_id,
            )
            for product in products_list
        ]
        return HttpResponse(status_code=StatusCode.OK.value, body=products)

    def get_all_products_by_category_id(self, category_id: int) -> HttpResponse:
        products_list: list[Product] = (
            self.__product_repository.get_all_products_by_category_id(category_id)
        )
        products = [
            ProductDTO(
                id=product.id,
                name=product.name,
                description=product.description,
                brand_id=product.brand_id,
                category_id=product.category_id,
            )
            for product in products_list
        ]
        return HttpResponse(status_code=StatusCode.OK.value, body=products)

    def create_product(self, product: CreateProductDTO) -> HttpResponse:
        self.__is_valid_product(product)
        create_product: Product = self.__product_repository.create_product(product)
        current_stock = ProductStockDTO(product_id=create_product.id, total_quantity=0)
        self.__set_current_stock(current_stock)
        return HttpResponse(
            status_code=StatusCode.CREATED.value,
            body={"message": "Produto criado com sucesso"},
        )

    def update_product(self, product_id, product: UpdateProductDTO) -> HttpResponse:
        found_product = self.__product_repository.get_product_by_id(product_id)
        if not found_product:
            raise NotFound('Produto não existe')

        found_product.name = product.name if product.name else found_product.name
        found_product.description = (
            product.description if product.description else found_product.description
        )

        self.__product_repository.update_product(
            product_id=product_id, product=found_product
        )
        return HttpResponse(
            status_code=StatusCode.CREATED.value,
            body={"message": "Produto atualizado com sucesso"},
        )

    def delete_product(self, product_id: int) -> HttpResponse:
        found_product = self.__product_repository.get_product_by_id(product_id)
        if not found_product:
            raise NotFound('Produto não existe')
        self.__product_repository.delete_product(product_id)
        return HttpResponse(
            status_code=StatusCode.OK.value,
            body={"message": "Produto deletado com sucesso"},
        )

    def __is_valid_product(self, product: CreateProductDTO):
        if not product.name:
            raise InvalidData('Nome do produto é obrigatório')
        if not product.brand_id:
            raise InvalidData('Marca do produto é obrigatória')
        if not product.category_id:
            raise InvalidData('Categoria do produto é obrigatória')
