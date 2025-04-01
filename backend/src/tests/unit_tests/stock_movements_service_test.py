from datetime import datetime
from types import SimpleNamespace
from unittest.mock import MagicMock, patch

import pytest

from src.application.dtos.http_types.http_response import HttpResponse
from src.application.dtos.stock.stock_dtos import CurrentStockDTO, MoveStockDTO
from src.application.enums.stock_movement import MovementSource, MovementType
from src.application.exceptions.invalid_data import InvalidData
from src.application.exceptions.not_found import NotFound
from src.application.utils.date_parser import parse_datetime
from src.domain.services.Stock.StockMovement.stock_movement_service import (
    StockMovementService,
)
from src.tests.mocks.mock_product_repository import get_mock_product_repository
from src.tests.mocks.mock_stock_movement_repository import (
    get_mock_stock_movement_repository,
)


@patch("src.domain.containers.service_container.ServiceContainer")
def test_move_stock_success(mock_service_container):
    repo = get_mock_stock_movement_repository()
    prod_repo = get_mock_product_repository()
    service = StockMovementService(repo, prod_repo)

    mock_current_stock_service = MagicMock()
    mock_current_stock_service.get_current_stock_by_product_id.return_value = (
        SimpleNamespace(
            body=CurrentStockDTO(
                product_id=1,
                total_quantity=100,
                last_updated="2024-01-01T10:00:00",
            )
        )
    )
    mock_service_container.current_stock_service.return_value = (
        mock_current_stock_service
    )

    dto = MoveStockDTO(
        product_id=1,
        movement_type=MovementType.IN.value,
        movement_source=MovementSource.BUY.value,
        quantity=10,
        created_by="admin",
        observations='teste obs',
    )

    result = service.move_stock(dto)

    repo.move_stock.assert_called_once_with(movement=dto)
    assert isinstance(result, HttpResponse)


def test_move_stock_invalid_data():
    repo = get_mock_stock_movement_repository()
    prod_repo = get_mock_product_repository()

    service = StockMovementService(repo, prod_repo)

    with pytest.raises(InvalidData):
        service.move_stock(None)


def test_get_all_stock_movements():
    repo = get_mock_stock_movement_repository()
    prod_repo = get_mock_product_repository()

    service = StockMovementService(repo, prod_repo)

    response = service.get_all_stock_movements()

    assert response.status_code == 200
    assert isinstance(response.body, list)
    assert response.body[0].product_id == 1


def test_get_single_stock_movement_success():
    repo = get_mock_stock_movement_repository()
    prod_repo = get_mock_product_repository()

    service = StockMovementService(repo, prod_repo)

    response = service.get_single_stock_movement(1)

    assert response.status_code == 200
    assert response.body.product_id == 1


def test_get_single_stock_movement_not_found():
    repo = get_mock_stock_movement_repository()
    prod_repo = get_mock_product_repository()

    service = StockMovementService(repo, prod_repo)
    repo.get_single_stock_movement.return_value = None

    with pytest.raises(NotFound):
        service.get_single_stock_movement(99)


def test_get_stock_movement_by_date():
    repo = get_mock_stock_movement_repository()
    prod_repo = get_mock_product_repository()

    service = StockMovementService(repo, prod_repo)

    date = "01/01/2024"

    response = service.get_stock_movement_by_date(date)

    assert response.status_code == 200
    assert len(response.body) == 1


def test_get_stock_movement_by_date_range():
    repo = get_mock_stock_movement_repository()
    prod_repo = get_mock_product_repository()

    service = StockMovementService(repo, prod_repo)

    start_date = "01/01/2023"
    end_date = "02/01/2024"

    response = service.get_stock_movement_by_date_range(start_date, end_date)

    assert response.status_code == 200
    assert len(response.body) == 1
