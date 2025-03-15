
from flask import jsonify
from src.application.enums.status_codes import StatusCode
from src.application.exceptions.token_error import TokenError
from src.application.exceptions.database_exception import DatabaseException
from src.application.exceptions.email_not_valid import EmailNotValid
from src.application.exceptions.invalid_data import InvalidData
from src.application.exceptions.invalid_user import InvalidUser
from src.application.exceptions.not_found import NotFound
from src.application.exceptions.password_not_valid import PasswordNotValid


def register_error_handlers(app):
    @app.errorhandler(Exception)
    def handle_all_exceptions(e):
        
        if isinstance(e, EmailNotValid):
            error = jsonify({
            "error": str(e.type) if hasattr(e, 'type') else "Internal Server Error",
            "message": e.message if hasattr(e, 'message') else "An unexpected error has occurred. Please try again later.",
            })
            return error, e.status_code.value
        
        if isinstance(e, PasswordNotValid):
            error = jsonify({
            "error": str(e.type) if hasattr(e, 'type') else "Internal Server Error",
            "message": e.message if hasattr(e, 'message') else "An unexpected error has occurred. Please try again later.",
            })
            return error, e.status_code.value
        
        if isinstance(e, InvalidUser):
            error = jsonify({
            "error": str(e.type) if hasattr(e, 'type') else "Internal Server Error",
            "message": e.message if hasattr(e, 'message') else "An unexpected error has occurred. Please try again later.",
            })
            return error, e.status_code.value
        
        if isinstance(e, InvalidData):
            error = jsonify({
            "error": str(e.type) if hasattr(e, 'type') else "Internal Server Error",
            "message": e.message if hasattr(e, 'message') else "An unexpected error has occurred. Please try again later.",
            })
            return error, e.status_code.value
        
        if isinstance(e, NotFound):
            error = jsonify({
            "error": str(e.type) if hasattr(e, 'type') else "Internal Server Error",
            "message": e.message if hasattr(e, 'message') else "An unexpected error has occurred. Please try again later.",
            })
            return error, e.status_code.value
        
        if isinstance(e, TokenError):
            error = jsonify({
            "error": str(e.type) if hasattr(e, 'type') else "Internal Server Error",
            "message": e.message if hasattr(e, 'message') else "An unexpected error has occurred. Please try again later.",
            })
            return error, e.status_code.value
        
        if isinstance(e, DatabaseException):
            error = jsonify({
            "error": str(e.type) if hasattr(e, 'type') else "Internal Server Error",
            "message": e.message if hasattr(e, 'message') else "An unexpected error has occurred. Please try again later.",
            })
            return error, e.status_code.value
        

        # Erros inesperados (500)
        error = {
            "error": "Internal Server Error",
            "message": "An unexpected error has occurred. Please try again later.",
            "type": str(e)
        }
        return jsonify(error), StatusCode.INTERNAL_SERVER_ERROR
