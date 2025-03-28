from flask import jsonify, request
from src.application.dtos.http_types.http_request import HttpRequest
from src.application.dtos.http_types.http_response import HttpResponse
from src.application.dtos.product.product_dtos import CreateProductDTO, UpdateProductDTO
from src.domain.containers.service_container import ServiceContainer


class ProdutController:
    def __init__(self):
        self.__product_service = ServiceContainer.product_service()

    def __send_response(self, response:HttpResponse):
        return jsonify(response.body), response.status_code
    
    def get_all_products(self):
        response: HttpResponse = self.__product_service.get_all_products()
        return self.__send_response(response)
    
    def get_product_by_id(self, product_id:int):
        response: HttpResponse = self.__product_service.get_product_by_id(product_id=product_id)
        return self.__send_response(response)
    
    def get_product_by_name(self):
        http_request = HttpRequest(param=request.args)
        product_name = http_request.param['name']
        response: HttpResponse = self.__product_service.get_product_by_name(product_name=product_name)
        return self.__send_response(response)
    
    def get_products_by_brand_id(self, brand_id:int):
        response: HttpResponse = self.__product_service.get_all_products_by_brand_id(brand_id=brand_id)
        return self.__send_response(response)
    
    def get_products_by_category_id(self, category_id:int):
        response: HttpResponse = self.__product_service.get_all_products_by_category_id(category_id=category_id)
        return self.__send_response(response)
    
    def create_product(self):
        http_request = HttpRequest(request.json)
        create_product_dto = CreateProductDTO(**http_request.body)
        response: HttpResponse = self.__product_service.create_product(create_product_dto)
        return self.__send_response(response)
    
    def update_product(self, product_id:int):
        http_request = HttpRequest(request.json)
        update_product_dto = UpdateProductDTO(**http_request.body)
        response: HttpResponse = self.__product_service.update_product(product_id=product_id, product=update_product_dto)
        return self.__send_response(response)
    
    def delete_product(self, product_id:int):
        response: HttpResponse = self.__product_service.delete_product(product_id=product_id)
        return self.__send_response(response)