from flask import Flask
from application.handlers.error_handler import register_error_handlers
from src.application.routes.routes import user_route_bp

app = Flask(__name__)

#Rotas
app.register_blueprint(user_route_bp)

#Handlers de erro
register_error_handlers(app)