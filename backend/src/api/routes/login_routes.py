from flasgger import swag_from
from flask import Blueprint

from src.api.controllers.login_controller import LoginController
from src.api.swagger.login_docs import login_doc

login_route_bp = Blueprint('login', __name__)

login_controller = LoginController()


@login_route_bp.route('/login', methods=['POST'])
@swag_from(login_doc)
def login():
    return login_controller.login()
