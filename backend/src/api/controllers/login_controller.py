from flask import jsonify, request
from src.application.dtos.http_types.http_request import HttpRequest
from src.application.dtos.http_types.http_response import HttpResponse
from src.application.dtos.user.user_dtos import UserLoginDTO
from src.infra.containers.service_container import ServiceContainer


class LoginController:
    def __init__(self):
        self.__login_service = ServiceContainer().login_service()

    def login(self):
        http_request = HttpRequest(request.json)
        login_dto = UserLoginDTO(**http_request.body)
        response:HttpResponse = self.__login_service.login(login_dto.email, login_dto.password)
        return jsonify(response.body), response.status_code