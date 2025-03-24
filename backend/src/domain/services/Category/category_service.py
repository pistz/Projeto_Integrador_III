from src.application.dtos.category.category_dto import CategoryDTO
from src.application.dtos.http_types.http_response import HttpResponse
from src.application.enums.status_codes import StatusCode
from src.application.exceptions.invalid_data import InvalidData
from src.application.exceptions.not_found import NotFound
from src.domain.services.Category.category_service_interface import ICategoryService
from src.infra.repositories.Category.category_repository_interface import ICategoryRepository


class CategoryService(ICategoryService):
    
    def __init__(self, category_repository:ICategoryRepository):
        self.category_repository = category_repository

    def create_category(self, name: str) -> HttpResponse:
        category_exists = self.category_repository.get_category_by_name(name)
        if category_exists:
            raise InvalidData('Categoria já existe')
        self.category_repository.create_category(name)
        return HttpResponse(status_code=StatusCode.CREATED.value, body={'message': 'Categoria criada com sucesso'})
    
    def get_category_by_name(self, name: str) -> HttpResponse:
        found_category = self.category_repository.get_category_by_name(name)
        if not found_category or len(found_category) == 0:
            raise NotFound('Categoria não existe')
        category = [CategoryDTO(id=category.id, name=category.name)for category in found_category]
        return HttpResponse(status_code=StatusCode.OK.value, body=category)
    
    def get_category_by_id(self, category_id: int) -> HttpResponse:
        found_category = self.category_repository.get_category_by_id(category_id)
        if not found_category:
            raise NotFound('Categoria não existe')
        category = CategoryDTO(id=found_category.id, name=found_category.name)
        return HttpResponse(status_code=StatusCode.OK.value, body=category)
    
    def get_all_categories(self) -> HttpResponse:
        all_categories = self.category_repository.get_all_categories()
        if not all_categories:
            return HttpResponse(status_code=StatusCode.OK.value, body=[])
        categories = [CategoryDTO(id=category.id, name=category.name) for category in all_categories]
        return HttpResponse(status_code=StatusCode.OK.value, body=categories)
    
    def update_category(self, category_id:int, name:str) -> HttpResponse:
        found_category = self.category_repository.get_category_by_id(category_id)
        if not found_category:
            raise NotFound('Categoria não existe')
        found_category.name = name if name else found_category.name
        self.category_repository.update_category(category_id=found_category.id, name=found_category.name)
        return HttpResponse(status_code=StatusCode.OK.value, body={'message': 'Categoria atualizada com sucesso'})
        
    
    def delete_category(self, category_id:int) -> HttpResponse:
        found_category = self.category_repository.get_category_by_id(category_id)
        if not found_category:
            raise NotFound('Categoria não existe')
        self.category_repository.delete_category(category_id)
        return HttpResponse(status_code=StatusCode.OK.value, body={'message': 'Categoria deletada com sucesso'})