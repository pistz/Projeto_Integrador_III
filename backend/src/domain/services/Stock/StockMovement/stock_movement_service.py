from src.application.dtos.http_types.http_response import HttpResponse
from src.application.dtos.stock.stock_dtos import MoveStockDTO
from src.domain.services.Stock.StockMovement.stock_movement_service_interface import IStockMovementService
from src.infra.repositories.Stock.StockMovement.stock_movement_repository_interface import IStockMovementRepository

#TODO
class StockMovementService(IStockMovementService):

    def __init__(self, stock_movement_repository:IStockMovementRepository):
        self.__stock_movement_repository = stock_movement_repository

    def move_stock(self, movement:MoveStockDTO) -> HttpResponse:pass

    def get_all_stock_movements(self) -> HttpResponse:pass

    def get_single_stock_movement(self, stock_movement_id:int) -> HttpResponse:pass

    def get_stock_movement_by_date(self, date: str) -> HttpResponse:pass

    def get_stock_movement_by_date_range(self, start_date:str, end_date:str) -> HttpResponse:pass