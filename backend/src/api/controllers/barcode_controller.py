from flask import jsonify, request

from src.application.dtos.barcodes.barcode_dtos import (
    CreateBarcodeDto,
    UpdateBarcodeDto,
)
from src.application.dtos.http_types.http_request import HttpRequest
from src.application.dtos.http_types.http_response import HttpResponse
from src.domain.containers.service_container import ServiceContainer
from src.domain.services.Barcodes.barcode_service_interface import IBarcodeService


class BarcodeController:
    def __init__(self):
        self.__barcode_service = ServiceContainer().barcode_service()

    def __send_response(self, response: HttpResponse):
        return jsonify(response.body), response.status_code

    def create_barcode(self):
        http_request = HttpRequest(request.json)
        barcode_data = http_request.body
        barcode = CreateBarcodeDto(**barcode_data)
        response: HttpResponse = self.__barcode_service.create_barcode(barcode)
        return self.__send_response(response)

    def update_barcode(self, barcode_id: int):
        http_request = HttpRequest(request.json)
        barcode_data = http_request.body
        barcode = UpdateBarcodeDto(id=barcode_id, **barcode_data)
        response: HttpResponse = self.__barcode_service.update_barcode(
            barcode_id=barcode_id, barcode=barcode
        )
        return self.__send_response(response)

    def delete_barcode(self, barcode_id: int):
        response: HttpResponse = self.__barcode_service.delete_barcode(
            barcode_id=barcode_id
        )
        return self.__send_response(response)

    def get_barcodes_by_product_id(self, product_id: int):
        response: HttpResponse = self.__barcode_service.get_barcodes_by_product_id(
            product_id=product_id
        )
        return self.__send_response(response)
