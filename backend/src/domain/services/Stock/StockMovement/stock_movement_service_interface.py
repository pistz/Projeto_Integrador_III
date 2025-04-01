import datetime
from abc import ABC, abstractmethod

from src.application.dtos.http_types.http_response import HttpResponse
from src.application.dtos.stock.stock_dtos import MoveStockDTO


class IStockMovementService(ABC):

    @abstractmethod
    def move_stock(self, movement: MoveStockDTO) -> HttpResponse:
        pass

    @abstractmethod
    def get_all_stock_movements(self) -> HttpResponse:
        pass

    @abstractmethod
    def get_single_stock_movement(self, stock_movement_id: int) -> HttpResponse:
        pass

    @abstractmethod
    def get_stock_movement_by_date(self, date: str) -> HttpResponse:
        pass

    @abstractmethod
    def get_stock_movement_by_date_range(
        self, start_date: str, end_date: str
    ) -> HttpResponse:
        pass
