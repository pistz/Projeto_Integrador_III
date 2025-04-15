from flasgger import swag_from
from flask import Blueprint

from src.api.auth.authenticator import jwt_required
from src.api.auth.roles_required import roles_required
from src.api.controllers.barcode_controller import BarcodeController
from src.api.swagger.barcode_docs import (
    create_barcode_doc,
    delete_barcode_doc,
    get_barcodes_by_product_id_doc,
    update_barcode_doc,
)
from src.application.enums.user_roles import UserRoles

barcode_controller = BarcodeController()
barcode_route_bp = Blueprint('barcode_route', __name__)


@barcode_route_bp.route('/barcodes', methods=['POST'])
@jwt_required
@swag_from(create_barcode_doc)
@roles_required(UserRoles.ADMIN.value, UserRoles.REGISTER_ONLY.value)
def create_barcode():
    return barcode_controller.create_barcode()


@barcode_route_bp.route('/barcodes/<int:barcode_id>', methods=['PUT'])
@jwt_required
@swag_from(update_barcode_doc)
@roles_required(UserRoles.ADMIN.value, UserRoles.REGISTER_ONLY.value)
def update_barcode(barcode_id):
    return barcode_controller.update_barcode(barcode_id)


@barcode_route_bp.route('/barcodes/<int:barcode_id>', methods=['DELETE'])
@jwt_required
@swag_from(delete_barcode_doc)
@roles_required(UserRoles.ADMIN.value, UserRoles.REGISTER_ONLY.value)
def delete_barcode(barcode_id):
    return barcode_controller.delete_barcode(barcode_id)


@barcode_route_bp.route('/products/<int:product_id>/barcodes', methods=['GET'])
@jwt_required
@swag_from(get_barcodes_by_product_id_doc)
@roles_required(UserRoles.ADMIN.value, UserRoles.REGISTER_ONLY.value)
def get_barcodes_by_product_id(product_id):
    return barcode_controller.get_barcodes_by_product_id(product_id)
