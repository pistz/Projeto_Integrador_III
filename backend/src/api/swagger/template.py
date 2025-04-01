swagger_sec_template = {
    "swagger": "2.0",
    "info": {
        "title": "API Gestão de Estoque",
        "version": "1.0",
    },
    "securityDefinitions": {
        "Bearer": {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header",
            "description": "Insira o token JWT no formato: **Bearer &lt;seu-token&gt;**",
        }
    },
}
