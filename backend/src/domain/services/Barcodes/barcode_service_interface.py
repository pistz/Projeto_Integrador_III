from abc import ABC, abstractmethod

from src.application.dtos.barcodes.barcode_dtos import (
    CreateBarcodeDto,
    UpdateBarcodeDto,
)
from src.application.dtos.http_types.http_response import HttpResponse


class IBarcodeService(ABC):

    @abstractmethod
    def create_barcode(self, barcode: CreateBarcodeDto) -> HttpResponse:
        """Create a new barcode."""
        pass

    @abstractmethod
    def update_barcode(self, barcode: UpdateBarcodeDto) -> HttpResponse:
        """Update an existing barcode."""
        pass

    @abstractmethod
    def delete_barcode(self, barcode_id: int) -> HttpResponse:
        """Delete a barcode by its ID."""
        pass

    @abstractmethod
    def get_barcodes_by_product_id(self, product_id: int) -> HttpResponse:
        """Get all barcodes associated with a specific product ID."""
        pass
