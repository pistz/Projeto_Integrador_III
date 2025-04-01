from flasgger import swag_from
from flask import Blueprint

from src.api.auth.authenticator import jwt_required
from src.api.controllers.current_stock_controller import CurrentStockController
from src.api.swagger.current_stock_docs import (
    get_current_stock_by_product_id_doc,
    get_full_current_stock_doc,
)

current_stock_route_bp = Blueprint('current_stock_route', __name__)
current_stock_controller = CurrentStockController()


@current_stock_route_bp.route('/current-stock/all', methods=['GET'])
@jwt_required
@swag_from(get_full_current_stock_doc)
def get_full_current_stock():
    return current_stock_controller.get_full_current_stock()


@current_stock_route_bp.route('/current-stock/<int:product_id>', methods=['GET'])
@jwt_required
@swag_from(get_current_stock_by_product_id_doc)
def get_current_stock_by_product_id(product_id: int):
    return current_stock_controller.get_current_stock_by_product_id(
        product_id=product_id
    )
