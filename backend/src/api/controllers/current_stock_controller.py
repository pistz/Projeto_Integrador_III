from flask import jsonify
from src.application.dtos.http_types.http_response import HttpResponse
from src.infra.containers.service_container import ServiceContainer


class CurrentStockController:
    def __init__(self):
        self.__current_stock_service = ServiceContainer.current_stock_service()

    def __send_response(self, response:HttpResponse):
        return jsonify(response.body), response.status_code
    
    def get_current_stock_by_product_id(self, product_id:int):
        response:HttpResponse = self.__current_stock_service.get_current_stock_by_product_id(product_id=product_id)
        return self.__send_response(response=response)
    
    def get_full_current_stock(self):
        response:HttpResponse = self.__current_stock_service.get_full_current_stock()
        return self.__send_response(response=response)