from flasgger import swag_from
from flask import Blueprint

from src.api.auth.authenticator import authenticator, jwt_required
from src.api.controllers.login_controller import LoginController
from src.api.swagger.login_docs import login_doc
from src.application.enums.user_roles import UserRoles

login_route_bp = Blueprint('login', __name__)

login_controller = LoginController()


@login_route_bp.route('/login', methods=['POST'])
@swag_from(login_doc)
def login():
    return login_controller.login()


@login_route_bp.route('/login/reset-password', methods=['PUT'])
@jwt_required
@authenticator(
    UserRoles.ADMIN.value, UserRoles.REGISTER_ONLY.value, UserRoles.REPORT_ONLY.value
)
def reset_user_password():
    return login_controller.reset_user_password()
