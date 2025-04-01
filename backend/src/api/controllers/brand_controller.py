from flask import jsonify, request

from src.application.dtos.http_types.http_request import HttpRequest
from src.application.dtos.http_types.http_response import HttpResponse
from src.domain.containers.service_container import ServiceContainer


class BrandController:
    def __init__(self):
        self.__brand_service = ServiceContainer().brand_service()

    def __send_response(self, response: HttpResponse):
        return jsonify(response.body), response.status_code

    def get_all_brands(self):
        response: HttpResponse = self.__brand_service.get_all_brands()
        return self.__send_response(response)

    def get_brand_by_name(self):
        http_request = HttpRequest(param=request.args)
        name = http_request.param['name']
        response: HttpResponse = self.__brand_service.get_brand_by_name(name)
        return self.__send_response(response)

    def get_brand_by_id(self, brand_id):
        response: HttpResponse = self.__brand_service.get_brand_by_id(brand_id)
        return self.__send_response(response)

    def create_brand(self):
        http_request = HttpRequest(request.json)
        brand = http_request.body['name']
        response: HttpResponse = self.__brand_service.create_brand(brand)
        return self.__send_response(response)

    def update_brand(self, brand_id):
        http_request = HttpRequest(request.json)
        name = http_request.body['name']
        response: HttpResponse = self.__brand_service.update_brand(brand_id, name)
        return self.__send_response(response)

    def delete_brand(self, brand_id):
        response: HttpResponse = self.__brand_service.delete_brand(brand_id)
        return self.__send_response(response)
