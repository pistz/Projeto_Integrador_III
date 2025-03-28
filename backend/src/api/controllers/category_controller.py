from flask import jsonify, request
from src.application.dtos.http_types.http_request import HttpRequest
from src.application.dtos.http_types.http_response import HttpResponse
from src.domain.containers.service_container import ServiceContainer


class CategoryController:
    def __init__(self):
        self.__category_service = ServiceContainer().category_service()

    def __send_response(self, response:HttpResponse):
        return jsonify(response.body), response.status_code

    def get_all_categories(self):
        response: HttpResponse = self.__category_service.get_all_categories()
        return self.__send_response(response)
    
    def get_category_by_name(self):
        http_request = HttpRequest(param=request.args)
        name = http_request.param['name']
        response: HttpResponse = self.__category_service.get_category_by_name(name)
        return self.__send_response(response)

    def get_category_by_id(self, category_id):
        response: HttpResponse = self.__category_service.get_category_by_id(category_id)
        return self.__send_response(response)

    def create_category(self):
        http_request = HttpRequest(request.json)
        category = http_request.body['name']
        response: HttpResponse = self.__category_service.create_category(category)
        return self.__send_response(response)

    def update_category(self, category_id):
        http_request = HttpRequest(request.json)
        name = http_request.body['name']
        response: HttpResponse = self.__category_service.update_category(category_id, name)
        return self.__send_response(response)

    def delete_category(self, category_id):
        response: HttpResponse = self.__category_service.delete_category(category_id)
        return self.__send_response(response)