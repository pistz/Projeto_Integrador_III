from src.application.dtos.http_types.http_response import HttpResponse
from src.application.dtos.stock.stock_dtos import CurrentStockDTO, ProductStockDTO
from src.application.enums.status_codes import StatusCode
from src.application.exceptions.not_found import NotFound
from src.application.exceptions.invalid_data import InvalidData
from src.domain.services.Stock.CurrentStock.current_stock_service_interface import ICurrentStockService
from src.infra.repositories.Products.products_repository_interface import IProductsRepository
from src.infra.repositories.Stock.CurrentStock.current_stock_repository_interface import ICurrentStockRepository
from src.model.entities.current_stock import CurrentStock


class CurrentStockService(ICurrentStockService):

    def __init__(self, 
                current_stock_repository:ICurrentStockRepository):
        self.__current_stock_repository = current_stock_repository

    def set_current_stock(self, stock_product:ProductStockDTO) -> None:
        self.__validate_product(product_stock=stock_product)
        self.__current_stock_repository.set_current_stock(product_stock=stock_product)
        return
    
    def get_current_stock_by_product_id(self, product_id:int) -> HttpResponse:
        current_stock = self.__validate_product_existence(id=product_id)
        return HttpResponse(body=current_stock, status_code=StatusCode.OK.value)

    def get_full_current_stock(self) -> HttpResponse:
        current_list:list[CurrentStock] = self.__current_stock_repository.get_full_current_stock()
        current_stock_dto = [CurrentStockDTO(
            product_id=current.product_id, total_quantity=current.total_quantity, last_updated=current.last_updated) for current in current_list]
        return HttpResponse(body=current_stock_dto, status_code=StatusCode.OK.value)

    def __validate_product(self, product_stock:ProductStockDTO) -> None:
        if not product_stock:
            raise InvalidData("Invalid data")
    
    def __validate_product_existence(self, id:int) -> CurrentStockDTO:
        found_product = self.__current_stock_repository.get_current_stock_by_product_id(product_id=id)
        if not found_product:
            raise NotFound(f"Product_id '{id}' not found")
        product_current_stock = CurrentStockDTO(
            product_id=found_product.product_id, 
            total_quantity=found_product.total_quantity, 
            last_updated=found_product.last_updated
        )
        return product_current_stock
        
        
