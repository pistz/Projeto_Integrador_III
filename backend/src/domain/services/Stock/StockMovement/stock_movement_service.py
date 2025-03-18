from src.application.dtos.http_types.http_response import HttpResponse
from src.application.enums.status_codes import StatusCode
from src.application.enums.stock_movement import MovementSource, MovementType
from src.application.exceptions.invalid_data import InvalidData
from src.application.dtos.stock.stock_dtos import CurrentStockDTO, MoveStockDTO, StockMovementDTO
from src.application.exceptions.not_found import NotFound
from src.application.utils.date_parser import parse_datetime
from src.domain.services.Stock.StockMovement.stock_movement_service_interface import IStockMovementService
from src.infra.containers.service_container import ServiceContainer
from src.infra.repositories.Products.products_repository_interface import IProductsRepository
from src.infra.repositories.Stock.StockMovement.stock_movement_repository_interface import IStockMovementRepository
from src.model.entities.stock_movement import StockMovement

class StockMovementService(IStockMovementService):

    def __init__(self, 
                stock_movement_repository:IStockMovementRepository, 
                products_repository:IProductsRepository,
                ):
        self.__stock_movement_repository = stock_movement_repository
        self.__products_repository = products_repository
        self.__current_stock_service = ServiceContainer.current_stock_service()

    def move_stock(self, movement:MoveStockDTO) -> HttpResponse:
        self.__validate_movements(movement=movement)
        current_stock = self.__validate_current_stock_exists(product_id=movement.product_id)
        is_positive_stock = self.__validate_current_stock_is_positive(current_stock=current_stock)

        if movement.movement_type == MovementType.OUT.value:
            if not is_positive_stock:
                raise InvalidData("Cannot move product, no stock available")
            movement.quantity = -(movement.quantity)            
        
        new_quantity = current_stock.total_quantity + movement.quantity
        current_stock.total_quantity = new_quantity

        self.__stock_movement_repository.move_stock(movement=movement)
        self.__current_stock_service.set_current_stock(current_stock=current_stock)
        return HttpResponse(
            body={"message":f"Registered movement {movement.movement_source} from {movement.movement_type}, product: {movement.product_id}"}, 
            status_code=StatusCode.CREATED.value)

    def get_all_stock_movements(self) -> HttpResponse:
        movements_list:list[StockMovement] = self.__stock_movement_repository.get_all_stock_movements()

        movements = [StockMovementDTO(
            id=movement.id, 
            product_id=movement.product_id, 
            movement_source=movement.movement_source, 
            movement_type=movement.movement_type, 
            movement_date=movement.movement_date, 
            created_by=movement.created_by,
            quantity=movement.quantity
            ) for movement in movements_list]
        return HttpResponse(body=movements, status_code=StatusCode.OK.value)

    def get_single_stock_movement(self, stock_movement_id:int) -> HttpResponse:
        movement = (
            self.__stock_movement_repository.get_single_stock_movement(
                stock_movement_id=stock_movement_id)
            )
        
        if not movement:
            raise NotFound("Movement not found!")
        
        movement_dto = StockMovementDTO(
            id=movement.id,
            product_id=movement.product_id,
            created_by=movement.created_by,
            movement_date=movement.movement_date,
            movement_source=movement.movement_source,
            movement_type=movement.movement_type,
            quantity=movement.quantity
        )
        
        return HttpResponse(body=movement_dto, status_code=StatusCode.OK.value)

    def get_stock_movement_by_date(self, date: str) -> HttpResponse:
        if not date:
            raise InvalidData("Date cannot be empty")
        
        parsed_date = parse_datetime(date)

        movements:list[StockMovement] = (
            self.__stock_movement_repository.get_stock_movement_by_date(date=parsed_date))
                
        response_list = [StockMovementDTO(
            id=movement.id, 
            product_id=movement.product_id, 
            movement_source=(movement.movement_source), 
            movement_type=(movement.movement_type), 
            movement_date=movement.movement_date, 
            created_by=movement.created_by,
            quantity=movement.quantity
            ) for movement in movements]
        
        return HttpResponse(body=response_list, status_code=StatusCode.OK.value)

    def get_stock_movement_by_date_range(self, start_date:str, end_date:str) -> HttpResponse:
        if not start_date or not end_date:
            raise InvalidData("Date cannot be empty")
        
        parsed_start_date = parse_datetime(start_date)
        parsed_end_date = parse_datetime(end_date)

        movements:list[StockMovement] = (
            self.__stock_movement_repository.get_stock_movement_by_date_range(
                start_date=parsed_start_date, end_date=parsed_end_date
            ))
        
        response_list = [StockMovementDTO(
            id=movement.id, 
            product_id=movement.product_id, 
            movement_source=movement.movement_source, 
            movement_type=movement.movement_type, 
            movement_date=movement.movement_date, 
            created_by=movement.created_by,
            quantity=movement.quantity
            ) for movement in movements]
        
        return HttpResponse(body=response_list, status_code=StatusCode.OK.value)

    def __validate_movements(self, movement: MoveStockDTO):
        if not movement:
            raise InvalidData("Not a valid movement!")
        
        product = self.__products_repository.get_product_by_id(product_id=movement.product_id)
        if not product:
            raise InvalidData("Product not registered!")
                
        try:
            movement.movement_source = MovementSource(movement.movement_source)
        except ValueError:
            raise InvalidData(
                f"Movement source must be 'BUY' or 'DONATION', not {movement.movement_source}"
            )

        try:
            movement.movement_type = MovementType(movement.movement_type)
        except ValueError:
            raise InvalidData(
                f"Movement type must be 'IN' or 'OUT', not {movement.movement_type}"
            )
        
    def __validate_current_stock_exists(self, product_id:int) -> CurrentStockDTO:
        current_stock = self.__current_stock_service.get_current_stock_by_product_id(product_id=product_id)
        if not current_stock:
            raise InvalidData("Current stock is not set for this product!")
        return current_stock.body       

    def __validate_current_stock_is_positive(self, current_stock:CurrentStockDTO) -> bool:
        if current_stock.total_quantity > 0:
            return True
        return False
