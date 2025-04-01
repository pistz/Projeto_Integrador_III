get_full_current_stock_doc = {
    "tags": ["Estoque Atual"],
    "security": [{"Bearer": []}],
    "summary": "Lista o estoque atual de todos os produtos",
    "responses": {
        200: {
            "description": "Lista do estoque atual retornada com sucesso",
            "schema": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "product_id": {"type": "integer", "example": 1},
                        "total_quantity": {"type": "integer", "example": 120},
                        "last_updated": {
                            "type": "string",
                            "format": "date-time",
                            "example": "2024-04-01T10:45:00",
                        },
                    },
                },
            },
        }
    },
}

get_current_stock_by_product_id_doc = {
    "tags": ["Estoque Atual"],
    "security": [{"Bearer": []}],
    "summary": "Busca o estoque atual de um produto pelo ID",
    "parameters": [
        {
            "name": "product_id",
            "in": "path",
            "type": "integer",
            "required": True,
            "description": "ID do produto",
        }
    ],
    "responses": {
        200: {
            "description": "Estoque atual encontrado",
            "schema": {
                "type": "object",
                "properties": {
                    "product_id": {"type": "integer", "example": 1},
                    "total_quantity": {"type": "integer", "example": 120},
                    "last_updated": {
                        "type": "string",
                        "format": "date-time",
                        "example": "2024-04-01T10:45:00",
                    },
                },
            },
        },
        404: {"description": "Produto não encontrado ou sem estoque registrado"},
    },
}
