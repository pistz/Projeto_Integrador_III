from unittest.mock import MagicMock
from datetime import datetime

from src.application.enums.stock_movement import MovementSource, MovementType

def get_mock_stock_movement_repository():
    repo = MagicMock()

    fake_stock_movement = MagicMock()
    fake_stock_movement.id = 1
    fake_stock_movement.product_id = 1
    fake_stock_movement.movement_type = MovementType.IN.value
    fake_stock_movement.movement_source = MovementSource.BUY.value
    fake_stock_movement.quantity = 50
    fake_stock_movement.created_by = "admin_user"
    fake_stock_movement.movement_date = datetime(2024, 1, 1, 10, 0, 0)

    # Métodos mockados
    repo.move_stock.return_value = None
    repo.get_all_stock_movements.return_value = [fake_stock_movement]
    repo.get_single_stock_movement.return_value = fake_stock_movement
    repo.get_stock_movement_by_date.return_value = [fake_stock_movement]
    repo.get_stock_movement_by_date_range.return_value = [fake_stock_movement]

    return repo
