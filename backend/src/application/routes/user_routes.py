from flask import Blueprint

from src.controllers.users_controller import UserController


user_route_bp = Blueprint('user_route', __name__)
user_controller = UserController()

@user_route_bp.route('/users', methods=['POST'])
def create_user_route():
	return user_controller.create_user()

@user_route_bp.route('/users', methods=['GET'])
def get_user_by_email_route():
	return user_controller.get_user_by_email()

@user_route_bp.route('/users/<int:id>', methods=['GET'])
def get_user_by_id_route(id):
	return user_controller.get_user_by_id(id)

@user_route_bp.route('/users/<int:id>', methods=['PUT'])
def update_user_route(id):
	return user_controller.update_user(id)

@user_route_bp.route('/users/<int:id>', methods=['DELETE'])
def delete_user_route(id):
	return user_controller.delete_user(id)