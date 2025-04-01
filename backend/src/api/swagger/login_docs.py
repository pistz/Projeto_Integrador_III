login_doc = {
    "tags": ["Autenticação"],
    "summary": "Realiza login de usuário",
    "description": "Autentica um usuário e retorna um token JWT para acesso aos recursos protegidos.",
    "parameters": [
        {
            "name": "body",
            "in": "body",
            "required": True,
            "schema": {
                "type": "object",
                "required": ["email", "password"],
                "properties": {
                    "email": {
                        "type": "string",
                        "format": "email",
                        "example": "usuario@example.com",
                    },
                    "password": {
                        "type": "string",
                        "format": "password",
                        "example": "senhaSegura123",
                    },
                },
            },
        }
    ],
    "responses": {
        200: {
            "description": "Login bem-sucedido",
            "schema": {
                "type": "object",
                "properties": {
                    "token": {"type": "string", "example": "eyJhbGciOiJIUzI1..."},
                    "user": {
                        "type": "object",
                        "properties": {
                            "id": {"type": "integer"},
                            "email": {"type": "string"},
                            "name": {"type": "string"},
                        },
                    },
                },
            },
        },
        401: {"description": "Credenciais inválidas"},
        400: {"description": "Requisição mal formatada"},
    },
}
