from flask import Blueprint

from src.api.controllers.brand_controller import BrandController

brand_route_bp = Blueprint('brand_route', __name__)
brand_controller = BrandController()

@brand_route_bp.route('/brands/all', methods=['GET'])
def get_all_brands():
    return brand_controller.get_all_brands()

@brand_route_bp.route('/brands', methods=['GET'])
def get_brand_by_name():
    return brand_controller.get_brand_by_name()

@brand_route_bp.route('/brands', methods=['POST'])
def create_brand():
    return brand_controller.create_brand()

@brand_route_bp.route('/brands/<int:id>', methods=['GET'])
def get_brand_by_id(id):
    return brand_controller.get_brand_by_id(id)

@brand_route_bp.route('/brands/<int:id>', methods=['PUT'])
def update_brand(id):
    return brand_controller.update_brand(id)

@brand_route_bp.route('/brands/<int:id>', methods=['DELETE'])
def delete_brand(id):
    return brand_controller.delete_brand(id)