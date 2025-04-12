get_barcodes_by_product_id_doc = {
    "tags": ["Códigos de Barras"],
    "security": [{"Bearer": []}],
    "summary": "Lista os códigos de barras de um produto",
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
            "description": "Lista de códigos de barras retornada com sucesso",
            "schema": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {"type": "integer", "example": 1},
                        "barcode": {"type": "string", "example": "7891234567890"},
                        "product_id": {"type": "integer", "example": 10},
                    },
                },
            },
        },
        404: {"description": "Produto não encontrado"},
    },
}

create_barcode_doc = {
    "tags": ["Códigos de Barras"],
    "security": [{"Bearer": []}],
    "summary": "Cria um novo código de barras",
    "parameters": [
        {
            "name": "body",
            "in": "body",
            "required": True,
            "schema": {
                "type": "object",
                "required": ["barcode", "product_id"],
                "properties": {
                    "barcode": {"type": "string", "example": "7891234567890"},
                    "product_id": {"type": "integer", "example": 10},
                },
            },
        }
    ],
    "responses": {
        201: {
            "description": "Código de barras criado com sucesso",
            "schema": {
                "type": "object",
                "properties": {
                    "id": {"type": "integer", "example": 1},
                    "barcode": {"type": "string", "example": "7891234567890"},
                    "product_id": {"type": "integer", "example": 10},
                },
            },
        },
        400: {"description": "Erro ao criar o código de barras"},
    },
}

update_barcode_doc = {
    "tags": ["Códigos de Barras"],
    "security": [{"Bearer": []}],
    "summary": "Atualiza um código de barras existente",
    "parameters": [
        {
            "name": "barcode_id",
            "in": "path",
            "type": "integer",
            "required": True,
            "description": "ID do código de barras",
        },
        {
            "name": "body",
            "in": "body",
            "required": True,
            "schema": {
                "type": "object",
                "required": ["barcode", "product_id"],
                "properties": {
                    "barcode": {"type": "string", "example": "7899876543210"},
                    "product_id": {"type": "integer", "example": 10},
                },
            },
        },
    ],
    "responses": {
        200: {
            "description": "Código de barras atualizado com sucesso",
            "schema": {
                "type": "object",
                "properties": {
                    "id": {"type": "integer", "example": 1},
                    "barcode": {"type": "string", "example": "7899876543210"},
                    "product_id": {"type": "integer", "example": 10},
                },
            },
        },
        404: {"description": "Código de barras não encontrado"},
    },
}

delete_barcode_doc = {
    "tags": ["Códigos de Barras"],
    "security": [{"Bearer": []}],
    "summary": "Remove um código de barras",
    "parameters": [
        {
            "name": "barcode_id",
            "in": "path",
            "type": "integer",
            "required": True,
            "description": "ID do código de barras",
        }
    ],
    "responses": {
        200: {"description": "Código de barras removido com sucesso"},
        404: {"description": "Código de barras não encontrado"},
    },
}
