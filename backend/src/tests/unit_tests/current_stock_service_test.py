import pytest
from src.application.dtos.stock.stock_dtos import ProductStockDTO
from src.application.exceptions.invalid_data import InvalidData
from src.application.exceptions.not_found import NotFound
from src.domain.services.Stock.CurrentStock.current_stock_service import CurrentStockService
from src.tests.mocks.mock_current_stock_repository import get_mock_current_stock_repository


class TestCurrentStockService:

    def test_get_current_stock_by_product_id_success(self):
        repo = get_mock_current_stock_repository()
        service = CurrentStockService(repo)

        response = service.get_current_stock_by_product_id(1)

        assert response.status_code == 200
        assert response.body.product_id == 1
        assert response.body.total_quantity == 100

    def test_get_current_stock_by_product_id_not_found(self):
        repo = get_mock_current_stock_repository()
        repo.get_current_stock_by_product_id.return_value = None
        service = CurrentStockService(repo)

        with pytest.raises(NotFound):
            service.get_current_stock_by_product_id(99)

    def test_get_full_current_stock(self):
        repo = get_mock_current_stock_repository()
        service = CurrentStockService(repo)

        response = service.get_full_current_stock()

        assert response.status_code == 200
        assert isinstance(response.body, list)
        assert len(response.body) == 1
        assert response.body[0].product_id == 1

    def test_set_current_stock_valid(self):
        repo = get_mock_current_stock_repository()
        service = CurrentStockService(repo)

        product_dto = ProductStockDTO(product_id=1, total_quantity=50)

        result = service.set_current_stock(product_dto)

        repo.set_current_stock.assert_called_once_with(product_stock=product_dto)
        assert result is None

    def test_set_current_stock_invalid(self):
        repo = get_mock_current_stock_repository()
        service = CurrentStockService(repo)

        with pytest.raises(InvalidData):
            service.set_current_stock(None)