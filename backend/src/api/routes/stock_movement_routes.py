from flasgger import swag_from
from flask import Blueprint

from src.api.auth.authenticator import jwt_required
from src.api.auth.roles_required import roles_required
from src.api.controllers.stock_movement_controller import StockMovementController
from src.api.swagger.stock_movement_docs import (
    get_all_stock_movements_doc,
    get_single_stock_movement_doc,
    get_stock_movements_by_date_doc,
    get_stock_movements_by_date_range_doc,
    move_stock_doc,
)
from src.application.enums.user_roles import UserRoles

stock_movement_route_bp = Blueprint('stock_movement_route', __name__)
stock_movement_controller = StockMovementController()


@stock_movement_route_bp.route('/stock-movements/all', methods=['GET'])
@jwt_required
@swag_from(get_all_stock_movements_doc)
@roles_required(UserRoles.ADMIN.value, UserRoles.REPORT_ONLY.value)
def get_all_stock_movements():
    return stock_movement_controller.get_all_stock_movements()


@stock_movement_route_bp.route('/stock-movements', methods=['POST'])
@jwt_required
@swag_from(move_stock_doc)
@roles_required(
    UserRoles.ADMIN.value, UserRoles.REPORT_ONLY.value, UserRoles.REGISTER_ONLY.value
)
def move_stock():
    return stock_movement_controller.move_stock()


@stock_movement_route_bp.route(
    '/stock-movements/<int:stock_movement_id>', methods=['GET']
)
@jwt_required
@swag_from(get_single_stock_movement_doc)
@roles_required(UserRoles.ADMIN.value, UserRoles.REPORT_ONLY.value)
def get_single_stock_movement(stock_movement_id: int):
    return stock_movement_controller.get_single_stock_movement(
        stock_movement_id=stock_movement_id
    )


@stock_movement_route_bp.route('/stock-movements/date', methods=['GET'])
@jwt_required
@swag_from(get_stock_movements_by_date_doc)
@roles_required(UserRoles.ADMIN.value, UserRoles.REPORT_ONLY.value)
def get_stock_movements_by_date():
    return stock_movement_controller.get_stock_movements_by_date()


@stock_movement_route_bp.route('/stock-movements/date-range', methods=['GET'])
@jwt_required
@swag_from(get_stock_movements_by_date_range_doc)
@roles_required(UserRoles.ADMIN.value, UserRoles.REPORT_ONLY.value)
def get_stock_movemetns_by_date_range():
    return stock_movement_controller.get_stock_movements_by_date_range()
