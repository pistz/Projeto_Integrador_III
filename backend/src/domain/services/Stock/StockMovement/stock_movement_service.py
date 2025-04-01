from src.application.dtos.http_types.http_response import HttpResponse
from src.application.dtos.stock.stock_dtos import (
    CurrentStockDTO,
    MoveStockDTO,
    ProductStockDTO,
    StockMovementDTO,
)
from src.application.enums.status_codes import StatusCode
from src.application.enums.stock_movement import MovementSource, MovementType
from src.application.exceptions.invalid_data import InvalidData
from src.application.exceptions.not_found import NotFound
from src.application.utils.date_parser import parse_datetime
from src.domain.services.Stock.StockMovement.stock_movement_service_interface import (
    IStockMovementService,
)
from src.infra.repositories.Products.products_repository_interface import (
    IProductsRepository,
)
from src.infra.repositories.Stock.StockMovement.stock_movement_repository_interface import (
    IStockMovementRepository,
)
from src.model.entities.stock_movement import StockMovement


class StockMovementService(IStockMovementService):

    def __init__(
        self,
        stock_movement_repository: IStockMovementRepository,
        products_repository: IProductsRepository,
    ):
        self.__stock_movement_repository = stock_movement_repository
        self.__products_repository = products_repository

    def move_stock(self, movement: MoveStockDTO) -> HttpResponse:
        self.__validate_movements(movement=movement)
        current_stock = self.__validate_current_stock_exists(
            product_id=movement.product_id
        )
        is_positive_stock = self.__validate_current_stock_is_positive(
            current_stock=current_stock
        )

        if movement.movement_type == MovementType.OUT:
            if not is_positive_stock:
                raise InvalidData("Não há estoque deste produto")

            movement.quantity = (
                (movement.quantity) * (-1)
                if current_stock.total_quantity >= movement.quantity
                else 0
            )

        if movement.quantity == 0:
            raise InvalidData('Não há estoque deste produto')

        new_quantity = current_stock.total_quantity + movement.quantity
        current_stock.total_quantity = new_quantity

        self.__stock_movement_repository.move_stock(movement=movement)
        product_stock: ProductStockDTO = ProductStockDTO(
            product_id=current_stock.product_id,
            total_quantity=current_stock.total_quantity,
        )

        self.__set_current_stock(stock_product=product_stock)

        return HttpResponse(
            body={
                "message": f"Movimento registrado {movement.movement_source} de {movement.movement_type}, produto: {movement.product_id}, quantidade: {movement.quantity}"
            },
            status_code=StatusCode.CREATED.value,
        )

    def get_all_stock_movements(self) -> HttpResponse:
        movements_list: list[StockMovement] = (
            self.__stock_movement_repository.get_all_stock_movements()
        )

        movements = [
            StockMovementDTO(
                id=movement.id,
                product_id=movement.product_id,
                movement_source=MovementSource(movement.movement_source).value,
                movement_type=MovementType(movement.movement_type).value,
                movement_date=movement.movement_date,
                created_by=movement.created_by,
                quantity=movement.quantity,
                observations=movement.observations,
            )
            for movement in movements_list
        ]
        return HttpResponse(body=movements, status_code=StatusCode.OK.value)

    def get_single_stock_movement(self, stock_movement_id: int) -> HttpResponse:
        movement = self.__stock_movement_repository.get_single_stock_movement(
            stock_movement_id=stock_movement_id
        )

        if not movement:
            raise NotFound("Movimento não encontrado!")

        movement_dto = StockMovementDTO(
            id=movement.id,
            product_id=movement.product_id,
            movement_source=MovementSource(movement.movement_source).value,
            movement_type=MovementType(movement.movement_type).value,
            movement_date=movement.movement_date,
            created_by=movement.created_by,
            quantity=movement.quantity,
            observations=movement.observations,
        )

        return HttpResponse(body=movement_dto, status_code=StatusCode.OK.value)

    def get_stock_movement_by_date(self, date: str) -> HttpResponse:
        if not date:
            raise InvalidData("Data não pode ser vazia")

        parsed_date = parse_datetime(date)

        movements: list[StockMovement] = (
            self.__stock_movement_repository.get_stock_movement_by_date(
                date=parsed_date
            )
        )

        response_list = [
            StockMovementDTO(
                id=movement.id,
                product_id=movement.product_id,
                movement_source=MovementSource(movement.movement_source).value,
                movement_type=MovementType(movement.movement_type).value,
                movement_date=movement.movement_date,
                created_by=movement.created_by,
                quantity=movement.quantity,
                observations=movement.observations,
            )
            for movement in movements
        ]

        return HttpResponse(body=response_list, status_code=StatusCode.OK.value)

    def get_stock_movement_by_date_range(
        self, start_date: str, end_date: str
    ) -> HttpResponse:
        if not start_date or not end_date:
            raise InvalidData("Data não pode ser vazia")

        parsed_start_date = parse_datetime(start_date)
        parsed_end_date = parse_datetime(end_date)

        movements: list[StockMovement] = (
            self.__stock_movement_repository.get_stock_movement_by_date_range(
                start_date=parsed_start_date, end_date=parsed_end_date
            )
        )

        response_list = [
            StockMovementDTO(
                id=movement.id,
                product_id=movement.product_id,
                movement_source=MovementSource(movement.movement_source).value,
                movement_type=MovementType(movement.movement_type).value,
                movement_date=movement.movement_date,
                created_by=movement.created_by,
                quantity=movement.quantity,
                observations=movement.observations,
            )
            for movement in movements
        ]

        return HttpResponse(body=response_list, status_code=StatusCode.OK.value)

    def __validate_movements(self, movement: MoveStockDTO):
        if not movement:
            raise InvalidData("Movimento não é válido!")

        product = self.__products_repository.get_product_by_id(
            product_id=movement.product_id
        )
        if not product:
            raise InvalidData("Produto não registrado!")

        try:
            movement.movement_source = MovementSource(movement.movement_source)
        except ValueError:
            raise InvalidData(
                f"Movement source must be 'BUY', 'DONATION', 'USE' or 'EXPIRED', not '{movement.movement_source}'"
            )

        try:
            movement.movement_type = MovementType(movement.movement_type)
        except ValueError:
            raise InvalidData(
                f"Movement type must be 'IN' or 'OUT', not '{movement.movement_type}'"
            )

        # Validação cruzada: tipo vs. origem
        if (
            movement.movement_type == MovementType.IN
            and movement.movement_source
            not in [MovementSource.BUY, MovementSource.DONATION]
        ):
            raise InvalidData(
                "Movement type 'IN' only accepts source 'BUY' or 'DONATION'."
            )

        if (
            movement.movement_type == MovementType.OUT
            and movement.movement_source
            not in [MovementSource.USE, MovementSource.EXPIRED]
        ):
            raise InvalidData(
                "Movement type 'OUT' only accepts source 'USE' or 'EXPIRED'."
            )

    def __validate_current_stock_exists(self, product_id: int) -> CurrentStockDTO:
        current_stock = self.__get_current_stock_by_product_id(product_id=product_id)
        if not current_stock:
            raise InvalidData("Estoque atual não foi configurado para este produto!")
        return current_stock.body

    def __validate_current_stock_is_positive(
        self, current_stock: CurrentStockDTO
    ) -> bool:
        if current_stock.total_quantity > 0:
            return True
        return False

    def __set_current_stock(self, stock_product: ProductStockDTO):
        from src.domain.containers.service_container import ServiceContainer

        ServiceContainer.current_stock_service().set_current_stock(
            stock_product=stock_product
        )
        return

    def __get_current_stock_by_product_id(self, product_id: int):
        from src.domain.containers.service_container import ServiceContainer

        product = (
            ServiceContainer.current_stock_service().get_current_stock_by_product_id(
                product_id=product_id
            )
        )
        return product
