from dataclasses import dataclass
import datetime

from src.application.enums.stock_movement import MovementType, MovementSource


@dataclass
class MoveStockDTO:
    product_id:int
    movement_type:MovementType
    movement_source:MovementSource
    quantity:int
    created_by:str

@dataclass
class StockMovementDTO:
    id:int
    product_id:int
    movement_type:MovementType
    movement_source:MovementSource
    quantity:int
    movement_date:datetime
    created_by:str

@dataclass
class CurrentStockDTO:
    product_id:int
    total_quantity:int
    last_updated:datetime

@dataclass
class ProductStockDTO:
    product_id:int
    total_quantity:int
