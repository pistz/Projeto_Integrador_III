from flasgger import swag_from
from flask import Blueprint

from src.api.auth.authenticator import jwt_required
from src.api.controllers.category_controller import CategoryController
from src.api.swagger.category_docs import (
    create_category_doc,
    delete_category_doc,
    get_all_categories_doc,
    get_category_by_id_doc,
    get_category_by_name_doc,
    update_category_doc,
)

category_route_bp = Blueprint('category_route', __name__)
category_controller = CategoryController()


@category_route_bp.route('/categories/all', methods=['GET'])
@jwt_required
@swag_from(get_all_categories_doc)
def get_all_categories():
    return category_controller.get_all_categories()


@category_route_bp.route('/categories', methods=['GET'])
@jwt_required
@swag_from(get_category_by_name_doc)
def get_category_by_name():
    return category_controller.get_category_by_name()


@category_route_bp.route('/categories', methods=['POST'])
@jwt_required
@swag_from(create_category_doc)
def create_category():
    return category_controller.create_category()


@category_route_bp.route('/categories/<int:id>', methods=['GET'])
@jwt_required
@swag_from(get_category_by_id_doc)
def get_category_by_id(id):
    return category_controller.get_category_by_id(id)


@category_route_bp.route('/categories/<int:id>', methods=['PUT'])
@jwt_required
@swag_from(update_category_doc)
def update_category(id):
    return category_controller.update_category(id)


@category_route_bp.route('/categories/<int:id>', methods=['DELETE'])
@jwt_required
@swag_from(delete_category_doc)
def delete_category(id):
    return category_controller.delete_category(id)
