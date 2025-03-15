from flask import Blueprint

from src.controllers.product_controller import ProdutController

product_route_bp = Blueprint('product_route', __name__)
product_controller = ProdutController()

@product_route_bp.route('/products/all', methods=['GET'])
def get_all_products():
    return product_controller.get_all_products()

@product_route_bp.route('/products', methods=['GET'])
def get_product_by_name():
    return product_controller.get_product_by_name()

@product_route_bp.route('/products', methods=['POST'])
def create_product():
    return product_controller.create_product()

@product_route_bp.route('/products/<int:product_id>', methods=['GET'])
def get_product_by_id(product_id):
    return product_controller.get_product_by_id(product_id=product_id)

@product_route_bp.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    return product_controller.update_product(product_id=product_id)

@product_route_bp.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    return product_controller.delete_product(product_id=product_id)

@product_route_bp.route('/products/<int:brand_id>/brand', methods=['GET'])
def get_products_by_brand_id(brand_id):
    return product_controller.get_products_by_brand_id(brand_id=brand_id)

@product_route_bp.route('/products/<int:category_id>/category', methods=['GET'])
def get_products_by_category_id(category_id):
    return product_controller.get_products_by_category_id(category_id=category_id)
