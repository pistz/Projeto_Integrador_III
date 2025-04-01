from flask import Blueprint

from src.api.auth.authenticator import jwt_required
from src.api.controllers.brand_controller import BrandController

brand_route_bp = Blueprint('brand_route', __name__)
brand_controller = BrandController()


@brand_route_bp.route('/brands/all', methods=['GET'])
@jwt_required
def get_all_brands():
    return brand_controller.get_all_brands()


@brand_route_bp.route('/brands', methods=['GET'])
@jwt_required
def get_brand_by_name():
    return brand_controller.get_brand_by_name()


@brand_route_bp.route('/brands', methods=['POST'])
@jwt_required
def create_brand():
    return brand_controller.create_brand()


@brand_route_bp.route('/brands/<int:id>', methods=['GET'])
@jwt_required
def get_brand_by_id(id):
    return brand_controller.get_brand_by_id(id)


@brand_route_bp.route('/brands/<int:id>', methods=['PUT'])
@jwt_required
def update_brand(id):
    return brand_controller.update_brand(id)


@brand_route_bp.route('/brands/<int:id>', methods=['DELETE'])
@jwt_required
def delete_brand(id):
    return brand_controller.delete_brand(id)
