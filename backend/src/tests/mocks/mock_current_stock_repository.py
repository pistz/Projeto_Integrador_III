from datetime import datetime
from unittest.mock import MagicMock


def get_mock_current_stock_repository():
    repo = MagicMock()

    fake_current_stock = MagicMock()
    fake_current_stock.product_id = 1
    fake_current_stock.total_quantity = 100
    fake_current_stock.last_updated = datetime(2024, 1, 1, 12, 0, 0)

    # Métodos mockados do repositório
    repo.get_current_stock_by_product_id.return_value = fake_current_stock
    repo.get_full_current_stock.return_value = [fake_current_stock]
    repo.set_current_stock.return_value = None

    return repo
