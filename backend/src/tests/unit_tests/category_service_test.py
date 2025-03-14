import pytest
from src.domain.services.Category.category_service import CategoryService
from src.application.dtos.category.category_dto import CategoryDTO
from src.application.exceptions.invalid_data import InvalidData
from src.tests.mocks.mock_category_repository import get_mock_category_repository

@pytest.fixture
def category_service():
    repo = get_mock_category_repository()
    return CategoryService(repo)

def test_create_category_success(category_service):
    response = category_service.create_category("Books")
    assert response.status_code == 201
    assert response.body["message"] == "Category created successfully"

def test_create_category_already_exists():
    repo = get_mock_category_repository()
    repo.get_category_by_name.return_value = True 
    service = CategoryService(repo)

    with pytest.raises(InvalidData, match="Category already exists"):
        service.create_category("Food")

def test_get_category_by_name_success(category_service):
    response = category_service.get_category_by_name("Food")
    assert response.status_code == 200
    assert isinstance(response.body, CategoryDTO)
    assert response.body.name == "Food"

def test_get_category_by_name_not_found():
    repo = get_mock_category_repository()
    repo.get_category_by_name.return_value = None
    service = CategoryService(repo)

    with pytest.raises(InvalidData, match="Category not found"):
        service.get_category_by_name("Unknown")

def test_get_category_by_id_success(category_service):
    response = category_service.get_category_by_id(1)
    assert response.status_code == 200
    assert isinstance(response.body, CategoryDTO)
    assert response.body.id == 1

def test_get_category_by_id_not_found():
    repo = get_mock_category_repository()
    repo.get_category_by_id.return_value = None
    service = CategoryService(repo)

    with pytest.raises(InvalidData, match="Category not found"):
        service.get_category_by_id(999)

def test_get_all_categories_success(category_service):
    response = category_service.get_all_categories()
    assert response.status_code == 200
    assert isinstance(response.body, list)
    assert len(response.body) == 1
    assert isinstance(response.body[0], CategoryDTO)

def test_get_all_categories_empty():
    repo = get_mock_category_repository()
    repo.get_all_categories.return_value = []
    service = CategoryService(repo)

    response = service.get_all_categories()
    assert response.status_code == 200
    assert response.body == []

def test_update_category_success(category_service):
    response = category_service.update_category(1, "New Name")
    assert response.status_code == 200
    assert response.body["message"] == "Category updated successfully"

def test_update_category_not_found():
    repo = get_mock_category_repository()
    repo.get_category_by_id.return_value = None
    service = CategoryService(repo)

    with pytest.raises(InvalidData, match="Category not found"):
        service.update_category(999, "Whatever")

def test_delete_category_success(category_service):
    response = category_service.delete_category(1)
    assert response.status_code == 200
    assert response.body["message"] == "Category deleted successfully"

def test_delete_category_not_found():
    repo = get_mock_category_repository()
    repo.get_category_by_id.return_value = None
    service = CategoryService(repo)

    with pytest.raises(InvalidData, match="Category not found"):
        service.delete_category(999)
