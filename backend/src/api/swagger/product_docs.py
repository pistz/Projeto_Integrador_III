get_all_products_doc = {
    "tags": ["Produtos"],
    "security": [{"Bearer": []}],
    "summary": "Lista todos os produtos",
    "responses": {
        200: {
            "description": "Lista de produtos retornada com sucesso",
            "schema": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {"type": "integer", "example": 1},
                        "name": {"type": "string", "example": "Notebook Dell"},
                        "description": {
                            "type": "string",
                            "example": "Laptop com 16GB RAM",
                        },
                        "brand_id": {"type": "integer", "example": 2},
                        "category_id": {"type": "integer", "example": 1},
                        "created_at": {"type": "string", "format": "date-time"},
                        "updated_at": {"type": "string", "format": "date-time"},
                    },
                },
            },
        }
    },
}

get_product_by_name_doc = {
    "tags": ["Produtos"],
    "security": [{"Bearer": []}],
    "summary": "Busca um produto pelo nome",
    "parameters": [
        {
            "name": "name",
            "in": "query",
            "type": "string",
            "required": True,
            "description": "Nome do produto",
        }
    ],
    "responses": {
        200: {
            "description": "Produto encontrado",
            "schema": {
                "type": "object",
                "properties": {
                    "id": {"type": "integer"},
                    "name": {"type": "string"},
                    "description": {"type": "string"},
                    "brand_id": {"type": "integer"},
                    "category_id": {"type": "integer"},
                    "created_at": {"type": "string", "format": "date-time"},
                    "updated_at": {"type": "string", "format": "date-time"},
                },
            },
        },
        404: {"description": "Produto não encontrado"},
    },
}

create_product_doc = {
    "tags": ["Produtos"],
    "security": [{"Bearer": []}],
    "summary": "Cria um novo produto",
    "parameters": [
        {
            "name": "body",
            "in": "body",
            "required": True,
            "schema": {
                "type": "object",
                "required": ["name", "brand_id", "category_id"],
                "properties": {
                    "name": {"type": "string", "example": "Monitor LG"},
                    "description": {"type": "string", "example": "Tela IPS Full HD"},
                    "brand_id": {"type": "integer", "example": 3},
                    "category_id": {"type": "integer", "example": 4},
                },
            },
        }
    ],
    "responses": {
        201: {"description": "Produto criado com sucesso"},
        400: {"description": "Erro ao criar produto"},
    },
}

get_product_by_id_doc = {
    "tags": ["Produtos"],
    "security": [{"Bearer": []}],
    "summary": "Busca um produto pelo ID",
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
            "description": "Produto encontrado",
            "schema": {
                "type": "object",
                "properties": {
                    "id": {"type": "integer"},
                    "name": {"type": "string"},
                    "description": {"type": "string"},
                    "brand_id": {"type": "integer"},
                    "category_id": {"type": "integer"},
                    "created_at": {"type": "string", "format": "date-time"},
                    "updated_at": {"type": "string", "format": "date-time"},
                },
            },
        },
        404: {"description": "Produto não encontrado"},
    },
}

update_product_doc = {
    "tags": ["Produtos"],
    "security": [{"Bearer": []}],
    "summary": "Atualiza um produto existente",
    "parameters": [
        {
            "name": "product_id",
            "in": "path",
            "type": "integer",
            "required": True,
            "description": "ID do produto",
        },
        {
            "name": "body",
            "in": "body",
            "required": True,
            "schema": {
                "type": "object",
                "properties": {
                    "name": {"type": "string", "example": "Produto Atualizado"},
                    "description": {"type": "string", "example": "Nova descrição"},
                    "brand_id": {"type": "integer"},
                    "category_id": {"type": "integer"},
                },
            },
        },
    ],
    "responses": {
        200: {"description": "Produto atualizado com sucesso"},
        404: {"description": "Produto não encontrado"},
    },
}

delete_product_doc = {
    "tags": ["Produtos"],
    "security": [{"Bearer": []}],
    "summary": "Remove um produto",
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
        200: {"description": "Produto removido com sucesso"},
        404: {"description": "Produto não encontrado"},
    },
}

get_products_by_brand_id_doc = {
    "tags": ["Produtos"],
    "security": [{"Bearer": []}],
    "summary": "Busca produtos pelo ID da marca",
    "parameters": [
        {
            "name": "brand_id",
            "in": "path",
            "type": "integer",
            "required": True,
            "description": "ID da marca",
        }
    ],
    "responses": {
        200: {
            "description": "Produtos encontrados",
            "schema": {
                "type": "array",
                "items": {"type": "object"},
            },
        },
        404: {"description": "Nenhum produto encontrado para a marca"},
    },
}

get_products_by_category_id_doc = {
    "tags": ["Produtos"],
    "security": [{"Bearer": []}],
    "summary": "Busca produtos pelo ID da categoria",
    "parameters": [
        {
            "name": "category_id",
            "in": "path",
            "type": "integer",
            "required": True,
            "description": "ID da categoria",
        }
    ],
    "responses": {
        200: {
            "description": "Produtos encontrados",
            "schema": {
                "type": "array",
                "items": {"type": "object"},
            },
        },
        404: {"description": "Nenhum produto encontrado para a categoria"},
    },
}
