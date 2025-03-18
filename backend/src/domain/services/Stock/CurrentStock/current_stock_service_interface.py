from abc import ABC, abstractmethod

from src.application.dtos.http_types.http_response import HttpResponse
from src.application.dtos.stock.stock_dtos import ProductStockDTO


class ICurrentStockService(ABC):

    @abstractmethod
    def set_current_stock(self, stock_product:ProductStockDTO) -> HttpResponse:pass

    @abstractmethod
    def get_current_stock_by_product_id(self, product_id:int) -> HttpResponse:pass

    @abstractmethod
    def get_full_current_stock(self) -> HttpResponse:pass
