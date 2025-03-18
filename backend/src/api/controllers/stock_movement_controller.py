from flask import jsonify, request
from src.application.dtos.http_types.http_request import HttpRequest
from src.application.dtos.http_types.http_response import HttpResponse
from src.application.dtos.stock.stock_dtos import MoveStockDTO
from src.infra.containers.service_container import ServiceContainer


class StockMovementController:
    def __init__(self):
        self.__stock_movement_service = ServiceContainer().stock_movement_service()


    def __send_response(self, response:HttpResponse):
        return jsonify(response.body), response.status_code
    
    def move_stock(self):
        http_request = HttpRequest(request.json)
        move_stock_dto = MoveStockDTO(**http_request.body)
        response:HttpResponse = self.__stock_movement_service.move_stock(movement=move_stock_dto)
        return self.__send_response(response)
    
    def get_all_stock_movements(self):
        response:HttpResponse = self.__stock_movement_service.get_all_stock_movements()
        return self.__send_response(response)
    
    def get_single_stock_movement(self, stock_movement_id):
        response:HttpResponse = self.__stock_movement_service.get_single_stock_movement(stock_movement_id=stock_movement_id)
        return self.__send_response(response)
    
    def get_stock_movements_by_date(self):
        http_request = HttpRequest(request.json)
        date = http_request.body['date'] if http_request.body['date'] else None
        response:HttpResponse = self.__stock_movement_service.get_stock_movement_by_date(date)
        return self.__send_response(response)
    
    def get_stock_movements_by_date_range(self):
        http_request = HttpRequest(request.json)
        start_date = http_request.body['start_date'] if http_request.body['start_date'] else None
        end_date = http_request.body['end_date'] if http_request.body['end_date'] else None
        response:HttpResponse = self.__stock_movement_service.get_stock_movement_by_date_range(start_date=start_date, end_date=end_date)
        return self.__send_response(response)

