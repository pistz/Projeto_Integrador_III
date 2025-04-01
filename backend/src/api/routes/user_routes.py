from flask import Blueprint

from src.api.auth.authenticator import jwt_required
from src.api.controllers.users_controller import UserController


user_route_bp = Blueprint('user_route', __name__)
user_controller = UserController()

@user_route_bp.route('/users/all', methods=['GET'])
@jwt_required
def get_all_users_route():
	return user_controller.get_all_users()

@user_route_bp.route('/users', methods=['POST'])
@jwt_required
def create_user_route():
	return user_controller.create_user()

@user_route_bp.route('/users/<int:id>', methods=['GET'])
@jwt_required
def get_user_by_id_route(id):
	return user_controller.get_user_by_id(id)

@user_route_bp.route('/users/<int:id>', methods=['PUT'])
@jwt_required
def update_user_route(id):
	return user_controller.update_user(id)

@user_route_bp.route('/users/<int:id>', methods=['DELETE'])
@jwt_required
def delete_user_route(id):
	return user_controller.delete_user(id)