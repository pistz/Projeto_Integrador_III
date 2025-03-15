from src.application.dtos.http_types.http_response import HttpResponse
from src.application.dtos.product.product_dtos import CreateProductDTO, ProductDTO, UpdateProductDTO
from src.application.enums.status_codes import StatusCode
from src.application.exceptions.invalid_data import InvalidData
from src.application.exceptions.not_found import NotFound
from src.domain.services.Product.product_service_interface import IProductService
from src.infra.repositories.Products.products_repository_interface import IProductsRepository
from src.model.entities.product import Product


class ProductService(IProductService):
    def __init__(self, product_repository:IProductsRepository):
        self.__product_repository = product_repository

    def get_product_by_id(self, product_id:int) -> HttpResponse:
        found_product = self.__product_repository.get_product_by_id(product_id)
        if not found_product:
            raise NotFound('Product not found')
        product = ProductDTO(id=found_product.id, name=found_product.name, description=found_product.description, brand_id=found_product.brand_id, category_id=found_product.category_id)
        return HttpResponse(status_code=StatusCode.OK.value, body=product)

    def get_product_by_name(self, product_name:str) -> HttpResponse:
        found_product = self.__product_repository.get_product_by_name(product_name)
        if not found_product or len(found_product) == 0:
            raise NotFound('Product not found')
        product = [ProductDTO(id=product.id, name=product.name, description=product.description, brand_id=product.brand_id, category_id=product.category_id) for product in found_product]
        return HttpResponse(status_code=StatusCode.OK.value, body=product)

    def get_all_products(self) -> HttpResponse:
        products_list:list[Product] = self.__product_repository.get_all_products()
        products = [ProductDTO(id=product.id, name=product.name, description=product.description, brand_id=product.brand_id, category_id=product.category_id) for product in products_list]
        return HttpResponse(status_code=StatusCode.OK.value, body=products)
    
    def get_all_products_by_brand_id(self, brand_id:int) -> HttpResponse:
        products_list:list[Product] = self.__product_repository.get_all_products_by_brand_id(brand_id)
        products = [ProductDTO(id=product.id, name=product.name, description=product.description, brand_id=product.brand_id, category_id=product.category_id) for product in products_list]
        return HttpResponse(status_code=StatusCode.OK.value, body=products)
    
    def get_all_products_by_category_id(self, category_id:int) -> HttpResponse:
        products_list:list[Product] = self.__product_repository.get_all_products_by_category_id(category_id)
        products = [ProductDTO(id=product.id, name=product.name, description=product.description, brand_id=product.brand_id, category_id=product.category_id) for product in products_list]
        return HttpResponse(status_code=StatusCode.OK.value, body=products)
    
    def create_product(self, product:CreateProductDTO) -> HttpResponse:
        self.__is_valid_product(product)
        self.__product_repository.create_product(product)
        return HttpResponse(status_code=StatusCode.CREATED.value, body={"message":"Product created successfully"})

    def update_product(self, product_id, product:UpdateProductDTO) -> HttpResponse:
        found_product = self.__product_repository.get_product_by_id(product_id)
        if not found_product:
            raise NotFound('Product not found')

        found_product.name = product.name if product.name else found_product.name
        found_product.description = product.description if product.description else found_product.description
        found_product.brand_id = product.brand_id if product.brand_id else found_product.brand_id
        found_product.category_id = product.category_id if product.category_id else found_product.category_id

        self.__product_repository.update_product(product_id=product_id, product=found_product)
        return HttpResponse(status_code=StatusCode.CREATED.value, body={"message":"Product updated successfully"})

    def delete_product(self, product_id:int) -> HttpResponse:
        found_product = self.__product_repository.get_product_by_id(product_id)
        if not found_product:
            raise NotFound('Product not found')
        self.__product_repository.delete_product(product_id)
        return HttpResponse(status_code=StatusCode.OK.value, body={"message":"Product deleted successfully"})


    def __is_valid_product(self, product:CreateProductDTO):
        if not product.name:
            raise InvalidData('Product name is required')
        if not product.brand_id:
            raise InvalidData('Product brand is required')
        if not product.category_id:
            raise InvalidData('Product category is required')