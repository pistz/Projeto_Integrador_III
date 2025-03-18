from flask import Blueprint

from src.api.controllers.current_stock_controller import CurrentStockController

current_stock_route_bp = Blueprint('current_stock_route', __name__)
current_stock_controller = CurrentStockController()

@current_stock_route_bp.route('/current-stock/all', methdos=['GET'])
def get_full_current_stock():
    return current_stock_controller.get_full_current_stock()

@current_stock_route_bp.route('/current-stock/<int:product_id>', methods=['GET'])
def get_current_stock_by_product_id(product_id:int):
    return current_stock_controller.get_current_stock_by_product_id(product_id=product_id)