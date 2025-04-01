from unittest.mock import MagicMock

import pytest

from src.application.dtos.product.product_dtos import CreateProductDTO, UpdateProductDTO
from src.application.enums.status_codes import StatusCode
from src.application.exceptions.invalid_data import InvalidData
from src.application.exceptions.not_found import NotFound
from src.domain.services.Product.product_service import ProductService
from src.tests.mocks.mock_product_repository import get_mock_product_repository


@pytest.fixture
def product_service():
    mock_repo = get_mock_product_repository()
    return ProductService(product_repository=mock_repo)


def test_get_product_by_id_success(product_service):
    response = product_service.get_product_by_id(1)
    assert response.status_code == StatusCode.OK.value
    assert response.body.name == "Laptop"


def test_get_product_by_id_not_found(product_service):
    with pytest.raises(NotFound):
        product_service.get_product_by_id(999)


def test_get_product_by_name_success(product_service):
    response = product_service.get_product_by_name("Laptop")
    assert response.status_code == StatusCode.OK.value
    assert len(response.body) == 1
    assert response.body[0].name == "Laptop"


def test_get_product_by_name_not_found(product_service):
    with pytest.raises(NotFound):
        product_service.get_product_by_name("NonExisting")


def test_get_all_products(product_service):
    response = product_service.get_all_products()
    assert response.status_code == StatusCode.OK.value
    assert len(response.body) == 1


def test_get_all_products_by_brand_id(product_service):
    response = product_service.get_all_products_by_brand_id(10)
    assert response.status_code == StatusCode.OK.value
    assert len(response.body) == 1


def test_get_all_products_by_category_id(product_service):
    response = product_service.get_all_products_by_category_id(20)
    assert response.status_code == StatusCode.OK.value
    assert len(response.body) == 1


def test_create_product_success(product_service):
    product = CreateProductDTO(
        name="Mouse", description="Wireless mouse", brand_id=1, category_id=2
    )

    mock_product_repository = get_mock_product_repository()
    product_service._ProductService__product_repository = mock_product_repository

    product_service._ProductService__set_current_stock = MagicMock()

    response = product_service.create_product(product)

    assert response.status_code == StatusCode.CREATED.value
    assert response.body["message"] == "Produto criado com sucesso"


def test_create_product_invalid(product_service):
    product = CreateProductDTO(
        name="", description="desc", brand_id=None, category_id=None
    )
    with pytest.raises(InvalidData):
        product_service.create_product(product)


def test_update_product_success(product_service):
    update_data = UpdateProductDTO(
        name="Updated Laptop", description="Updated", brand_id=99, category_id=88
    )
    response = product_service.update_product(1, update_data)
    assert response.status_code == StatusCode.CREATED.value
    assert response.body["message"] == "Produto atualizado com sucesso"


def test_update_product_not_found(product_service):
    update_data = UpdateProductDTO(
        name="Updated", description="Updated", brand_id=99, category_id=88
    )
    with pytest.raises(NotFound):
        product_service.update_product(999, update_data)


def test_delete_product_success(product_service):
    response = product_service.delete_product(1)
    assert response.status_code == StatusCode.OK.value
    assert response.body["message"] == "Produto deletado com sucesso"


def test_delete_product_not_found(product_service):
    with pytest.raises(NotFound):
        product_service.delete_product(999)
