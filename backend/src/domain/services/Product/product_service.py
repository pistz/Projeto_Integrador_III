from src.application.dtos.http_types.http_response import HttpResponse
from src.application.dtos.product.product_dtos import CreateProductDTO, UpdateProductDTO
from src.application.enums.status_codes import StatusCode
from src.application.exceptions.invalid_data import InvalidData
from src.application.exceptions.not_found import NotFound
from src.domain.services.Product.product_service_interface import IProductService
from src.infra.repositories.Products.products_repository_interface import IProductsRepository


class ProductService(IProductService):
    def __init__(self, product_repository:IProductsRepository):
        self.product_repository = product_repository

    def get_product_by_id(self, product_id:int) -> HttpResponse:
        product = self.product_repository.get_product_by_id(product_id)
        if not product:
            raise NotFound('Product not found')
        return HttpResponse(status_code=StatusCode.OK.value, body=product)

    
    def get_product_by_name(self, name:str) -> HttpResponse:
        product = self.product_repository.get_product_by_name(name)
        if not product:
            raise NotFound('Product not found')
        return HttpResponse(status_code=StatusCode.OK.value, body=product)

    def get_all_products(self) -> HttpResponse:
        products = self.product_repository.get_all_products()
        return HttpResponse(status_code=StatusCode.OK.value, body=products)
    
    def get_all_products_by_brand_id(self, brand_id:int) -> HttpResponse:
        products = self.product_repository.get_all_products_by_brand_id(brand_id)
        return HttpResponse(status_code=StatusCode.OK.value, body=products)
    
    def get_all_products_by_category_id(self, category_id:int) -> HttpResponse:
        products = self.product_repository.get_all_products_by_category_id(category_id)
        return HttpResponse(status_code=StatusCode.OK.value, body=products)
    
    def create_product(self, product:CreateProductDTO) -> HttpResponse:
        self.__is_valid_product(product)
        self.product_repository.create_product(product)
        return HttpResponse(status_code=StatusCode.CREATED.value, body={"message":"Product created successfully"})

    def update_product(self, product_id, product:UpdateProductDTO) -> HttpResponse:
        found_product = self.product_repository.get_product_by_id(product_id)
        if not found_product:
            raise NotFound('Product not found')

        found_product.name = product.name
        found_product.description = product.description
        found_product.brand_id = product.brand_id
        found_product.category_id = product.category_id

        self.product_repository.update_product(found_product)
        return HttpResponse(status_code=StatusCode.OK.value, body={"message":"Product updated successfully"})

    def delete_product(self, product_id:int) -> HttpResponse:
        found_product = self.product_repository.get_product_by_id(product_id)
        if not found_product:
            raise NotFound('Product not found')
        self.product_repository.delete_product(product_id)
        return HttpResponse(status_code=StatusCode.OK.value, body={"message":"Product deleted successfully"})


    def __is_valid_product(self, product:CreateProductDTO):
        if not product.name:
            raise InvalidData('Product name is required')
        if not product.brand_id:
            raise InvalidData('Product brand is required')
        if not product.category_id:
            raise InvalidData('Product category is required')