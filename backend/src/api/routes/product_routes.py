from flasgger import swag_from
from flask import Blueprint

from src.api.auth.authenticator import jwt_required
from src.api.auth.roles_required import roles_required
from src.api.controllers.product_controller import ProdutController
from src.api.swagger.product_docs import (
    create_product_doc,
    delete_product_doc,
    get_all_products_doc,
    get_product_by_barcode_doc,
    get_product_by_id_doc,
    get_products_by_brand_id_doc,
    get_products_by_category_id_doc,
    update_product_doc,
)
from src.application.enums.user_roles import UserRoles

product_route_bp = Blueprint('product_route', __name__)
product_controller = ProdutController()


@product_route_bp.route('/products/all', methods=['GET'])
@jwt_required
@swag_from(get_all_products_doc)
@roles_required(UserRoles.ADMIN.value)
def get_all_products():
    return product_controller.get_all_products()


@product_route_bp.route('/products', methods=['GET'])
@jwt_required
@swag_from(get_product_by_barcode_doc)
@roles_required(UserRoles.ADMIN.value)
def get_product_by_barcode():
    return product_controller.get_product_by_barcode()


@product_route_bp.route('/products', methods=['POST'])
@jwt_required
@swag_from(create_product_doc)
@roles_required(UserRoles.ADMIN.value)
def create_product():
    return product_controller.create_product()


@product_route_bp.route('/products/<int:product_id>', methods=['GET'])
@jwt_required
@swag_from(get_product_by_id_doc)
@roles_required(UserRoles.ADMIN.value)
def get_product_by_id(product_id):
    return product_controller.get_product_by_id(product_id=product_id)


@product_route_bp.route('/products/<int:product_id>', methods=['PUT'])
@jwt_required
@swag_from(update_product_doc)
@roles_required(UserRoles.ADMIN.value)
def update_product(product_id):
    return product_controller.update_product(product_id=product_id)


@product_route_bp.route('/products/<int:product_id>', methods=['DELETE'])
@jwt_required
@swag_from(delete_product_doc)
@roles_required(UserRoles.ADMIN.value)
def delete_product(product_id):
    return product_controller.delete_product(product_id=product_id)


@product_route_bp.route('/products/<int:brand_id>/brand', methods=['GET'])
@jwt_required
@swag_from(get_products_by_brand_id_doc)
@roles_required(UserRoles.ADMIN.value)
def get_products_by_brand_id(brand_id):
    return product_controller.get_products_by_brand_id(brand_id=brand_id)


@product_route_bp.route('/products/<int:category_id>/category', methods=['GET'])
@jwt_required
@swag_from(get_products_by_category_id_doc)
@roles_required(UserRoles.ADMIN.value)
def get_products_by_category_id(category_id):
    return product_controller.get_products_by_category_id(category_id=category_id)
