from abc import ABC, abstractmethod

from src.application.dtos.stock.stock_dtos import ProductStockDTO
from src.model.entities.current_stock import CurrentStock


class ICurrentStockRepository(ABC):

    @abstractmethod
    def set_current_stock(self, product_stock:ProductStockDTO) -> None:pass

    @abstractmethod
    def get_current_stock_by_product_id(self, product_id:int) -> CurrentStock:pass

    @abstractmethod
    def get_full_current_stock(self) -> list[CurrentStock]:pass