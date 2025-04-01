from src.application.dtos.brand.brand_dto import BrandDTO
from src.application.dtos.http_types.http_response import HttpResponse
from src.application.enums.status_codes import StatusCode
from src.application.exceptions.invalid_data import InvalidData
from src.application.exceptions.not_found import NotFound
from src.domain.services.Brand.brand_service_interface import IBrandService
from src.infra.repositories.Brand.brand_repository_interface import IBrandRepository


class BrandService(IBrandService):

    def __init__(self, brand_repository: IBrandRepository):
        self.brand_repository = brand_repository

    def create_brand(self, name: str) -> HttpResponse:
        brand_exists = self.brand_repository.get_brand_by_name(name)
        if brand_exists:
            raise InvalidData('Marca já existe')
        self.brand_repository.create_brand(name)
        return HttpResponse(
            status_code=StatusCode.CREATED.value,
            body={'message': 'Marca criada com sucesso'},
        )

    def get_brand_by_name(self, name: str) -> HttpResponse:
        found_brand = self.brand_repository.get_brand_by_name(name)
        if not found_brand or len(found_brand) == 0:
            raise NotFound('Marca não existe')
        brand = [BrandDTO(id=brand.id, name=brand.name) for brand in found_brand]
        return HttpResponse(status_code=StatusCode.OK.value, body=brand)

    def get_brand_by_id(self, brand_id: int) -> HttpResponse:
        found_brand = self.brand_repository.get_brand_by_id(brand_id)
        if not found_brand:
            raise NotFound('Marca não existe')
        brand = BrandDTO(id=found_brand.id, name=found_brand.name)
        return HttpResponse(status_code=StatusCode.OK.value, body=brand)

    def get_all_brands(self) -> HttpResponse:
        all_brands = self.brand_repository.get_all_brands()
        if not all_brands:
            return HttpResponse(status_code=StatusCode.OK.value, body=[])
        brands = [BrandDTO(id=brand.id, name=brand.name) for brand in all_brands]
        return HttpResponse(status_code=StatusCode.OK.value, body=brands)

    def update_brand(self, brand_id: int, name: str) -> HttpResponse:
        found_brand = self.brand_repository.get_brand_by_id(brand_id)
        if not found_brand:
            raise NotFound('Marca não existe')
        found_brand.name = name if name else found_brand.name
        self.brand_repository.update_brand(
            brand_id=found_brand.id, name=found_brand.name
        )
        return HttpResponse(
            status_code=StatusCode.OK.value,
            body={'message': 'Marca atualizada com sucesso'},
        )

    def delete_brand(self, brand_id: int) -> HttpResponse:
        found_brand = self.brand_repository.get_brand_by_id(brand_id)
        if not found_brand:
            raise NotFound('Marca não existe')
        self.brand_repository.delete_brand(brand_id)
        return HttpResponse(
            status_code=StatusCode.OK.value,
            body={'message': 'Marca deletada com sucesso'},
        )
