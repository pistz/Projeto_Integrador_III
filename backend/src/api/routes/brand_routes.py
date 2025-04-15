from flasgger import swag_from
from flask import Blueprint

from src.api.auth.authenticator import jwt_required
from src.api.auth.roles_required import roles_required
from src.api.controllers.brand_controller import BrandController
from src.api.swagger.brand_docs import (
    create_brand_doc,
    delete_brand_doc,
    get_all_brands_doc,
    get_brand_by_id_doc,
    get_brand_by_name_doc,
    update_brand_doc,
)
from src.application.enums.user_roles import UserRoles

brand_route_bp = Blueprint('brand_route', __name__)
brand_controller = BrandController()


@brand_route_bp.route('/brands/all', methods=['GET'])
@jwt_required
@swag_from(get_all_brands_doc)
@roles_required(UserRoles.ADMIN.value, UserRoles.REGISTER_ONLY.value)
def get_all_brands():
    return brand_controller.get_all_brands()


@brand_route_bp.route('/brands', methods=['GET'])
@jwt_required
@swag_from(get_brand_by_name_doc)
@roles_required(UserRoles.ADMIN.value, UserRoles.REGISTER_ONLY.value)
def get_brand_by_name():
    return brand_controller.get_brand_by_name()


@brand_route_bp.route('/brands', methods=['POST'])
@jwt_required
@swag_from(create_brand_doc)
@roles_required(UserRoles.ADMIN.value, UserRoles.REGISTER_ONLY.value)
def create_brand():
    return brand_controller.create_brand()


@brand_route_bp.route('/brands/<int:id>', methods=['GET'])
@jwt_required
@swag_from(get_brand_by_id_doc)
@roles_required(UserRoles.ADMIN.value, UserRoles.REGISTER_ONLY.value)
def get_brand_by_id(id):
    return brand_controller.get_brand_by_id(id)


@brand_route_bp.route('/brands/<int:id>', methods=['PUT'])
@jwt_required
@swag_from(update_brand_doc)
@roles_required(UserRoles.ADMIN.value, UserRoles.REGISTER_ONLY.value)
def update_brand(id):
    return brand_controller.update_brand(id)


@brand_route_bp.route('/brands/<int:id>', methods=['DELETE'])
@jwt_required
@swag_from(delete_brand_doc)
@roles_required(UserRoles.ADMIN.value, UserRoles.REGISTER_ONLY.value)
def delete_brand(id):
    return brand_controller.delete_brand(id)
