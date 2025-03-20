from datetime import datetime
from src.application.dtos.stock.stock_dtos import MoveStockDTO
from src.application.exceptions.database_exception import DatabaseException
from src.infra.repositories.Stock.StockMovement.stock_movement_repository_interface import IStockMovementRepository
from src.model.configs.connection import DbConnectionHandler
from src.model.entities.product import Product
from src.model.entities.stock_movement import StockMovement


class StockMovementRepository(IStockMovementRepository):
    
    def move_stock(self, movement:MoveStockDTO) -> None:
        with DbConnectionHandler() as db:
            try:
                new_movement = StockMovement(
                    product_id=movement.product_id,
                    movement_type=movement.movement_type.value,
                    movement_source=movement.movement_source.value,
                    quantity=abs(movement.quantity),
                    created_by=movement.created_by,
                    observations=movement.observations
                )
                db.session.add(new_movement)
                db.session.commit()
                return
            except Exception as e:
                db.session.rollback()
                raise DatabaseException(f'Error moving stock: {e}')

    def get_all_stock_movements(self) -> list[StockMovement]:
        with DbConnectionHandler() as db:
            all_movements = db.session.query(StockMovement).all()
            return all_movements

    def get_single_stock_movement(self, stock_movement_id:int) -> StockMovement:
        with DbConnectionHandler() as db:
            movement = db.session.query(StockMovement).filter_by(id=stock_movement_id).one_or_none()
            return movement
        
    def get_stock_movement_by_date(self, date: datetime) -> list[StockMovement]:
        with DbConnectionHandler() as db:
            start_of_day = datetime.combine(date.date(), datetime.min.time())
            end_of_day = datetime.combine(date.date(), datetime.max.time())
            movements = (
                db.session.query(StockMovement)
                .filter(StockMovement.movement_date >= start_of_day)
                .filter(StockMovement.movement_date <= end_of_day)
                .all()
            )
            return movements

    def get_stock_movement_by_date_range(self, start_date:datetime, end_date:datetime) -> list[StockMovement]:
        with DbConnectionHandler() as db:
            start = datetime.combine(start_date.date(), datetime.min.time())
            end = datetime.combine(end_date.date(), datetime.max.time())
            movements = (
                db.session.query(StockMovement)
                .filter(StockMovement.movement_date >= start)
                .filter(StockMovement.movement_date <= end)
                .all()
            )
            return movements