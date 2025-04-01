from abc import ABC, abstractmethod
from datetime import datetime

from src.application.dtos.stock.stock_dtos import MoveStockDTO
from src.model.entities.stock_movement import StockMovement


class IStockMovementRepository(ABC):

    @abstractmethod
    def move_stock(self, movement: MoveStockDTO) -> None:
        pass

    @abstractmethod
    def get_all_stock_movements(self) -> list[StockMovement]:
        pass

    @abstractmethod
    def get_single_stock_movement(self, stock_movement_id: int) -> StockMovement:
        pass

    @abstractmethod
    def get_stock_movement_by_date(self, date: datetime) -> list[StockMovement]:
        pass

    @abstractmethod
    def get_stock_movement_by_date_range(
        self, start_date: datetime, end_date: datetime
    ) -> list[StockMovement]:
        pass
