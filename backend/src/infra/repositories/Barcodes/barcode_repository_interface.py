from abc import ABC, abstractmethod

from src.application.dtos.barcodes.barcode_dtos import (
    CreateBarcodeDto,
    UpdateBarcodeDto,
)
from src.model.entities.barcode import Barcode


class IBarcodeRepository(ABC):

    @abstractmethod
    def create_barcode(self, barcode: CreateBarcodeDto) -> None:
        pass

    @abstractmethod
    def update_barcode(self, barcode: UpdateBarcodeDto) -> None:
        pass

    @abstractmethod
    def delete_barcode(self, barcode_id: int) -> None:
        pass

    @abstractmethod
    def get_barcodes_by_product_id(self, product_id: int) -> list[Barcode]:
        pass
