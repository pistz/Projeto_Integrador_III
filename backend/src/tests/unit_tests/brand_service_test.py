import pytest
from src.domain.services.Brand.brand_service import BrandService
from src.application.dtos.brand.brand_dto import BrandDTO
from src.application.exceptions.invalid_data import InvalidData
from src.tests.mocks.mock_brand_repository import get_mock_brand_repository

@pytest.fixture
def brand_service():
    repo = get_mock_brand_repository()
    return BrandService(repo)

def test_create_brand_success(brand_service):
    response = brand_service.create_brand("BrandNew")
    assert response.status_code == StatusCode.CREATED.value
    assert response.body["message"] == "Brand created successfully"

def test_create_brand_already_exists():
    repo = get_mock_brand_repository()
    repo.get_brand_by_name.return_value = True 
    service = BrandService(repo)

    with pytest.raises(InvalidData, match="Brand already exists"):
        service.create_brand("NewBrand")

def test_get_brand_by_name_success(brand_service):
    response = brand_service.get_brand_by_name("NewBrand")
    assert response.status_code == StatusCode.OK.value
    assert isinstance(response.body, BrandDTO)
    assert response.body.name == "NewBrand"

def test_get_brand_by_name_not_found():
    repo = get_mock_brand_repository()
    repo.get_brand_by_name.return_value = None
    service = BrandService(repo)

    with pytest.raises(InvalidData, match="Brand not found"):
        service.get_brand_by_name("Unknown")

def test_get_brand_by_id_success(brand_service):
    response = brand_service.get_brand_by_id(1)
    assert response.status_code == StatusCode.OK.value
    assert isinstance(response.body, BrandDTO)
    assert response.body.id == 1

def test_get_brand_by_id_not_found():
    repo = get_mock_brand_repository()
    repo.get_brand_by_id.return_value = None
    service = BrandService(repo)

    with pytest.raises(InvalidData, match="Brand not found"):
        service.get_brand_by_id(999)

def test_get_all_brands_success(brand_service):
    response = brand_service.get_all_brands()
    assert response.status_code == StatusCode.OK.value
    assert isinstance(response.body, list)
    assert len(response.body) == 1
    assert isinstance(response.body[0], BrandDTO)

def test_get_all_brands_empty():
    repo = get_mock_brand_repository()
    repo.get_all_brands.return_value = []
    service = BrandService(repo)

    response = service.get_all_brands()
    assert response.status_code == StatusCode.OK.value
    assert response.body == []

def test_update_brand_success(brand_service):
    response = brand_service.update_brand(1, "New Name")
    assert response.status_code == StatusCode.OK.value
    assert response.body["message"] == "Brand updated successfully"

def test_update_brand_not_found():
    repo = get_mock_brand_repository()
    repo.get_brand_by_id.return_value = None
    service = BrandService(repo)

    with pytest.raises(InvalidData, match="Brand not found"):
        service.update_brand(999, "Whatever")

def test_delete_brand_success(brand_service):
    response = brand_service.delete_brand(1)
    assert response.status_code == StatusCode.OK.value
    assert response.body["message"] == "Brand deleted successfully"

def test_delete_brand_not_found():
    repo = get_mock_brand_repository()
    repo.get_brand_by_id.return_value = None
    service = BrandService(repo)

    with pytest.raises(InvalidData, match="Brand not found"):
        service.delete_brand(999)
