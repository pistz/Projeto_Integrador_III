from application.dtos.http_types.http_request import HttpRequest
from application.dtos.http_types.http_response import HttpResponse
from application.dtos.user.user_dtos import CreateUserDTO
from domain.services.User.user_service_interface import IUserService

from flask import request, jsonify
from src.application.routes.routes import user_route_bp

@user_route_bp.route('/users', methods=['POST'])
def create_user() -> HttpResponse:
    http_request = HttpRequest(request.json)
    create_user_dto = CreateUserDTO(http_request.body)
    user_service = IUserService()

    response:HttpResponse = user_service.create_user(create_user_dto)
    return jsonify(response.body), response.status_code

