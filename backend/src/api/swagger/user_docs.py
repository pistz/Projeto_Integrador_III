get_all_users_doc = {
    "tags": ["Usuários"],
    "security": [{"Bearer": []}],
    "summary": "Lista todos os usuários",
    "responses": {
        200: {
            "description": "Lista de usuários",
            "schema": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {"type": "integer", "example": 1},
                        "name": {"type": "string", "example": "João Silva"},
                        "email": {"type": "string", "example": "joao@example.com"},
                        "created_at": {
                            "type": "string",
                            "format": "date-time",
                            "example": "2024-01-01T12:00:00",
                        },
                    },
                },
            },
        }
    },
}

create_user_doc = {
    "tags": ["Usuários"],
    "security": [{"Bearer": []}],
    "summary": "Cria um novo usuário",
    "parameters": [
        {
            "name": "body",
            "in": "body",
            "required": True,
            "schema": {
                "type": "object",
                "required": ["name", "email", "password"],
                "properties": {
                    "name": {"type": "string", "example": "Maria Oliveira"},
                    "email": {"type": "string", "example": "maria@example.com"},
                    "password": {"type": "string", "example": "senhaSegura123"},
                },
            },
        }
    ],
    "responses": {
        201: {"description": "Usuário criado com sucesso"},
        400: {"description": "Erro ao criar usuário"},
    },
}

get_user_by_id_doc = {
    "tags": ["Usuários"],
    "security": [{"Bearer": []}],
    "summary": "Busca um usuário pelo ID",
    "parameters": [
        {
            "name": "id",
            "in": "path",
            "type": "integer",
            "required": True,
            "description": "ID do usuário",
        }
    ],
    "responses": {
        200: {
            "description": "Usuário encontrado",
            "schema": {
                "type": "object",
                "properties": {
                    "id": {"type": "integer"},
                    "name": {"type": "string"},
                    "email": {"type": "string"},
                    "created_at": {
                        "type": "string",
                        "format": "date-time",
                    },
                },
            },
        },
        404: {"description": "Usuário não encontrado"},
    },
}

update_user_doc = {
    "tags": ["Usuários"],
    "security": [{"Bearer": []}],
    "summary": "Atualiza os dados de um usuário",
    "parameters": [
        {
            "name": "id",
            "in": "path",
            "type": "integer",
            "required": True,
            "description": "ID do usuário",
        },
        {
            "name": "body",
            "in": "body",
            "schema": {
                "type": "object",
                "properties": {
                    "name": {"type": "string", "example": "Novo Nome"},
                    "email": {"type": "string", "example": "novo@email.com"},
                    "password": {"type": "string", "example": "novaSenha123"},
                },
            },
        },
    ],
    "responses": {
        200: {"description": "Usuário atualizado com sucesso"},
        404: {"description": "Usuário não encontrado"},
    },
}

delete_user_doc = {
    "tags": ["Usuários"],
    "security": [{"Bearer": []}],
    "summary": "Remove um usuário",
    "parameters": [
        {
            "name": "id",
            "in": "path",
            "type": "integer",
            "required": True,
            "description": "ID do usuário",
        }
    ],
    "responses": {
        200: {"description": "Usuário removido com sucesso"},
        404: {"description": "Usuário não encontrado"},
    },
}
