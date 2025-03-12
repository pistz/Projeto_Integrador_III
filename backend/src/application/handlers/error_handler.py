
from flask import jsonify
from jwt import PyJWTError

from src.application.exceptions.email_not_valid import EmailNotValid
from src.application.exceptions.invalid_user import InvalidUser
from src.application.exceptions.not_found import NotFound
from src.application.exceptions.password_not_valid import PasswordNotValid
from src.application.exceptions.user_not_created import UserNotCreated

def register_error_handlers(app):
    @app.errorhandler(Exception)
    def handle_all_exceptions(e):

        if isinstance(e, UserNotCreated):
            return jsonify({"error": e.message}), e.status_code
        
        if isinstance(e, ValueError):
            return jsonify({"error": str(e)}), 400
        
        if isinstance(e, EmailNotValid):
            return jsonify({"error": e.message}), 400
        
        if isinstance(e, PasswordNotValid):
            return jsonify({"error": e.message}), 400
        
        if isinstance(e, InvalidUser):
            return jsonify({"error": e.message}), 400
        
        if isinstance(e, NotFound):
            return jsonify({"error": e.message}), 404
        
        if isinstance(e, PyJWTError):
            return jsonify({"error": str(e)}), 498
        

        # Erros inesperados (500)
        error = {
            "error": "Internal Server Error",
            "message": "An unexpected error has occurred. Please try again later.",
            "type": str(e)
        }
        return jsonify(error), 500
