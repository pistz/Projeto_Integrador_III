get_all_categories_doc = {
    "tags": ["Categorias"],
    "security": [{"Bearer": []}],
    "summary": "Lista todas as categorias",
    "responses": {
        200: {
            "description": "Lista de categorias retornada com sucesso",
            "schema": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {"type": "integer", "example": 1},
                        "name": {"type": "string", "example": "Eletrônicos"},
                    },
                },
            },
        }
    },
}

get_category_by_name_doc = {
    "tags": ["Categorias"],
    "security": [{"Bearer": []}],
    "summary": "Busca uma categoria pelo nome",
    "parameters": [
        {
            "name": "name",
            "in": "query",
            "type": "string",
            "required": True,
            "description": "Nome da categoria",
        }
    ],
    "responses": {
        200: {
            "description": "Categoria encontrada",
            "schema": {
                "type": "object",
                "properties": {
                    "id": {"type": "integer", "example": 1},
                    "name": {"type": "string", "example": "Eletrônicos"},
                },
            },
        },
        404: {"description": "Categoria não encontrada"},
    },
}

create_category_doc = {
    "tags": ["Categorias"],
    "security": [{"Bearer": []}],
    "summary": "Cria uma nova categoria",
    "parameters": [
        {
            "name": "body",
            "in": "body",
            "required": True,
            "schema": {
                "type": "object",
                "required": ["name"],
                "properties": {
                    "name": {"type": "string", "example": "Informática"},
                },
            },
        }
    ],
    "responses": {
        201: {"description": "Categoria criada com sucesso"},
        400: {"description": "Erro ao criar categoria"},
    },
}

get_category_by_id_doc = {
    "tags": ["Categorias"],
    "security": [{"Bearer": []}],
    "summary": "Busca uma categoria pelo ID",
    "parameters": [
        {
            "name": "id",
            "in": "path",
            "type": "integer",
            "required": True,
            "description": "ID da categoria",
        }
    ],
    "responses": {
        200: {
            "description": "Categoria encontrada",
            "schema": {
                "type": "object",
                "properties": {
                    "id": {"type": "integer", "example": 1},
                    "name": {"type": "string", "example": "Eletrônicos"},
                },
            },
        },
        404: {"description": "Categoria não encontrada"},
    },
}

update_category_doc = {
    "tags": ["Categorias"],
    "security": [{"Bearer": []}],
    "summary": "Atualiza uma categoria existente",
    "parameters": [
        {
            "name": "id",
            "in": "path",
            "type": "integer",
            "required": True,
            "description": "ID da categoria",
        },
        {
            "name": "body",
            "in": "body",
            "required": True,
            "schema": {
                "type": "object",
                "properties": {
                    "name": {"type": "string", "example": "Categoria Atualizada"},
                },
            },
        },
    ],
    "responses": {
        200: {"description": "Categoria atualizada com sucesso"},
        404: {"description": "Categoria não encontrada"},
    },
}

delete_category_doc = {
    "tags": ["Categorias"],
    "security": [{"Bearer": []}],
    "summary": "Remove uma categoria",
    "parameters": [
        {
            "name": "id",
            "in": "path",
            "type": "integer",
            "required": True,
            "description": "ID da categoria",
        }
    ],
    "responses": {
        200: {"description": "Categoria removida com sucesso"},
        404: {"description": "Categoria não encontrada"},
    },
}
