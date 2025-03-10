from flask import Blueprint

from src.controllers.users_controller import UserController


user_route_bp = Blueprint('user_route', __name__)

@user_route_bp.route('/users', methods=['POST'])
def create_user_route():
	return UserController.create_user()