from src.application.dtos.category.category_dto import CategoryDTO
from src.application.dtos.http_types.http_response import HttpResponse
from src.application.exceptions.invalid_data import InvalidData
from src.infra.repositories.Category.category_repository_interface import ICategoryRepository


class CategoryService:
    
    def __init__(self, category_repository:ICategoryRepository):
        self.category_repository = category_repository

    def create_category(self, name: str) -> HttpResponse:
        category_exists = self.category_repository.get_category_by_name(name)
        if category_exists:
            raise InvalidData('Category already exists')
        self.category_repository.create_category(name)
        return HttpResponse(status_code=201, body={'message': 'Category created successfully'})
    
    def get_category_by_name(self, name: str) -> HttpResponse:
        found_category = self.category_repository.get_category_by_name(name)
        if not found_category:
            raise InvalidData('Category not found')
        category = CategoryDTO(id=found_category.id, name=found_category.name)
        return HttpResponse(status_code=200, body=category)
    
    def get_category_by_id(self, category_id: int) -> HttpResponse:
        found_category = self.category_repository.get_category_by_id(category_id)
        if not found_category:
            raise InvalidData('Category not found')
        category = CategoryDTO(id=found_category.id, name=found_category.name)
        return HttpResponse(status_code=200, body=category)
    
    def get_all_categories(self) -> HttpResponse:
        all_categories = self.category_repository.get_all_categories()
        if not all_categories:
            return HttpResponse(status_code=200, body=[])
        categories = [CategoryDTO(id=category.id, name=category.name) for category in all_categories]
        return HttpResponse(status_code=200, body=categories)
    
    def update_category(self, category_id:int, name:str) -> HttpResponse:
        # TODO: Implement update_category method
        pass
    
    def delete_category(self, category_id:int) -> HttpResponse:
        #TODO: Implement delete_category method
        pass