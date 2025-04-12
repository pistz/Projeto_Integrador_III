from flask import Blueprint

from src.api.auth.authenticator import jwt_required
from src.api.controllers.barcode_controller import BarcodeController

barcode_controller = BarcodeController()
barcode_route_bp = Blueprint('barcode_route', __name__)


@barcode_route_bp.route('/barcodes', methods=['POST'])
@jwt_required
def create_barcode():
    return barcode_controller.create_barcode()


@barcode_route_bp.route('/barcodes/<int:barcode_id>', methods=['PUT'])
@jwt_required
def update_barcode(barcode_id):
    return barcode_controller.update_barcode(barcode_id)


@barcode_route_bp.route('/barcodes/<int:barcode_id>', methods=['DELETE'])
@jwt_required
def delete_barcode(barcode_id):
    return barcode_controller.delete_barcode(barcode_id)


@barcode_route_bp.route('/products/<int:product_id>/barcodes', methods=['GET'])
@jwt_required
def get_barcodes_by_product_id(product_id):
    return barcode_controller.get_barcodes_by_product_id(product_id)
