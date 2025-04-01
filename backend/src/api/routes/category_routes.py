from flask import Blueprint

from src.api.auth.authenticator import jwt_required
from src.api.controllers.category_controller import CategoryController

category_route_bp = Blueprint('category_route', __name__)
category_controller = CategoryController()


@category_route_bp.route('/categories/all', methods=['GET'])
@jwt_required
def get_all_categories():
    return category_controller.get_all_categories()


@category_route_bp.route('/categories', methods=['GET'])
@jwt_required
def get_category_by_name():
    return category_controller.get_category_by_name()


@category_route_bp.route('/categories', methods=['POST'])
@jwt_required
def create_category():
    return category_controller.create_category()


@category_route_bp.route('/categories/<int:id>', methods=['GET'])
@jwt_required
def get_category_by_id(id):
    return category_controller.get_category_by_id(id)


@category_route_bp.route('/categories/<int:id>', methods=['PUT'])
@jwt_required
def update_category(id):
    return category_controller.update_category(id)


@category_route_bp.route('/categories/<int:id>', methods=['DELETE'])
@jwt_required
def delete_category(id):
    return category_controller.delete_category(id)
