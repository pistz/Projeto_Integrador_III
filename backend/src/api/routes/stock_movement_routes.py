from flask import Blueprint

from src.api.auth.authenticator import jwt_required
from src.api.controllers.stock_movement_controller import StockMovementController

stock_movement_route_bp = Blueprint('stock_movement_route', __name__)
stock_movement_controller = StockMovementController()

@stock_movement_route_bp.route('/stock-movements/all', methods=['GET'])
@jwt_required
def get_all_stock_movements():
    return stock_movement_controller.get_all_stock_movements()

@stock_movement_route_bp.route('/stock-movements', methods=['POST'])
@jwt_required
def move_stock():
    return stock_movement_controller.move_stock()

@stock_movement_route_bp.route('/stock-movements/<int:stock_movement_id>', methods=['GET'])
@jwt_required
def get_single_stock_movement(stock_movement_id:int):
    return stock_movement_controller.get_single_stock_movement(stock_movement_id=stock_movement_id)

@stock_movement_route_bp.route('/stock-movements/date', methods=['GET'])
@jwt_required
def get_stock_movements_by_date():
    return stock_movement_controller.get_stock_movements_by_date()

@stock_movement_route_bp.route('/stock-movements/date-range', methods=['GET'])
@jwt_required
def get_stock_movemetns_by_date_range():
    return stock_movement_controller.get_stock_movements_by_date_range()



