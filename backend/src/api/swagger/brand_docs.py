get_all_brands_doc = {
    "tags": ["Marcas"],
    "security": [{"Bearer": []}],
    "summary": "Lista todas as marcas",
    "responses": {
        200: {
            "description": "Lista de marcas retornada com sucesso",
            "schema": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {"type": "integer", "example": 1},
                        "name": {"type": "string", "example": "Nike"},
                    },
                },
            },
        }
    },
}

get_brand_by_name_doc = {
    "tags": ["Marcas"],
    "security": [{"Bearer": []}],
    "summary": "Busca uma marca pelo nome",
    "parameters": [
        {
            "name": "name",
            "in": "query",
            "type": "string",
            "required": True,
            "description": "Nome da marca",
        }
    ],
    "responses": {
        200: {
            "description": "Marca encontrada",
            "schema": {
                "type": "object",
                "properties": {
                    "id": {"type": "integer", "example": 1},
                    "name": {"type": "string", "example": "Nike"},
                },
            },
        },
        404: {"description": "Marca não encontrada"},
    },
}

create_brand_doc = {
    "tags": ["Marcas"],
    "security": [{"Bearer": []}],
    "summary": "Cria uma nova marca",
    "parameters": [
        {
            "name": "body",
            "in": "body",
            "required": True,
            "schema": {
                "type": "object",
                "required": ["name"],
                "properties": {
                    "name": {"type": "string", "example": "Adidas"},
                },
            },
        }
    ],
    "responses": {
        201: {"description": "Marca criada com sucesso"},
        400: {"description": "Erro ao criar marca"},
    },
}

get_brand_by_id_doc = {
    "tags": ["Marcas"],
    "security": [{"Bearer": []}],
    "summary": "Busca uma marca pelo ID",
    "parameters": [
        {
            "name": "id",
            "in": "path",
            "type": "integer",
            "required": True,
            "description": "ID da marca",
        }
    ],
    "responses": {
        200: {
            "description": "Marca encontrada",
            "schema": {
                "type": "object",
                "properties": {
                    "id": {"type": "integer", "example": 1},
                    "name": {"type": "string", "example": "Nike"},
                },
            },
        },
        404: {"description": "Marca não encontrada"},
    },
}

update_brand_doc = {
    "tags": ["Marcas"],
    "security": [{"Bearer": []}],
    "summary": "Atualiza uma marca existente",
    "parameters": [
        {
            "name": "id",
            "in": "path",
            "type": "integer",
            "required": True,
            "description": "ID da marca",
        },
        {
            "name": "body",
            "in": "body",
            "required": True,
            "schema": {
                "type": "object",
                "properties": {
                    "name": {"type": "string", "example": "Marca Atualizada"},
                },
            },
        },
    ],
    "responses": {
        200: {"description": "Marca atualizada com sucesso"},
        404: {"description": "Marca não encontrada"},
    },
}

delete_brand_doc = {
    "tags": ["Marcas"],
    "security": [{"Bearer": []}],
    "summary": "Remove uma marca",
    "parameters": [
        {
            "name": "id",
            "in": "path",
            "type": "integer",
            "required": True,
            "description": "ID da marca",
        }
    ],
    "responses": {
        200: {"description": "Marca removida com sucesso"},
        404: {"description": "Marca não encontrada"},
    },
}
