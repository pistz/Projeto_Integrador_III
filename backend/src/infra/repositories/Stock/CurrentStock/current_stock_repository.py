from datetime import datetime
from src.application.dtos.stock.stock_dtos import ProductStockDTO
from src.application.exceptions.database_exception import DatabaseException
from src.infra.repositories.Stock.CurrentStock.current_stock_repository_interface import ICurrentStockRepository
from src.model.configs.connection import DbConnectionHandler
from src.model.entities.current_stock import CurrentStock


class CurrentStockRepository(ICurrentStockRepository):

    def set_current_stock(self, product_stock:ProductStockDTO) -> None:
        with DbConnectionHandler() as db:
            try:
                found_product = self.__find(product_id=product_stock.product_id)
                if found_product:
                    found_product.total_quantity = product_stock.total_quantity
                    found_product.last_updated = datetime.now()
                    db.session.add(found_product)
                    db.session.commit()
                    return

                new_entry = CurrentStock(
                    product_id=product_stock.product_id, 
                    total_quantity=product_stock.total_quantity
                    )
                db.session.add(new_entry)
                db.session.commit()
                return
            
            except Exception as e:
                db.session.rollback()
                raise DatabaseException(f"Error creating new stock entry: {e}")
        

    def get_current_stock_by_product_id(self, product_id:int) -> CurrentStock:
        return self.__find(product_id=product_id)

    def get_full_current_stock(self) -> list[CurrentStock]:
        with DbConnectionHandler() as db:
            current_stock_list = db.session.query(CurrentStock).all()
            return current_stock_list
        
    def __find(self, product_id:int) -> CurrentStock:
        with DbConnectionHandler() as db:
            current_stock = db.session.query(CurrentStock).filter_by(product_id=product_id).one_or_none()
            return current_stock
