from flask import Blueprint

from src.api.controllers.login_controller import LoginController

login_route_bp = Blueprint('login', __name__)

login_controller = LoginController()


@login_route_bp.route('/login', methods=['POST'])
def login():
    return login_controller.login()
