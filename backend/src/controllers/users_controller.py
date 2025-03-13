from flask import request, jsonify

from src.infra.containers.service_container import ServiceContainer
from src.application.dtos.http_types.http_request import HttpRequest
from src.application.dtos.http_types.http_response import HttpResponse
from src.application.dtos.user.user_dtos import CreateUserDTO, UpdateUserDTO


class UserController:
    def __init__(self):
        self.__user_service = ServiceContainer().user_service()

    def create_user(self):
        http_request = HttpRequest(request.json)
        create_user_dto = CreateUserDTO(**http_request.body)
        response: HttpResponse = self.__user_service.create_user(create_user_dto)
        return jsonify(response.body), response.status_code

    def get_user_by_email(self):
        http_request = HttpRequest(request.json)
        email = http_request.body['email']
        response: HttpResponse = self.__user_service.get_user_by_email(email)
        return jsonify(response.body), response.status_code
    
    def get_user_by_id(self, user_id):
        response: HttpResponse = self.__user_service.get_user_by_id(user_id)
        return jsonify(response.body), response.status_code
    
    def get_all_users(self):
        response: HttpResponse = self.__user_service.get_all_users()
        return jsonify(response.body), response.status_code
    
    def update_user(self, user_id):
        http_request = HttpRequest(request.json)
        update_user_dto = UpdateUserDTO(**http_request.body)
        response: HttpResponse = self.__user_service.update_user(user_id, update_user_dto)
        return jsonify(response.body), response.status_code
    
    def delete_user(self, user_id):
        response: HttpResponse = self.__user_service.delete_user(user_id)
        return jsonify(response.body), response.status_code
