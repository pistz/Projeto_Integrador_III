from flask import request, jsonify

from src.infra.containers.containers import ServiceContainer
from src.application.dtos.http_types.http_request import HttpRequest
from src.application.dtos.http_types.http_response import HttpResponse
from src.application.dtos.user.user_dtos import CreateUserDTO

class UserController:
    @staticmethod
    def create_user():
        # Obter os dados da requisição
        http_request = HttpRequest(request.json)
        create_user_dto = CreateUserDTO(**http_request.body)
        
        # Criar um serviço e chamar o método de criação do usuário
        user_service = ServiceContainer().user_service()
        response:HttpResponse = user_service.create_user(create_user_dto)
        
        # Retornar a resposta
        return jsonify(response.body), response.status_code

