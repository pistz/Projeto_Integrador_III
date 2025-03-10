
from flask import jsonify

from src.application.exceptions.user_not_created import UserNotCreated

def register_error_handlers(app):
    @app.errorhandler(Exception)
    def handle_all_exceptions(e):
        if isinstance(e, UserNotCreated):
            return jsonify({"error": e.message}), e.status_code
        
        if isinstance(e, ValueError):
            return jsonify({"error": str(e)}), 400

        # Erros inesperados (500)
        return jsonify({"error": "Erro interno no servidor"}), 500
