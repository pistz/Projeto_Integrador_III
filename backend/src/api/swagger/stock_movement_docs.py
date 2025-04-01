get_all_stock_movements_doc = {
    "tags": ["Movimentações de Estoque"],
    "security": [{"Bearer": []}],
    "summary": "Lista todas as movimentações de estoque",
    "responses": {
        200: {
            "description": "Lista de movimentações retornada com sucesso",
            "schema": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {"type": "integer", "example": 1},
                        "product_id": {"type": "integer", "example": 10},
                        "movement_type": {"type": "string", "example": "ENTRADA"},
                        "movement_source": {"type": "string", "example": "Compra"},
                        "quantity": {"type": "integer", "example": 50},
                        "created_by": {
                            "type": "string",
                            "example": "admin@example.com",
                        },
                        "observations": {
                            "type": "string",
                            "example": "Reposição mensal",
                        },
                        "movement_date": {
                            "type": "string",
                            "format": "date-time",
                            "example": "2024-03-30T10:30:00",
                        },
                    },
                },
            },
        }
    },
}

move_stock_doc = {
    "tags": ["Movimentações de Estoque"],
    "security": [{"Bearer": []}],
    "summary": "Registra uma movimentação de estoque",
    "parameters": [
        {
            "name": "body",
            "in": "body",
            "required": True,
            "schema": {
                "type": "object",
                "required": [
                    "product_id",
                    "movement_type",
                    "movement_source",
                    "quantity",
                    "created_by",
                ],
                "properties": {
                    "product_id": {"type": "integer", "example": 10},
                    "movement_type": {"type": "string", "example": "ENTRADA"},
                    "movement_source": {"type": "string", "example": "Transferência"},
                    "quantity": {"type": "integer", "example": 25},
                    "created_by": {"type": "string", "example": "user@example.com"},
                    "observations": {
                        "type": "string",
                        "example": "Transferência do estoque da loja 1",
                    },
                },
            },
        }
    ],
    "responses": {
        201: {"description": "Movimentação registrada com sucesso"},
        400: {"description": "Erro ao registrar movimentação"},
    },
}

get_single_stock_movement_doc = {
    "tags": ["Movimentações de Estoque"],
    "security": [{"Bearer": []}],
    "summary": "Busca uma movimentação específica pelo ID",
    "parameters": [
        {
            "name": "stock_movement_id",
            "in": "path",
            "type": "integer",
            "required": True,
            "description": "ID da movimentação",
        }
    ],
    "responses": {
        200: {
            "description": "Movimentação encontrada",
            "schema": {
                "type": "object",
                "properties": {
                    "id": {"type": "integer"},
                    "product_id": {"type": "integer"},
                    "movement_type": {"type": "string"},
                    "movement_source": {"type": "string"},
                    "quantity": {"type": "integer"},
                    "created_by": {"type": "string"},
                    "observations": {"type": "string"},
                    "movement_date": {"type": "string", "format": "date-time"},
                },
            },
        },
        404: {"description": "Movimentação não encontrada"},
    },
}

get_stock_movements_by_date_doc = {
    "tags": ["Movimentações de Estoque"],
    "security": [{"Bearer": []}],
    "summary": "Busca movimentações por data exata",
    "parameters": [
        {
            "name": "date",
            "in": "query",
            "type": "string",
            "format": "date",
            "required": True,
            "description": "Data no formato YYYY-MM-DD",
            "example": "2024-03-30",
        }
    ],
    "responses": {
        200: {
            "description": "Movimentações encontradas na data informada",
            "schema": {
                "type": "array",
                "items": {"type": "object"},
            },
        },
        404: {"description": "Nenhuma movimentação encontrada"},
    },
}

get_stock_movements_by_date_range_doc = {
    "tags": ["Movimentações de Estoque"],
    "security": [{"Bearer": []}],
    "summary": "Busca movimentações por intervalo de datas",
    "parameters": [
        {
            "name": "start_date",
            "in": "query",
            "type": "string",
            "format": "date",
            "required": True,
            "description": "Data inicial (YYYY-MM-DD)",
        },
        {
            "name": "end_date",
            "in": "query",
            "type": "string",
            "format": "date",
            "required": True,
            "description": "Data final (YYYY-MM-DD)",
        },
    ],
    "responses": {
        200: {
            "description": "Movimentações encontradas no intervalo de datas",
            "schema": {
                "type": "array",
                "items": {"type": "object"},
            },
        },
        404: {"description": "Nenhuma movimentação encontrada"},
    },
}
