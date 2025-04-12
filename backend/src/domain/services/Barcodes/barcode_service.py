from src.application.dtos.barcodes.barcode_dtos import (
    BarcodeDto,
    CreateBarcodeDto,
    UpdateBarcodeDto,
)
from src.application.dtos.http_types.http_response import HttpResponse
from src.application.enums.status_codes import StatusCode
from src.application.exceptions.not_found import NotFound
from src.domain.services.Barcodes.barcode_service_interface import IBarcodeService
from src.infra.repositories.Barcodes.barcode_repository_interface import (
    IBarcodeRepository,
)
from src.infra.repositories.Products.products_repository_interface import (
    IProductsRepository,
)


class BarcodeService(IBarcodeService):

    def __init__(
        self,
        barcode_repository: IBarcodeRepository,
        product_repository: IProductsRepository,
    ):
        self.__barcode_repository = barcode_repository
        self.__product_repository = product_repository

    def create_barcode(self, barcode: CreateBarcodeDto) -> HttpResponse:
        self.__find_product(barcode.product_id)
        self.__barcode_repository.create_barcode(barcode)
        return HttpResponse(
            status_code=StatusCode.CREATED.value,
            body={'message': 'Código de barras criado com sucesso'},
        )

    def update_barcode(self, id: int, barcode: UpdateBarcodeDto) -> HttpResponse:
        found_barcode = self.__barcode_repository.get_barcode_by_id(id)
        if not found_barcode:
            raise NotFound('Código de barras não existe')
        self.__find_product(barcode.product_id)
        self.__barcode_repository.update_barcode(id=id, barcode=barcode)
        return HttpResponse(
            status_code=StatusCode.OK.value,
            body={'message': 'Código de barras atualizado com sucesso'},
        )

    def delete_barcode(self, barcode_id: int) -> HttpResponse:
        found_barcode = self.__barcode_repository.get_barcode_by_id(barcode_id)
        if not found_barcode:
            raise NotFound('Código de barras não existe')
        self.__barcode_repository.delete_barcode(barcode_id)
        return HttpResponse(
            status_code=StatusCode.OK.value,
            body={'message': 'Código de barras deletado com sucesso'},
        )

    def get_barcodes_by_product_id(self, product_id: int) -> HttpResponse:
        found_product = self.__product_repository.get_product_by_id(product_id)
        if not found_product:
            raise NotFound('Produto não existe')
        barcodes = self.__barcode_repository.get_barcodes_by_product_id(product_id)
        barcodes_list: list[BarcodeDto] = [
            BarcodeDto(
                id=barcode.id,
                product_id=barcode.product_id,
                barcode=barcode.barcode,
            )
            for barcode in barcodes
        ]
        return HttpResponse(
            status_code=StatusCode.OK.value,
            body=barcodes_list,
        )

    def __find_product(self, product_id: int):
        found_product = self.__product_repository.get_product_by_id(product_id)
        if not found_product:
            raise NotFound('Produto não existe')
        return found_product
