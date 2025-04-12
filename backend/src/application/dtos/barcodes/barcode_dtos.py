from dataclasses import dataclass


@dataclass
class CreateBarcodeDto:
    barcode: str
    product_id: int


@dataclass
class BarcodeDto:
    id: int
    barcode: str
    product_id: int


@dataclass
class UpdateBarcodeDto:
    barcode: str
    product_id: int
